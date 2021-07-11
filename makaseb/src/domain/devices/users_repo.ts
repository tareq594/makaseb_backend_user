import { Device } from "../../models/device";
import { User } from "../../models/user";

interface ICreateUser {
  user: User;
  firstTimePassword: string;
  devices: Device[];
}

interface IEditUserData {
  user: User;
}

interface IUserDevices {
  user: User;
  devices: Device[];
}

interface IHistoricalDeviceData {
  time: Date;
  salvagedWater: number;
  batteryLevel: number;
}

export interface IUserRepository {
  createUser({ user, firstTimePassword, devices }: ICreateUser): Promise<User>;
  editUserData({ user }: IEditUserData): Promise<User>;
  addDevicesToUser({ user, devices }: IUserDevices): Promise<User>;
  getUser(id: string): Promise<User>;
  suspinseUser(id: string): Promise<User>;
  activateUser(id: string): Promise<User>;
  getPastIHistoricalDeviceData(
    deviceId: string
  ): Promise<IHistoricalDeviceData[]>;
}
