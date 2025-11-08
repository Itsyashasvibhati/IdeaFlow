import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;
      const res = await API.post(url, payload);
      localStorage.setItem("token", res.data.token);
      const me = await API.get("/auth/me");
      setUser(me.data);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {isLogin ? "Login" : "Create an account"}
          </h2>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-linkedin underline"
          >
            {isLogin ? "Create account" : "Have an account? Login"}
          </button>
        </div>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              required
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              required
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Your secure password"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-linkedin text-white"
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 text-sm text-slate-500"></div>
    </div>
  );
}
