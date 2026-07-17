import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { processSteps } from "@/data/process";

export default function ProcessSection() {
  return (
    <section className="bg-forest-900 py-16 text-white sm:py-24" aria-labelledby="process-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="How It Works"
          title="Our Simple 4-Step Process"
          description="From first call to finished project, we keep things clear and straightforward."
          light
        />

        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(({ step, title, description, icon: Icon }, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <li className="relative flex flex-col">
                {/* connector line on desktop */}
                {i < processSteps.length - 1 && (
                  <span
                    className="absolute left-6 top-6 hidden h-px w-full bg-white/15 lg:block"
                    aria-hidden
                  />
                )}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-grass-500 text-white shadow-lg">
                  <Icon className="h-6 w-6" aria-hidden />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-charcoal">
                    {step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-beige-100/80">{description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
