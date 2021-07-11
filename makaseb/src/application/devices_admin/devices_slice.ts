import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicesRepository } from "../../domain/devices/devices_respo";
import { Device, DeviceSort } from "../../models/device";
import { Sort } from "../../models/sort";
import type { RootState } from "../../store";

const Page_Items_Count = 2;
const authrepository = new DevicesRepository();

interface devicesState {
  devices: Device[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isErrorLoading: boolean;
  isErrorLoadingMore: boolean;
  page: number;
  hasMore: boolean;
  sortDirection: Sort;
  sortBy: DeviceSort;
  searchedText: string;
}

const initialState: devicesState = {
  devices: [],
  isLoading: false,
  isLoadingMore: false,
  isErrorLoading: false,
  isErrorLoadingMore: false,
  page: 1,
  hasMore: true,
  sortDirection: Sort.asscending,
  sortBy: DeviceSort.BatteryLevel,
  searchedText: "",
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    loadDevices: (state, action: PayloadAction<Device[]>) => {
      const newState = { ...state };
      newState.devices = action.payload;
      newState.isLoading = false;
      newState.isLoadingMore = false;
      newState.isErrorLoading = false;
      newState.isErrorLoadingMore = false;
      return newState;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    loadingMore: (state) => {
      state.isLoadingMore = true;
    },
    error: (state) => {
      state.isErrorLoading = true;
    },
    errorLoadingMore: (state) => {
      state.isErrorLoadingMore = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<Sort>) => {
      state.sortDirection = action.payload;
    },
    setSortBy: (state, action: PayloadAction<DeviceSort>) => {
      state.sortBy = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
  },
});

export const {
  loadDevices,
  loading,
  loadingMore,
  error,
  errorLoadingMore,
  setPage,
  setSortDirection,
  setHasMore,
  setSortBy,
  setSearchText,
} = devicesSlice.actions;

export const load = () => async (dispatch, getState) => {
  const state: devicesState = getState().devices;

  try {
    dispatch(loading());
    var newDevices =
      state.searchedText == ""
        ? await authrepository.getAllDevices({
            sort: state.sortDirection,
            deviceSort: state.sortBy,
          })
        : await authrepository.searchDevices({
            text: state.searchedText,
            sort: state.sortDirection,
            deviceSort: state.sortBy,
          });
    dispatch(loadDevices(newDevices));
    dispatch(setHasMore(true));
    dispatch(setPage(1));
  } catch (e) {
    dispatch(error());
  }
};
export const loadMore = () => async (dispatch, getState) => {
  const state: devicesState = getState().devices;
  const newPage = state.page + 1;
  dispatch(loadingMore());
  try {
    var newDevices =
      state.searchedText == ""
        ? await authrepository.getAllDevices({
            sort: state.sortDirection,
            deviceSort: state.sortBy,
            page: newPage,
          })
        : await authrepository.searchDevices({
            text: state.searchedText,
            sort: state.sortDirection,
            deviceSort: state.sortBy,
            page: newPage,
          });
    if (newDevices.length == 0) {
      dispatch(setHasMore(false));
    }
    dispatch(setPage(newPage));
    dispatch(loadDevices([...state.devices, ...newDevices]));
  } catch (error) {
    dispatch(error());
  }
};
export const sortBy = (sort: DeviceSort) => async (dispatch, getState) => {
  const state: devicesState = getState().devices;
  if (state.sortBy == sort) return;
  else {
    dispatch(setSortBy(sort));
    dispatch(load());
  }
};
export const sortByDirection = (sort: Sort) => async (dispatch, getState) => {
  const state: devicesState = getState().devices;
  if (state.sortDirection == sort) return;
  else {
    dispatch(setSortDirection(sort));
    dispatch(load());
  }
};

export const updateSearchText = (text: string) => async (
  dispatch,
  getState
) => {
  const state: devicesState = getState().devices;
  if (state.searchedText == text) return;
  else {
    dispatch(setSearchText(text));
    dispatch(load());
  }
};

export const selectDevices = (state: RootState) => state.devices;

export default devicesSlice.reducer;
