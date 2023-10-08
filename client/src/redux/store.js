import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import {
  persistedUserReducer,
  persistedVideoReducer,
} from "./persidtedReducer";

const rootReducer = combineReducers({
  user: persistedUserReducer,
  video: persistedVideoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
