import Image from "next/image";
import Link from "next/link";
import PartnerBand from "@/components/PartnerBand";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import Waveform from "@/components/Waveform";
import WornStrip from "@/components/WornStrip";
import { Fact, SectionHead } from "@/components/ui";
import { getSquareConfig } from "@/lib/square";
import {
  buckets,
  education,
  mission,
  org,
  products,
  resourceGroups,
  scholarship,
  speaking,
} from "@/lib/content";

/** One product from each of the four categories, so the range reads at a glance. */
const featured = [
  "music-is-my-therapy",
  "mental-health-apron",
  "rock-out-tumbler",
  "mental-health-bracelet",
]
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function Home() {
  const squareReady = getSquareConfig() !== null;

  return (
    <>
      {/* ---------------------------------------------------- hero ------ */}
      <section className="relative overflow-hidden">
        <div className="grain" />
        <div className="shell relative">
          <div className="grid items-end gap-10 pt-12 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-24">
            <div className="stagger lg:col-span-7 lg:pb-6">
              <p className="eyebrow" style={{ animationDelay: "80ms" }}>
                Founded by {org.founder} · {org.region}
              </p>

              <h1
                className="display d1 mt-6"
                style={{ animationDelay: "180ms" }}
              >
                Break the
                <br />
                stigma
                <br />
                <span className="text-rose">out loud.</span>
              </h1>

              <div
                className="mt-8 max-w-xl"
                style={{ animationDelay: "380ms" }}
              >
                <Waveform
                  variant="loud"
                  count={64}
                  height={38}
                  label="Sound wave, the mark of the brand"
                />
              </div>

              <p
                className="lede mt-8 max-w-xl"
                style={{ animationDelay: "480ms" }}
              >
                Art, fashion and lived experience that make mental illness and
                addiction sayable — and put a portion of every sale into a
                scholarship for students who grew up inside it.
              </p>

              <div
                className="mt-9 flex flex-wrap gap-3"
                style={{ animationDelay: "580ms" }}
              >
                <Link href="/shop" className="btn btn-rose">
                  Shop the collection
                </Link>
                <Link href="/speaking" className="btn btn-ghost">
                  Book Miriam to speak
                </Link>
              </div>
            </div>

            {/* The portrait sits alongside the last line of the headline on wide screens. */}
            <div className="relative lg:col-span-5 lg:-ml-12">
              <div className="relative aspect-4/5 overflow-hidden bg-slate lg:aspect-3/4">
                <Image
                  src="/photos/miriam-event.jpg"
                  alt="Miriam D. Rivera wearing one of her winged-guitar designs"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
              </div>
              <p className="eyebrow mt-4">
                {org.founder} — founder and speaker
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- shop --- */}
      <section className="on-bone">
        <div className="shell band">
          <SectionHead
            eyebrow="Swag & merch"
            title="Wearable art with something to say"
            lede="Roses, wings and music notes on shirts, aprons, tumblers and bracelets. It is not generic merch: every piece is a sentence someone else can read across a room."
            link={{ label: "All products", href: "/shop" }}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60} className="h-full">
                <ProductCard
                  product={p}
                  priority={i < 4}
                  squareReady={squareReady}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="pb-16 md:pb-24">
          <div className="shell mb-8">
            <p className="eyebrow">Worn across Indiana</p>
          </div>
          <WornStrip />
        </div>
      </section>

      {/* -------------------------------------------------- the pledge -- */}
      {/* Deep green is the fund's colour throughout the site — it comes from
          the leaves of the rose on Miriam's seal. */}
      <section className="bg-leaf text-bone">
        <div className="shell band-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="eyebrow !text-bone/65">
                The promise behind every product
              </p>
              <p className="quote mt-4">
                A portion of all proceeds goes into the William Rivera Memorial
                Scholarship Fund.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="flex flex-wrap gap-x-14 gap-y-8">
                <div>
                  <p className="stat-n">${scholarship.award}</p>
                  <p className="eyebrow mt-2 !text-bone/65">Award</p>
                </div>
                <div>
                  <p className="stat-n">{scholarship.recipientsToDate}</p>
                  <p className="eyebrow mt-2 !text-bone/65">Student funded</p>
                </div>
              </div>
              <p className="mt-8 max-w-md text-bone/80">
                Open to high school, college and trade students who have a
                parent diagnosed with a mental illness or a substance use
                disorder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ what we do ---- */}
      <section className="on-coal">
        <div className="shell band">
          <SectionHead
            eyebrow="Five ways this company works"
            title={
              <>
                One mission,
                <br />
                five front doors.
              </>
            }
            lede={mission.statement}
            link={{ label: "About the company", href: "/about" }}
          />

          <ul className="mt-14">
            {buckets.map((b, i) => (
              <Reveal as="li" key={b.href} delay={i * 70}>
                <Link
                  href={b.href}
                  className="group grid items-baseline gap-2 border-t border-bone/12 py-7 transition-colors hover:bg-bone/4 md:grid-cols-12 md:gap-6 md:px-2"
                >
                  <p className="eyebrow md:col-span-2 md:pt-1">{b.n}</p>
                  <h3 className="display d3 md:col-span-4 group-hover:text-rose">
                    {b.title}
                  </h3>
                  <p className="muted md:col-span-5 md:pt-1">{b.blurb}</p>
                  <span
                    className="hidden text-rose transition-transform duration-300 group-hover:translate-x-1.5 md:col-span-1 md:block md:pt-1 md:text-right"
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

      {/* ---------------------------------------------------- speaking -- */}
      <section className="relative overflow-hidden">
        {/* The only place the speaking logo's pastels appear at any size. */}
        <div className="speaks-wash" />
        <div className="shell band relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-3/4 overflow-hidden bg-slate">
                <Image
                  src="/photos/miriam-headshot.jpg"
                  alt="Studio headshot of Miriam D. Rivera"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Speaking engagements</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-5">
                  <Image
                    src="/brand/speaks-logo.png"
                    alt=""
                    width={889}
                    height={900}
                    className="w-24 shrink-0 md:w-32"
                  />
                  <div>
                    <h2 className="display d2">
                      <span className="nowrap">Miriam dr.</span> Speaks
                    </h2>
                    <p className="eyebrow mt-2.5 !text-gold">
                      {speaking.tagline}
                    </p>
                  </div>
                </div>
                <p className="lede mt-7 max-w-2xl">{speaking.lede}</p>
              </Reveal>

              <dl className="mt-10">
                {speaking.credibility.map((c, i) => (
                  <Reveal as="div" key={c.label} delay={i * 70}>
                    <div className="grid gap-1.5 border-t border-bone/12 py-6 md:grid-cols-3 md:gap-8">
                      <dt
                        className={`display d4 ${["text-sage", "text-gold", "text-coral"][i] ?? "text-rose"}`}
                      >
                        {c.label}
                      </dt>
                      <dd className="muted md:col-span-2">{c.body}</dd>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-bone/12" />
              </dl>

              <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={speaking.bookingForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-rose"
                >
                  Request a date
                </a>
                <Link href="/speaking" className="tlink">
                  <span>See topics</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </Reveal>
              <Reveal className="mt-6">
                <p className="eyebrow !text-sage">{speaking.status}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- learn -- */}
      <section className="on-coal">
        <div className="shell band">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead
                eyebrow="Education"
                title="How addiction happens"
                lede={education.lede}
              />
              <dl className="mt-10 space-y-8">
                {education.points.map((p, i) => (
                  <Reveal as="div" key={p.label} delay={i * 70}>
                    <dt className="display d4">{p.label}</dt>
                    <dd className="muted mt-2.5">{p.body}</dd>
                  </Reveal>
                ))}
              </dl>
              <Link href="/learn" className="tlink mt-9">
                <span>Go to the lesson</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Reveal className="lg:col-span-7">
              <VideoEmbed id={education.videoId} title={education.videoTitle} />
              <p className="muted-2 mt-4 text-xs">
                Video plays from YouTube. Nothing loads until you press play.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- scholarship -- */}
      {/* The waveform holds a silence through the middle of this section,
          then comes back louder. It is the only place that variant is used. */}
      <section className="on-bone">
        <div className="shell band">
          <Reveal>
            <p className="eyebrow">Scholarship</p>
            <h2 className="display d2 mt-4 max-w-3xl">
              The William Rivera Memorial Scholarship Fund
            </h2>
          </Reveal>

          <Reveal className="mt-10" delay={120}>
            <Waveform
              variant="silence"
              count={150}
              height={72}
              color="var(--color-rose)"
            />
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="lede">{scholarship.lede}</p>
              <div className="mt-9 grid grid-cols-2 gap-8">
                <Fact
                  value={`$${scholarship.award}`}
                  label="Award amount"
                  detail="Paid toward tuition or documented educational expenses."
                />
                <Fact
                  value={String(scholarship.recipientsToDate)}
                  label="Student funded so far"
                  detail="Every product sold moves the next one closer."
                />
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/scholarship" className="btn btn-solid">
                  Apply for the scholarship
                </Link>
                <Link href="/scholarship#donate" className="btn btn-ghost">
                  Donate to the fund
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 lg:border-l lg:border-ink/12 lg:pl-14">
              <p className="eyebrow">Who qualifies</p>
              <ul className="mt-5 space-y-4">
                {scholarship.eligibility.map((e) => (
                  <li
                    key={e}
                    className="flex gap-4 border-b border-ink/10 pb-4"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-4 shrink-0 bg-leaf"
                      aria-hidden="true"
                    />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
              <p className="muted mt-6 text-sm">
                Named for Miriam&rsquo;s father, William. The requirement is
                deliberate: this is the one thing on a student&rsquo;s life that
                never shows up on a transcript, and almost never on a
                scholarship form either.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- resources --- */}
      <section>
        <div className="shell band">
          <SectionHead
            eyebrow="Resources"
            title="If you need help, start here"
            lede="Crisis lines, treatment search by ZIP code, Indiana-specific programs, and support written for families and young people."
            link={{ label: "All resources", href: "/resources" }}
          />

          <div className="mt-14 grid gap-px bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
            {resourceGroups.map((g) => (
              <Link
                key={g.id}
                href={`/resources#${g.id}`}
                className="group flex flex-col bg-ink p-7 transition-colors hover:bg-coal"
              >
                <h3 className="display d4 group-hover:text-rose">{g.title}</h3>
                <p className="muted mt-3 flex-1 text-sm">{g.blurb}</p>
                <p className="eyebrow mt-6">{g.items.length} resources</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- partner --- */}
      <PartnerBand />

      {/* ---------------------------------------------------- closing --- */}
      <section className="relative overflow-hidden border-t border-bone/10 bg-coal">
        <div className="grain" />
        <div className="shell relative band text-center">
          <Reveal>
            <Image
              src="/brand/seal.png"
              alt=""
              width={220}
              height={220}
              className="mx-auto size-24 md:size-28"
            />
            <p className="quote mx-auto mt-8 max-w-2xl">
              &ldquo;{org.verse}&rdquo;
            </p>
            <p className="eyebrow mt-4">{org.verseRef}</p>

            <div className="mx-auto mt-10 max-w-2xl">
              <Waveform variant="calm" count={90} height={26} />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/shop" className="btn btn-rose">
                Shop &amp; fund a student
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Work with Miriam
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
