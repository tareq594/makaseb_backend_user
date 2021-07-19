import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicesRepository } from "../../domain/devices/devices_respo";
import { Device } from "../../models/device";
import { Log } from "../../models/logs";
import type { RootState } from "../../store";
const deviceRepository = new DevicesRepository();

interface ILoadDeviceState {
  device?: Device;
  logs: Log[];
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
}

const initialState: ILoadDeviceState = {
  device: undefined,
  logs: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
};

export const loadDeviceSlice = createSlice({
  name: "loadDevice",
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<{ device: Device }>) => {
      state.device = action.payload.device;
    },
    setLogs: (state, action: PayloadAction<{ logs: Log[] }>) => {
      state.logs = action.payload.logs;
    },

    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },

    setisLoaded: (state, action: PayloadAction<{ isLoaded: boolean }>) => {
      state.isLoading = action.payload.isLoaded;
    },
    setError: (state) => {
      state.isError = true;
    },
  },
});

export const {
  setDevice,
  setLogs,
  setLoading,
  setisLoaded,
  setError,
} = loadDeviceSlice.actions;

export const load = (id: string) => async (dispatch, getState) => {
  const state: ILoadDeviceState = getState().loadUsers;
  try {
    dispatch(setLoading({ isLoading: true }));

    var device = await deviceRepository.getDevice(id);
    dispatch(setDevice({ device: device }));

    var logs = await deviceRepository.getLogs(id);
    logs.map((log) => {
      log.batteryLevel = parseInt(log.batteryLevel.toString());
      log.tankLevel = parseInt(log.tankLevel.toString());
      return log
    });
    console.log(logs);
    dispatch(setLogs({ logs: logs }));
    dispatch(setisLoaded({ isLoaded: true }));
  } catch (error) {
    console.log(error);
    dispatch(setError());
  }
};

export const selectLoadDevice = (state: RootState) => state.loadDevice;

export default loadDeviceSlice.reducer;
