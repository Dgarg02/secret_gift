"use client";

import { motion } from "framer-motion";
import { FiUploadCloud, FiX } from "react-icons/fi";

export default function MediaUploader({ media, setMedia }: any) {
  const handleUpload = (files: FileList | null) => {
    if (!files) return;

    const updated = [...media];
    Array.from(files).forEach((file) => {
      updated.push({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image") ? "image" : "video",
      });
    });

    setMedia(updated);
  };

  const removeMedia = (i: number) => {
    const copy = [...media];
    copy.splice(i, 1);
    setMedia(copy);
  };

  return (
    <div className="mt-8">
      {/* LABEL */}
      <label className="block text-lg font-semibold text-gray-700 mb-3">
        Add Media
      </label>

      {/* UPLOAD BOX */}
      <label
        className="group cursor-pointer flex flex-col items-center justify-center gap-2 
      border-2 border-dashed border-purple-300 rounded-2xl py-10 bg-white/50 backdrop-blur 
      hover:border-purple-500 hover:bg-purple-50/40 transition-all"
      >
        <FiUploadCloud size={40} className="text-purple-500 group-hover:scale-110 transition" />
        <span className="text-gray-700 font-medium">Upload Photos or Videos</span>

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </label>

      {/* PREVIEW GRID */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {media.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              {item.type === "image" ? (
                <img src={item.url} className="w-full h-32 object-cover" />
              ) : (
                <video src={item.url} className="w-full h-32 object-cover" />
              )}

              <button
                onClick={() => removeMedia(i)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow"
              >
                <FiX size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
