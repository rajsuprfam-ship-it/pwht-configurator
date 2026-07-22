"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-sm" />
          <span className="text-white font-semibold tracking-wide text-lg">
            Sigma<span className="text-red-600">Weld</span>
          </span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition duration-300">
            Products
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Applications
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Technology
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Support
          </a>
        </div>

        {/* Button */}
        <button className="bg-red-600 text-white px-5 py-2 rounded-full text-sm hover:bg-red-500 transition duration-300">
          Configure
        </button>
      </div>
    </motion.nav>
  );
}