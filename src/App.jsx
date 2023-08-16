import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Newsfeed from "./features/newsfeed/Newsfeed";
import Profile from "./features/profile/Profile";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { AuthProvider } from "./features/auth/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Logout from "./features/auth/Logout";
import { loader as userLoader } from "./ui/DropdownUser";
import { loader as feedsLoader } from "./features/newsfeed/Newsfeed";

export default function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      loader: userLoader,
      children: [
        {
          path: "/",
          element: <Newsfeed />,
          loader: feedsLoader,
        },
        { path: "profile", element: <Profile /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "logout", element: <Logout /> },
    { path: "register", element: <Register /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}
