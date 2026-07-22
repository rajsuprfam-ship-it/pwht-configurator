"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Application",
  "Component",
  "Material",
  "Thickness",
  "Temperature",
  "Result",
];

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [application, setApplication] = useState("");
  const [component, setComponent] = useState("");
  const [material, setMaterial] = useState("");
  const [thickness, setThickness] = useState("");
  const [temperature, setTemperature] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const getRecommendedPower = () => {
    const t = parseFloat(thickness);
    if (t <= 20) return 20;
    if (t <= 40) return 40;
    if (t <= 70) return 80;
    return 160;
  };

  const recommendedPower = thickness ? getRecommendedPower() : 0;

  const CardButton = ({ label, selected, onClick }: any) => (
    <button
      onClick={onClick}
      className={`min-h-[60px] px-6 py-3 rounded-xl border transition text-lg font-semibold flex items-center justify-center ${
        selected
          ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/30"
          : "border-white/20 text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section
      id="configurator-section"
      className="bg-[#111111] text-white py-32"
    >
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          PWHT System Configurator
        </h2>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`h-1 mb-2 ${
                  step > index ? "bg-red-600" : "bg-white/20"
                }`}
              />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-300">
                  Select Application
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {["Pre Heating", "PWHT", "Stress Relieving"].map((item) => (
                    <CardButton
                      key={item}
                      label={item}
                      selected={application === item}
                      onClick={() => {
                        setApplication(item);
                        nextStep();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-300">
                  Select Component
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {["Pipe", "Flange", "Pressure Vessel"].map((item) => (
                    <CardButton
                      key={item}
                      label={item}
                      selected={component === item}
                      onClick={() => {
                        setComponent(item);
                        nextStep();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-300">
                  Select Material
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {["Carbon Steel", "P22", "P91"].map((item) => (
                    <CardButton
                      key={item}
                      label={item}
                      selected={material === item}
                      onClick={() => {
                        setMaterial(item);
                        nextStep();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="max-w-md mx-auto text-center space-y-6">
                <h3 className="text-xl text-gray-300">
                  Enter Thickness (mm)
                </h3>

                <input
                  type="number"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  className="w-full p-4 rounded-lg bg-black border border-white/20 text-center text-white outline-none focus:border-red-500"
                  placeholder="Enter thickness"
                />

                <button
                  onClick={nextStep}
                  disabled={!thickness}
                  className="w-full px-6 py-3 bg-red-600 rounded-full disabled:opacity-40 font-semibold"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-300">
                  Select Temperature
                </h3>

                <div className="grid md:grid-cols-4 gap-6">
                  {["300°C", "450°C", "600°C", "760°C"].map((item) => (
                    <CardButton
                      key={item}
                      label={item}
                      selected={temperature === item}
                      onClick={() => {
                        setTemperature(item);
                        nextStep();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="bg-black/60 p-10 rounded-xl text-center space-y-6 border border-red-500/20">
                <h3 className="text-2xl font-bold text-red-600">
                  Recommended System
                </h3>

                <div className="text-gray-300 space-y-2">
                  <p>Application: {application}</p>
                  <p>Component: {component}</p>
                  <p>Material: {material}</p>
                  <p>Thickness: {thickness} mm</p>
                  <p>Temperature: {temperature}</p>
                </div>

                <div className="text-xl font-bold text-red-500">
                  Sigma PWHT {recommendedPower} kW
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 bg-red-600 rounded-full font-semibold hover:bg-red-500 transition"
                >
                  Start New Configuration
                </button>
              </div>
            )}

            {/* Back Button */}
            {step > 1 && step < 6 && (
              <button
                onClick={prevStep}
                className="mt-8 text-gray-400 hover:text-white transition"
              >
                ← Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}