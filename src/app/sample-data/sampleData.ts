export type TeslaVehicleSample = {
  id: number;
  display_name: string;
  charge_state: {
    battery_level: number;
  };
  drive_state: {
    speed: number;
    latitude: number;
    longitude: number;
  };
  vehicle_state: {
    locked: boolean;
    odometer: number;
  };
};

export const sampleVehicles: TeslaVehicleSample[] = [
  {
    id: 1,
    display_name: "Roadster",
    charge_state: { battery_level: 83 },
    drive_state: { speed: 0, latitude: 37.3947, longitude: -122.1503 },
    vehicle_state: { locked: false, odometer: 45213.4 },
  },
  {
    id: 2,
    display_name: "Cybertruck",
    charge_state: { battery_level: 47 },
    drive_state: { speed: 25, latitude: 34.0522, longitude: -118.2437 },
    vehicle_state: { locked: true, odometer: 12056.7 },
  },
];