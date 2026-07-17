import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/site";

/**
 * Fixed bottom contact bar shown on mobile only. Provides one-tap call, WhatsApp,
 * and quote actions. Body padding-bottom is handled by page spacing.
 */
export default function MobileContactBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-stone-200 bg-white/95 backdrop-blur sm:hidden"
    >
      <a
        href={telHref}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-forest-800"
      >
        <Phone className="h-5 w-5" aria-hidden />
        Call
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 border-x border-stone-200 py-2.5 text-xs font-medium text-forest-800"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        WhatsApp
      </a>
      <Link
        href="/quote"
        className="flex flex-col items-center justify-center gap-0.5 bg-forest-700 py-2.5 text-xs font-semibold text-white"
      >
        <FileText className="h-5 w-5" aria-hidden />
        Free Quote
      </Link>
    </nav>
  );
}
