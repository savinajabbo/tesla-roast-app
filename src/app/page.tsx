"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const handleTeslaLogin = () => {
    const clientId = "0781fc62-6073-459e-84ca-ab343e1699fa";
    const redirectUri= "https://tesla-roast-app.vercel.app/api/auth/callback"; 
    const audience = "https://fleet-api.prd.na.vn.cloud.tesla.com";
    const scope = "openid offline_access user_data vehicle_device_data vehicle_cmds vehicle_charging_cmds";

    const url = `https://auth.tesla.com/oauth2/v3/authorize?client_id=${clientId}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${redirectUri}&audience=${encodeURIComponent(audience)}`;

    window.location.href = url;
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-10">
          <Image
            src="/dog.png"
            alt="Tesla Dog"
            width={256}
            height={256}
            className="opacity-80"
          />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex flex-col items-center text-center px-6"
      >
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          <span className="text-tesla-red">Tesla Roast AI</span>
        </h1>
        <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl">
          The one and only Tesla AI that roasts your driving habits.<br/>  
          Connect your Tesla or try sample mode.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleTeslaLogin}
            className="btn btn-primary w-56 text-base"
          >
            Login with Tesla
          </button>
          <Link
            href="/sample-data"
            className="btn btn-ghost w-56 text-base text-white"
          >
            Try Sample Mode
          </Link>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="absolute bottom-6 text-xs text-zinc-500 text-center"
      >
        © {new Date().getFullYear()} Tesla Roast AI. Not affiliated with Tesla, Inc. Made with ♡ by Savina.
      </motion.footer>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    </main>
  );
}
