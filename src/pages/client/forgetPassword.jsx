import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"



export default function ForgetPasswordPage(){

    const [emailSent, setEmailSent] = useState(false)
    const [email,setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp,setOtp] = useState("")

    async function sendOTP(){

        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-otp",{email:email})
            toast.success("OTP sent successfully")
            setEmailSent(true)

        }catch(error){
            toast.error("Failed to sent OTP")
        
        }

    }

    async function resetPassword() {
        if(newPassword !== confirmPassword){
            toast.error("password do not match")
            return
        }

        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/reset-password",{
                email:email,
                otp:otp,
                newPassword:newPassword
            })
            toast.success("Password reset successfully")

        }catch{
            toast.error("Failed to reset password");
        }
        
    }
    
    return(
     <div className="w-full h-full flex justify-center items-center text-secondary">
        {!emailSent &&  <div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Reset password</h1>
            <input 
              type="email"
              placeholder="Enter your email"
              className="w-[350px] h-[40px] border border-white rounded-xl text-center"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-accent"
            onClick={sendOTP}>
                send OTP
            </button>

        </div>
        }

        {
            emailSent&&
            <div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col">
                <h1 className="text-2xl font-bold">Verify OTP</h1>
                <input
                type="text"
                placeholder="Enter OTP"
                className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                onChange={(e)=>setOtp(e.target.value)}/>

                <input
                type="password"
                placeholder="Enter new password"
                className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                onChange={(e)=>setNewPassword(e.target.value)}/>

                 <input
                type="password"
                placeholder="Confirmnew password"
                className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <button onClick={resetPassword}
                className="w-[350px] h-[40px] bg-blue-500 hover:bg-accent">
                    Reset password
                </button>

            </div> 

        }
       
        
     </div>
    )

}

