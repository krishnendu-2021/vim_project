import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    userSubscribe: (state, action) => {
      if (state.currentUser.subscribedUser.includes(action.payload)) {
        state.currentUser.subscribedUser.splice(
          state.currentUser.subscribedUser.findIndex(
            (userId) => userId === action.payload,
            1
          )
        );
      } else {
        state.currentUser.subscribedUser.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginFailure, loginStart, loginSuccess, logout, userSubscribe } =
  userSlice.actions;

export default userSlice.reducer;
