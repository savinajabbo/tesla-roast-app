"use client";

import { useState, useEffect } from "react";
import { sampleVehicles } from "./sampleData";

export default function SampleDashboard() {
  const [roasts, setRoasts] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function fetchRoasts() {
    try {
      setLoading(true);
      const res = await fetch("/api/roast-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicles: sampleVehicles }),
      });
      const data = await res.json();
      setRoasts(data);
    } catch (err) {
      console.error("Error fetching roasts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoasts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0f12] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-bold text-[var(--tesla-red)] mb-2 tracking-tight">
        Tesla Roast AI
      </h1>
      <p className="text-gray-400 mb-10 uppercase tracking-wider">
        Demo Mode — Mock Data
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center mb-12">
        {sampleVehicles.map((car) => (
          <div
            key={car.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-80 shadow-[0_0_20px_rgba(255,0,0,0.05)] hover:shadow-[0_0_30px_rgba(255,0,0,0.2)] transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2 text-white">{car.display_name}</h2>
            <p className="text-gray-400 text-sm mb-1">Battery</p>
            <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden mb-2">
              <div
                className="bg-red-600 h-3 transition-all duration-700"
                style={{ width: `${car.charge_state.battery_level}%` }}
              ></div>
            </div>
            <p className="text-lg font-medium text-white">
              {car.charge_state.battery_level}% charged
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {car.vehicle_state.locked ? "🔒 Locked" : "🔓 Unlocked"} •{" "}
              {car.vehicle_state.odometer.toLocaleString()} miles
            </p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl text-center">
        {loading ? (
          <p className="text-gray-500 text-center animate-pulse">Generating roasts...</p>
        ) : roasts ? (
          <div className="bg-gradient-to-b from-red-950/70 to-black border border-red-700 text-red-300 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,0,0,0.2)]">
            <p className="font-bold text-xl mb-4 text-red-400 tracking-wide">
              🔥 Incredibly Original and Fire AI Roasts 🔥
            </p>
            <ul className="space-y-2 text-lg leading-relaxed">
              <li>{roasts.intro}</li>
              <li>{roasts.battery}</li>
              <li>{roasts.status}</li>
              <li>{roasts.health}</li>
              <li>{roasts.service}</li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No roasts yet.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={fetchRoasts}
          disabled={loading}
          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow-md disabled:opacity-50"
        >
          {loading ? "Cooking Up New Roasts..." : "Regenerate Roasts"}
        </button>

        <a
          href="/"
          className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition font-semibold text-white shadow-md"
        >
          Back Home
        </a>
      </div>
    </div>
  );
}