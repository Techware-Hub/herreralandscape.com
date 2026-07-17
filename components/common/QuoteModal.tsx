"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { siteConfig, telHref } from "@/lib/site";

const SESSION_KEY = "hl_quote_modal_shown";
const DELAY_MS = 25000; // show after ~25s of engagement

/**
 * Delayed / exit-intent quote modal. Appears at most once per browser session,
 * either after a delay or when the pointer leaves the top of the viewport
 * (desktop exit intent). Never appears on the quote page itself.
 */
export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/quote") return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const show = () => {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    const timer = window.setTimeout(show, DELAY_MS);

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={close} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-stone-600 hover:bg-stone-100"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="bg-forest-700 px-6 py-8 text-center text-white">
              <p className="text-sm font-semibold uppercase tracking-wider text-grass-300">
                Free Estimate
              </p>
              <h2 id="quote-modal-title" className="mt-2 font-display text-2xl font-semibold">
                Planning an outdoor project?
              </h2>
              <p className="mt-2 text-sm text-beige-100/90">
                Get a free, no-pressure quote for landscaping, hardscaping, pavers, fencing, and more
                in {siteConfig.location.city} and the Bay Area.
              </p>
            </div>
            <div className="space-y-3 p-6">
              <Button href="/quote" className="w-full" size="lg" onClick={close}>
                Request a Free Quote
              </Button>
              <Button href={telHref} variant="outline" className="w-full" size="md">
                <Phone className="h-4 w-4" aria-hidden />
                Call {siteConfig.phone}
              </Button>
              <button
                type="button"
                onClick={close}
                className="w-full pt-1 text-center text-sm text-stone-500 hover:text-stone-700"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
