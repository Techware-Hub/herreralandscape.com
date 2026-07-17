import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
        className
      )}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}
