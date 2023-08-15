import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
};

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
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login({ email, password }) {
    axios.post("/api/v1/login", { email, password }).then((response) => {
      const data = response.data;
      if (response.status === 200 && data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        dispatch({ type: "login", payload: data });
      }
    });
  }
  function loginGitHub({ codeParam }) {
    axios
      .post("/api/v1/login", { type: "github", github_code: codeParam })
      .then((response) => {
        const data = response.data;
        if (response.status === 200 && data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          dispatch({ type: "login", payload: data });
        }
      });
  }
  function logout() {
    localStorage.removeItem("accessToken");
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
