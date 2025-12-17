import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
 


  const [password,setPassword] = useState("")
  const [email,setEmail] =useState("")
  const navigate = useNavigate()
  
 const googleLogin = useGoogleLogin({
  onSuccess: (response) => {
    console.log("Google response:", response);
    
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
      token: response.access_token
    })
    .then((res) => {
      // res.data contains the JSON object sent from backend
      const { token, role, message } = res.data;

      localStorage.setItem("token", token);
      toast.success(message || "Login successful");

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Google login failed at backend");
    });
  },
  onError: () => toast.error("Google Login Failed"),
});

  function login(){
    console.log(email,password)
    axios.post(import.meta.env.VITE_BACKEND_URL +"/api/users/login",
      {
        email : email,
        password : password
      }
    ).then(
      (response)=>{
        console.log(response.data)
        toast.success("Login sucessful")

        localStorage.setItem("token",response.data.token) //save token

        const token = localStorage.getItem("token") //read token

        if(response.data.role == "admin"){
          navigate("/admin")

        }
        else if(response.data.role == "user"){
          navigate("/")

        }
      }
    ).catch(
      (error)=>{
        console.log(error)
        toast.error("Login faild")
      }
    )
      
    
  }

  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-center bg-cover flex justify-center items-center">
      <div className="h-[420px] w-[320px] backdrop-blur-sm shadow-2xl rounded-[40px] flex flex-col items-center  justify-center">
        {/* Title */}
        <span className="text-amber-50 text-4xl text-center mb-8">
          Log<span className="text-blue-600">in</span>
        </span>

        {/* Email Input */}
        <div className="w-full mb-6">
          <label className="block text-lg text-white mb-2">Email</label>
          <input onChange={
            (email)=>{
              
              setEmail(email.target.value)
              console.log(email)
             
            }
          }
            type="email"
            placeholder="Enter your email"
            className="w-full h-[40px] px-3 text-white bg-transparent border border-blue-700 rounded-2xl focus:outline-none focus:border-blue-500 placeholder-gray-300"
          />
        </div>

        {/* Password Input */}
        <div className="w-full mb-6">
          <label className="block text-lg text-white mb-2">Password</label>
          <input onChange={
            (password)=>{
              
              setPassword(password.target.value)
              console.log("Password is changed.")

            }
          }
            type="password"
            placeholder="Enter your password"
            className="w-full h-[40px] px-3 text-white bg-transparent border border-blue-700 rounded-2xl focus:outline-none focus:border-blue-500 placeholder-gray-300"
          />
        </div>

        {/* Login Button */}
        <button onClick={login} className="w-[calc(100%/2)] h-[40px] bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300">
          Login
        </button>
        <button onClick={googleLogin} className="w-[350px] h-[40px]">
          Google Login
        </button>
        <p>Dont have an account <Link to="/register" className="text-white ">signUp</Link> here</p>
      </div>
    </div>
  );
}
