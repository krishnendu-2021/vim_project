import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";

const userPersistConfig = {
  key: "user", // Unique key for the "todo" slice in storage
  storage, // Storage method (e.g., localStorage)
  whitelist: ["currentUser"], // List of fields from the "todo" slice you want to persist
};
const videoPersistConfig = {
  key: "video", // Unique key for the "todo" slice in storage
  storage, // Storage method (e.g., localStorage)
  whitelist: ["currentVideo"], // List of fields from the "todo" slice you want to persist
};

export const persistedUserReducer = persistReducer(
  userPersistConfig,
  userReducer
);

export const persistedVideoReducer = persistReducer(
  videoPersistConfig,
  videoReducer
);
