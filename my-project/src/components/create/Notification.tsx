"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo } from "react-icons/fi";

export default function Notification() {
  const [toast, setToast] = useState<{ type: string; msg: string } | null>(null);

  (global as any).notify = (msg: string, type: string = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-lg text-white z-[9999] ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : toast.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <FiInfo />
            <span>{toast.msg}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
