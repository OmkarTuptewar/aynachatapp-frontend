// pages/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../context/UserContext";

import backimage from "../Assets/backimage.jpg"
const LoginPage = () => {
  const { login } = useUser();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login({ token: data.jwt, email: data.user.email });
        alert("Login successful");
        navigate("/chat"); // Redirect to ChatPage.jsx
      } else {
        alert(data.error.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-wrap items-stretch bg-gray-800 max-md:pb-20 max-md:pt-32">
    {/* Left Section: Login Form */}
    <div className="grow md:flex md:w-1/2 md:flex-col md:items-center md:justify-center md:py-20">
      <div className="w-full px-4 text-center text-xs lg:w-1/2">
        <h1 className="mb-8 text-2xl font-mono font-bold text-white">
          GEN_Z_CONNECT !!- CHAT APP
        </h1>
        
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-200 mb-3"
              htmlFor="email"
            >
              <span>Email Address</span>
            </label>
            <input
              id="email"
              className="block peer w-full px-4 py-3  border-gray-100 bg-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200"
              name="email"
              value={identifier}
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
  
          <div className="relative">
            <label
              className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-200 mb-3"
              htmlFor="password"
            >
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                className="block peer w-full px-4 py-3  border-gray-300 bg-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200"
                name="password"
                value={password}
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* You can implement the password visibility toggle logic here if needed */}
            </div>
          </div>
  
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3"
          >
            Sign in
          </button>
        </form>
  
        <div className="mt-20 text-gray-400 text-sm">
          Don't have an account yet ?
          <Link className="font-medium text-indigo-600 underline mx-1" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  
    {/* Right Section: Image */}
    <div
      className="hidden flex-col justify-center overflow-hidden bg-cover bg-center md:flex md:w-1/2"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/gray-neural-network-illustration_53876-78764.jpg?size=626&ext=jpg)",
      }}
    >
      <img
        className="translate-x-[27%] rounded-[36px] shadow-[0_24px_88px_rgba(0,0,0,0.55)]"
        src={backimage}
        alt="background image"
      />
    </div>
  </div>
    
  );
};

export default LoginPage;
