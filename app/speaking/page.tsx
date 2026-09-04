import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PageHero, SectionHead } from "@/components/ui";
import { speaking } from "@/lib/content";

export const metadata: Metadata = {
  title: "Miriam dr. Speaks — book a speaking engagement",
  description:
    "Miriam D. Rivera speaks to schools, youth programs and community organizations about mental illness, substance use and breaking the stigma — from lived experience.",
};

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking engagements"
        title={
          <>
            <span className="nowrap">Miriam dr.</span>
            <br />
            Speaks.
          </>
        }
        wave="loud"
        lede={speaking.mission}
        mark={
          <Image
            src="/brand/speaks-logo.png"
            alt=""
            width={889}
            height={900}
            className="w-52 xl:w-64"
            priority
          />
        }
      >
        <p className="quote mb-7 max-w-xl text-gold">{speaking.tagline}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={speaking.bookingForm}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-rose"
          >
            Request a date
          </a>
          <p className="eyebrow !text-sage">{speaking.status}</p>
        </div>
      </PageHero>

      {/* Why her */}
      <section className="on-coal">
        <div className="shell band">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-3/4 overflow-hidden bg-slate">
                <Image
                  src="/photos/miriam-headshot.jpg"
                  alt="Studio headshot of Miriam D. Rivera"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <SectionHead
                eyebrow="Why schools book her"
                title="Three things a textbook cannot do"
                lede="Students can tell the difference between someone delivering a curriculum and someone describing their own house. Miriam is the second one — with the professional grounding to back it up."
              />
              <div className="mt-10 space-y-px bg-bone/12">
                {speaking.credibility.map((c, i) => (
                  <Reveal as="div" key={c.label} className="bg-coal p-7">
                    <p className={`display d3 ${["text-sage", "text-gold", "text-coral"][i] ?? "text-rose"}`}>
                      {c.label}
                    </p>
                    <p className="muted mt-3">{c.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="on-bone">
        <div className="shell band">
          <SectionHead
            eyebrow="Talks"
            title="What she can speak about"
            lede="Each talk can be shaped for a 30-minute assembly, a class period, or a longer workshop with staff."
          />
          <div className="mt-14 grid gap-px bg-ink/15 md:grid-cols-2">
            {speaking.topics.map((t, i) => (
              <Reveal as="div" key={t.title} delay={i * 70} className="bg-bone p-8">
                <h3 className="display d3">{t.title}</h3>
                <p className="muted mt-4">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences + booking */}
      <section>
        <div className="shell band">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Audiences</p>
              <h2 className="display d2 mt-4">Where she speaks</h2>
              <p className="lede mt-5 max-w-md">Youth ages 12&ndash;18.</p>
              <ul className="mt-8">
                {speaking.audiences.map((a) => (
                  <li key={a} className="flex gap-4 border-b border-bone/12 py-4">
                    <span className="mt-2.5 h-1.5 w-4 shrink-0 bg-rose" aria-hidden="true" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 lg:border-l lg:border-bone/12 lg:pl-14">
              <p className="eyebrow">Booking</p>
              <h2 className="display d2 mt-4">How to bring her in</h2>
              <ol className="mt-8 space-y-6">
                {[
                  {
                    t: "Send the details",
                    d: "Fill in the booking form with your organization, the audience and rough age range, your preferred dates, and how long you have.",
                  },
                  {
                    t: "Pick the talk",
                    d: "Miriam will suggest a topic and format that fits the room, and flag anything a school counsellor should know in advance.",
                  },
                  {
                    t: "Confirm",
                    d: "You get the agreed date, the run of the talk, and what she needs on site. Fees are discussed directly and scale with the organization.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-5">
                    <span className="display shrink-0 text-2xl text-rose">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="display d4 block">{s.t}</span>
                      <span className="muted mt-1.5 block text-sm">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={speaking.bookingForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-rose"
                >
                  Open the booking form
                </a>
                <a href={`mailto:${speaking.email}`} className="btn btn-ghost">
                  Email directly
                </a>
              </div>

              <dl className="mt-8 space-y-2 text-sm">
                <div className="flex gap-3">
                  <dt className="eyebrow w-16 shrink-0 pt-1">Email</dt>
                  <dd>
                    <a href={`mailto:${speaking.email}`} className="transition-colors hover:text-rose">
                      {speaking.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="eyebrow w-16 shrink-0 pt-1">Phone</dt>
                  <dd>
                    <a href={`tel:${speaking.phoneHref}`} className="transition-colors hover:text-rose">
                      {speaking.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="quote mt-10 max-w-md text-sage">{speaking.closing}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
