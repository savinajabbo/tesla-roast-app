"use client";

import { useEffect, useState } from "react";

type TeslaVehicle = {
    id: number;
    display_name: string;
    charge_state?: {
        battery_level: number;
    };
};

export default function Dashboard() {
    // tesla car info
    const [ vehicles, setVehicles ] = useState<TeslaVehicle[]>([]);

    useEffect(() => {
        fetch("api/vehicles")
            .then((res) => res.json())
            .then((data) => {
                console.log("tesla data from server: ", data);
                setVehicles(data.response || []);
            });
    }, []);

    return (
        <div className="page">
            <h1>tesla dashboard</h1>

            {vehicles.length > 0 ? (
                vehicles.map((car) => (
                    <p key={car.id}>
                        {car.display_name} - Battery: {car.charge_state?.battery_level}%
                    </p>
                ))
            ) : (
                <p>no tesla data found</p>
            )}
        </div>
    );
}