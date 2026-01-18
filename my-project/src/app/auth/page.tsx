"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

const API_URL = "https://nationalistically-parisonic-tim.ngrok-free.dev";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";

      const payload = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            username: form.name,
            email: form.email,
            password: form.password,
          };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      // ✅ Save token on login
      if (isLogin) {
        localStorage.setItem("token", data.access_token);
      }

      // ✅ AFTER LOGIN / SIGNUP → BACK TO CREATE GIFT
      router.push("/create-gift");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] flex items-center justify-center p-6">
      
      {/* Floating Home */}
      <Link href="/" className="absolute top-8 left-8 z-20 flex items-center gap-2">
        <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
        <span className="font-bold text-sm">MakeThemSmile</span>
      </Link>

      <motion.div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h1 className="text-3xl font-bold text-center mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            {isLogin ? "Login to continue" : "Sign up to continue"}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                <input
                  name="name"
                  required
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full pl-10 py-3 rounded-xl border"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                onChange={handleChange}
                className="w-full pl-10 py-3 rounded-xl border"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-10 py-3 rounded-xl border"
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full py-3 bg-black text-white rounded-xl font-bold flex justify-center items-center gap-2"
            >
              {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            {isLogin ? "No account?" : "Already have an account?"}{" "}
            <button onClick={toggleMode} className="font-bold underline">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>

        </div>
      </motion.div>
    </div>
  );
}
