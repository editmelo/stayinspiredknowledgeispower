import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ZipFinder from "@/components/ZipFinder";
import { PageHero } from "@/components/ui";
import { resourceGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mental health & substance use resources",
  description:
    "Crisis lines, treatment search by ZIP code, Indiana programs, and support for families and young people affected by mental illness or addiction.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Help, without
            <br />
            the runaround.
          </>
        }
        wave="calm"
        lede="Everything here is free to contact and open to anyone. You do not need a diagnosis, insurance or the right words to use it."
      />

      {/* Crisis first. Nothing sits above this. */}
      <section className="border-b border-bone/10 bg-rose text-bone">
        <div className="shell band-tight">
          <p className="eyebrow !text-bone/70">Right now</p>
          <div className="mt-5 grid gap-8 md:grid-cols-3">
            {[
              { big: "988", label: "Call or text the Suicide & Crisis Lifeline", href: "tel:988" },
              { big: "741741", label: "Text HOME to the Crisis Text Line", href: "sms:741741" },
              {
                big: "1-800-662-4357",
                label: "SAMHSA National Helpline, 24/7, English & Spanish",
                href: "tel:18006624357",
              },
            ].map((c) => (
              <a key={c.big} href={c.href} className="group block">
                <p className="display text-4xl tracking-tight transition-colors group-hover:text-ink md:text-5xl">
                  {c.big}
                </p>
                <p className="mt-2.5 text-sm text-bone/85">{c.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ZIP search */}
      <section className="on-coal">
        <div className="shell band-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="eyebrow">Find care near you</p>
              <h2 className="display d3 mt-3">Search by ZIP code</h2>
              <p className="muted mt-3 text-sm">
                Goes straight to FindTreatment.gov, the federal locator for mental health
                and substance use treatment. Opens in a new tab.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ZipFinder />
            </div>
          </div>
        </div>
      </section>

      {/* Grouped resources */}
      <section className="on-bone">
        <div className="shell band">
          <div className="space-y-16">
            {resourceGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-28">
                <Reveal>
                  <div className="flex flex-col gap-2 border-b border-ink/20 pb-5 md:flex-row md:items-end md:justify-between">
                    <h2 className="display d2">{group.title}</h2>
                    <p className="eyebrow md:pb-1">
                      {group.items.length} resources
                    </p>
                  </div>
                  <p className="lede mt-5 max-w-2xl">{group.blurb}</p>
                </Reveal>

                <ul className="mt-9 grid gap-px bg-ink/15 md:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="bg-bone">
                      <a
                        href={item.href ?? `tel:${item.tel}`}
                        target={item.href ? "_blank" : undefined}
                        rel={item.href ? "noopener noreferrer" : undefined}
                        className="group flex h-full flex-col p-7 transition-colors hover:bg-bone-2"
                      >
                        <h3 className="display d4 group-hover:text-rose">{item.name}</h3>
                        <p className="muted mt-2.5 flex-1 text-sm">{item.detail}</p>
                        <p className="cta-mini mt-5">
                          {item.href ? "Open" : "Call"}
                          <span
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="muted-2 mt-16 max-w-2xl text-sm">
            Stay Inspired Knowledge Is Power LLC shares these resources for information. It
            is not a treatment provider, and nothing here is medical advice, diagnosis or
            treatment. In an emergency, call 911 or go to your nearest emergency room.
          </p>
        </div>
      </section>
    </>
  );
}
