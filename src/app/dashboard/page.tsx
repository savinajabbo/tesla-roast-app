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
    // tesla car info
    const [ vehicles, setVehicles ] = useState<TeslaVehicle[]>([]);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST"});
        router.push("/");
    }

    useEffect(() => {
        fetch("/api/vehicles")
            .then((res) => res.json())
            .then((data) => {
                console.log("tesla data from server: ", data);
                setVehicles(data.response || []);
            });
    }, [router]);

    return (
        <div className="page">
            <h1>tesla dashboard</h1>
            <button onClick={handleLogout} className="tesla-button">
                logout
            </button>

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
