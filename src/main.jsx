import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { Apptheme } from "../theme/Apptheme";
import { store } from "./store/store";
import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
// import App from './App.jsx'
import "@fontsource/roboto";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Apptheme>
      <RouterProvider
        router={router}
        future={{
          v7_fetcherPersist: true,
          v7_startTransition: true,
        }}
      ></RouterProvider>
    </Apptheme>
  </Provider>
);
