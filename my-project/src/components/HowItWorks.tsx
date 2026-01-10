"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import { FiEdit3, FiShare2, FiLock } from "react-icons/fi";
import { FaImages } from "react-icons/fa";

export default function HowItWorks() {
  const items = [
    { icon: <FiEdit3 />, title: "Write Your Message", text: "Pour your heart out…" },
    { icon: <FiLock />, title: "Set a Password", text: "Choose something meaningful…" },
    { icon: <FaImages />, title: "Add Photos & Videos", text: "Make it special…" },
    { icon: <FiShare2 />, title: "Share the Link", text: "Watch them smile…" },
  ];

  return (
    <section id="how-it-works" className="py-20 px-8">
      <h2 className="text-4xl font-bold text-center mb-16">How It Works ✨</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {items.map((step, i) => (
          <AnimateOnScroll delay={i * 0.1} key={i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <div className="text-3xl text-primary mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.text}</p>
            </motion.div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
