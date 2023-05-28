import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/pistachio.jpeg";
import { useAuth } from "../contexts/AuthContext";

// TODO: set from env
//const CLIENT_ID = "35ed38dbee5282f1b162";
const CLIENT_ID = "0f7384bc5db7077161c9";
export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, loginGitHub } = useAuth();
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      loginGitHub({ codeParam });
    }
  }, [isAuthenticated, loginGitHub, navigate]);
  return (
    <div>
      <AuthSection>
        <Header />
        <LoginForm />
        <Divider />
        <GitHubLogin />
        <GoToRegisterOrLogin
          text="Don't have any account?"
          url="/register"
          buttonName="Register"
        />
      </AuthSection>
    </div>
  );
}

export function AuthSection({ children }) {
  return (
    <section className="bg-boxdark min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl drop-shadow-lg max-w-4xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img src={loginImage} alt="Auth" className="rounded-2xl"></img>
        </div>
        <div className="md:w-1/2 px-16">{children}</div>
      </div>
    </section>
  );
}

export function Header() {
  return (
    <h2 className="font-bold text-2xl text-center text-white">
      Welcome to Pistachio
    </h2>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) login(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border rounded-xl p-2 mt-8"
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      ></input>
      <input
        className="border rounded-xl p-2"
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      ></input>
      <button className="bg-primary rounded-xl text-white py-2 hover:scale-105 duration-300">
        Login
      </button>
    </form>
  );
}

function Divider() {
  return (
    <div className="mt-10 grid grid-cols-3 items-center ">
      <hr className="border-white"></hr>
      <p className="text-center text-sm text-white">OR</p>
      <hr className="border-white"></hr>
    </div>
  );
}
function GitHubLogin() {
  return (
    <button
      className="bg-white rounded-xl w-full py-2 mt-8 border flex items-center justify-center text-sm hover:scale-105 duration-300"
      onClick={() => {
        window.location.assign(
          "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID,
          "_blank"
        );
      }}
    >
      <svg
        className="mr-3"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      Login with GitHub
    </button>
  );
}

export function GoToRegisterOrLogin({ text, url, buttonName }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mt-10 text-xs py-6 border-t border-white">
      <p className="text-sm">{text}</p>
      <button
        className="bg-white text-sm rounded-xl border py-2 px-5 hover:scale-110 duration-300"
        onClick={() => {
          navigate(`${url}`);
        }}
      >
        {buttonName}
      </button>
    </div>
  );
}
