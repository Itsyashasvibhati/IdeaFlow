import React from "react";
import { motion } from "framer-motion";
import heroImg from "/src/assets/image.svg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient from-blue-50 via-white to-purple-50 opacity-80 -z-10" />

      {/* Decorative Blur Elements */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 blur-3xl rounded-full opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 blur-3xl rounded-full opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        {/* LEFT CONTENT */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Build your network.
            <span className="text-blue-600"> Share your ideas.</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg md:text-xl">
            Connect with people, share posts, and grow your professional
            presence — powered by{" "}
            <span className="font-semibold text-gray-800">
              React, Node, and MongoDB Atlas
            </span>
            .
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/signup"
              className="px-7 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="px-7 py-3 border rounded-xl font-medium text-blue-700 bg-white hover:bg-blue-50 transition shadow-sm"
            >
              Sign In
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <img
            src={heroImg}
            alt="hero"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
