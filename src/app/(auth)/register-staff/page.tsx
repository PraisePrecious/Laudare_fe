/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import GoogleIcon from '@/app/assets/icons/google.svg'

type SignUpInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

type NotificationType = {
  type: "success" | "error";
  message: string;
} | null;


type LoginInputs = {
  email: string;
  password: string;
};

export default function AuthPage() {

  const [notification, setNotification] = useState<NotificationType>(null);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [regLoading, setRegLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const {
  register: reg,
  handleSubmit: onSignup,
  watch,
  reset: resetSignup,                
  formState: { errors: regErrors },
} = useForm<SignUpInputs>();

  const {
  register: log,
  handleSubmit: onLogin,
  reset: resetLogin,                 
  formState: { errors: loginErrors },
} = useForm<LoginInputs>();

  // UI state
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordVal = watch("password", "");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Demo handlers
  const handleRegister = (data: SignUpInputs) => {
    setRegLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.toLowerCase(), 
        password: data.password,
        phone: data.phone,
        __t: "Staff" as const //admin,
      };
      
      console.log("Demo Registration Payload:", payload);
      
      setNotification({
        type: "success",
        message: "Registration successful! Your account is pending admin approval."
      });

      resetSignup();               
      setRegLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleLogin = (data: LoginInputs) => {
    setLoginLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const credentials = {
        email: data.email.toLowerCase(),
        password: data.password,
      };
      
      console.log("Demo Login Credentials:", credentials);
      
      // Demo login logic - always succeeds for demo
      setNotification({
        type: "success",
        message: "Login Successful! (Demo Mode)"
      });
      
      resetLogin();
      setLoginLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
  };

 

  return (
    <>

     {/* Notification Popup */}
     {notification && (
        <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center pt-[5rem] md:pt-[10rem] bg-white border border-gray-300 mb-2 shadow-md shadow-gray-100/50">
          <div className={`  p-4 rounded-lg shadow-lg z-50 flex items-center ${
            notification.type === "success" 
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-amber-100 border border-amber-400 text-amber-700"
          }`}>
            <span className="mr-4">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="text-lg font-bold hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}

     





      <div className="flex w-full h-[100vh]">

        <div className="hidden md:flex w-full md:w-[50%] bg-blue-900 items-center justify-center">

        </div>

        <section className="flex w-full md:w-[50%] flex-col items-center justify-center md:py-[1rem] px-4">
            <div className="container mx-auto gap-2 md:gap-2 md:py-[70px] py-4 lg:gap-6 px-4 flex flex-col items-start justify-center bg-white rounded-[1rem] transition">
           

            <div className="w-full md:max-w-[500px] mx-auto">
                {tab === "signup" ? (
                <form onSubmit={onSignup(handleRegister)} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                        <input
                        {...reg("firstName", { required: "First name required" })}
                        placeholder="First Name"
                        className="w-full p-4 py-3 md:py-4  rounded-xl bg-white border border-gray-300 mb-2 shadow-md shadow-gray-100"
                        />
                        {regErrors.firstName && (
                        <p className="text-red-600 text-sm">
                            {regErrors.firstName.message}
                        </p>
                        )}
                    </div>
                    <div>
                        <input
                        {...reg("lastName", { required: "Last name required" })}
                        placeholder="Last Name"
                        className="w-full p-4 py-3 md:py-4  rounded-xl bg-white border border-gray-300 mb-2 shadow-md shadow-gray-100 "
                        />
                        {regErrors.lastName && (
                        <p className="text-red-600 text-sm">
                            {regErrors.lastName.message}
                        </p>
                        )}
                    </div>
                    </div>

                    {/* Email */}
                    <div>
                    <input
                        {...reg("email", {
                        required: "Email required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email",
                        },
                        })}
                        placeholder="Email"
                        className="w-full p-4 py-3 md:py-4  rounded-xl bg-white border border-gray-300 mb-2 shadow-md shadow-gray-100"
                    />
                    {regErrors.email && (
                        <p className="text-red-600 text-sm">
                        {regErrors.email.message}
                        </p>
                    )}
                    </div>

                   

                    {/* Password */}
                    <div className="relative">
                    <label className="bg-white absolute text-md font-semibold text-gray-400 left-2 top-0 -mt-[8px] px-2 py-0 rounded-xl">Password</label>
                    <input
                        type={showPass ? "text" : "password"}
                        {...reg("password", {
                        required: "Password required",
                        minLength: { value: 6, message: "Min 6 chars" },
                        })}
                        placeholder="❋❋❋❋❋❋❋❋"
                        className="w-full p-4 py-3 md:py-4  rounded-xl border border-gray-300 shadow shadow-gray-100 mb-2 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute w-[1rem] h-[1rem] text-gray-300 right-4  top-6 -translate-y-1/2"
                    >
                        {showPass ? 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 3l18 18" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9.88 9.88a3 3 0 014.24 4.24" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 
                                12 5c1.31 0 2.562.352 3.637.96" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M17.657 17.657A8.966 8.966 0 0112 
                                19c-4.477 0-8.268-2.943-9.542-7" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M14.12 14.12a3 3 0 01-4.24-4.24" />
                            </svg>


                        </span>
                        : 
                        
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
                                8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 
                                7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>

                        </span>
                        
                        }
                    </button>
                    
                    </div>

                    {regErrors.password && (
                        <p className="text-red-600 text-sm">
                        {regErrors.password.message}
                        </p>
                    )}

                    {/* Confirm Password */}
                    <div className="relative">

                    <label className="bg-white absolute text-md font-semibold text-gray-400 left-2 top-0 -mt-[8px] px-2 py-0 rounded-xl">Confirm Password</label>
                    <input
                        type={showConfirm ? "text" : "password"}
                        {...reg("confirmPassword", {
                        required: "Confirm your password",
                        validate: (v: any) =>
                            v === passwordVal || "Passwords do not match",
                        })}
                        placeholder="❋❋❋❋❋❋❋❋"
                        className="w-full p-4 py-3 md:py-4  rounded-xl border border-gray-300 shadow shadow-gray-100 mb-2 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute w-[1rem] h-[1rem] text-gray-300 right-4  top-6 -translate-y-1/2"
                    >
                        {showConfirm ? 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 3l18 18" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9.88 9.88a3 3 0 014.24 4.24" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 
                                12 5c1.31 0 2.562.352 3.637.96" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M17.657 17.657A8.966 8.966 0 0112 
                                19c-4.477 0-8.268-2.943-9.542-7" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M14.12 14.12a3 3 0 01-4.24-4.24" />
                            </svg>


                        </span>
                        : 
                        
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
                                8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 
                                7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>

                        </span>
                        
                        }
                    </button>
                    
                    </div>
                    {regErrors.confirmPassword && (
                        <p className="text-red-600 text-sm">
                        {regErrors.confirmPassword.message}
                        </p>
                    )}

                    <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full py-4  bg-primary shadow-md text-white rounded-xl disabled:opacity-50"
                    >
                    {regLoading ? "Creating Account..." : "Create Account"}
                    </button>
                    
                    <div className="flex items-center w-full py-4 justify-center text-gray-400 gap-2">
                        <span className="w-full h-[1px] bg-gray-400 "></span><span className="w-full text-center text-xs md:text-lg">or continue with</span><span className="w-full h-[1px] bg-gray-400 "></span>
                    </div>

                    <button 
                    type="button"
                    className="w-full  py-1 md:py-3 font-semibold border border-gray-600 shadow-md bg-transparent text-gray-500 flex items-center justify-center gap-2 rounded-lg"
                    >
                        <Image src={GoogleIcon} alt="google logo" width={40} height={40} className="w-[1rem]" />
                        <p>Google</p>
                    </button>
                    
                    <div className="flex gap-1 text-xs md:text-lg ">
                        <p className="text-gray-[600] text-xs md:text-lg ">Already have an account?</p>
                        <button className="text-gray-400 font-semibold hover:underline" onClick={() => setTab("login")}>Login</button>
                    </div>

                </form>
                ) : (
                <form onSubmit={onLogin(handleLogin)} className="space-y-4">
                    {/* Email */}
                    <div>
                    <input
                        {...log("email", {
                        required: "Email required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email",
                        },
                        })}
                        placeholder="Email"
                        className="w-full p-4 py-3 md:py-4  rounded-xl bg-white border border-gray-300 mb-2 shadow-md shadow-gray-100"
                    />
                    {loginErrors.email && (
                        <p className="text-red-600 text-sm">
                        {loginErrors.email.message}
                        </p>
                    )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                    <label className="bg-white absolute text-sm md:text-md font-semibold text-gray-400 left-2 top-0 -mt-[8px] px-2 py-0 rounded-xl">Password</label>
                    <input
                        type={showPass ? "text" : "password"}
                        {...log("password", { required: "Password required" })}
                        placeholder="❋❋❋❋❋❋❋❋"
                        className="w-full p-4 py-3 md:py-4  py-2 md:py-4  rounded-xl border border-gray-300 shadow shadow-gray-100 mb-2 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute right-2 w-[1rem] h-[1rem] text-gray-400 top-1/2 -translate-y-1/2"
                    >
                        {showPass ? 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 3l18 18" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9.88 9.88a3 3 0 014.24 4.24" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 
                                12 5c1.31 0 2.562.352 3.637.96" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M17.657 17.657A8.966 8.966 0 0112 
                                19c-4.477 0-8.268-2.943-9.542-7" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M14.12 14.12a3 3 0 01-4.24-4.24" />
                            </svg>


                        </span>
                        : 
                        
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
                                8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 
                                7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>

                        </span>
                        
                        }
                    </button>
                    {loginErrors.password && (
                        <p className="text-red-600 text-sm">
                        {loginErrors.password.message}
                        </p>
                    )}
                    </div>

                    <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-4 bg-primary shadow-md text-white rounded-xl disabled:opacity-50"
                    >
                    {loginLoading ? "Logging In..." : "Login"}
                    </button>

                    <div className="flex items-center w-full py-4 justify-center text-gray-400 gap-2">
                        <span className="w-full h-[1px] bg-gray-400 "></span><span className="w-full text-center text-xs md:text-lg">or continue with</span><span className="w-full h-[1px] bg-gray-400 "></span>
                    </div>

                    <button 
                    type="button"
                    className="w-full  py-1 md:py-3 font-semibold border border-gray-600 shadow-md bg-transparent text-gray-500 flex items-center justify-center gap-2 rounded-lg"
                    >
                        <Image src={GoogleIcon} alt="google logo" width={40} height={40} className="w-[1rem]" />
                        <p>Google</p>
                    </button>
                    
                    <div className="flex gap-1 text-xs md:text-lg ">
                        <p className="text-gray-[600] text-xs md:text-lg ">Don&apos;t have an account?</p>
                        <button className="text-gray-400 font-semibold hover:underline" onClick={() => setTab("signup")}>Sign Up</button>
                    </div>


                </form>
                )}
            </div>
            </div>
        </section>

      </div>
    

    </>
  );
}