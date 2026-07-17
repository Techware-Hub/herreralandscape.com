import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const LOGO_SRC = "/assets/logo/herrera-landscape-logo.png";

/**
 * Brand logo. Renders the original transparent logo (unmodified, original
 * proportions) via next/image. The logo already contains the full "Herrera
 * Landscape" wordmark, so no separate text lockup is needed.
 *
 * On dark backgrounds (`light`), the deep-green wordmark is placed on a warm
 * cream chip so it stays legible without altering the artwork itself.
 */
export default function Logo({
  className,
  light = false,
  compact = false,
}: {
  className?: string;
  light?: boolean;
  compact?: boolean;
}) {
  const size = compact ? 48 : 64;

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-xl transition-all",
          light && "bg-warm-cream p-1.5 shadow-sm ring-1 ring-black/5"
        )}
      >
        <Image
          src={LOGO_SRC}
          alt={`${siteConfig.name} logo`}
          width={size}
          height={size}
          priority
          className={cn(
            "h-auto w-auto object-contain transition-all",
            compact ? "h-12" : "h-16"
          )}
          sizes="64px"
        />
      </span>
    </Link>
  );
}
