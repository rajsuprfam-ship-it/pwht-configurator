"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PWHT3D from "./components/PWHT3D";
import Configurator from "./components/Configurator";
import ROICalculator from "./components/ROICalculator";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <Hero />

      {/* ✅ BIG 3D SECTION */}
      <section style={{ height: "700px", background: "black" }}>
        <PWHT3D />
      </section>

      <Configurator />

      <ROICalculator />

    </div>
  );
}