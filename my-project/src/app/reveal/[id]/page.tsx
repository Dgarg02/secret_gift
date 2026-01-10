"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/reveal/PasswordGate";
import MagicReveal from "@/components/reveal/MagicReveal";

export default function RevealPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState<any>(null);
  const [unlocked, setUnlocked] = useState(false);

  // Fetch message metadata
  useEffect(() => {
    async function fetchMessage() {
      const res = await fetch(`/api/message/${id}`);
      const data = await res.json();

      if (data.success) setMessageData(data.message);
      setLoading(false);
    }
    fetchMessage();
  }, [id]);

  if (loading) return <div className="text-center py-32 text-xl">Loading…</div>;

  if (!messageData)
    return <div className="text-center py-32 text-xl text-red-500">Message not found.</div>;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {!unlocked ? (
        <PasswordGate messageId={id} onUnlock={() => setUnlocked(true)} />
      ) : (
        <MagicReveal data={messageData} />
      )}
    </main>
  );
}
