/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.TESLA_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "missing TESLA_ACCESS_TOKEN in environment variables." },
        { status: 401 }
      );
    }

    // get vehicle list from tesla api
    const listRes = await fetch(
      "https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles",
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!listRes.ok) {
      const errorBody = await listRes.text();
      console.error("Tesla Fleet API /vehicles failed:", errorBody);
      return NextResponse.json(
        { error: "failed to fetch vehicle list", details: errorBody },
        { status: listRes.status }
      );
    }

    const listData = await listRes.json();
    const vehicles = listData.response || [];

    // for each vehicle, wake it and then get its detailed data
    const detailedData = await Promise.all(
      vehicles.map(async (v: any) => {
        try {
          // wake up the vehicle first
          console.log(`waking up ${v.display_name || v.id}...`);
          await fetch(
            `https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${v.id}/wake_up`,
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // wait a few seconds before requesting data
          await new Promise((r) => setTimeout(r, 3000));

          // fetch the full vehicle_data
          const res = await fetch(
            `https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${v.id}/vehicle_data`,
            {
              headers: { Authorization: `Bearer ${token}` },
              cache: "no-store",
            }
          );

          if (!res.ok) {
            const txt = await res.text();
            console.warn(`could not fetch vehicle_data for ${v.display_name}:`, txt);
            return { ...v, error: "no detailed data" };
          }

          const fullData = await res.json();
          console.log(
            `full vehicle_data for ${v.display_name}:`,
            JSON.stringify(fullData.response?.charge_state, null, 2)
          );

          return fullData.response;
        } catch (error) {
          console.error(`error fetching data for ${v.display_name}:`, error);
          return { ...v, error: "fetch error" };
        }
      })
    );

    // return simplified data
    return NextResponse.json({
      response: detailedData.map((v: any) => ({
        id: v.id,
        display_name: v.display_name,
        charge_state: {
          battery_level: v.charge_state?.battery_level ?? null,
          charging_state: v.charge_state?.charging_state ?? "unknown",
        },
        drive_state: {
          latitude: v.drive_state?.latitude,
          longitude: v.drive_state?.longitude,
          speed: v.drive_state?.speed,
        },
        vehicle_state: {
          locked: v.vehicle_state?.locked,
          odometer: v.vehicle_state?.odometer,
        },
      })),
    });
  } catch (err) {
    console.error("/api/vehicles error:", err);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
