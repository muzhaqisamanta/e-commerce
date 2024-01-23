import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./state/ThemeProvider.jsx";
import router from "./routes/root.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);
