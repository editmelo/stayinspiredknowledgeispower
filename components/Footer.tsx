import Image from "next/image";
import Link from "next/link";
import { nav, org } from "@/lib/content";
import SocialIcons from "./SocialIcons";
import Waveform from "./Waveform";

const helpLinks = [
  { label: "988 Suicide & Crisis Lifeline", href: "https://988lifeline.org/" },
  { label: "Crisis Text Line — text HOME to 741741", href: "https://www.crisistextline.org/" },
  { label: "SAMHSA Helpline — 1-800-662-4357", href: "https://www.samhsa.gov/find-help/national-helpline" },
  { label: "Indiana 211 — dial 211", href: "https://www.in.gov/211/" },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-bone/10 bg-coal">
      <div className="shell pt-14 pb-10">
        <Waveform variant="calm" count={140} height={20} color="var(--color-rose)" animate={false} />

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <Image src="/brand/seal.png" alt="" width={140} height={140} className="size-16 shrink-0" />
              <div>
                <p className="display d4">{org.shortName}</p>
                <p className="mt-1 text-sm text-ash">LLC · Founded by {org.founder} · {org.region}</p>
              </div>
            </div>
            <p className="quote mt-7 max-w-md text-bone/85">&ldquo;{org.verse}&rdquo;</p>
            <p className="eyebrow mt-3">{org.verseRef}</p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-bone/75 transition-colors hover:text-rose">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Get help now</p>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bone/75 transition-colors hover:text-rose"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8">Contact</p>
            <a
              href={`mailto:${org.email}`}
              className="mt-3 block text-sm break-all text-bone/75 transition-colors hover:text-rose"
            >
              {org.email}
            </a>
            <SocialIcons className="mt-5" />
          </div>
        </div>

        <div className="rule mt-12 text-bone" />
        <div className="mt-5 flex flex-col gap-4 text-xs text-ash sm:flex-row sm:justify-between">
          <div className="space-y-1.5">
            <p>
              © {new Date().getFullYear()} {org.name}. All rights reserved.
            </p>
            <p>
              Designed by{" "}
              <a
                href={org.credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-ash/40 underline-offset-3 transition-colors hover:text-rose hover:decoration-rose"
              >
                {org.credit.label}
              </a>
            </p>
          </div>
          <p className="max-w-lg sm:text-right">
            This site shares information and support. It is not medical advice, diagnosis or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
