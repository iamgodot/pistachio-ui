import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Newsfeed from "./features/post/Newsfeed";
import Profile from "./features/profile/Profile";
import User from "./features/profile/User";
import Settings from "./features/profile/Settings";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { AuthProvider } from "./features/auth/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Logout from "./features/auth/Logout";
import { loader as dropdownUserLoader } from "./ui/DropdownUser";
import { loader as feedsLoader } from "./features/post/Newsfeed";
import { loader as profileLoader } from "./features/profile/Profile";
import { action as updateUserAction } from "./features/profile/Settings";
import { loader as userLoader } from "./features/profile/User";
import CreatedPost from "./features/post/CreatedPost";
import PostLayout from "./features/post/PostLayout";
import PostDetail from "./features/post/PostDetail";
import { loader as postsLoader } from "./features/post/CreatedPost";
import { loader as postLoader } from "./features/post/PostDetail";

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
          element: (
            <PostLayout>
              <CreatedPost />
            </PostLayout>
          ),
          loader: postsLoader,
        },
        { path: "posts/:postId", element: <PostDetail />, loader: postLoader },
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
