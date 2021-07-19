import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicesRepository } from "../../domain/devices/devices_respo";
import { UserRepository } from "../../domain/devices/users_repo";
import type { RootState } from "../../store";
const userRepository = new UserRepository();
const deviceRepository = new DevicesRepository();

interface ICreateUserState {
  user: {
    id?:string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailNotification: boolean;
    phoneNumber: string;
    alternativePhoneNumber: string;
    isSmsNotification: boolean;
    address: string;
    password: string;
  };
  devicesImeis: string[];
  selectedDevices: number[];
  deviceSearchText: string;
  isSaving: boolean;
  isSaveError: boolean;
  isSaved: boolean;
}

const emptyUser = {

  firstName: "",
  lastName: "",
  email: "",
  isEmailNotification: true,
  phoneNumber: "",
  alternativePhoneNumber: "",
  isSmsNotification: true,
  address: "",
  password: "",
};

const initialState: ICreateUserState = {
  user: { ...emptyUser },
  devicesImeis: [],
  selectedDevices: [],
  deviceSearchText: "",
  isSaved: false,
  isSaveError: false,
  isSaving: false,
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    editFirstName: (state, action: PayloadAction<{ name: string }>) => {
      state.user.firstName = action.payload.name;
    },
    editLastName: (state, action: PayloadAction<{ name: string }>) => {
      state.user.lastName = action.payload.name;
    },
    editPhoneNumber: (state, action: PayloadAction<{ number: string }>) => {
      state.user.phoneNumber = action.payload.number;
    },
    editDeviceSearchtext: (state, action: PayloadAction<{ text: string }>) => {
      state.deviceSearchText = action.payload.text;
    },
    editPhoneAlternativeNumber: (
      state,
      action: PayloadAction<{ number: string }>
    ) => {
      state.user.alternativePhoneNumber = action.payload.number;
    },

    editEmailAddress: (state, action: PayloadAction<{ email: string }>) => {
      state.user.email = action.payload.email;
    },
    editAddress: (state, action: PayloadAction<{ address: string }>) => {
      state.user.address = action.payload.address;
    },
    editPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.user.password = action.payload.password;
    },
    editSelectedDevices: (
      state,
      action: PayloadAction<{ devices: number[] }>
    ) => {
      state.selectedDevices = action.payload.devices;
    },
    editiSEmailNotification: (
      state,
      action: PayloadAction<{ isNotification: boolean }>
    ) => {
      state.user.isEmailNotification = action.payload.isNotification;
    },
    editiSSmsNotification: (
      state,
      action: PayloadAction<{ isNotification: boolean }>
    ) => {
      state.user.isSmsNotification = action.payload.isNotification;
    },
    addDeviceToList: (state, action: PayloadAction<{ imei: string }>) => {
      var list = [...state.devicesImeis];
      /*       list.push(action.payload.imei);
       */
      var newList = [...list, ...[action.payload.imei]];

      state.devicesImeis = newList;
    },
    removeDevices: (state) => {
      console.log(state.selectedDevices);
      var selectedDevices = [...state.selectedDevices];
      var devicesImeis = [...state.devicesImeis];
      var count = 0;
      selectedDevices.forEach((index) => {
        console.log(index);
        devicesImeis.splice(index - count, 1);
        count += 1;
      });
      console.log(devicesImeis);
      state.devicesImeis = devicesImeis;
    },

    setSaved: (state) => {
      var newState = { ...state };
      newState.isSaved = true;
      newState.isSaving = false;
      newState.isSaveError = false;
      newState.user = { ...emptyUser };
      newState.devicesImeis = [];
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
  editFirstName,
  editLastName,
  editEmailAddress,
  editSelectedDevices,
  editiSEmailNotification,
  editiSSmsNotification,
  editPhoneNumber,
  editPhoneAlternativeNumber,
  editPassword,
  addDeviceToList,
  editAddress,
  removeDevices,
  editDeviceSearchtext,
  setSaved,
  setError,
  setSaving,
} = createUserSlice.actions;

export const save = () => async (dispatch, getState) => {
  const state: ICreateUserState = getState().createUser;
  try {
    dispatch(setSaving());
    await userRepository.createUser({
      user: state.user,
      devices: state.devicesImeis,
    });
    dispatch(setSaved());
  } catch (error) {
    console.log(error);
    dispatch(setError());
  }
};

export const addDevice = (imei: string) => async (dispatch, getState) => {
  const state: ICreateUserState = getState().createUser;
  if (state.devicesImeis.includes(imei)) {
    return;
  }
  try {
    var device = await deviceRepository.getDeviceByImei(imei);
    if (device) {
      dispatch(addDeviceToList({ imei: imei }));
    }
  } catch (error) {
    alert("Device not found");
  }
};

export const selectCreateUser = (state: RootState) => state.createUser;

export default createUserSlice.reducer;
