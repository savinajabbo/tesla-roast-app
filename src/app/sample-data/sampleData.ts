export type TeslaVehicleSample = {
    id: number;
    display_name: string;
    charge_state: {
        battery_level: number;
    };
};

export const sampleVehicles: TeslaVehicleSample[] = [
    { id: 1, display_name: "Model 3 – Demo", charge_state: {battery_level: 82} },
    { id: 2, display_name: "Model X – Demo", charge_state: {battery_level: 45} },
    { id: 3, display_name: "Cybertruck – Demo", charge_state: {battery_level: 17} },
];