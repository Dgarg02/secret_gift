"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { 
  CreditCard, Lock, ShieldCheck, CheckCircle2, 
  Loader2, Gift, Wifi, Smartphone, Copy, ExternalLink, Share2
} from "lucide-react";

const API_URL = "https://nationalistically-parisonic-tim.ngrok-free.dev";

type GiftDraft = {
  gifterName: string;
  message: string;
  password: string;
  plan: "basic_reveal" | "magic_experience";
  title?: string;
};

export default function PaymentPage() {
  const router = useRouter();

  // ✅ Added "ready" state
  const [view, setView] = useState<"payment" | "success" | "wrapping" | "ready">("payment");
  const [isProcessing, setIsProcessing] = useState(false);
  const [giftDraft, setGiftDraft] = useState<GiftDraft | null>(null);
  const [generatedGiftId, setGeneratedGiftId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  /* --------------------------------
      INIT & AUTH CHECK
  -------------------------------- */
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);

    const token = localStorage.getItem("token");
    const draft = localStorage.getItem("pending_gift");

    if (!token) {
      router.replace("/auth");
      return;
    }

    if (!draft) {
      router.replace("/create-gift");
      return;
    }

    try {
      setGiftDraft(JSON.parse(draft));
    } catch {
      localStorage.removeItem("pending_gift");
      router.replace("/create-gift");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  /* --------------------------------
      PAYMENT LOGIC
  -------------------------------- */
  const handlePayment = async () => {
    if (!giftDraft) return;

    try {
      setIsProcessing(true);

      // 1️⃣ UI Delay
      await new Promise((res) => setTimeout(res, 2000));

      // 2️⃣ API Call
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/gifts/create-after-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gifter_name: giftDraft.gifterName,
          message: giftDraft.message,
          password: giftDraft.password,
          plan: giftDraft.plan,
          title: giftDraft.title || "Untitled Gift"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Payment failed");

      setGeneratedGiftId(data.gift_id);

      // 3️⃣ Payment Success View
      setView("success");

      // 4️⃣ Wrapping Animation
      setTimeout(() => {
        setView("wrapping");

        // 5️⃣ Show "Ready" Dashboard (Stopped Auto-Redirect)
        setTimeout(() => {
          setView("ready");
          localStorage.removeItem("pending_gift");
        }, 3500); 

      }, 2500);

    } catch (err) {
      console.error("Payment failed:", err);
      setView("payment");
    } finally {
      setIsProcessing(false);
    }
  };

  /* --------------------------------
      HELPERS
  -------------------------------- */
  const copyToClipboard = () => {
    if (!generatedGiftId) return;
    // Construct absolute URL (adjust domain for production)
    const url = `${window.location.origin}/reveal/${generatedGiftId}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePreview = () => {
    if (!generatedGiftId) return;
    // Open in new tab so they don't lose the share screen
    window.open(`/reveal/${generatedGiftId}`, '_blank');
  };

  const price = giftDraft?.plan === "magic_experience" ? 589 : 0;
  const tax = Math.round(price * 0.18);
  const total = price + tax;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
  };

  if (!giftDraft) return null;

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-200/40 rounded-full blur-[120px]" />

      {/* Confetti - Only show during success/wrapping */}
      {(view === "success" || view === "ready") && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          numberOfPieces={view === "ready" ? 100 : 300} 
          recycle={false}
          gravity={0.2}
        />
      )}

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">

          {/* ---------------- STATE 1: PAYMENT CARD ---------------- */}
          {view === "payment" && (
            <motion.div
              key="payment-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              {/* ... (Payment UI code remains the same as before) ... */}
              <div className="p-8 border-b border-gray-100 bg-white/40">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Checkout</h2>
                    <p className="text-sm text-gray-500 mt-1">Secure encrypted payment</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <Lock size={18} />
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="relative h-48 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white shadow-lg shadow-black/20 flex flex-col justify-between overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                   <div className="flex justify-between items-center z-10">
                      <CreditCard className="opacity-80" />
                      <Wifi className="rotate-90 opacity-60" size={20} />
                   </div>
                   <div className="space-y-4 z-10">
                      <div className="flex gap-4 items-center opacity-90 font-mono text-lg tracking-widest">
                        <span>••••</span><span>••••</span><span>••••</span><span>4242</span>
                      </div>
                      <div className="flex justify-between items-end">
                         <div className="text-xs opacity-70 uppercase tracking-wider">Card Holder<br/><span className="text-sm font-bold text-white normal-case">John Doe</span></div>
                         <div className="text-xs opacity-70 uppercase tracking-wider">Expires<br/><span className="text-sm font-bold text-white normal-case">12/28</span></div>
                      </div>
                   </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{giftDraft.plan === "magic_experience" ? "Magic Experience" : "Basic Reveal"}</span>
                    <span>₹{price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxes & Fees</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-serif text-3xl font-bold text-gray-900">₹{total}</span>
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <>Processing <Loader2 className="animate-spin" /></>
                  ) : (
                    <>Pay Now <ShieldCheck size={18} /></>
                  )}
                </button>
                <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest flex justify-center gap-1 items-center">
                  <Lock size={10} /> 256-Bit SSL Encrypted
                </div>
              </div>
            </motion.div>
          )}

          {/* ---------------- STATE 2: SUCCESS ---------------- */}
          {view === "success" && (
            <motion.div
              key="success-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl p-12 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Payment Verified</h2>
              <p className="text-gray-500 mb-8">Your transaction was successful.</p>
            </motion.div>
          )}

          {/* ---------------- STATE 3: WRAPPING ---------------- */}
          {view === "wrapping" && (
            <motion.div
              key="wrapping-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping" />
                <div className="relative bg-white w-32 h-32 rounded-full flex items-center justify-center shadow-xl">
                  <Gift size={48} className="text-purple-600 animate-bounce" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">Wrapping your gift...</h2>
              <p className="text-gray-500">Adding the final sparkles.</p>
              <div className="mt-8 w-48 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5 }}
                  className="h-full bg-purple-600"
                />
              </div>
            </motion.div>
          )}

          {/* ---------------- STATE 4: READY (THE DASHBOARD) ---------------- */}
          {view === "ready" && generatedGiftId && (
            <motion.div
              key="ready-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Gift size={40} className="text-purple-600" />
                </div>
                
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Your Gift is Ready!</h2>
                <p className="text-gray-500 mb-8">
                  The link has been generated. Share it with your special someone.
                </p>

                {/* Link Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-2 flex items-center gap-2 mb-6">
                  <div className="flex-1 px-3 overflow-hidden text-left">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Gift Link</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {window.location.origin}/reveal/{generatedGiftId}
                    </p>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all text-gray-700"
                  >
                    {isCopied ? <CheckCircle2 size={20} className="text-green-500"/> : <Copy size={20} />}
                  </button>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handlePreview}
                    className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Preview Gift <ExternalLink size={18} />
                  </button>

                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/reveal/${generatedGiftId}`;
                      window.open(`https://wa.me/?text=I%20made%20something%20special%20for%20you!%20Open%20it%20here:%20${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Share via WhatsApp <Share2 size={18} />
                  </button>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => router.push("/create-gift")}
                    className="text-sm text-gray-400 hover:text-gray-600 underline decoration-gray-300"
                  >
                    Create another gift
                  </button>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}