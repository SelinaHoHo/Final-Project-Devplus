import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { MenuChild } from "../../../interfaces/layout/menu.interface";

interface State {
  theme: "light" | "dark";
  loading: boolean;
  menuList: MenuChild[];
}

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const userTheme = localStorage.getItem("theme") as State["theme"];

const initialState: State = {
  theme: userTheme || systemTheme,
  menuList: [],
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<State>>) {
      Object.assign(state, action.payload);

      if (action.payload.theme) {
        const body = document.body;

        if (action.payload.theme === "dark") {
          if (!body.hasAttribute("theme-mode")) {
            body.setAttribute("theme-mode", "dark");
          }
        } else {
          if (body.hasAttribute("theme-mode")) {
            body.removeAttribute("theme-mode");
          }
        }
      }
    },
    setMenuList(state, action: PayloadAction<MenuChild[]>) {
      state.menuList = action.payload;
    },
  },
});
const { reducer, actions } = globalSlice;

export const { setGlobalState, setMenuList } = actions;

export default reducer;
