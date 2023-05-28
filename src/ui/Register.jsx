import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AuthSection, Header, GoToRegisterOrLogin } from "./Login";

export default function Register() {
  return (
    <AuthSection>
      <Header />
      <RegisterForm />
      <GoToRegisterOrLogin
        text="Already have an account?"
        url="/login"
        buttonName="Login"
      />
    </AuthSection>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      axios.post("/api/v1/register", formData).then((response) => {
        if (response.status === 201) navigate("/login");
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border rounded-xl p-2 mt-8"
        type="nickname"
        name="nickname"
        placeholder="Nickname"
        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
      ></input>
      <input
        className="border rounded-xl p-2"
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
        Register
      </button>
    </form>
  );
}
