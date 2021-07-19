import { Device, DeviceType } from "./models/device";
import { User } from "./models/user";

export const user1: User = {
  firstName: "tareq",
  lastName: "Alsanabrah",
  address: "amman jordan honak",
  phoneNumber: "0798487414",
};
export const user2: User = {
  firstName: "tareq2",
  lastName: "Alsanabrah",
  address: "amman jordan honak",
  phoneNumber: "0798487414",
};

export const user3: User = {
  firstName: "tareq3",
  lastName: "Alsanabrah",
  address: "amman jordan honak",
  phoneNumber: "0798487414",
};


const device1: Device = {
  name: "tareq device",
  tankLevel: 80,
  type: DeviceType.Ultrasound,
  user: user1,
  imei: "12345678",
  address: "amman jordan honak",
  updatedAt: new Date().toLocaleDateString(),
  batteryLevel: 50,
};
const device2: Device = {
  name: "tareq device 2",
  tankLevel: 60,
  type: DeviceType.Floating,
  user: user1,
  imei: "12345679",
  address: "amman jordan honak s",
  updatedAt: new Date().toLocaleDateString(),
  batteryLevel: 90,
};
const device3: Device = {
  name: "tareq device 3",
  tankLevel: 10,
  type: DeviceType.Floating,
  user: user1,
  imei: "12345677",
  address: "amman jordan honak",
  updatedAt: new Date().toLocaleDateString(),
  batteryLevel: 50,
};
const device4: Device = {
  name: "tareq device 4",
  tankLevel: 10,
  type: DeviceType.Floating,
  user: user1,
  imei: "12345676",
  address: "amman jordan honak",
  updatedAt: new Date().toLocaleDateString(),
  batteryLevel: 70,
};

export const devices: Device[] = [device1, device2, device3, device4];

export const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJwZXJtZXNzaW9uIjoiQWRtaW4iLCJuYW1lIjoiVGFyaXEgQWxzYW5hYnJhaCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNjI3MzQ5MDIyfQ.gyVjF4G_ipPzsJmxd9DLaXOrs6gPG__K9tZmVvXA7dI";
