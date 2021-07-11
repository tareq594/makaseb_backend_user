import { delay } from "../../core/util/delay/delay";
import { devices } from "../../fakeData";
import { Device, DeviceSort } from "../../models/device";
import { Sort } from "../../models/sort";

interface IGetAllDevicesParameters {
  deviceSort?: DeviceSort;
  sort?: Sort;
  page?: number;
  skip?: number;
}

interface ISearchDevicesParameters {
  deviceSort?: DeviceSort;
  sort?: Sort;
  page?: number;
  skip?: number;
  text: string;
}

interface ICreateDevice {
  device: Device;
}

interface IDevicesRepository {
  getAllDevices({
    deviceSort,
    sort,
    page,
    skip,
  }: IGetAllDevicesParameters): Promise<Device[]>;

  searchDevices({
    deviceSort,
    sort,
    page,
    skip,
    text,
  }: ISearchDevicesParameters): Promise<Device[]>;

  createDevice({ device }: ICreateDevice): Promise<Device>;
  getDevice(id: string): Promise<Device[]>;
}

export class DevicesRepository implements IDevicesRepository {
  getDevice(id: string): Promise<Device[]> {
    throw new Error("Method not implemented.");
  }

  async createDevice({ device }: ICreateDevice): Promise<Device> {
    await delay(50);
    console.log(device);
    return device;
  }

  async searchDevices({
    deviceSort,
    sort,
    page = 1,
    skip,
    text,
  }: ISearchDevicesParameters): Promise<Device[]> {
    await delay(100);
    return devices;
  }
  async getAllDevices({
    deviceSort,
    sort,
    page = 1,
  }: IGetAllDevicesParameters): Promise<Device[]> {
    await delay(100);
    if (page == 4) {
      return [];
    }

    return devices;
  }
}
