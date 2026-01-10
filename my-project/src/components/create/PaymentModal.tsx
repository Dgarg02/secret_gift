"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useState } from "react";

interface Props {
  show: boolean;
  selectedEffect: string | null; 
  setShow: (v: boolean) => void;
  onPaid: () => void;
}

export default function PaymentModal({ show, selectedEffect, setShow, onPaid }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<"single" | "all">("single");

  const payNow = () => {
    onPaid();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed bottom-0 md:top-1/2 md:left-1/2 
            md:-translate-x-1/2 md:-translate-y-1/2 
            bg-white rounded-3xl shadow-2xl p-8 z-50 w-full md:w-[420px]"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Unlock Magic ✨
              </h2>

              <button onClick={() => setShow(false)}>
                <FiX size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              You selected:{" "}
              <span className="text-purple-600 font-medium">
                {selectedEffect}
              </span>
            </p>

            {/* Plans */}
            <div className="space-y-4">

              {/* Single Effect */}
              <div
                onClick={() => setSelectedPlan("single")}
                className={`p-4 rounded-2xl border cursor-pointer transition 
                ${selectedPlan === "single"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Single Effect</p>
                  <p className="text-lg font-bold text-purple-600">₹49</p>
                </div>
              </div>

              {/* All Effects */}
              <div
                onClick={() => setSelectedPlan("all")}
                className={`p-4 rounded-2xl border cursor-pointer transition 
                ${selectedPlan === "all"
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Unlock All Effects</p>
                    <p className="text-sm text-gray-500">
                      Best value • All 8 magical reveals included
                    </p>
                  </div>

                  <p className="text-lg font-bold text-pink-600">₹199</p>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={payNow}
              className="w-full mt-6 py-4 rounded-2xl text-white font-semibold 
              bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg 
              hover:shadow-xl transition-all"
            >
              Pay & Continue
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
