"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Home() {

  const handleTeslaLogin = () => {
    const clientId = "0781fc62-6073-459e-84ca-ab343e1699fa";
    const redirectUri = "https://tesla-roast-app.vercel.app/api/auth/callback";
    const audience = "https://fleet-api.prd.na.vn.cloud.tesla.com";
    const scope = "openid email offline_access vehicle_device_data vehicle_cmds vehicle_charging_cmds";

    const url = `https://fleet-auth.prd.na.vn.cloud.tesla.com/oauth2/v3/authorize?client_id=${clientId}&response_type=code&scope=${encodeURIComponent(scope)}&redirect_uri=${redirectUri}&audience=${encodeURIComponent(audience)}`;

    console.log("redirecting to tesla login: ", url);
    window.location.href = url;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex justify-center">
          <Image
            className="dark:invert"
            src="/dog.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "256px", height: "256px" }}
          />
        </div>

        <div style={{ display: "flex", height:"10vh", alignItems: "center", justifyContent: "center" }}>
          <button onClick={handleTeslaLogin} className="tesla-button">
            login with tesla
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
