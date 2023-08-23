import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { getUser } from "../../services/backendApi";
import {
  getFromLocalStorage,
  setFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils";
import { toast } from "react-toastify";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const initialState = {
    user: null,
    isAuthenticated: false,
  };
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    (async () => {
      if (getFromLocalStorage("accessToken")) {
        const user = await getUser();
        if (Object.keys(user).length !== 0) {
          dispatch({ type: "login", payload: user });
        }
      }
    })();
  }, []);

  function login({ email, password }) {
    axios
      .post("/api/v1/login", { email, password })
      .then((response) => {
        const data = response.data;
        if (response.status === 200 && data.access_token) {
          toast.success("You're logged in");
          setFromLocalStorage("accessToken", data.access_token);
          dispatch({ type: "login", payload: data });
        }
      })
      .catch((error) => {
        toast.error("Login failed");
        console.log("Login error", error.message);
      });
  }
  function loginGitHub({ codeParam }) {
    axios
      .post("/api/v1/login", { type: "github", github_code: codeParam })
      .then((response) => {
        const data = response.data;
        if (response.status === 200 && data.access_token) {
          toast.success("You're logged in via GitHub");
          setFromLocalStorage("accessToken", data.access_token);
          dispatch({ type: "login", payload: data });
        }
      })
      .catch((error) => {
        toast.error("Login via GitHub failed");
        console.log("Login error", error.message);
      });
  }
  function logout() {
    deleteFromLocalStorage("accessToken");
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, loginGitHub, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
