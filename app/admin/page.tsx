import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PWHT3D from "./components/PWHT3D";
import Configurator from "./components/Configurator";
import ROICalculator from "./components/ROICalculator";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ HERO */}
      <Hero />

      {/* ✅ 3D SECTION */}
      <section className="relative bg-black py-24 border-t border-white/10">

  <div className="max-w-7xl mx-auto px-6 text-center mb-12">
    <h2 className="text-4xl font-bold text-red-500">
      SigmaWeld PWHT – 40kW
    </h2>
    <p className="text-gray-400 mt-3">
      Industrial Induction Heating System
    </p>
  </div>

  <div className="max-w-7xl mx-auto px-6">
    <PWHT3D />
  </div>

</section>

      {/* ✅ CONFIGURATOR */}
      <Configurator />

      {/* ✅ ROI */}
      <ROICalculator />

    </main>
  );
}