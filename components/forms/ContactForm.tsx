"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Send } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { FieldWrap, TextInput, TextArea } from "./fields";
import FormSuccess from "./FormSuccess";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Unexpected error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <FormSuccess
        title="Thanks for reaching out — we'll be in touch soon!"
        steps={[
          "We've received your message.",
          "We'll review it and respond during business hours.",
          "Need a faster reply? Call or text us anytime.",
        ]}
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="c_company">Company</label>
        <input id="c_company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {serverError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label="Name" htmlFor="name" required error={errors.name?.message}>
          <TextInput id="name" placeholder="Your name" autoComplete="name" error={!!errors.name} {...register("name")} />
        </FieldWrap>
        <FieldWrap label="Email" htmlFor="c_email" required error={errors.email?.message}>
          <TextInput id="c_email" type="email" placeholder="you@example.com" autoComplete="email" error={!!errors.email} {...register("email")} />
        </FieldWrap>
        <FieldWrap label="Phone" htmlFor="c_phone" error={errors.phone?.message} hint="Optional">
          <TextInput id="c_phone" type="tel" placeholder="(650) 000-0000" autoComplete="tel" error={!!errors.phone} {...register("phone")} />
        </FieldWrap>
        <FieldWrap label="Subject" htmlFor="subject" required error={errors.subject?.message}>
          <TextInput id="subject" placeholder="How can we help?" error={!!errors.subject} {...register("subject")} />
        </FieldWrap>
      </div>

      <FieldWrap label="Message" htmlFor="c_message" required error={errors.message?.message}>
        <TextArea id="c_message" placeholder="Tell us a bit about what you need." error={!!errors.message} {...register("message")} />
      </FieldWrap>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-forest-700 disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner /> Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
