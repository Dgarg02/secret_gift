"use client";

import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section className="py-20 px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-md mx-auto text-center glass-card p-8 rounded-3xl"
      >
        <div className="text-4xl mb-4">💎</div>

        <h2 className="text-2xl font-bold mb-4">Unlock This Template</h2>
        <p className="text-primary text-4xl font-bold mb-2">₹99</p>

        <p className="text-gray-600 mb-6">
          One-time payment for unlimited secret gifts
        </p>

        <ul className="text-left space-y-3 mb-8">
          <li>✔ Unlimited messages</li>
          <li>✔ Photo & video support</li>
          <li>✔ Password protection</li>
          <li>✔ Beautiful animations</li>
        </ul>

        <motion.a
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          href="#"
          className="block w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-button"
        >
          Get Started 🚀
        </motion.a>
      </motion.div>
    </section>
  );
}
