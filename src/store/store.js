import { configureStore } from "@reduxjs/toolkit";
import { translatorReducer } from "./slices/translatorSlice";
import { themeReducer } from "./slices/themeSlice";
import { authReducer } from "./slices/authSlice";
import { usersReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usersReducer,
    translator: translatorReducer,
    theme: themeReducer,
  },
});
