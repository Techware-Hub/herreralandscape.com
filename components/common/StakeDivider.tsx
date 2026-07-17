import { cn } from "@/lib/utils";

/**
 * Decorative divider inspired by the wooden-stake rules that flank the word
 * "LANDSCAPE" in the brand logo — two short wood-brown lines capped with small
 * square posts, with an optional muted-lavender flower dot in the center
 * (echoing the logo's lavender flower spikes).
 */
export default function StakeDivider({
  className,
  center = true,
  tone = "wood",
}: {
  className?: string;
  center?: boolean;
  tone?: "wood" | "cream";
}) {
  const line = tone === "cream" ? "bg-beige-200/70" : "bg-earth-500";
  const post = tone === "cream" ? "bg-beige-200" : "bg-earth-600";

  return (
    <span
      className={cn("inline-flex items-center gap-2 select-none", className)}
      aria-hidden="true"
    >
      <span className={cn("h-1.5 w-1.5 rounded-[2px]", post)} />
      <span className={cn("h-px w-8 rounded-full sm:w-12", line)} />
      {center ? (
        <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
          <span className="h-2.5 w-2.5 rotate-45 rounded-[3px] bg-lavender-500" />
        </span>
      ) : null}
      <span className={cn("h-px w-8 rounded-full sm:w-12", line)} />
      <span className={cn("h-1.5 w-1.5 rounded-[2px]", post)} />
    </span>
  );
}
