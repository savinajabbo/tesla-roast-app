"use client";

import React, { useState } from "react";
import SampleDataButton from "./SampleDataButton";
import { TeslaVehicleSample } from "./sampleData";

export default function SampleDataPage() {
    const [vehicles, setVehicles] = useState<TeslaVehicleSample[]>([]);

    const handleGenerate = (data: TeslaVehicleSample[]) => {
        setVehicles(data);
    };

    return (
        <div className="page" style={{ padding: "2rem" }}>
            <h1>sample tesla data</h1>
            <SampleDataButton onGenerate={handleGenerate} />
            {vehicles.length > 0 ? (
                <ul>
                    {vehicles.map((v) => (
                        <li key={v.id}>
                            {v.display_name} – Battery: {v.charge_state.battery_level}%
                        </li>
                    ))}
                </ul>
            ) : (
                <p>no sample data generated yet.</p>
            )}
        </div>
    );
}