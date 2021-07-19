import { client } from "../../core/network/network";
import { delay } from "../../core/util/delay/delay";
import { devices } from "../../fakeData";
import { Device, DeviceSort } from "../../models/device";
import { Log } from "../../models/logs";
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
  getDevice(id: string): Promise<Device>;
  getDeviceByImei(imei: string): Promise<Device[]>;
  getUserDevices(id: string): Promise<Device[]>;
  getLogs(id: string): Promise<Log[]>;
}

export class DevicesRepository implements IDevicesRepository {
  async getLogs(id: string): Promise<Log[]> {
    try {
      var data = await client.get(`/devices/${id}/logs3months`);
      return data["data"]["data"];
    } catch (error) {
      throw new Error("device logs error");
    }
  }

  async getUserDevices(id: string): Promise<Device[]> {
    try {
      var data = await client.get(`/users/${id}/devices`);
      return data["data"]["data"];
    } catch (error) {
      throw new Error("user devices error");
    }
  }

  async getDeviceByImei(imei: string): Promise<Device[]> {
    var deviceData = await client.get(`/devices/${imei}`);
    return deviceData["data"]["data"];
  }
  async getDevice(id: string): Promise<Device> {
    var deviceData = await client.get(`/devices/id/${id}`);
    return deviceData["data"]["data"];
  }

  async createDevice({ device }: ICreateDevice): Promise<Device> {
    console.log("depthh");
    console.log(device.depth);

    var deviceData = await client.post({
      url: "/devices",
      data: {
        depth: device.depth,
        name: device.name,
        imei: device.imei,
        type: device.type,
      },
    });
    console.log(deviceData["data"]);
    return deviceData["data"];
  }

  async searchDevices({
    deviceSort,
    sort,
    page = 1,
    skip,
    text,
  }: ISearchDevicesParameters): Promise<Device[]> {
    var query = { page: page, text: text };
    if (sort) {
      query["sort"] = sort;
    }
    if (deviceSort) {
      query["deviceSort"] = deviceSort;
    }
    if (text) {
      query["searchText"] = text;
    }
    var data = await client.post({
      url: "/devices/get",
      data: query,
    });
    await delay(100);
    if (page == 4) {
      return [];
    }
    return data["data"]["data"];
  }

  async getAllDevices({
    deviceSort,
    sort,
    page = 1,
  }: IGetAllDevicesParameters): Promise<Device[]> {
    var query = { page: page };
    if (sort) {
      query["sort"] = sort;
    }
    if (deviceSort) {
      query["deviceSort"] = deviceSort;
    }
    var data = await client.post({
      url: "/devices/get",
      data: query,
    });
    return data["data"]["data"];
  }
}
