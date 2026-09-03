import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Waveform from "@/components/Waveform";
import PartnerBand from "@/components/PartnerBand";
import { PageHero } from "@/components/ui";
import { buckets, mission, org, scholarship, william } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Miriam D. Rivera",
  description:
    "Stay Inspired Knowledge Is Power LLC was founded by Miriam D. Rivera to promote mental health, break the stigma, and fund the William Rivera Memorial Scholarship.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Motivated to
            <br />
            change the stigma.
          </>
        }
        wave="calm"
        lede={mission.statement}
      />

      {/* Mission + portrait */}
      <section className="on-coal">
        <div className="shell band">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-4/5 overflow-hidden bg-slate">
                <Image
                  src="/photos/miriam-apron.jpg"
                  alt="Miriam D. Rivera wearing one of her aprons"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <p className="eyebrow mt-4">{org.founder}, founder</p>
            </Reveal>

            <div className="prose-body lg:col-span-7">
              <p className="eyebrow">The company</p>
              <h2 className="display d2 mt-4">
                Fashion, art and design, doing a job they are rarely asked to do
              </h2>
              <div className="mt-7 space-y-4">
                <p>
                  {org.name} is motivated and inspired to change the stigma of mental
                  health and addiction through fashion, art and design. It sells shirts,
                  aprons, tumblers and bracelets, speaks in schools, publishes education on
                  substance use, points people toward real help, and funds a scholarship.
                </p>
                <p>
                  Those five things are one thing. A shirt gets someone to ask a question. A
                  talk gives a room the language to answer it. A resource list gives a
                  family a phone number. And a scholarship makes sure a student who grew up
                  in the middle of all of it still gets to finish school.
                </p>
              </div>

              <blockquote className="mt-10 border-l-2 border-rose pl-6">
                <p className="quote">&ldquo;{mission.vision}&rdquo;</p>
                <footer className="eyebrow mt-4">{org.founder}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* William */}
      <section className="on-bone">
        <div className="shell band">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">The name on the fund</p>
              <h2 className="display d2 mt-4">William Rivera</h2>
            </Reveal>
            <Reveal className="mt-9" delay={120}>
              <Waveform variant="silence" count={130} height={64} color="var(--color-rose)" />
            </Reveal>
            <Reveal className="prose-body mt-10 text-left" delay={200}>
              <p>
                Miriam lost her father due to mental health and substance use. The{" "}
                {scholarship.name} carries his name, and it exists for a specific student:
                the one whose parent lives with a mental illness or a substance use
                disorder, and who is trying to get through school anyway.
              </p>
              <p>
                The award is ${scholarship.award}. One student has been funded so far. Every
                product sold moves the next one closer, which is why the merch and the
                scholarship are not two separate things on this site.
              </p>
            </Reveal>
            <Reveal className="mt-9" delay={260}>
              <Link href="/scholarship" className="btn btn-solid">
                About the fund
              </Link>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ------------------------------------------------- in memory ---- */}
      {/* PLACEHOLDER COPY — william.copy in lib/content.ts is holding text.
          Miriam is writing this section herself. Replace before launch. */}
      <section className="relative overflow-hidden border-t border-bone/10">
        <div className="shell band">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-3/4 overflow-hidden bg-slate">
                <Image
                  src={william.photos[0].src}
                  alt={william.photos[0].alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">{william.eyebrow}</p>
                <h2 className="display d2 mt-4">{william.name}</h2>
                <div className="mt-6 max-w-2xl border-l-2 border-rose/50 pl-6">
                  <p className="lede">{william.heading}</p>
                  <div className="prose-body mt-5">
                    {william.copy.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal className="mt-10" delay={120}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {william.photos.slice(1).map((ph) => (
                    <div key={ph.src} className="relative aspect-square overflow-hidden bg-slate">
                      <Image
                        src={ph.src}
                        alt={ph.alt}
                        fill
                        sizes="(min-width: 640px) 20vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Faith / verse */}
      <section className="bg-leaf text-bone">
        <div className="shell band-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-4">
              <Image
                src="/brand/seal.png"
                alt="The Stay Inspired Knowledge Is Power seal"
                width={320}
                height={320}
                className="size-32 md:size-40"
              />
            </Reveal>
            <div className="lg:col-span-8">
              <p className="quote">&ldquo;{org.verse}&rdquo;</p>
              <p className="eyebrow mt-4 !text-bone/65">{org.verseRef}</p>
              <p className="mt-6 max-w-xl text-bone/80">
                The verse on the seal is where the company name comes from. Knowledge is the
                thing that turns a private crisis into something a family can act on — which
                is the whole point of the education and the resources on this site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we do index */}
      <section>
        <div className="shell band">
          <p className="eyebrow">What the company does</p>
          <h2 className="display d2 mt-4 max-w-2xl">Five front doors, one mission</h2>
          <ul className="mt-12">
            {buckets.map((b, i) => (
              <Reveal as="li" key={b.href} delay={i * 60}>
                <Link
                  href={b.href}
                  className="group grid items-baseline gap-2 border-t border-bone/12 py-6 transition-colors hover:bg-bone/4 md:grid-cols-12 md:gap-6 md:px-2"
                >
                  <p className="eyebrow md:col-span-2 md:pt-1">{b.n}</p>
                  <h3 className="display d4 md:col-span-4 group-hover:text-rose-lit">
                    {b.title}
                  </h3>
                  <p className="muted text-sm md:col-span-5 md:pt-1">{b.blurb}</p>
                  <span
                    className="hidden text-rose-lit transition-transform duration-300 group-hover:translate-x-1.5 md:col-span-1 md:block md:pt-1 md:text-right"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
            <li className="border-t border-bone/12" />
          </ul>
        </div>
      </section>

      <PartnerBand />
    </>
  );
}
