import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-lg focus-visible:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} — Herrera Landscape service in Sunnyvale`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-forest-700 shadow-sm">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-forest-900">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{service.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-grass-600">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
