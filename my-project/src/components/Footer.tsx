"use client";

import AnimateOnScroll from "./AnimateOnScroll";

export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-white/40 mt-20">
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-6">
            {["About", "Contact", "Privacy"].map((t) => (
              <a key={t} className="text-gray-600 hover:text-primary transition">
                {t}
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            More templates coming soon! 👀✨
          </p>
        </div>
      </AnimateOnScroll>
    </footer>
  );
}
