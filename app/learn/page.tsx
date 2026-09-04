import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import { PageHero, SectionHead } from "@/components/ui";
import { education, resourceGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn — how addiction happens",
  description:
    "Education on mental health and substance use, starting with How Addiction Happens — a video made by a mother who lost her son to substance use.",
};

const language = [
  {
    instead: "Addict, junkie, alcoholic",
    say: "A person with a substance use disorder",
    why: "Puts the person before the illness, the way we already do with every other diagnosis.",
  },
  {
    instead: "Clean, dirty",
    say: "In recovery, or testing positive",
    why: "Nobody is dirty. Clinical language keeps shame out of the conversation.",
  },
  {
    instead: "Committed suicide",
    say: "Died by suicide",
    why: "Removes the implication of a crime and reduces the risk of contagion.",
  },
  {
    instead: "She's crazy, he's bipolar",
    say: "She lives with a mental illness, he has bipolar disorder",
    why: "A diagnosis is something a person has, not something a person is.",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="Education"
        title={
          <>
            How addiction
            <br />
            happens.
          </>
        }
        wave="calm"
        lede={education.lede}
      />

      {/* The video */}
      <section className="on-coal">
        <div className="shell band">
          <Reveal>
            <VideoEmbed id={education.videoId} title={education.videoTitle} />
            <p className="muted-2 mt-4 text-xs">
              Video plays from YouTube. Nothing loads from YouTube until you press play.
            </p>
          </Reveal>

          <dl className="mt-16 grid gap-px bg-bone/12 md:grid-cols-3">
            {education.points.map((p) => (
              <div key={p.label} className="bg-coal p-7">
                <dt className="display d4 text-rose">{p.label}</dt>
                <dd className="muted mt-3 text-sm">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Language — the practical, take-it-home part */}
      <section className="on-bone">
        <div className="shell band">
          <SectionHead
            eyebrow="Breaking the stigma"
            title="The words do the work"
            lede="Changing how a family, a classroom or a staff room talks about mental illness and addiction is the cheapest intervention available. Here is where to start."
          />

          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-2xl border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/20">
                  <th scope="col" className="eyebrow pb-4 pr-6">
                    Instead of
                  </th>
                  <th scope="col" className="eyebrow pb-4 pr-6">
                    Say
                  </th>
                  <th scope="col" className="eyebrow pb-4">
                    Because
                  </th>
                </tr>
              </thead>
              <tbody>
                {language.map((l) => (
                  <tr key={l.instead} className="border-b border-ink/10 align-top">
                    <td className="py-5 pr-6 line-through decoration-rose decoration-2">
                      {l.instead}
                    </td>
                    <td className="display d4 py-5 pr-6">{l.say}</td>
                    <td className="muted py-5 text-sm">{l.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="muted mt-8 max-w-2xl text-sm">
            More lessons are in development, including material built for classrooms and
            parent nights. Miriam covers this ground live as well.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/speaking" className="btn btn-solid">
              Book a talk on this
            </Link>
            <Link href="/resources" className="btn btn-ghost">
              Find help now
            </Link>
          </div>
        </div>
      </section>

      {/* Where to go next */}
      <section>
        <div className="shell band-tight">
          <p className="eyebrow">If this raised something for you</p>
          <div className="mt-8 grid gap-px bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
            {resourceGroups.map((g) => (
              <Link
                key={g.id}
                href={`/resources#${g.id}`}
                className="group bg-ink p-6 transition-colors hover:bg-coal"
              >
                <p className="display d4 group-hover:text-rose">{g.title}</p>
                <p className="muted mt-2 text-sm">{g.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
