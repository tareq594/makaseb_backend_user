import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Storage } from "../../core/localStorage/localStorage";

import { AuthRepository } from "../../domain/devices/authentication_repo";

export enum AuthenticationState {
  "Error",
  "Loading",
  "Authenticated",
  "Unauthenticated",
}

interface AuthState {
  value: AuthenticationState;
}

const initialState: AuthState = {
  value: AuthenticationState.Authenticated,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state) => {
      state.value = AuthenticationState.Authenticated;
    },
    unuthenticate: (state) => {
      state.value = AuthenticationState.Unauthenticated;
    },
    loading: (state) => {
      state.value = AuthenticationState.Loading;
    },
    error: (state) => {
      state.value = AuthenticationState.Error;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  authenticate,
  unuthenticate,
  loading,
  error,
} = authenticationSlice.actions;

export const authenticateWithEmailAndPassword = (
  email: string,
  password: string
) => async (dispatch) => {
  var authrepository = new AuthRepository();
  try {
    var token = await authrepository.login({
      email: email,
      password: password,
    });
    if (token.isValid && token.decoded?.permession == "SuperAdmin") {
      Storage.set("token", token.token);
      dispatch(authenticate());
    } else {
      alert("error login, please check your email and password");
    }
  } catch (error) {
    alert("error login, please check your email and password");
  }
};

export const signOut = () => async (dispatch) => {
  var authrepository = new AuthRepository();
  try {
    await authrepository.logout();
    dispatch(unuthenticate());
  } catch (error) {
    dispatch(unuthenticate());
  }
};

export const autoSignIn = () => async (dispatch) => {
  var authrepository = new AuthRepository();
  try {
    var isLoggedIn = await authrepository.isLoggedIn();
    console.log("isLoggedIn");
    console.log(isLoggedIn);
    dispatch(isLoggedIn ? authenticate() : unuthenticate());
  } catch (error) {
    dispatch(unuthenticate());
  }
};

export const selectAuthenticate = (state: RootState) =>
  state.authentication.value;

export default authenticationSlice.reducer;
