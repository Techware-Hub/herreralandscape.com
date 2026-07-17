import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import AuthForm from "@/components/forms/AuthForm";
import Logo from "@/components/common/Logo";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Login",
  description:
    "Sign in to your Herrera Landscape customer account to view quotes, projects, appointments, documents, and invoices.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const isSignup = mode === "signup";

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/hero/hero-2.svg"
          alt="Herrera Landscape outdoor project"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/60 to-forest-800/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="font-display text-3xl font-semibold">Your projects, all in one place</h2>
          <p className="mt-3 max-w-md text-beige-100/90">
            Track quotes, project progress, appointments, documents, and invoices from your Herrera
            Landscape customer dashboard.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-beige-100/90">
            {["Quote & project status", "Appointments & updates", "Documents & invoices"].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-grass-300" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-3xl font-semibold text-forest-900">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-stone-600">
            {isSignup
              ? "Sign up to access your customer dashboard."
              : "Sign in to your customer dashboard."}
          </p>

          <div className="mt-8">
            <Suspense fallback={<div className="py-10 text-center"><LoadingSpinner label="Loading form" /></div>}>
              <AuthForm mode={isSignup ? "signup" : "login"} />
            </Suspense>
          </div>

          <p className="mt-8 text-center text-xs text-stone-400">
            Protected customer area for {siteConfig.name}.{" "}
            <Link href="/" className="underline hover:text-stone-600">
              Return home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
