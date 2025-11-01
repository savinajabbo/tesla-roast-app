"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TeslaVehicle = {
    id: number;
    display_name: string;
    charge_state?: {
        battery_level: number;
    };
};

export default function Dashboard() {
    const [vehicles, setVehicles] = useState<TeslaVehicle[]>([]);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    useEffect(() => {
        fetch("/api/vehicles")
        .then((res) => res.json())
        .then((data) => {
            console.log("tesla data from server: ", data);
            setVehicles(data.response || []);
        });
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-semibold tracking-tight mb-2">
                    tesla dashboard
                </h1>
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                    live vehicle overview
                </p>
            </header>

            <button onClick={handleLogout} className="mb-10 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow-md">
                logout
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {vehicles.length > 0 ? (
                    vehicles.map((car) => (
                        <div key={car.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-red-600/10 transition-shadow">
                            <div className="flex justify between items-center mb-3">
                                <h2 className="text-2xl font-semibold">{car.display_name}</h2>
                                <span className="text-gray-400 text-sm uppercase">#{car.id}</span>
                            </div>

                            <div className="mt-4">
                                <p className="text-gray-400 text-sm mb-1">Battery Level</p>
                                <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                                    <div className="bg-red-600 h-3 transition-all duration-500" style={{ width: `${car.charge_state?.battery_level || 0}%`,}}></div>
                                </div>
                                <p className="mt-2 text-lg font-medium">
                                    {car.charge_state?.battery_level ?? 0}%
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        no tesla data found
                    </div>
                )}
            </div>
        </div>
    )
}