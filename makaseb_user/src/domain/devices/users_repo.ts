import { delay } from "../../core/util/delay/delay";
import { Device } from "../../models/device";
import { User } from "../../models/user";
import { user1, user2, user3 } from "../../fakeData";
import { client } from "../../core/network/network";
interface ICreateUser {
  user: User;
  devices: string[];
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
  createUser({ user, devices }: ICreateUser): Promise<User>;
  editUserData({ user }: IEditUserData): Promise<User>;
  addDevicesToUser({ user, devices }: IUserDevices): Promise<User>;
  getUser(id: string): Promise<User>;
  getUsers(): Promise<User[]>;
  searchUsers(text: string): Promise<User[]>;

  deactivate(id: string): Promise<User>;
  activateUser(id: string): Promise<User>;
  getPastIHistoricalDeviceData(
    deviceId: string
  ): Promise<IHistoricalDeviceData[]>;
}

export class UserRepository implements IUserRepository {
  async createUser({ user, devices }: ICreateUser): Promise<User> {
    try {
      var newUserData = await client.post({ url: "/users", data: user });
      await Promise.all(
        devices.map(async (device) => {
          console.log(device);
          var cli = await client.get(
            `/devices/${device}/assign?email=${user.email}`
          );
          console.log(cli["data"]);
        })
      );
      var user = newUserData["data"]["data"];
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("user can't be created");
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      var usersData = await client.get("/users");
      var users: User[] = usersData["data"]["data"];
      return users;
    } catch (error) {
      throw new Error("error loading users");
    }
  }
  async searchUsers(text: string): Promise<User[]> {
    try {
      var usersData = await client.get(`/users?searchText=${text}`);
      var users: User[] = usersData["data"]["data"];
      return users;
    } catch (error) {
      throw new Error("error loading users");
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      var usersData = await client.get(`/users/${id}`);
      var user: User = usersData["data"]["data"];
      return user;
    } catch (error) {
      throw new Error("error loading user");
    }
  }

  editUserData({ user }: IEditUserData): Promise<User> {
    throw new Error("Method not implemented.");
  }
  addDevicesToUser({ user, devices }: IUserDevices): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async deactivate(email: string): Promise<User> {
    var userData = await client.get(`users/${email}/deactivate`);
    return userData["data"]["data"];
  }
  async activateUser(email: string): Promise<User> {
    var userData = await client.get(`users/${email}/activate`);
    return userData["data"]["data"];
  }
  getPastIHistoricalDeviceData(
    deviceId: string
  ): Promise<IHistoricalDeviceData[]> {
    throw new Error("Method not implemented.");
  }
}
