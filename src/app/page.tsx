"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {

  const handleTeslaLogin = () => {
    const clientId = "0781fc62-6073-459e-84ca-ab343e1699fa";
    const redirectUri = "https://tesla-roast-app.vercel.app/api/auth/callback";
    const audience = "https://fleet-api.prd.na.vn.cloud.tesla.com";
    const scope = "openid offline_access user_data vehicle_device_data vehicle_cmds vehicle_charging_cmds";

    const url = `https://auth.tesla.com/oauth2/v3/authorize?client_id=${clientId}&response_type=code&scope=${encodeURIComponent(scope)}&redirect_uri=${redirectUri}&audience=${encodeURIComponent(audience)}`;

    console.log("redirecting to tesla login: ", url);
    window.location.href = url;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-8 sm:p-20 font-sans bg-[#0e0f12] text-white">
      <Image
        src="/dog.png"
        alt="logo"
        width={256}
        height={256}
        className="dark:invert"
      />

      <div className="flex flex-col items-center gap-4">
        <button onClick={handleTeslaLogin} className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow-md">
          login with tesla
        </button>

        <Link href="/sample-data" className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 tranistion font-semibold text-white shadow-md">
          generate sample data
        </Link>
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}