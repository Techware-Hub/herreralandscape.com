"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Send } from "lucide-react";
import { quoteSchema, type QuoteFormData, budgetOptions, contactMethods } from "@/lib/validations/quote";
import { services } from "@/data/services";
import { FieldWrap, TextInput, TextArea, Select } from "./fields";
import FormSuccess from "./FormSuccess";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      service: defaultService as QuoteFormData["service"],
      propertyType: undefined,
      contactMethod: undefined,
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/quote", {
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
        title="Thank you — your quote request has been sent!"
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {serverError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label="Full Name" htmlFor="fullName" required error={errors.fullName?.message}>
          <TextInput id="fullName" placeholder="Your name" autoComplete="name" error={!!errors.fullName} {...register("fullName")} />
        </FieldWrap>
        <FieldWrap label="Email Address" htmlFor="email" required error={errors.email?.message}>
          <TextInput id="email" type="email" placeholder="you@example.com" autoComplete="email" error={!!errors.email} {...register("email")} />
        </FieldWrap>
        <FieldWrap label="Phone Number" htmlFor="phone" required error={errors.phone?.message}>
          <TextInput id="phone" type="tel" placeholder="(650) 000-0000" autoComplete="tel" error={!!errors.phone} {...register("phone")} />
        </FieldWrap>
        <FieldWrap label="City" htmlFor="city" required error={errors.city?.message}>
          <TextInput id="city" placeholder="Sunnyvale" error={!!errors.city} {...register("city")} />
        </FieldWrap>
        <FieldWrap label="Property Address" htmlFor="address" error={errors.address?.message} className="sm:col-span-2">
          <TextInput id="address" placeholder="Street address (optional)" autoComplete="street-address" error={!!errors.address} {...register("address")} />
        </FieldWrap>

        <FieldWrap label="Service Required" htmlFor="service" required error={errors.service?.message}>
          <Select id="service" error={!!errors.service} defaultValue={defaultService ?? ""} {...register("service")}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap label="Property Type" htmlFor="propertyType" required error={errors.propertyType?.message}>
          <Select id="propertyType" error={!!errors.propertyType} defaultValue="" {...register("propertyType")}>
            <option value="" disabled>
              Select type
            </option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </Select>
        </FieldWrap>

        <FieldWrap label="Preferred Contact Method" htmlFor="contactMethod" required error={errors.contactMethod?.message}>
          <Select id="contactMethod" error={!!errors.contactMethod} defaultValue="" {...register("contactMethod")}>
            <option value="" disabled>
              Select method
            </option>
            {contactMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap label="Estimated Budget" htmlFor="budget" error={errors.budget?.message}>
          <Select id="budget" defaultValue="" {...register("budget")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </FieldWrap>

        <FieldWrap label="Preferred Start Date" htmlFor="startDate" error={errors.startDate?.message} hint="Optional">
          <TextInput id="startDate" type="date" error={!!errors.startDate} {...register("startDate")} />
        </FieldWrap>
        <FieldWrap
          label="Project Photos"
          htmlFor="images"
          className="sm:col-span-1"
          hint="Optional — helps us estimate accurately"
        >
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-forest-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-forest-700"
          />
        </FieldWrap>
      </div>

      <FieldWrap label="Project Description" htmlFor="message" required error={errors.message?.message}>
        <TextArea
          id="message"
          placeholder="Tell us about your project — what you'd like done, your goals, and any details that help."
          error={!!errors.message}
          {...register("message")}
        />
      </FieldWrap>

      <div>
        <label className="flex items-start gap-3 text-sm text-stone-700">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500"
            {...register("consent")}
          />
          <span>
            I agree to be contacted by Herrera Landscape about my request via phone, text, email, or
            WhatsApp. <span className="text-earth-500">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1 text-xs font-medium text-red-600" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

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
            <Send className="h-5 w-5" aria-hidden /> Request My Free Quote
          </>
        )}
      </button>
      <p className="text-xs text-stone-500">
        Note: image uploads are captured in the form for future integration; the current demo API
        stores your text details only. See README for wiring uploads to storage.
      </p>
    </form>
  );
}
