import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getGlobalState } from "../../../utils/getGloabal";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  role: string;
  device: "MOBILE" | "DESKTOP";
  collapsed: boolean;
  newUser: boolean;
}

const initialState: AuthState = {
  isAuth: localStorage.getItem("token") ? true : false,
  ...getGlobalState(),
  user: null,
  role: "",
  newUser: JSON.parse(localStorage.getItem("newUser")!) ?? true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, _action) {
      const data = jwtDecode<{ username: string; id: string; email: string; role: string }>(
        _action.payload.access_token,
      );
      state.user = { name: data.username, id: data.id, email: data.email, role: data.role };
      state.isAuth = true;
    },
    setUserItem(state, action: PayloadAction<Partial<AuthState>>) {
      Object.assign(state, action.payload);
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

const { reducer, actions } = authSlice;

export const { login, logout, setUserItem } = actions;

export default reducer;
