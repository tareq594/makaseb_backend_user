import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicesRepository } from "../../domain/devices/devices_respo";
import { Device, DeviceType } from "../../models/device";
import type { RootState } from "../../store";
const uuidv4 = require("uuid/v4");

const repository = new DevicesRepository();

interface ICreateDeviceState {
  devices: any[];
  isSaving: boolean;
  isSaveError: boolean;
  isSaved: boolean;
}

const initialState: ICreateDeviceState = {
  devices: [
    {
      id: uuidv4(),
      name: "",
      tankLevel: 0,
      imei: "",
      address: "",
      depth: 0,
      deviceType: DeviceType.Ultrasound,
      lastUpdated: new Date().toTimeString(),
      batteryLevel: 0,
    },
  ],
  isSaved: false,
  isSaveError: false,
  isSaving: false,
};

export const createDeviceSlice = createSlice({
  name: "createDevices",
  initialState,
  reducers: {
    addDevice: (state) => {
      var newState = { ...state };
      newState.devices.push({
        id: uuidv4(),
        name: "",
        tankLevel: 0,
        imei: "",
        address: "",
        depth: 0,
        deviceType: DeviceType.Ultrasound,
        lastUpdated: new Date().toTimeString(),
        batteryLevel: 0,
      });
      /*return newState;*/
    },
    editDeviceName: (
      state,
      action: PayloadAction<{ name: string; index: number }>
    ) => {
      var newState = { ...state };
      var device = newState.devices[action.payload.index];
      device.name = action.payload.name;
      newState.devices[action.payload.index] = device;
      /*       return newState;
       */
    },
    editDeviceIMEI: (
      state,
      action: PayloadAction<{ imei: string; index: number }>
    ) => {
      var newState = { ...state };
      var device = state.devices[action.payload.index];
      device.imei = action.payload.imei;
      newState.devices[action.payload.index] = device;

      /*       return newState;
       */
    },
    editTankDepth: (
      state,
      action: PayloadAction<{ depth: string; index: number }>
    ) => {
      var newState = { ...state };
      var device = state.devices[action.payload.index];
      device.depth = action.payload.depth;
      newState.devices[action.payload.index] = device;

      /*       return newState;
       */
    },

    editDeviceType: (
      state,
      action: PayloadAction<{ type: DeviceType; index: number }>
    ) => {
      var newState = { ...state };
      var device = newState.devices[action.payload.index];
      device.deviceType = action.payload.type;
      newState.devices[action.payload.index] = device;
      /*       return newState;
       */
    },
    setSaved: (state) => {
      var newState = { ...state };
      newState.isSaved = true;
      newState.isSaving = false;
      newState.isSaveError = false;
      newState.devices = [
        {
          id: uuidv4(),
          name: "",
          tankLevel: 0,
          imei: "",
          address: "",
          deviceType: DeviceType.Ultrasound,
          lastUpdated: new Date().toTimeString(),
          batteryLevel: 0,
        },
      ];
      return newState;
    },
    setError: (state) => {
      var newState = { ...state };
      newState.isSaveError = true;
      newState.isSaving = false;

      return newState;
    },
    setSaving: (state) => {
      var newState = { ...state };
      newState.isSaving = true;
      return newState;
    },
  },
});

export const {
  addDevice,
  editDeviceName,
  editDeviceIMEI,
  editDeviceType,
  editTankDepth,
  setSaved,
  setError,
  setSaving,
} = createDeviceSlice.actions;

export const save = () => async (dispatch, getState) => {
  const state: ICreateDeviceState = getState().createDevice;
  try {
    dispatch(setSaving());
    await Promise.all(
      state.devices.map(async (device) => {

        var newDevice: Device = new Device(
          device.name,
          device.tankLevel,
          device.imei,
          device.address,
          device.deviceType,
          device.lastUpdated,
          device.batteryLevel,
          undefined,
          device.depth
        );

        await repository.createDevice({ device: newDevice });
      })
    );
    dispatch(setSaved());
  } catch (error) {
    console.log(error);
    dispatch(setError());
  }
};

export const selectCreateDevice = (state: RootState) => state.createDevice;

export default createDeviceSlice.reducer;
