"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, Gift, CreditCard, 
  CheckCircle2, User, Lock, MessageSquare, 
  ChevronRight, Crown, PlayCircle
} from "lucide-react";

// Assuming these are your existing components.
import MediaUploader from "@/components/create/MediaUploader";
import Notification from "@/components/create/Notification";

type PlanType = "basic_reveal" | "magic_experience";

export default function CreateGiftPage() {
  /* -------------------------
      FORM STATE
  -------------------------- */
  const [gifterName, setGifterName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  
  // ✅ CHANGED: Default is basic. Magic is present in type but disabled in UI.
  const [plan, setPlan] = useState<PlanType>("basic_reveal"); 
  const [title, setTitle] = useState("");

  /* -------------------------
      FLOW STATE
  -------------------------- */
  const [giftId, setGiftId] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  /* -------------------------
      NOTIFICATION
  -------------------------- */
  const [notify, setNotify] = useState({ show: false, text: "", type: "info" });

  const popup = (text: string, type = "info") => {
    setNotify({ show: true, text, type });
    setTimeout(() => setNotify({ show: false, text: "", type: "info" }), 3000);
  };

  /* -------------------------
      RESTORE & INIT
  -------------------------- */
  useEffect(() => {
    const draft = localStorage.getItem("pending_gift");
    const paidGiftId = localStorage.getItem("paid_gift_id");

    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setGifterName(parsed.gifterName || "");
        setMessage(parsed.message || "");
        setPassword(parsed.password || "");
        // Force basic if restoring, or respect draft if you prefer. 
        // Given "Coming Soon", we generally want to force basic:
        setPlan("basic_reveal"); 
        setTitle(parsed.title || "Untitled Gift");
      } catch {
        localStorage.removeItem("pending_gift");
      }
    }

    if (paidGiftId) {
      setGiftId(paidGiftId);
      localStorage.removeItem("paid_gift_id");
    }

    setIsAuthChecked(true);
  }, []);

  /* -------------------------
      HANDLERS
  -------------------------- */
  const handleConfirmGift = () => {
    if (!gifterName || !message || !password) {
      popup("Please fill in your name and message details.", "warning");
      return;
    }

    localStorage.setItem("pending_gift", JSON.stringify({
      gifterName, message, password, plan, title
    }));

    const token = localStorage.getItem("token");

    if (!token) {
      popup("Redirecting to login...", "info");
      setTimeout(() => window.location.href = "/auth", 1000);
      return;
    }

    // Since Magic is disabled, "Payment" might just be a direct create for free plans
    // But keeping your structure:
    window.location.href = "/payment";
  };

  if (!isAuthChecked) return null;

  return (
    <div className="min-h-screen bg-[#F2F2F7] relative overflow-hidden font-sans text-gray-900 selection:bg-purple-200">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-200/50 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-200/50 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center md:text-left"
        >
           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
             {giftId ? "Add the finishing touches." : "Finalize your gift."}
           </h1>
           <p className="text-gray-500 text-lg">
             {giftId 
               ? "Payment successful. Let's make it look perfect." 
               : "Review the details and confirm your plan."}
           </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ---------------- LEFT COL: FORM / UPLOAD ---------------- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* If Paid & Magic Plan: Show Media Uploader */}
            {giftId && plan === 'magic_experience' ? (
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <PlayCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Media Studio</h3>
                    <p className="text-sm text-gray-500">Upload photos or videos for the reveal.</p>
                  </div>
                </div>
                <MediaUploader giftId={giftId} />
              </div>
            ) : giftId && plan === 'basic_reveal' ? (
              /* If Paid & Basic Plan: Success Message */
              <div className="bg-green-50/80 backdrop-blur-xl border border-green-100 rounded-3xl p-10 text-center shadow-sm">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-green-900 mb-2">You're all set!</h2>
                 <p className="text-green-700 mb-6">Your digital gift has been created and is ready to share.</p>
                 <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition">
                   Copy Link
                 </button>
              </div>
            ) : (
              /* Default: Edit Form */
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-sm space-y-8">
                
                {/* Gifter Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">From</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                    <input
                      className="w-full bg-white/50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                      placeholder="Your Name (so they know who it's from)"
                      value={gifterName}
                      onChange={(e) => setGifterName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message & Password Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Secret Code</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                        <input
                          className="w-full bg-white/50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Note</label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                        <textarea
                          className="w-full bg-white/50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all resize-none h-[58px] overflow-hidden"
                          placeholder="Edit message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                   </div>
                </div>

                {/* Plan Selection Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Experience Level</label>
                  <div className="flex bg-gray-100 p-1.5 rounded-xl gap-2">
                    
                    {/* Basic Plan (Active) */}
                    <button
                      onClick={() => setPlan("basic_reveal")}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                        ${plan === "basic_reveal" ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      <Gift size={16} /> Basic
                    </button>

                    {/* Magic Plan (DISABLED) */}
                    <button
                      disabled
                      className={`relative flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed opacity-60 grayscale bg-gray-100 text-gray-400`}
                    >
                      <Sparkles size={16} /> Magic
                      {/* Badge */}
                      <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm z-10">
                        SOON
                      </span>
                    </button>

                  </div>
                </div>

              </div>
            )}
          </motion.div>


          {/* ---------------- RIGHT COL: SUMMARY & ACTION ---------------- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            {/* The "Receipt" Card */}
            <div className="bg-white/80 backdrop-blur-2xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl sticky top-8">
              
              <h3 className="font-serif text-2xl font-bold mb-6">Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Occasion</span>
                  <span className="font-medium">{title || "Untitled"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Recipient</span>
                  <span className="font-medium">Anyone with link</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Plan</span>
                  <div className="flex items-center gap-2">
                    {plan === 'magic_experience' && <Crown size={14} className="text-amber-500" />}
                    <span className={`font-bold ${plan === 'magic_experience' ? 'text-purple-600' : 'text-gray-900'}`}>
                      {plan === 'magic_experience' ? 'Magic Experience' : 'Basic Reveal'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Action Button */}
              {!giftId ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-500">Total</span>
                    <span className="text-3xl font-serif font-bold">
                      {plan === 'magic_experience' ? '$4.99' : 'Free'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleConfirmGift}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all
                      ${plan === 'magic_experience' 
                        ? 'bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900' 
                        : 'bg-gray-900 hover:bg-black'}`}
                  >
                    {plan === 'magic_experience' ? (
                      <>Checkout <ChevronRight size={20} /></>
                    ) : (
                      <>Create Free <ChevronRight size={20} /></>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <CreditCard size={12} /> Secure Payment
                  </div>
                </div>
              ) : (
                /* Post Payment Status in Sidebar */
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="inline-block p-2 bg-green-100 text-green-600 rounded-full mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900">Paid & Verified</h4>
                  <p className="text-xs text-gray-500 mt-1">Transaction ID: {giftId.slice(0,8)}...</p>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </main>

      <Notification data={notify} />
    </div>
  );
}