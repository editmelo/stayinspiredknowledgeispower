import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Waveform from "./Waveform";

/** Section opener: eyebrow, display heading, optional lede and a trailing link. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  link,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  link?: { label: string; href: string };
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div
        className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
          align === "center" ? "text-center md:flex-col md:items-center" : ""
        }`}
      >
        <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display d2 mt-4">{title}</h2>
          {lede && <p className="lede mt-5">{lede}</p>}
        </div>
        {link && (
          <Link href={link.href} className="tlink shrink-0">
            <span>{link.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </Reveal>
  );
}

/** Inner-page header. Every page opens with the same rhythm. */
export function PageHero({
  eyebrow,
  title,
  lede,
  wave = "calm",
  children,
  mark,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  wave?: "loud" | "calm" | "silence" | "hair";
  children?: ReactNode;
  /** Optional brand mark, floated clear of the text on wide screens. */
  mark?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-bone/10">
      <div className="grain" />
      {mark && (
        <div className="pointer-events-none absolute top-1/2 right-10 hidden -translate-y-1/2 lg:block">
          {mark}
        </div>
      )}
      <div className="shell relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="stagger max-w-4xl">
          <p className="eyebrow" style={{ animationDelay: "60ms" }}>
            {eyebrow}
          </p>
          <h1 className="display d1 mt-5" style={{ animationDelay: "150ms" }}>
            {title}
          </h1>
          <div style={{ animationDelay: "300ms" }} className="mt-7 max-w-3xl">
            <Waveform variant={wave} count={72} height={30} />
          </div>
          {lede && (
            <p className="lede mt-7 max-w-2xl" style={{ animationDelay: "420ms" }}>
              {lede}
            </p>
          )}
          {children && (
            <div style={{ animationDelay: "540ms" }} className="mt-9">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** A labelled fact. Used for the scholarship and speaking numbers. */
export function Fact({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div>
      <p className="stat-n text-rose-lit">{value}</p>
      <p className="eyebrow mt-3">{label}</p>
      {detail && <p className="muted mt-2 text-sm">{detail}</p>}
    </div>
  );
}
