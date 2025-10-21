import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/tesla_access_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
        return NextResponse.json({ error: "missing tesla access token" }, { status: 401});
    }

    console.log("using tesla access token: ", token);

    const teslaResponse = await fetch(
        "https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles", 
        {
            headers: {
                Authorization: `Bearer $(token)`,
            },
        }
    );

    const data = await teslaResponse.json()
    console.log("tesla vehicles: ", data);

    return NextResponse.json(data);
}