import Image from "next/image";
import { partners } from "@/lib/content";

/**
 * Supporting partners.
 *
 * Always sits on the light ground: the Urban League wordmark is near-black,
 * so it would vanish on the site's dark sections, and a partner's mark is not
 * ours to recolour. Kept deliberately quiet — this is a credit, not a pitch.
 */
export default function PartnerBand() {
  return (
    <section className="on-bone">
      <div className="shell band-tight">
        <div className="rule text-ink" />
        <div className="mt-10 flex flex-col items-center gap-8 text-center md:flex-row md:justify-center md:gap-12 md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.list.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block shrink-0 transition-opacity hover:opacity-70"
                aria-label={`${p.name} — opens in a new tab`}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  className="h-auto w-[190px]"
                />
              </a>
            ))}
          </div>

          <div className="md:border-l md:border-ink/15 md:pl-12">
            <p className="eyebrow">{partners.eyebrow}</p>
            <p className="mt-3 mx-auto max-w-lg text-[0.95rem] leading-relaxed text-ink/75 md:mx-0">
              {partners.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
