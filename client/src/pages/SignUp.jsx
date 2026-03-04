import { useNavigate , Link } from "react-router-dom";
import React, { useState } from "react";
import OAuth from "../components/OAuth.jsx";

const SignUp = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
  console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
       const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);

    if (data.success == false){
     setLoading(false);
     setError(data.message);
     return;
    }
    
    setLoading(false);
    setError(null);
    navigate("/sign-in");


    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

   
  };

 return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

    {/* Background Glow */}
     <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.4),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.4),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.3),transparent_40%)]"></div>  

    <div className="w-full max-w-md bg-white/70 dark:bg-slate-900/60
    backdrop-blur-2xl border border-white/30 dark:border-slate-800
    shadow-2xl rounded-3xl p-8 relative">

      <h1 className="text-4xl font-bold text-center mb-8
      text-slate-800 dark:text-white tracking-tight">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Floating Username */}
        <div className="relative">
          <input
            type="text"
            id="username"
            placeholder=" "
            onChange={handleChange}
            className="peer w-full px-4 pt-6 pb-2 bg-transparent
            border border-slate-300 dark:border-slate-700
            rounded-xl text-slate-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-all duration-300"
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-2 text-slate-500 dark:text-slate-400
            text-sm transition-all duration-300
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-indigo-500">
            Username
          </label>
        </div>

        {/* Floating Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder=" "
            onChange={handleChange}
            className="peer w-full px-4 pt-6 pb-2 bg-transparent
            border border-slate-300 dark:border-slate-700
            rounded-xl text-slate-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-all duration-300"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-slate-500 dark:text-slate-400
            text-sm transition-all duration-300
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-indigo-500">
            Email Address
          </label>
        </div>

        {/* Floating Password */}
        <div className="relative">
          <input
            type="password"
            id="password"
            placeholder=" "
            onChange={handleChange}
            className="peer w-full px-4 pt-6 pb-2 bg-transparent
            border border-slate-300 dark:border-slate-700
            rounded-xl text-slate-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-all duration-300"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-slate-500 dark:text-slate-400
            text-sm transition-all duration-300
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-indigo-500">
            Password
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600
          text-white font-semibold py-3 rounded-xl
          shadow-lg hover:shadow-xl
          hover:scale-[1.03]
          active:scale-95
          transition-all duration-300
          disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            OR
          </span>
          <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700"></div>
        </div>

        {/* OAuth */}
        <div className="w-full">
          <OAuth />
        </div>

      </form>

      {/* Sign In Link */}
      <div className="flex justify-center gap-2 mt-6 text-sm text-slate-600 dark:text-slate-400">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline cursor-pointer">
            Sign In
          </span>
        </Link>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-5 text-sm text-center text-red-600 dark:text-red-400
        bg-red-100 dark:bg-red-900/40 p-3 rounded-xl">
          {error}
        </p>
      )}
    </div>
  </div>
);
};

export default SignUp;
