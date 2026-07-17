"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";
import Button from "@/components/common/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-earth-100 text-earth-600">
          <AlertTriangle className="h-8 w-8" aria-hidden />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-forest-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-stone-600">
          We ran into an unexpected problem. Please try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} variant="primary">
            <RotateCw className="h-4 w-4" aria-hidden /> Try again
          </Button>
          <Button href="/" variant="outline">
            <Home className="h-4 w-4" aria-hidden /> Back home
          </Button>
        </div>
      </div>
    </div>
  );
}
