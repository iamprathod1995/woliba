import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null,
  token: "",
  otpVerified: false,
  user: {},
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,

  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setCredentials: (state, action) => {
      state.credential = action.payload;
    },
    
  },
});

export const {
  setCompany,
  setToken,
  setOtpVerified,
  setUser,
  setCredentials,
} = registrationSlice.actions;

export default registrationSlice.reducer;