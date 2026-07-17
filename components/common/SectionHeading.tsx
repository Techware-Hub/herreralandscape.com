import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import StakeDivider from "./StakeDivider";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Render title as h1 (default h2) */
  as?: "h1" | "h2";
  light?: boolean;
  /** Show the wooden-stake divider motif (default: on for centered headings) */
  divider?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as = "h2",
  light = false,
  divider,
}: SectionHeadingProps) {
  const Tag = as;
  const showDivider = divider ?? align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-grass-300" : "text-grass-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      {showDivider && (
        <StakeDivider
          className={cn("mb-4", align === "center" ? "flex justify-center" : "")}
          tone={light ? "cream" : "wood"}
        />
      )}
      <Tag
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl",
          light ? "text-warm-cream" : "text-forest-800"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-beige-100/90" : "text-stone-600"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
