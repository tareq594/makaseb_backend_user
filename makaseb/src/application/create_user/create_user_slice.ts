import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicesRepository } from "../../domain/devices/devices_respo";
import type { RootState } from "../../store";
const uuidv4 = require("uuid/v4");
const deviceRepository = new DevicesRepository();

interface ICreateUserState {
  user: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    isEmailNotification: boolean;
    phoneNumber: string;
    alternativePhoneNumber: string;
    isSmsNotification: boolean;
    address: string;
    password: string;
  };
  devicesImeis: string[];
  deviceSearchText: string;
  isSaving: boolean;
  isSaveError: boolean;
  isSaved: boolean;
}

const emptyUser = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  isEmailNotification: true,
  phoneNumber: "",
  alternativePhoneNumber: "",
  isSmsNotification: true,
  address: "",
  password: "",
};

const initialState: ICreateUserState = {
  user: { ...emptyUser },
  devicesImeis: ["edd"],
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
      state.user.emailAddress = action.payload.email;
    },
    editAddress: (state, action: PayloadAction<{ address: string }>) => {
      state.user.address = action.payload.address;
    },
    editPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.user.password = action.payload.password;
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
      console.log("list");

      var list = [...state.devicesImeis];
      /*       list.push(action.payload.imei);
       */
      var newList = [...list, ...[action.payload.imei]];
      console.log(newList);

      state.devicesImeis = newList;
      console.log(state.devicesImeis);
    },
    removeDevice: (state, action: PayloadAction<{ imei: string }>) => {
      state.devicesImeis.filter((imei) => imei == action.payload.imei);
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
  editiSEmailNotification,
  editiSSmsNotification,
  editPhoneNumber,
  editPhoneAlternativeNumber,
  editPassword,
  addDeviceToList,
  editAddress,
  removeDevice,
  editDeviceSearchtext,
  setSaved,
  setError,
  setSaving,
} = createUserSlice.actions;

export const save = () => async (dispatch, getState) => {
  const state: ICreateUserState = getState().createDevice;
  try {
    dispatch(setSaving());
    // save the user and the devices in the repository
    dispatch(setSaved());
  } catch (error) {
    console.log(error);
    dispatch(setError());
  }
};

export const addDevice = (imei: string) => async (dispatch, getState) => {
  const state: ICreateUserState = getState().createDevice;
  try {
    // check if the device is in Server
    /*     alert("hello wala");
     */ dispatch(addDeviceToList({ imei: imei }));
    /*     dispatch(editDeviceSearchtext({ text: "" }));
     */ // save the user and the devices in the repository
  } catch (error) {}
};

export const selectCreateUser = (state: RootState) => state.createUser;

export default createUserSlice.reducer;
