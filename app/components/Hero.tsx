"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToConfig = () => {
    const section = document.getElementById("configurator-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-black text-white pt-28 pb-24 overflow-hidden">

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0f0f] to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600 opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        {/* Small Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-500 text-sm uppercase tracking-widest mb-6"
        >
          Induction Heating Technology
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Configure Your <br />
          <span className="text-red-600">PWHT System</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 mt-8 leading-relaxed text-lg max-w-3xl mx-auto"
        >
          Select your application, component size, material and temperature.
          Our intelligent system recommends the right induction heating solution instantly.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={scrollToConfig}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-red-600/30"
          >
            Start Configurator
          </button>

          <button
            className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Download Brochure
          </button>
        </motion.div>

      </div>
    </section>
  );
}