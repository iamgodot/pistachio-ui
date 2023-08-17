import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Newsfeed from "./features/newsfeed/Newsfeed";
import Profile from "./features/profile/Profile";
import User from "./features/profile/User";
import Settings from "./features/profile/Settings";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { AuthProvider } from "./features/auth/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Logout from "./features/auth/Logout";
import { loader as dropdownUserLoader } from "./ui/DropdownUser";
import { loader as feedsLoader } from "./features/newsfeed/Newsfeed";
import { loader as profileLoader } from "./features/profile/Profile";
import { action as updateUserAction } from "./features/profile/Settings";
import { loader as userLoader } from "./features/profile/User";
import CreatedPost from "./features/post/CreatedPost";
import PostLayout from "./features/post/PostLayout";
import { loader as postsLoader } from "./features/post/CreatedPost";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      loader: dropdownUserLoader,
      children: [
        {
          index: true,
          element: <Newsfeed />,
          loader: feedsLoader,
        },
        { path: "profile", element: <Profile />, loader: profileLoader },
        {
          path: "settings",
          element: <Settings />,
          loader: profileLoader,
          action: updateUserAction,
        },
        { path: "users/:userId", element: <User />, loader: userLoader },
        {
          path: "posts",
          element: <PostLayout />,
          children: [
            { index: true, element: <CreatedPost />, loader: postsLoader },
          ],
        },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "logout", element: <Logout /> },
    { path: "register", element: <Register /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
