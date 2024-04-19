import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { getGlobalState } from "../../../utils/getGloabal";

interface User {
  id: string;
  username: string;
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
  isAuth: localStorage.getItem("accessToken") ? true : false,
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
      state.user = { username: data.username, id: data.id, email: data.email, role: data.role };
      state.isAuth = true;
      state.role = data.role;
    },
    setUserItem(state, action: PayloadAction<Partial<AuthState>>) {
      Object.assign(state, action.payload);
    },
    logout(state) {
      state.isAuth = false;
      localStorage.removeItem("accessToken");
    },
  },
});

const { reducer, actions } = authSlice;

export const { login, logout, setUserItem } = actions;

export default reducer;
