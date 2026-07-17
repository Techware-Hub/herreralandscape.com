import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import StakeDivider from "@/components/common/StakeDivider";

const highlights = [
  "Experienced, reliable crews",
  "Attention to every detail",
  "Clear, honest communication",
  "Focused on customer satisfaction",
];

export default function Intro() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="intro-heading">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/about/about-1.svg"
                  alt="Herrera Landscape crew working on a residential landscaping project"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden w-40 overflow-hidden rounded-2xl border-4 border-beige-50 shadow-lg sm:block">
                <div className="relative aspect-square">
                  <Image
                    src="/images/services/paver-installation.svg"
                    alt="Close-up of a completed paver installation"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grass-600">
              Welcome to Herrera Landscape
            </p>
            <StakeDivider className="mt-3" center={false} />
            <h2
              id="intro-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl"
            >
              Reliable landscaping &amp; hardscaping for homes and businesses
            </h2>
            <p className="mt-5 leading-relaxed text-stone-600">
              Herrera Landscape provides dependable landscaping and hardscaping services for
              residential and commercial properties throughout Sunnyvale and the surrounding
              communities. From fresh landscape design and paver installations to fencing,
              irrigation, and ongoing maintenance, we focus on quality workmanship and results you
              can be proud of.
            </p>
            <p className="mt-4 leading-relaxed text-stone-600">
              Whether you&apos;re refreshing a front yard or transforming an entire outdoor space, we
              work closely with you to bring your vision to life — on time and done right.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-forest-900">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-grass-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/about" variant="primary">
                Learn More About Us
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
