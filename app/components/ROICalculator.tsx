"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";


interface ROICalculatorProps {
  configData?: {
    application?: string;
    recommendedPower?: number;
  };
}

export default function ROICalculator({ configData }: ROICalculatorProps) {
  const [costPerHour, setCostPerHour] = useState("");
  const [hoursPerJob, setHoursPerJob] = useState("");
  const [jobsPerMonth, setJobsPerMonth] = useState("");
  const [laborCost, setLaborCost] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const machineCost = 1500000;

  useEffect(() => {
    if (configData?.application) {
      setHoursPerJob("8");
      setCostPerHour("750");
      setJobsPerMonth("24");
      setLaborCost("250");
    }
  }, [configData]);

  const hourly = parseFloat(costPerHour) || 0;
  const hours = parseFloat(hoursPerJob) || 0;
  const jobs = parseFloat(jobsPerMonth) || 0;
  const labor = parseFloat(laborCost) || 0;

  const currentAnnual = jobs * (hourly * hours + labor * hours) * 12;
  const inductionAnnual = currentAnnual * 0.60;
  const annualSavings = currentAnnual - inductionAnnual;
  const roiMonths =
    annualSavings > 0 ? (machineCost / annualSavings) * 12 : 0;

  const generatePDF = async () => {

    try {
        const { data, error } = await supabase
          .from("leads")
          .insert([
            {
              name: name,
              company: company,
              email: email,
              phone: phone,
              current_annual: currentAnnual,
              induction_annual: inductionAnnual,
              annual_savings: annualSavings,
              roi_months: roiMonths,
              recommended_power: configData?.recommendedPower || 0,
            },
          ])
          .select();
      
        console.log("SUPABASE DATA:", data);
        console.log("SUPABASE ERROR:", error);
      
        alert("Supabase DATA: " + JSON.stringify(data));
        alert("Supabase ERROR: " + JSON.stringify(error));
      
      } catch (err) {
        console.error("Caught error:", err);
        alert("Caught error: " + JSON.stringify(err));
      }

    // ✅ EMAILJS
    emailjs.send(
      "service_f5wsfpm",
      "template_qawxzor",
      {
        name,
        company,
        email,
        phone,
        currentAnnual: currentAnnual.toLocaleString("en-IN"),
        inductionAnnual: inductionAnnual.toLocaleString("en-IN"),
        annualSavings: annualSavings.toLocaleString("en-IN"),
        roiMonths: roiMonths.toFixed(1),
      },
      "heVz6QG2xlSPEzgmC"
    );

    // ✅ PDF GENERATION
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SigmaWeld ROI Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Company: ${company}`, 20, 48);
    doc.text(`Email: ${email}`, 20, 56);
    doc.text(`Phone: ${phone}`, 20, 64);

    doc.text(`Current Annual Cost: ₹ ${currentAnnual.toLocaleString("en-IN")}`, 20, 80);
    doc.text(`Induction Cost: ₹ ${inductionAnnual.toLocaleString("en-IN")}`, 20, 90);
    doc.text(`Annual Savings: ₹ ${annualSavings.toLocaleString("en-IN")}`, 20, 100);
    doc.text(`Estimated ROI: ${roiMonths.toFixed(1)} months`, 20, 110);

    doc.save("SigmaWeld_ROI_Report.pdf");

    setShowForm(false);
  };

  return (
    <section className="bg-black text-white py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          ROI Calculator
        </h2>

        <div className="grid md:grid-cols-2 gap-16">

          <div className="space-y-6">
            <input
              type="number"
              placeholder="Fuel Cost per Hour (₹)"
              value={costPerHour}
              onChange={(e) => setCostPerHour(e.target.value)}
              className="w-full p-4 bg-black border border-white/20 rounded-lg"
            />
            <input
              type="number"
              placeholder="Heating Hours per Job"
              value={hoursPerJob}
              onChange={(e) => setHoursPerJob(e.target.value)}
              className="w-full p-4 bg-black border border-white/20 rounded-lg"
            />
            <input
              type="number"
              placeholder="Jobs per Month"
              value={jobsPerMonth}
              onChange={(e) => setJobsPerMonth(e.target.value)}
              className="w-full p-4 bg-black border border-white/20 rounded-lg"
            />
            <input
              type="number"
              placeholder="Labor Cost per Hour (₹)"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              className="w-full p-4 bg-black border border-white/20 rounded-lg"
            />
          </div>

          <div className="bg-[#111111] p-10 rounded-2xl border border-red-500/20 space-y-6">

            <h3 className="text-2xl font-semibold text-red-500">
              Estimated Results
            </h3>

            <p>Current Annual Cost: ₹ {currentAnnual.toLocaleString("en-IN")}</p>
            <p>Induction Cost: ₹ {inductionAnnual.toLocaleString("en-IN")}</p>
            <p className="text-green-400 font-bold">
              Annual Savings: ₹ {annualSavings.toLocaleString("en-IN")}
            </p>

            <div className="bg-red-600/10 border border-red-500/30 p-6 rounded-xl text-center">
              <p className="text-sm text-gray-400">Estimated ROI</p>
              <p className="text-3xl font-bold text-red-500">
                {roiMonths.toFixed(1)} Months
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-6 px-6 py-3 bg-red-600 rounded-full hover:bg-red-500 transition"
            >
              Download Detailed Proposal & ROI Report
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-[#111111] p-8 rounded-2xl w-full max-w-md space-y-4">
              <h3 className="text-xl font-bold text-red-500">
                Enter Details
              </h3>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-black border border-white/20 rounded-lg"
              />

              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-3 bg-black border border-white/20 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-black border border-white/20 rounded-lg"
              />

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-black border border-white/20 rounded-lg"
              />

              <div className="flex gap-4 mt-4">
                <button
                  onClick={generatePDF}
                  className="flex-1 bg-red-600 py-3 rounded-full"
                >
                  Generate PDF
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-white/20 py-3 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}