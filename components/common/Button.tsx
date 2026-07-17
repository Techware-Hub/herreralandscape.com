import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold" | "lavender";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Deep forest green — the wordmark color
  primary:
    "bg-forest-700 text-warm-cream shadow-sm hover:bg-forest-800 hover:shadow-md active:scale-[0.98]",
  // Moss / olive foliage green
  secondary:
    "bg-grass-600 text-warm-cream shadow-sm hover:bg-grass-700 hover:shadow-md active:scale-[0.98]",
  outline:
    "border-2 border-forest-700 text-forest-800 hover:bg-forest-700 hover:text-warm-cream",
  ghost: "text-forest-800 hover:bg-forest-50",
  // Warm cream / stone-pathway button — high contrast on dark green heroes
  gold: "bg-warm-cream text-forest-800 shadow-sm ring-1 ring-earth-500/20 hover:bg-soft-sand active:scale-[0.98]",
  // Muted lavender floral accent — use sparingly
  lavender:
    "bg-lavender-500 text-warm-cream shadow-sm hover:bg-lavender-600 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(rest as ComponentProps<"a">)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
