"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// COMPONENTS
import MagicInput from "@/components/create/MagicInput";
import MediaUploader from "@/components/create/MediaUploader";
import MagicStore from "@/components/create/MagicStore";

import MagicEffectModal from "@/components/create/MagicEffectModal";
import PaymentModal from "@/components/create/PaymentModal";
import PreviewModal from "@/components/create/PreviewModal";
import LinkModal from "@/components/create/LinkModal";

import Notification from "@/components/create/Notification";
import SparkleEngine from "@/components/create/SparkleEngine";

export default function CreateGiftPage() {
  /* -------------------------
      FORM STATE
  -------------------------- */
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [media, setMedia] = useState<any[]>([]);

  /* -------------------------
      MAGIC EFFECT STATE
  -------------------------- */
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);

  /* -------------------------
      MODAL FLOW
  -------------------------- */
  const [showMagicModal, setShowMagicModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const [generatedLink, setGeneratedLink] = useState("");

  /* -------------------------
      NOTIFICATION
  -------------------------- */
  const [notify, setNotify] = useState({ show: false, text: "", type: "info" });

  const popup = (text: string, type = "info") => {
    setNotify({ show: true, text, type });
    setTimeout(() => setNotify({ show: false, text: "", type: "info" }), 2000);
  };

  /* -------------------------
      STEP 1 → VALIDATE FORM
  -------------------------- */
  const handleContinue = () => {
    if (!message.trim()) return popup("Please enter a magical message ✨", "warning");
    if (!password.trim()) return popup("Please set a password 🔒", "warning");
    setShowMagicModal(true);
  };

  /* -------------------------
      STEP 2 → EFFECT SELECTED
  -------------------------- */
  const handleEffectSelect = (effect: string) => {
    setSelectedEffect(effect);
    setShowMagicModal(false);
    setShowPaymentModal(true);
  };

  /* -------------------------
      STEP 3 → PAYMENT SUCCESS
  -------------------------- */
  const handlePaymentDone = () => {
    setShowPaymentModal(false);
    setShowPreviewModal(true);
  };

  /* -------------------------
      STEP 4 → GENERATE FINAL LINK
  -------------------------- */
  const finalizeGift = () => {
    const id = "magic_" + Math.random().toString(36).slice(2, 10);
    const link = `${window.location.origin}/reveal/${id}`;

    setGeneratedLink(link);
    setShowPreviewModal(false);
    setShowLinkModal(true);
  };

  return (
    <main className="relative min-h-screen px-6 py-20 overflow-hidden">

      {/* 🔥 Background Sparkle Animation */}
      <SparkleEngine />

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-6xl md:text-7xl font-extrabold 
        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 
        bg-clip-text text-transparent drop-shadow-xl mb-4"
      >
        Create Your Secret Magic ✨
      </motion.h1>

      <p className="text-center text-gray-700 text-xl max-w-xl mx-auto mb-10">
        Transform your message into a magical surprise that unlocks with a password.
      </p>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto rounded-3xl p-10 
      backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl">

        {/* Magic Input Component */}
        <MagicInput
          message={message}
          setMessage={setMessage}
          password={password}
          setPassword={setPassword}
        />

        {/* Media Upload Component */}
        <MediaUploader media={media} setMedia={setMedia} />

        {/* Continue */}
        <motion.button
  whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(236,72,153,0.6)" }}
  whileTap={{ scale: 0.95 }}
  onClick={handleContinue}
  className="w-full py-5 mt-10 rounded-2xl 
  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
  text-white text-2xl font-bold shadow-[0_8px_22px_rgba(0,0,0,0.25)]
  transition-all"
>
  Add Magic ✨
</motion.button>
      </div>

      {/* MAGIC STORE BUTTON ONLY (as per new structure) */}
      <MagicStore openModal={() => setShowMagicModal(true)} />

      {/* -------------------------
          MODALS
      -------------------------- */}

      <MagicEffectModal
        show={showMagicModal}
        setShow={setShowMagicModal}
        onSelect={handleEffectSelect}
      />

      <PaymentModal
        show={showPaymentModal}
        setShow={setShowPaymentModal}
        selectedEffect={selectedEffect}
        onPaid={handlePaymentDone}
      />

      <PreviewModal
        show={showPreviewModal}
        setShow={setShowPreviewModal}
        media={media}
        message={message}
        effect={selectedEffect}
        onContinue={finalizeGift}
      />

      <LinkModal
        show={showLinkModal}
        setShow={setShowLinkModal}
        link={generatedLink}
      />

      {/* NOTIFICATION SYSTEM */}
      <Notification data={notify} />
    </main>
  );
}
