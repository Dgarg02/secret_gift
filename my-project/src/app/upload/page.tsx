"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Video, Music, Image as ImageIcon,
  UploadCloud, X, Check, ArrowRight,
  Sparkles, Lock
} from "lucide-react";
import Link from "next/link";

const API_URL = "https://nationalistically-parisonic-tim.ngrok-free.dev";

interface FileState {
  name: string | null;
  uploading: boolean;
  done: boolean;
}

export default function UploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const giftId = searchParams.get("giftId");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [files, setFiles] = useState<Record<string, FileState>>({
    video: { name: null, uploading: false, done: false },
    audio: { name: null, uploading: false, done: false },
    photo: { name: null, uploading: false, done: false },
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const uploadToBackend = async (file: File, type: string) => {
    if (!giftId) throw new Error("Gift ID missing");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/media/${giftId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
  };

  const handleFileChange = async (
    type: "video" | "audio" | "photo",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles(prev => ({
      ...prev,
      [type]: { ...prev[type], uploading: true }
    }));

    try {
      await uploadToBackend(file, type);

      setFiles(prev => ({
        ...prev,
        [type]: { name: file.name, uploading: false, done: true }
      }));
    } catch {
      setFiles(prev => ({
        ...prev,
        [type]: { name: null, uploading: false, done: false }
      }));
      alert("Upload failed");
    }
  };

  const removeFile = (type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles(prev => ({
      ...prev,
      [type]: { name: null, uploading: false, done: false }
    }));
  };

  const handleProceed = () => {
    setIsSubmitting(true);
    router.push(`/payment?giftId=${giftId}`);
  };

  const UploadCard = ({
    type,
    label,
    icon: Icon,
    accept,
    inputRef,
  }: any) => {
    const state = files[type];

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => !state.done && inputRef.current?.click()}
        className={`rounded-3xl p-1 cursor-pointer ${
          state.done ? "bg-green-50 border-green-200" : "bg-white/40 border"
        }`}
      >
        <input
          type="file"
          ref={inputRef}
          accept={accept}
          className="hidden"
          onChange={(e) => handleFileChange(type, e)}
        />

        <div className="bg-white/60 rounded-2xl p-4 flex justify-between items-center h-24">
          <div className="flex gap-4 items-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              state.done ? "bg-green-500 text-white" : "bg-white"
            }`}>
              {state.uploading ? (
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
              ) : state.done ? (
                <Check />
              ) : (
                <Icon />
              )}
            </div>

            <div>
              <div className="font-bold">
                {state.done ? "Uploaded" : label}
              </div>
              <div className="text-xs text-gray-500">
                {state.uploading ? "Uploading..." : state.name || "(optional)"}
              </div>
            </div>
          </div>

          {state.done && (
            <button onClick={(e) => removeFile(type, e)}>
              <X />
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full">

        <h1 className="text-center text-4xl font-bold mb-8">
          Add Magic Elements ✨
        </h1>

        <div className="space-y-4">
          <UploadCard type="video" label="Upload Video" icon={Video} accept="video/*" inputRef={videoInputRef} />
          <UploadCard type="audio" label="Upload Audio" icon={Music} accept="audio/*" inputRef={audioInputRef} />
          <UploadCard type="photo" label="Upload Photo" icon={ImageIcon} accept="image/*" inputRef={photoInputRef} />
        </div>

        <motion.button
          onClick={handleProceed}
          className="w-full mt-8 py-4 bg-purple-600 text-white rounded-xl font-bold"
        >
          Proceed to Payment <ArrowRight />
        </motion.button>

        <div className="text-center mt-6">
          <Link href="/">Cancel & Return Home</Link>
        </div>
      </div>
    </div>
  );
}
