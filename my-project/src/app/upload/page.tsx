"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Music, Image as ImageIcon, UploadCloud, 
  X, Check, ArrowRight, Sparkles, Lock 
} from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- STATE FOR FILES ---
  // We track the file name and "uploading" status for UI feedback
  interface FileState {
    name: string | null;
    uploading: boolean;
    done: boolean;
  }

  const [files, setFiles] = useState<{
    video: FileState;
    audio: FileState;
    photo: FileState;
  }>({
    video: { name: null, uploading: false, done: false },
    audio: { name: null, uploading: false, done: false },
    photo: { name: null, uploading: false, done: false },
  });

  // Hidden Input Refs
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // --- HANDLERS ---

  const handleFileChange = (type: "video" | "audio" | "photo", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Start Upload Animation
      setFiles((prev) => ({ ...prev, [type]: { ...prev[type], uploading: true } }));
      
      // 2. Simulate Network Request
      setTimeout(() => {
        setFiles((prev) => ({ 
          ...prev, 
          [type]: { name: file.name, uploading: false, done: true } 
        }));
      }, 1500);
    }
  };

  const removeFile = (type: "video" | "audio" | "photo", e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the upload click again
    setFiles((prev) => ({ 
      ...prev, 
      [type]: { name: null, uploading: false, done: false } 
    }));
    // Reset the input value so user can select same file again if needed
    if (type === "video" && videoInputRef.current) videoInputRef.current.value = "";
    if (type === "audio" && audioInputRef.current) audioInputRef.current.value = "";
    if (type === "photo" && photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleProceed = () => {
    setIsSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      // Redirect to a Payment or Success page (Mock)
      alert("Redirecting to Payment Gateway...");

      setIsSubmitting(false);
      router.push("/payment")
    }, 1500);
  };

  // --- COMPONENT: UPLOAD CARD ---
  const UploadCard = ({ 
    type, 
    label, 
    icon: Icon, 
    accept, 
    inputRef 
  }: { 
    type: "video" | "audio" | "photo"; 
    label: string; 
    icon: any; 
    accept: string;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => {
    const state = files[type];

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => !state.done && inputRef.current?.click()}
        className={`relative group overflow-hidden rounded-3xl p-1 cursor-pointer transition-all duration-300 ${
          state.done 
            ? "bg-gradient-to-br from-green-100 to-emerald-50 border border-green-200" 
            : "bg-white/40 border border-white/60 hover:bg-white/60 hover:border-white hover:shadow-lg"
        }`}
      >
        {/* Hidden Input */}
        <input 
          type="file" 
          ref={inputRef} 
          accept={accept} 
          className="hidden" 
          onChange={(e) => handleFileChange(type, e)}
        />

        {/* Card Content */}
        <div className="relative bg-white/50 backdrop-blur-sm rounded-[22px] p-4 flex items-center justify-between h-24">
          
          <div className="flex items-center gap-5">
            {/* Icon Container */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${
              state.done ? "bg-green-500 text-white" : "bg-white text-gray-600 group-hover:text-purple-600"
            }`}>
              {state.uploading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : state.done ? (
                <Check className="w-7 h-7" />
              ) : (
                <Icon className="w-7 h-7" />
              )}
            </div>

            {/* Text Labels */}
            <div className="flex flex-col">
              <span className={`text-lg font-bold transition-colors ${
                state.done ? "text-green-800" : "text-gray-800"
              }`}>
                {state.done ? "Uploaded!" : label}
              </span>
              <span className="text-xs text-gray-500 font-medium truncate max-w-[150px]">
                {state.uploading 
                  ? "Uploading..." 
                  : state.done 
                    ? state.name 
                    : "(optional)"}
              </span>
            </div>
          </div>

          {/* Action Icon (Right Side) */}
          <div className="pr-2">
            {state.done ? (
              <button 
                onClick={(e) => removeFile(type, e)}
                className="p-2 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center border border-white group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                <UploadCloud className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar Animation (Fake) */}
        {state.uploading && (
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 1.5 }}
            className="absolute bottom-0 left-0 h-1 bg-purple-500" 
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] font-sans flex items-center justify-center p-6">
      
      {/* 1. Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-xl w-full relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl mx-auto flex items-center justify-center shadow-sm mb-4 border border-white"
          >
            <Sparkles className="w-8 h-8 text-purple-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif text-gray-900"
          >
            Add Magic Elements
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500"
          >
            Enhance the surprise with personal media.
          </motion.p>
        </div>

        {/* --- MAIN CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] shadow-2xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 opacity-50" />

          {/* UPLOAD GRID */}
          <div className="space-y-4">
            
            <UploadCard 
              type="video" 
              label="Upload Video" 
              icon={Video} 
              accept="video/*" 
              inputRef={videoInputRef}
            />
            
            <UploadCard 
              type="audio" 
              label="Upload Audio" 
              icon={Music} 
              accept="audio/*" 
              inputRef={audioInputRef}
            />
            
            <UploadCard 
              type="photo" 
              label="Upload Photo" 
              icon={ImageIcon} 
              accept="image/*" 
              inputRef={photoInputRef}
            />

          </div>

          {/* NOTE */}
          <div className="text-center mt-8 mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100 text-yellow-800 text-xs font-medium">
               <Lock className="w-3 h-3" />
               These will appear AFTER they unlock the treasure ✨
            </div>
          </div>

          {/* PROCEED BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProceed}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg shadow-xl shadow-pink-200 hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
          >
             {/* Shine Effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
             {isSubmitting ? (
               <span className="flex items-center gap-2">
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                 Processing...
               </span>
             ) : (
               <>
                 Proceed to Payment
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </>
             )}
          </motion.button>

        </motion.div>

        {/* Footer Link */}
        <div className="text-center mt-8">
            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">
              Cancel & Return Home
            </Link>
        </div>

      </div>
    </div>
  );
}