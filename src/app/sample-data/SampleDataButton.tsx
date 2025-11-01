"use client";

import React from "react";
import { TeslaVehicleSample, sampleVehicles } from "./sampleData";

type Props = {
    onGenerate: (vehicles: TeslaVehicleSample[]) => void;
};

export default function SampleDataButton({ onGenerate }: Props) {
    const handleClick = () => {
        onGenerate(sampleVehicles);
    };

    return (
        <button className="tesla-button" onClick={handleClick} style={{ margin: "16px", padding: "12px 24px"}}>
            generate sample data
        </button>
    );
}