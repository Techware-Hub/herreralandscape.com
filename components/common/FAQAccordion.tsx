"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FAQ } from "@/types";
import { cn } from "@/lib/utils";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-forest-50/50"
              >
                <span className="font-medium text-forest-900">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-forest-600 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-stone-600">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
