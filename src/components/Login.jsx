import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/pistachio.jpg";
import axios from "axios";

const CLIENT_ID = "35ed38dbee5282f1b162";

const Login = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      axios
        .post("/api/v1/login", { type: "github", github_code: codeParam })
        .then((response) => {
          const data = response.data;
          if (data && data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            navigate("/");
          }
        });
    }
  }, [accessToken]);
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID,
      "_blank"
    );
  }
  return (
    <section class="bg-gray-50 min-h-screen flex items-center justify-center">
      <div class="bg-gray-100 flex rounded-2xl drop-shadow-lg max-w-4xl p-5 items-center">
        <div class="md:block hidden w-1/2">
          <img src={loginImage} alt="" class="rounded-2xl"></img>
        </div>
        <div class="md:w-1/2 px-16">
          <h2 class="font-bold text-2xl text-center text-blue-800">
            Welcome to Pistachio
          </h2>
          <form action="" class="flex flex-col gap-4">
            <input
              class="border rounded-xl p-2 mt-8"
              type="email"
              name="email"
              placeholder="Email"
            ></input>
            <input
              class="border rounded-xl p-2"
              type="password"
              name="password"
              placeholder="Password"
            ></input>
            <button class="bg-blue-800 rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div class="mt-10 grid grid-cols-3 items-center ">
            <hr class="border-gray-300"></hr>
            <p class="text-center text-sm text-gray-500">OR</p>
            <hr class="border-gray-300"></hr>
          </div>

          <button class="bg-white rounded-xl w-full py-2 mt-8 border flex items-center justify-center text-sm hover:scale-105 duration-300">
            <svg
              class="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Login with GitHub
          </button>

          <p class="mt-5 text-xs border-b border-gray-300 py-6">
            Forgot your password?
          </p>

          <div class="flex items-center justify-between mt-5 text-xs">
            <p>If you don't have an account</p>
            <button class="bg-white rounded-xl border py-2 px-5 hover:scale-110 duration-300">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
