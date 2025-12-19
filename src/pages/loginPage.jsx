import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import RegisterPage from "./registerPage";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
          token: response.access_token,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful");
          if (response.data.role == "admin") {
            navigate("/admin");
          } else if (response.data.role == "user") {
            navigate("/");
          }
        })
        .catch(() => {
          toast.error("Google login failed");
        });
    },
  });

  function login() {
    console.log(email, password);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Login successful");
        localStorage.setItem("token", response.data.token);
        if (response.data.role == "admin") {
          navigate("/admin");
        } else if (response.data.role == "user") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed");
      });
  }

  return (
    <div className="w-full h-screen bg-slate-950 flex justify-center items-center font-sans">
      {/* Container Card */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-8 w-full max-w-[400px] flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-slate-100 text-4xl font-bold mb-8 tracking-tight">
          Log<span className="text-blue-500">in</span>
        </h2>

        {/* Email Input */}
        <div className="w-full mb-5">
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email</label>
          <input 
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@company.com"
            className="w-full h-12 px-4 text-slate-200 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-500"
          />
        </div>

        {/* Password Input */}
        <div className="w-full mb-8">
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className="w-full h-12 px-4 text-slate-200 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-500"
          />
        </div>

        {/* Login Button */}
        <button 
          onClick={login} 
          className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mb-4"
        >
          Sign In
        </button>

        {/* Google Login Button */}
        <button 
          onClick={googleLogin} 
          className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-xl transition-all flex items-center justify-center gap-2 mb-6"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
          Continue with Google
        </button>
<<<<<
      </div>
    </div>
  );
}