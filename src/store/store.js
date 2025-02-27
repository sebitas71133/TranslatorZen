import { configureStore } from "@reduxjs/toolkit";
import { translatorReducer } from "./slices/translatorSlice";

export const store = configureStore({
  reducer: {
    translator: translatorReducer,
  },
});
