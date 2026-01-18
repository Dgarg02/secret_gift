"use client";

import { RotateCcw } from "lucide-react";

export default function ReplayButton({ onReplay }: { onReplay: () => void }) {
  return (
    <button
      onClick={onReplay}
      className="mt-8 px-6 py-3 bg-white/20 backdrop-blur rounded-full flex items-center gap-2 hover:bg-white/30 transition"
    >
      <RotateCcw size={18} />
      Replay Surprise
    </button>
  );
}
