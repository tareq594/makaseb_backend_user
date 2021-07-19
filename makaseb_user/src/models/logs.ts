import { DeviceType } from "./device";

export interface Log {
  id?: number;
  tankLevel: number;
  batteryLevel: number;
  type: DeviceType;
  createdAt:string
}
