"use client";

import { useState } from "react";
import { TeslaVehicleSample, sampleVehicles } from "./sampleData";

export default function SampleDataPage() {
    const [vehicles, setVehicles] = useState<TeslaVehicleSample[]>([]);

    const handleGenerate = () => {
        setVehicles(sampleVehicles);
    };

    return (
        <div className="min-h-screen flex-col items-center justify-center bg-black text-white px-6">
            <div className="max-w-xl text-center">
                <h1 className="text-5xl font-semibold tracking-tight mb-6">
                    sample tesla data
                </h1>
                <p className="text-gray-400 mb-10">
                    visualize how your data would appear when connected to the tesla fleet api
                </p>

                <button onClick={handleGenerate} className="w-full sm:w-auto px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow-lg">
                    generate sample data
                </button>
            </div>

            <div className="mt-14 w-full max-w-md space-y-4">
                {vehicles.length > 0 ? (
                    vehicles.map((v) => (
                        <div key={v.id} className="flex justify-between items-center bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4">
                            <span className="font-medium">{v.display_name}</span>
                            <span className="text-red-400 font-semibold">, Battery: {v.charge_state.battery_level}%</span>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-6">
                        no sample data generated yet
                    </p>
                )}
            </div>
        </div>
    )
}