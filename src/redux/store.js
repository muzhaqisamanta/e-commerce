import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postsSlice from "./postsSlice";
import carInfoSlice from "./carInfoSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    carInfo: carInfoSlice,
  },
});
