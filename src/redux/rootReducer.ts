import { combineReducers } from "redux";

import authReducer from "./features/auth/authSlice";
import globalReducer from "./features/global/globalSlice";
import tagsViewReducer from "./features/tagView/tagViewSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
});

export default rootReducer;
