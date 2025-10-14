"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const handleTeslaLogin = () => {
    const clientId = "ownerapi";
    const redirectUri = "http://localhost:3000/api/auth/login";

    const url = `https://auth.tesla.com/oauth2/v3/authorize?client_id=${clientId}&response_type=code&scope=openid email offline_access&redirect_uri=${redirectUri}`;

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
            width={180}
            height={38}
            priority
          />
        </div>

        <div style={{ display: "flex", height:"10vh", alignItems: "center", justifyContent: "center" }}>
          <button onClick={handleTeslaLogin}
          className="
            bg-[#E31937] hover:bg-[#FF4500]
            text-white font-bold py-4 px-8
            rounded-2xl text-lg
            shadow-md hover:shadow-xl
            border-2 border-transparent hover:border-white
            transition-colors duration-300
            "
          >
            sign in with tesla
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
