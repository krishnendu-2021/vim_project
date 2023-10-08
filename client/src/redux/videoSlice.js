import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    currentVideo: null,
    loading: false,
    error: false,
  },
  reducers: {
    videoStart: (state) => {
      state.loading = true;
    },
    videoSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    videoFailure: (state) => {
      state.loading = false;
      state.error = false;
    },
    videoLike: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    videoDislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const {
  videoFailure,
  videoStart,
  videoSuccess,
  videoLike,
  videoDislike,
} = videoSlice.actions;

export default videoSlice.reducer;
