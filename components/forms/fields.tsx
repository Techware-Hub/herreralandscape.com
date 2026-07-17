import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-charcoal shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-500/40 disabled:opacity-60";

export function FieldWrap({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-forest-900">
        {label}
        {required && <span className="text-earth-500"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { error?: boolean }>(
  function TextInput({ className, error, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(controlBase, error ? "border-red-400" : "border-stone-300", className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }>(
  function TextArea({ className, error, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(controlBase, "min-h-28 resize-y", error ? "border-red-400" : "border-stone-300", className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }>(
  function Select({ className, error, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(controlBase, "appearance-none pr-10", error ? "border-red-400" : "border-stone-300", className)}
        aria-invalid={error || undefined}
        {...props}
      >
        {children}
      </select>
    );
  }
);
