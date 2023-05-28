import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import Homepage from "./ui/Homepage";
import Profile from "./ui/Profile";
import Login from "./ui/Login";
import Register from "./ui/Register";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./ui/Logout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Homepage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
