import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Homepage from "./ui/Homepage";
import Profile from "./ui/Profile";
import Login from "./ui/Login";
import Register from "./ui/Register";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./ui/Logout";

export default function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Homepage /> },
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
