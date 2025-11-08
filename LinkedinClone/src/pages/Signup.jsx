import React, { useState } from "react";
import API from "../utils/api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import signupImg from "/src/assets/welcome.svg";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/register", form);
      saveAuth(res.data);
      nav("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 
      bg-gradient from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 blur-3xl opacity-40 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 blur-3xl opacity-40 rounded-full"></div>

      <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block md:w-1/2"
        >
          <img src={signupImg} alt="signup" className="w-full drop-shadow-xl" />
        </motion.div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 bg-white/60 backdrop-blur-xl shadow-xl p-8 rounded-2xl border border-white/40"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create your account
          </h2>

          {error && (
            <div className="text-red-600 text-sm mb-3 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
            />

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

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium shadow-md transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-700">
            Already registered?{" "}
            <a
              href="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
