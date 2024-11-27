import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userRegSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } = userRegSlice.actions;
export default userRegSlice.reducer;
