import { User } from "./user";

export enum DeviceSort {
  "BatteryLevel" = "BatteryLevel",
  "TankLevel" = "TankLevel",
  "LastUpdated" = "LastUpdated",
}

export enum DeviceType {
  "Ultrasound" = "Ultrasound",
  "Floating" = "Floating",
}

export class Device {
  constructor(
    public id?: string,
    public name?: string,
    public tankLevel?: number,
    public imei?: string,
    public address?: string,
    public type?: DeviceType,
    public updatedAt?: string,
    public batteryLevel?: number,
    public user?: User,
    public depth?: string
  ) {}
}
