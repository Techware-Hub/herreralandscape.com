"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/**
 * Draggable before/after comparison slider. Works with mouse, touch, and
 * keyboard (arrow keys move the divider).
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  // Track container width so the clipped "before" image can match it exactly
  // (avoids reading the ref during render).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => dragging.current && setFromClientX(e.clientX);
    const onTouch = (e: TouchEvent) =>
      dragging.current && e.touches[0] && setFromClientX(e.touches[0].clientX);
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/2] w-full select-none overflow-hidden rounded-2xl border border-stone-200 shadow-sm"
    >
      {/* After (base layer) */}
      <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width:768px) 100vw, 700px" className="object-cover" />
      <span className="absolute right-3 top-3 rounded-full bg-forest-700/90 px-2.5 py-1 text-xs font-semibold text-white">
        After
      </span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: width || "100%" }}>
          <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width:768px) 100vw, 700px" className="object-cover" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-2.5 py-1 text-xs font-semibold text-white">
          Before
        </span>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          aria-label="Drag to compare before and after"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-forest-700 shadow-lg ring-2 ring-forest-600"
        >
          <MoveHorizontal className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
