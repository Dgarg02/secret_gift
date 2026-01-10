"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import { FiSmartphone, FiHeart, FiImage, FiShield } from "react-icons/fi";

export default function Features() {
  const features = [
    { icon: <FiShield />, title: "Password Protected", text: "Safe & secure." },
    { icon: <FiImage />, title: "Media Support", text: "Add unlimited photos." },
    { icon: <FiHeart />, title: "Cute Animations", text: "Make it magical." },
    { icon: <FiSmartphone />, title: "Mobile Optimized", text: "Perfect on all screens." },
  ];

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold text-center mb-16">Features 🌟</h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.12 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.06 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="text-primary text-3xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
