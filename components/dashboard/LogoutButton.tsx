"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-stone-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
      }
    >
      <LogOut className="h-4 w-4" aria-hidden />
      {loading ? "Signing out…" : "Log out"}
    </button>
  );
}
