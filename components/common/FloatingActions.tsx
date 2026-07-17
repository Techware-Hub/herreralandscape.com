"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Sticky WhatsApp button + back-to-top, positioned above the mobile contact bar.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="hidden h-11 w-11 items-center justify-center rounded-full bg-forest-700 text-white shadow-lg transition-transform hover:scale-105 sm:inline-flex"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </button>
      )}
      <WhatsAppButton className="h-14 w-14" />
    </div>
  );
}
