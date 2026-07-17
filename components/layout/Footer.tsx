import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Camera, Star } from "lucide-react";
import { siteConfig, telHref, mailtoHref } from "@/lib/site";
import { mainNav, footerServiceNav, legalNav } from "@/lib/nav";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import StakeDivider from "@/components/common/StakeDivider";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-forest-900 text-beige-100">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-4">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-beige-100/70">
              Professional landscaping and hardscaping for residential and commercial properties in
              Sunnyvale and the surrounding Bay Area.
            </p>
            <StakeDivider tone="cream" center className="mt-5" />
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook (coming soon)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-beige-100 transition-colors hover:bg-grass-500 hover:text-white"
              >
                <Globe className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram (coming soon)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-beige-100 transition-colors hover:bg-grass-500 hover:text-white"
              >
                <Camera className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={siteConfig.social.yelp}
                aria-label="Yelp (coming soon)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-beige-100 transition-colors hover:bg-grass-500 hover:text-white"
              >
                <Star className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-grass-300">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-beige-100/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="text-beige-100/80 hover:text-white">
                  Customer Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-grass-300">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerServiceNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-beige-100/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-grass-300">Get in Touch</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={telHref} className="inline-flex items-center gap-2 text-beige-100/80 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-grass-300" aria-hidden /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={mailtoHref} className="inline-flex items-start gap-2 text-beige-100/80 hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-grass-300" aria-hidden />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-beige-100/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-grass-300" aria-hidden />
                {siteConfig.location.city}, {siteConfig.location.regionShort}
              </li>
            </ul>
            <Button href="/quote" size="sm" variant="gold" className="mt-5">
              Request a Free Quote
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-beige-100/60 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
