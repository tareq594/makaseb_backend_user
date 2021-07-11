import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./application/authentication/authentication_slice";
import devicesReducer from "./application/devices_admin/devices_slice";
import createDeviceReducer from "./application/create_device/create_device_slice";
import createUserReducer from "./application/create_user/create_user_slice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    devices: devicesReducer,
    createDevice: createDeviceReducer,
    createUser: createUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
