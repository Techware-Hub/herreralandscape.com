"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Trees } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * next/image wrapper with a branded fallback. If an image ever fails to load,
 * it shows a Herrera-green panel with a leaf icon instead of a broken-image
 * glyph — keeping the intended aspect ratio. All current paths are verified, so
 * the fallback should not normally appear.
 */
export default function SmartImage({
  className,
  alt,
  fallbackClassName,
  ...props
}: ImageProps & { fallbackClassName?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={typeof alt === "string" && alt ? alt : "Herrera Landscape"}
        role="img"
        className={cn(
          "flex h-full w-full items-center justify-center bg-forest-800 text-grass-300",
          fallbackClassName,
          className
        )}
      >
        <Trees className="h-10 w-10 opacity-70" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      className={className}
      alt={alt}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
