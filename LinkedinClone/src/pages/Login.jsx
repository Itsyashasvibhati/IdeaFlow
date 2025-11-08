import React, { useState } from "react";
import API from "../utils/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loginImg from "/src/assets/login.svg"; // add any image

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", form);
      saveAuth(res.data);
      nav("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 
      bg-gradient from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Glow decorations */}
      <div className="absolute -top-10 left-0 w-72 h-72 bg-blue-200 blur-3xl opacity-40 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 blur-3xl opacity-40 rounded-full"></div>

      <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto w-full">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block md:w-1/2"
        >
          <img src={loginImg} alt="login" className="w-full drop-shadow-xl" />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 bg-white/60 backdrop-blur-xl shadow-xl p-8 rounded-2xl border border-white/40"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign in</h2>

          {error && (
            <div className="text-red-600 text-sm mb-3 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />

            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md transition">
              Sign in
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-700">
            New here?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Create account
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
