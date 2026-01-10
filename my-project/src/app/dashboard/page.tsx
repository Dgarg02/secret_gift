"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Plus, Search, Gift, Clock, Eye, 
  MoreHorizontal, Copy, Check, ExternalLink,
  Sparkles, Heart, Crown
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_GIFTS = [
  {
    id: "g1",
    title: "Happy Anniversary ❤️",
    recipient: "Priya",
    type: "Magic Experience",
    status: "opened",
    date: "2 mins ago",
    views: 4,
    link: "makethemsmile.com/x9z2"
  },
  {
    id: "g2",
    title: "Open When You Miss Me",
    recipient: "Rahul",
    type: "Basic Reveal",
    status: "locked",
    date: "Created yesterday",
    views: 0,
    link: "makethemsmile.com/a4b1"
  },
  {
    id: "g3",
    title: "Sorry for last night 🥺",
    recipient: "Unknown",
    type: "Draft",
    status: "draft",
    date: "Edited 1h ago",
    views: 0,
    link: ""
  }
];

export default function Dashboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      opened: "bg-green-100 text-green-700 border-green-200",
      locked: "bg-blue-50 text-blue-700 border-blue-100",
      draft: "bg-gray-100 text-gray-500 border-gray-200"
    };
    
    const labels = {
      opened: "Unlocked ✨",
      locked: "Locked 🔒",
      draft: "Draft 📝"
    };

    return (
      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] font-sans p-6 md:p-10">
      
      {/* 1. Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest"
             >
               <Crown className="w-3 h-3 text-yellow-500" /> Premium Member
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-4xl md:text-5xl font-serif text-gray-900"
             >
               Hello, Arjun.
             </motion.h1>
             <p className="text-gray-500">You've created 3 smiles so far.</p>
          </div>

          {/* Stats Pills */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <div className="bg-white/60 border border-white rounded-2xl p-4 shadow-sm min-w-[120px]">
               <div className="text-2xl font-serif text-gray-900">12</div>
               <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Views</div>
            </div>
            <div className="bg-white/60 border border-white rounded-2xl p-4 shadow-sm min-w-[120px]">
               <div className="text-2xl font-serif text-gray-900">100%</div>
               <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Smile Rate</div>
            </div>
          </motion.div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. CREATE NEW CARD (First Item) */}
          <Link href="/makepass">
            <motion.div 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
              whileTap={{ scale: 0.98 }}
              className="h-full min-h-[220px] rounded-[2rem] border-2 border-dashed border-gray-300 hover:border-pink-300 bg-white/30 flex flex-col items-center justify-center gap-4 cursor-pointer group transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-700 group-hover:text-gray-900">Create New Gift</h3>
                <p className="text-xs text-gray-400 mt-1">Start a new magical surprise</p>
              </div>
            </motion.div>
          </Link>

          {/* 2. GIFT LIST (Mapped) */}
          {MOCK_GIFTS.map((gift, i) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/50 ${
                   gift.type.includes("Magic") ? "bg-gradient-to-br from-purple-100 to-pink-50 text-purple-600" : "bg-gray-50 text-gray-500"
                }`}>
                  {gift.type.includes("Magic") ? <Sparkles className="w-6 h-6" /> : <Gift className="w-6 h-6" />}
                </div>
                
                <div className="flex gap-2">
                  <StatusBadge status={gift.status} />
                  <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 truncate">{gift.title}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {gift.date}
                </p>
              </div>

              {/* Stats & Actions */}
              {gift.status !== "draft" ? (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <Eye className="w-4 h-4" /> {gift.views} Views
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Copy Link */}
                    <button 
                      onClick={() => handleCopy(gift.id, gift.link)}
                      className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors tooltip"
                      title="Copy Link"
                    >
                      {copiedId === gift.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    {/* View */}
                    <Link href={`/view/${gift.id}`}>
                      <button className="p-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100">
                  <Link href="/makepass">
                    <button className="w-full py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                      Continue Editing
                    </button>
                  </Link>
                </div>
              )}

              {/* Subtle Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50/0 to-purple-50/0 opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500" />
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}