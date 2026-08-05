import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Waveform from "@/components/Waveform";
import { Fact, PageHero, SectionHead } from "@/components/ui";
import { org, products, scholarship } from "@/lib/content";

export const metadata: Metadata = {
  title: "William Rivera Memorial Scholarship Fund",
  description:
    "A $600 award for high school, college and trade students who have a parent diagnosed with a mental illness or substance use disorder. Funded by product sales and donations.",
};

export default function ScholarshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Scholarship"
        title={
          <>
            William Rivera
            <br />
            Memorial Fund.
          </>
        }
        wave="silence"
        lede={scholarship.lede}
      >
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${org.email}?subject=${encodeURIComponent("William Rivera Memorial Scholarship — application")}`} className="btn btn-rose">
            Start an application
          </a>
          <a href="#donate" className="btn btn-ghost">
            Donate to the fund
          </a>
        </div>
      </PageHero>

      {/* The facts */}
      <section className="bg-leaf text-bone">
        <div className="shell band-tight">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="stat-n">${scholarship.award}</p>
              <p className="eyebrow mt-3 !text-bone/65">Award amount</p>
            </div>
            <div>
              <p className="stat-n">{scholarship.recipientsToDate}</p>
              <p className="eyebrow mt-3 !text-bone/65">Student funded to date</p>
            </div>
            <div>
              <p className="stat-n">3</p>
              <p className="eyebrow mt-3 !text-bone/65">
                Paths supported — high school, college, trade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility + use of funds */}
      <section className="on-bone">
        <div className="shell band">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Eligibility</p>
              <h2 className="display d2 mt-4">Who this is for</h2>
              <ul className="mt-8">
                {scholarship.eligibility.map((e) => (
                  <li key={e} className="flex gap-4 border-b border-ink/12 py-4">
                    <span className="mt-2.5 h-1.5 w-4 shrink-0 bg-leaf" aria-hidden="true" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
              <p className="muted mt-6 text-sm">
                The eligibility requirement is deliberate. Students who grow up with a
                parent living with mental illness or substance use disorder carry something
                that never appears on a transcript, and rarely appears on a scholarship
                form either.
              </p>
            </div>

            <div className="lg:col-span-6 lg:border-l lg:border-ink/12 lg:pl-14">
              <p className="eyebrow">What it covers</p>
              <h2 className="display d2 mt-4">Where the money can go</h2>
              <ul className="mt-8 grid grid-cols-2 gap-px bg-ink/12">
                {scholarship.use.map((u) => (
                  <li key={u} className="bg-bone p-5 text-sm">
                    {u}
                  </li>
                ))}
              </ul>
              <p className="muted mt-6 text-sm">
                Awards are paid toward tuition or documented educational expenses. Miriam
                confirms the details with each recipient directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section>
        <div className="shell band">
          <SectionHead
            eyebrow="Applying"
            title="How to apply"
            lede="The fund is small and run by one person, so the process is direct. Email Miriam and she will send you what she needs."
          />

          <ol className="mt-12 grid gap-px bg-bone/12 md:grid-cols-3">
            {[
              {
                t: "Email your interest",
                d: "Tell Miriam your name, the school or program you are enrolled in or accepted to, and what the award would go toward.",
              },
              {
                t: "Share your story",
                d: "A short written statement about growing up with a parent affected by mental illness or substance use, and what you are building now.",
              },
              {
                t: "Confirm enrolment",
                d: "Proof of enrolment or acceptance, and documentation of the expense the award will be applied to.",
              },
            ].map((s, i) => (
              <li key={s.t} className="bg-ink p-7">
                <p className="display text-2xl text-rose-lit">{String(i + 1).padStart(2, "0")}</p>
                <p className="display d4 mt-4">{s.t}</p>
                <p className="muted mt-2.5 text-sm">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <a
              href={`mailto:${org.email}?subject=${encodeURIComponent("William Rivera Memorial Scholarship — application")}`}
              className="btn btn-rose"
            >
              Email an application
            </a>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="scroll-mt-24 border-t border-bone/10 bg-coal">
        <div className="shell band">
          <Reveal>
            <p className="eyebrow">Fund the next student</p>
            <h2 className="display d2 mt-4 max-w-3xl">
              Two ways to put money in a student&rsquo;s hands
            </h2>
          </Reveal>

          <Reveal className="mt-10 max-w-3xl" delay={100}>
            <Waveform variant="silence" count={120} height={56} color="var(--color-lime)" />
          </Reveal>

          <div className="mt-12 grid gap-px bg-bone/12 md:grid-cols-2">
            <div className="bg-ink p-8">
              <p className="eyebrow">Option one</p>
              <h3 className="display d3 mt-3">Buy something you will wear</h3>
              <p className="muted mt-4">
                A portion of every sale goes into the fund. You get a shirt, an apron, a
                tumbler or a bracelet, and a conversation you would not otherwise have had.
              </p>
              <p className="muted-2 mt-5 text-sm">
                {products.length} products, from ${Math.min(...products.map((p) => p.price))}.
              </p>
              <Link href="/shop" className="tlink mt-7">
                <span>Shop the collection</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="bg-ink p-8">
              <p className="eyebrow">Option two</p>
              <h3 className="display d3 mt-3">Give directly</h3>
              <p className="muted mt-4">
                Donations go straight to the award. If you want to sponsor a full ${scholarship.award}{" "}
                scholarship, or fund one in someone&rsquo;s name, email Miriam and she will
                set it up with you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`mailto:${org.email}?subject=${encodeURIComponent("Donation to the William Rivera Memorial Scholarship Fund")}`}
                  className="btn btn-rose"
                >
                  Email about donating
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-l-2 border-lime pl-6">
            <Fact
              value={`$${scholarship.award}`}
              label="Sponsors one full scholarship"
              detail="One student, one year, one expense they no longer have to solve alone."
            />
          </div>
        </div>
      </section>
    </>
  );
}
