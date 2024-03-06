import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/posts-view/MainPage";
import LogIn from "../pages/LogIn";
import AboutUs from "../pages/AboutUs";
import SignUp from "../pages/SignUp";
import App from "../App";
import ProfileSection from "../pages/ProfileSection";
import EditPost from "../pages/posts-management/EditPost";
import CreatePost from "../pages/posts-management/CreatePost";
import QuickView from "../pages/posts-view/QuickView";
import UserProfile from "../pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      { path: "/:postId/quick-view", element: <QuickView /> },
      {
        path: "/profile",
        element: <ProfileSection />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      { path: "/:postId/edit", element: <EditPost /> },
      {
        path: "/add-post",
        element: <CreatePost />,
        children: [],
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
