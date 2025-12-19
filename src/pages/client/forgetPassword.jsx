import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ForgetPasswordPage() {

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp, setOtp] = useState("")

    async function sendOTP() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", { email: email })
            toast.success("OTP sent successfully")
            setEmailSent(true)
        } catch (error) {
            toast.error("Failed to send OTP")
        }
    }

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            })
            toast.success("Password reset successfully")
        } catch {
            toast.error("Failed to reset password");
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-slate-950 px-4">
            
            {/* Step 1: Request OTP */}
            {!emailSent && (
                <div className="bg-slate-900 border border-slate-800 w-full max-w-[450px] p-10 shadow-2xl rounded-3xl flex 
                flex-col items-center transition-all animate-in fade-in zoom-in duration-300">
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-slate-400 text-center mb-8 text-sm">Enter your email address to receive an OTP code.</p>
                    
                    <div className="w-full space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                            <input 
                                type="email"
                                placeholder="name@example.com"
                                className="w-full h-12 bg-slate-800/50 border border-slate-700 rounded-xl text-white 
                                px-4 outline-none focus:border-blue-500 focus:ring-1
                                 focus:ring-blue-500 transition-all placeholder-slate-600"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl 
                            shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mt-4"
                            onClick={sendOTP}
                        >
                            Send OTP Code
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Verify and Reset */}
            {emailSent && (
                <div className="bg-slate-900 border border-slate-800 w-full max-w-[450px] p-10 shadow-2xl rounded-3xl flex flex-col 
                items-center transition-all animate-in slide-in-from-right duration-300">
                    <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
                    <p className="text-slate-400 text-center mb-8 text-sm">We've sent a code to your email. Enter it below with your new password.</p>
                    
                    <div className="w-full space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1">OTP Code</label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                className="w-full h-12 bg-slate-800/50 border border-slate-700 rounded-xl text-white px-4 outline-none
                                 focus:border-blue-500 transition-all text-center tracking-[0.5em] font-bold placeholder:tracking-normal
                                  placeholder:font-normal placeholder-slate-600"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1">New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-12 bg-slate-800/50 border border-slate-700 rounded-xl text-white
                                 px-4 outline-none focus:border-blue-500 transition-all placeholder-slate-600"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-12 bg-slate-800/50 border border-slate-700 rounded-xl
                                 text-white px-4 outline-none focus:border-blue-500 transition-all placeholder-slate-600"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            onClick={resetPassword}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold 
                            rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mt-4"
                        >
                            Reset Password
                        </button>
                        
                        <button 
                            onClick={() => setEmailSent(false)}
                            className="w-full text-sm text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            Back to email entry
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}