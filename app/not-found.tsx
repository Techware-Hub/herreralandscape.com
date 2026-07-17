import Link from "next/link";
import { Home, Search, Phone } from "lucide-react";
import Button from "@/components/common/Button";
import { mainNav } from "@/lib/nav";
import { siteConfig, telHref } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-forest-900 px-4 py-20 text-center text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(60% 60% at 50% 30%, rgba(102,160,46,0.35), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative max-w-lg">
        <p className="font-display text-7xl font-bold text-grass-400 sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Page Not Found</h1>
        <p className="mt-3 text-beige-100/90">
          The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you back
          on track.
        </p>

        <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="gold" size="lg">
            <Home className="h-5 w-5" aria-hidden /> Back to Home
          </Button>
          <Button href="/quote" size="lg" className="bg-white/10 ring-1 ring-white/30 hover:bg-white/20">
            <Search className="h-5 w-5" aria-hidden /> Request a Quote
          </Button>
        </div>

        <nav className="mt-10" aria-label="Helpful links">
          <p className="text-sm font-semibold uppercase tracking-wider text-grass-300">Popular pages</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-beige-100/80 hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={telHref} className="mt-8 inline-flex items-center gap-2 text-sm text-beige-100/80 hover:text-white">
          <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
