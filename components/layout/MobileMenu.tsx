"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig, telHref, mailtoHref } from "@/lib/site";
import { mainNav, servicesNav } from "@/lib/nav";
import Button from "@/components/common/Button";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change (render-time reset pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest-800 hover:bg-forest-50"
      >
        <Menu className="h-6 w-6" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-beige-50 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
                <span className="font-display text-lg font-semibold text-forest-800">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest-800 hover:bg-forest-100"
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
                <ul className="space-y-1">
                  {mainNav.map((link) =>
                    link.label === "Services" ? (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          aria-expanded={servicesOpen}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-forest-900 hover:bg-forest-50"
                        >
                          Services
                          <ChevronDown
                            className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")}
                            aria-hidden
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-3"
                            >
                              <li>
                                <Link
                                  href="/services"
                                  className="block rounded-lg px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-50"
                                >
                                  All Services
                                </Link>
                              </li>
                              {servicesNav.map((s) => (
                                <li key={s.href}>
                                  <Link
                                    href={s.href}
                                    className="block rounded-lg px-4 py-2 text-sm text-stone-700 hover:bg-forest-50"
                                  >
                                    {s.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-base font-medium hover:bg-forest-50",
                            pathname === link.href ? "text-forest-800" : "text-forest-900"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                  <li>
                    <Link
                      href="/login"
                      className="block rounded-xl px-4 py-3 text-base font-medium text-forest-900 hover:bg-forest-50"
                    >
                      Customer Login
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="space-y-3 border-t border-stone-200 px-5 py-4">
                <Button href="/quote" className="w-full" size="md">
                  Request a Free Quote
                </Button>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <a href={telHref} className="inline-flex items-center gap-1.5 font-medium text-forest-800">
                    <Phone className="h-4 w-4" aria-hidden /> Call
                  </a>
                  <a href={mailtoHref} className="inline-flex items-center gap-1.5 font-medium text-forest-800">
                    <Mail className="h-4 w-4" aria-hidden /> Email
                  </a>
                </div>
                <p className="text-center text-xs text-stone-500">{siteConfig.phone}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
