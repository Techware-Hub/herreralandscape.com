import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  FileText,
  FolderKanban,
  CalendarClock,
  Files,
  MessageSquare,
  Receipt,
  User,
  Info,
  Download,
  Mail,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  demoCustomer,
  demoQuotes,
  demoProjects,
  demoAppointments,
  demoDocuments,
  demoMessages,
  demoInvoices,
  demoPhotos,
} from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Your Herrera Landscape customer dashboard.",
  robots: { index: false, follow: false },
};

const statusColors: Record<string, string> = {
  New: "bg-stone-100 text-stone-700",
  "In Review": "bg-gold-300/30 text-earth-700",
  "Estimate Sent": "bg-forest-100 text-forest-700",
  Approved: "bg-grass-100 text-grass-700",
  Completed: "bg-grass-500 text-white",
  Planning: "bg-stone-100 text-stone-700",
  Scheduled: "bg-gold-300/30 text-earth-700",
  "In Progress": "bg-forest-100 text-forest-700",
  Paid: "bg-grass-100 text-grass-700",
  Due: "bg-red-100 text-red-700",
};

function Badge({ label }: { label: string }) {
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", statusColors[label] ?? "bg-stone-100 text-stone-700")}>
      {label}
    </span>
  );
}

function Card({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-forest-900">
        <Icon className="h-5 w-5 text-forest-600" aria-hidden />
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function DashboardPage() {
  let customerName = demoCustomer.name;
  let customerEmail = demoCustomer.email;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
    if (!user) redirect("/login?redirect=/dashboard");
    customerName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Customer";
    customerEmail = user.email ?? demoCustomer.email;
  }

  return (
    <DashboardShell customerName={customerName}>
      {!isSupabaseConfigured && (
        <div className="flex items-start gap-2 rounded-xl border border-gold-300 bg-gold-300/20 p-4 text-sm text-earth-800" role="status">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong>Demo mode.</strong> Authentication is not configured, so this dashboard shows
            sample data. Connect Supabase (see README) to enable secure customer logins and live
            data.
          </span>
        </div>
      )}

      {/* Overview stats */}
      <section id="overview" className="scroll-mt-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Open Quotes", value: demoQuotes.filter((q) => q.status !== "Completed").length, icon: FileText },
            { label: "Active Projects", value: demoProjects.filter((p) => p.stage !== "Completed").length, icon: FolderKanban },
            { label: "Appointments", value: demoAppointments.length, icon: CalendarClock },
            { label: "Documents", value: demoDocuments.length, icon: Files },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500">{stat.label}</span>
                <stat.icon className="h-5 w-5 text-forest-500" aria-hidden />
              </div>
              <p className="mt-2 text-3xl font-semibold text-forest-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <Card id="quotes" title="Quote Requests" icon={FileText}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                <th className="pb-2 pr-4 font-medium">Ref</th>
                <th className="pb-2 pr-4 font-medium">Service</th>
                <th className="pb-2 pr-4 font-medium">Submitted</th>
                <th className="pb-2 pr-4 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {demoQuotes.map((q) => (
                <tr key={q.id}>
                  <td className="py-3 pr-4 font-medium text-forest-900">{q.id}</td>
                  <td className="py-3 pr-4 text-stone-700">{q.service}</td>
                  <td className="py-3 pr-4 text-stone-500">{q.submittedOn}</td>
                  <td className="py-3 pr-4 text-stone-700">{q.amount ?? "—"}</td>
                  <td className="py-3"><Badge label={q.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Projects */}
      <Card id="projects" title="Projects" icon={FolderKanban}>
        <div className="grid gap-4 sm:grid-cols-2">
          {demoProjects.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border border-stone-200">
              <div className="relative aspect-[16/9]">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover"
                />
                <span className="absolute right-2 top-2">
                  <Badge label={p.stage} />
                </span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-forest-900">{p.name}</p>
                <p className="text-xs text-stone-500">Updated {p.updatedOn}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-grass-500" style={{ width: `${p.progress}%` }} />
                </div>
                <p className="mt-1 text-right text-xs text-stone-500">{p.progress}% complete</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Uploaded photos */}
      <Card id="photos" title="Uploaded Project Photos" icon={ImageIcon}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {demoPhotos.map((photo) => (
            <div key={photo.src} className="relative aspect-square overflow-hidden rounded-xl border border-stone-200">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appointments */}
        <Card id="appointments" title="Upcoming Appointments" icon={CalendarClock}>
          <ul className="space-y-3">
            {demoAppointments.map((a) => (
              <li key={a.id} className="flex items-center gap-4 rounded-xl border border-stone-200 p-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <span className="text-xs font-semibold">{a.date.split(" ")[0]}</span>
                  <span className="text-sm font-bold">{a.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div>
                  <p className="font-medium text-forest-900">{a.title}</p>
                  <p className="text-xs text-stone-500">{a.date} · {a.time} · {a.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Messages */}
        <Card id="messages" title="Messages & Updates" icon={MessageSquare}>
          <ul className="space-y-3">
            {demoMessages.map((m) => (
              <li key={m.id} className="rounded-xl border border-stone-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-forest-900">{m.from}</p>
                  <span className="text-xs text-stone-400">{m.date}</span>
                </div>
                <p className="mt-1 text-sm text-stone-600">{m.preview}</p>
                {m.unread && (
                  <span className="mt-2 inline-block rounded-full bg-grass-100 px-2 py-0.5 text-[11px] font-semibold text-grass-700">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* Documents */}
        <Card id="documents" title="Project Documents" icon={Files}>
          <ul className="divide-y divide-stone-100">
            {demoDocuments.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-forest-900">{d.name}</p>
                  <p className="text-xs text-stone-500">{d.type} · {d.date}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden /> Download
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Invoices */}
        <Card id="invoices" title="Invoices" icon={Receipt}>
          <ul className="divide-y divide-stone-100">
            {demoInvoices.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium text-forest-900">{inv.id}</p>
                  <p className="text-xs text-stone-500">{inv.project} · {inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-forest-900">{inv.amount}</span>
                  <Badge label={inv.status} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-stone-400">Invoice amounts are placeholders for demonstration.</p>
        </Card>
      </div>

      {/* Profile */}
      <Card id="profile" title="Profile" icon={User}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Name</dt>
            <dd className="mt-1 font-medium text-forest-900">{customerName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Email</dt>
            <dd className="mt-1 flex items-center gap-2 font-medium text-forest-900">
              <Mail className="h-4 w-4 text-forest-500" aria-hidden /> {customerEmail}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Member Since</dt>
            <dd className="mt-1 font-medium text-forest-900">{demoCustomer.memberSince}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Need help?</dt>
            <dd className="mt-1 flex items-center gap-2 font-medium text-forest-900">
              <Phone className="h-4 w-4 text-forest-500" aria-hidden /> {siteConfig.phone}
            </dd>
          </div>
        </dl>
      </Card>
    </DashboardShell>
  );
}
