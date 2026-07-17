import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbSchema } from "./JsonLd";

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <BreadcrumbSchema items={full} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-stone-500">
          {full.map((crumb, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden />}
                {isLast ? (
                  <span className="font-medium text-forest-800" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-forest-700 hover:underline">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
