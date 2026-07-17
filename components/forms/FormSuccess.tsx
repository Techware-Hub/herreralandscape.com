import { CheckCircle2, Phone } from "lucide-react";
import Button from "@/components/common/Button";
import { siteConfig, telHref } from "@/lib/site";

/** Shown after a successful form submission with clear next steps. */
export default function FormSuccess({
  title = "Thank you — your request has been sent!",
  steps,
  onReset,
}: {
  title?: string;
  steps?: string[];
  onReset?: () => void;
}) {
  const defaultSteps = [
    "We've received your details and will review them shortly.",
    "A member of our team will reach out to discuss your project.",
    "We'll schedule a visit and provide a clear, free estimate.",
  ];
  return (
    <div className="rounded-2xl border border-grass-200 bg-grass-50 p-6 text-center sm:p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-grass-500 text-white">
        <CheckCircle2 className="h-8 w-8" aria-hidden />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-forest-900">{title}</h3>
      <ol className="mx-auto mt-5 max-w-md space-y-2 text-left text-sm text-stone-700">
        {(steps ?? defaultSteps).map((step, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-600 text-[11px] font-bold text-white">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href={telHref} variant="primary">
          <Phone className="h-4 w-4" aria-hidden />
          Call {siteConfig.phone}
        </Button>
        {onReset && (
          <Button variant="ghost" onClick={onReset}>
            Submit another request
          </Button>
        )}
      </div>
    </div>
  );
}
