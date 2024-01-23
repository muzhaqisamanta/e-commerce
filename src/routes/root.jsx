import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LogIn from "../pages/LogIn";
import AboutUs from "../pages/AboutUs";
import SignUp from "../pages/SignUp";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/add-post",
        element: <div>Add post</div>,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
