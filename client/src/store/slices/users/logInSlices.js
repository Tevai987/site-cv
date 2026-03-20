import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
  name: "logInSlice",

  initialState: {
    email: "",
    token: "",
    isAdmin: false,
  },
  reducers: {
    logUser: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        isLogged: true,
      };
    },
  },
});

export const { logUser } = logInSlice.actions;

export default logInSlice.reducer;
