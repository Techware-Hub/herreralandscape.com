"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  CalendarClock,
  Files,
  MessageSquare,
  Receipt,
  User,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import LogoutButton from "./LogoutButton";
import { cn } from "@/lib/utils";

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "quotes", label: "Quote Requests", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "appointments", label: "Appointments", icon: CalendarClock },
  { id: "documents", label: "Documents", icon: Files },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "invoices", label: "Invoices", icon: Receipt },
  { id: "profile", label: "Profile", icon: User },
];

export default function DashboardShell({
  customerName,
  children,
}: {
  customerName: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-beige-100">
      <div className="mx-auto flex w-full max-w-7xl">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full flex-col border-r border-stone-200 bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:flex",
            open && "translate-x-0"
          )}
        >
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <Logo compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-stone-600" aria-hidden />
            </button>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Dashboard">
            {nav.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-forest-50 hover:text-forest-800"
              >
                <Icon className="h-5 w-5" aria-hidden />
                {label}
              </a>
            ))}
          </nav>
          <div className="border-t border-stone-200 p-3">
            <Link
              href="/"
              className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-stone-600 hover:bg-forest-50 hover:text-forest-800"
            >
              ← Back to website
            </Link>
            <LogoutButton className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-stone-600 hover:bg-red-50 hover:text-red-600" />
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-charcoal/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

        {/* Content */}
        <div className="flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6 text-forest-800" aria-hidden />
            </button>
            <span className="text-sm font-semibold text-forest-900">Dashboard</span>
            <LogoutButton className="text-sm font-medium text-stone-600" />
          </header>
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <p className="text-sm text-stone-500">Welcome back,</p>
            <h1 className="font-display text-2xl font-semibold text-forest-900">{customerName}</h1>
            <div className="mt-6 space-y-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
