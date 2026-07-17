"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Info, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { loginSchema, signupSchema, type LoginFormData, type SignupFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { FieldWrap, TextInput } from "./fields";
import LoadingSpinner from "@/components/common/LoadingSpinner";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData & SignupFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(isLogin ? loginSchema : (signupSchema as any)),
  });

  const onSubmit = async (data: LoginFormData & SignupFormData) => {
    setServerError(null);
    setNotice(null);

    const supabase = createClient();
    if (!supabase) {
      setNotice(
        "Authentication is not configured yet. Add your Supabase credentials to .env.local to enable customer login. See the README for step-by-step setup."
      );
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        const redirect = searchParams.get("redirect") || "/dashboard";
        router.push(redirect);
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: { data: { full_name: data.fullName } },
        });
        if (error) throw error;
        setNotice("Account created! Check your email to confirm your address, then sign in.");
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {!isSupabaseConfigured && (
        <div className="flex items-start gap-2 rounded-xl border border-gold-300 bg-gold-300/20 p-3 text-sm text-earth-800" role="status">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong>Setup needed:</strong> authentication runs on Supabase. Until credentials are
            added, this form is in demo mode. See the README to enable it.
          </span>
        </div>
      )}

      {notice && (
        <div className="flex items-start gap-2 rounded-xl border border-forest-200 bg-forest-50 p-3 text-sm text-forest-800" role="status">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {notice}
        </div>
      )}

      {serverError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </div>
      )}

      {!isLogin && (
        <FieldWrap label="Full Name" htmlFor="fullName" required error={errors.fullName?.message}>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
            <TextInput id="fullName" className="pl-9" placeholder="Your name" autoComplete="name" error={!!errors.fullName} {...register("fullName")} />
          </div>
        </FieldWrap>
      )}

      <FieldWrap label="Email" htmlFor="email" required error={errors.email?.message}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
          <TextInput id="email" type="email" className="pl-9" placeholder="you@example.com" autoComplete="email" error={!!errors.email} {...register("email")} />
        </div>
      </FieldWrap>

      <FieldWrap label="Password" htmlFor="password" required error={errors.password?.message}>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
          <TextInput
            id="password"
            type={showPw ? "text" : "password"}
            className="pl-9 pr-10"
            placeholder="••••••••"
            autoComplete={isLogin ? "current-password" : "new-password"}
            error={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            {showPw ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </FieldWrap>

      {!isLogin && (
        <FieldWrap label="Confirm Password" htmlFor="confirmPassword" required error={errors.confirmPassword?.message}>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
            <TextInput id="confirmPassword" type={showPw ? "text" : "password"} className="pl-9" placeholder="••••••••" autoComplete="new-password" error={!!errors.confirmPassword} {...register("confirmPassword")} />
          </div>
        </FieldWrap>
      )}

      {isLogin && (
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-stone-600">
            <input type="checkbox" className="h-4 w-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500" {...register("remember")} />
            Remember me
          </label>
          <Link href="/login?reset=1" className="font-medium text-forest-700 hover:underline">
            Forgot password?
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-forest-700 disabled:opacity-70"
      >
        {isSubmitting ? <LoadingSpinner /> : isLogin ? "Sign In" : "Create Account"}
      </button>

      <p className="text-center text-sm text-stone-600">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/login?mode=signup" className="font-semibold text-forest-700 hover:underline">
              Create one
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-forest-700 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
