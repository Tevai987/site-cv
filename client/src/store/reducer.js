import { combineReducers } from "redux";
import userSlice from "./slices/users/usersSlices.js";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
