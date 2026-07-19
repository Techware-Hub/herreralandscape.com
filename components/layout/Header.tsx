"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, telHref } from "@/lib/site";
import { mainNav, servicesNav } from "@/lib/nav";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown when the route changes (React render-time reset pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-earth-500/15 bg-beige-50/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-beige-50/80"
          : "bg-beige-50/60 backdrop-blur-sm"
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Logo compact={scrolled} />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {mainNav.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href="/services"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      isActive("/services")
                        ? "text-forest-800"
                        : "text-stone-700 hover:text-forest-700"
                    )}
                  >
                    Services
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        servicesOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-2">
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
                        {servicesNav.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="rounded-lg px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-forest-50 hover:text-forest-800"
                          >
                            {s.label}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="col-span-2 mt-1 rounded-lg bg-forest-50 px-3 py-2 text-center text-sm font-semibold text-forest-700 hover:bg-forest-100"
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-forest-800"
                      : "text-stone-700 hover:text-forest-700"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-50"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
            </a>
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-medium text-stone-700 hover:text-forest-700"
            >
              Customer Login
            </Link>
            <Button href="/quote" size="sm">
              Request a Free Quote
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={telHref}
              aria-label={`Call ${siteConfig.phone}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest-800 hover:bg-forest-50"
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
