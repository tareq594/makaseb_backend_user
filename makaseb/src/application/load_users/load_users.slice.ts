import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { delay } from "../../core/util/delay/delay";
import { UserRepository } from "../../domain/devices/users_repo";
import type { RootState } from "../../store";
const userRepository = new UserRepository();

interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailNotification: boolean;
  phoneNumber: string;
  alternativePhoneNumber: string;
  isSmsNotification: boolean;
  address: string;
  isActive: boolean;
}

interface ILoadUserState {
  users: user[];
  searchText: string;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
}

const initialState: ILoadUserState = {
  users: [],
  searchText: "",
  isLoading: false,
  isLoaded: false,
  isError: false,
};

export const loadUsersSlice = createSlice({
  name: "loadUsers",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ users: user[] }>) => {
      state.users = action.payload.users;
    },

    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setActiveUser: (
      state,
      action: PayloadAction<{ isActive: boolean; index: number }>
    ) => {
      state.users[action.payload.index].isActive = action.payload.isActive;
    },
    setSearchText: (state, action: PayloadAction<{ text: string }>) => {
      state.searchText = action.payload.text;
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
  setUsers,
  setLoading,
  setisLoaded,
  setError,
  setSearchText,
  setActiveUser,
} = loadUsersSlice.actions;

export const load = () => async (dispatch, getState) => {
  const state: ILoadUserState = getState().loadUsers;
  try {
    dispatch(setLoading({ isLoading: true }));

    var users =
      state.searchText == ""
        ? await userRepository.getUsers()
        : await userRepository.searchUsers(state.searchText);
    var usersObject: user[] = users.map((user) => {
      return {
        id: user.id!,
        firstName: user.firstName!,
        lastName: user.lastName!,
        email: user.email!,
        isEmailNotification: user.isEmailNotification!,
        phoneNumber: user.phoneNumber!,
        alternativePhoneNumber: user.alternativePhoneNumber!,
        isSmsNotification: user.isSMSNotification!,
        address: user.address!,
        isActive: user.isActive!,
      };
    });
    dispatch(setUsers({ users: usersObject }));

    dispatch(setisLoaded({ isLoaded: true }));
  } catch (error) {
    console.log(error);
    dispatch(setError());
  }
};

export const loadSingleUser = (id: string) => async (dispatch, getState) => {
  const state: ILoadUserState = getState().loadUsers;
  try {
    dispatch(setLoading({ isLoading: true }));

    var user = await userRepository.getUser(id);
    const usersObject = {
      id: user.id!,
      firstName: user.firstName!,
      lastName: user.lastName!,
      email: user.email!,
      isEmailNotification: user.isEmailNotification!,
      phoneNumber: user.phoneNumber!,
      alternativePhoneNumber: user.alternativePhoneNumber!,
      isSmsNotification: user.isSMSNotification!,
      address: user.address!,
      isActive: user.isActive!,
    };

    dispatch(setUsers({ users: [usersObject] }));
    dispatch(setisLoaded({ isLoaded: true }));
  } catch (error) {
    console.log(error);
    dispatch(setError());
  }
};

export const updateSearchText = (text: string) => async (
  dispatch,
  getState
) => {
  const state: ILoadUserState = getState().loadUsers;
  dispatch(setSearchText({ text: text }));
  delay(100);
  dispatch(load());
};

export const activateUser = (index: number) => async (dispatch, getState) => {

  const state: ILoadUserState = getState().loadUsers;

  await userRepository.activateUser(state.users[index].email);
  dispatch(setActiveUser({ index: index, isActive: true }));
};

export const deactivateUser = (index: number) => async (dispatch, getState) => {
  const state: ILoadUserState = getState().loadUsers;
  await userRepository.deactivate(state.users[index].email);
  dispatch(setActiveUser({ index: index, isActive: false }));
};

export const selectLoadUsers = (state: RootState) => state.loadUsers;

export default loadUsersSlice.reducer;
