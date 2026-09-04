import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import WornStrip from "@/components/WornStrip";
import { PageHero, SectionHead } from "@/components/ui";
import { categories, org, products, scholarship } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop the collection",
  description:
    "Shirts, aprons, tumblers and bracelets carrying a mental health message. A portion of every sale funds the William Rivera Memorial Scholarship Fund.",
};

const byCategory = ["Shirts", "Aprons", "Drinkware", "Bracelets"] as const;

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Swag & merch"
        title={
          <>
            Merch that
            <br />
            says it first.
          </>
        }
        wave="loud"
        lede="Most merch is a logo. This is a message — roses, wings and music notes that give someone permission to bring up the thing nobody brings up. A portion of every sale goes into the scholarship fund."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={org.legacyStore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-rose"
          >
            Open the store
          </a>
          <Link href="/scholarship" className="btn btn-ghost">
            See what it funds
          </Link>
        </div>
      </PageHero>

      {/* Category index */}
      <section className="on-coal">
        <div className="shell band-tight">
          <div className="grid gap-px bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <a
                key={c.name}
                href={`#${c.name.toLowerCase()}`}
                className="group flex items-center gap-4 bg-coal p-5 transition-colors hover:bg-ink"
              >
                <div className="shot size-16 shrink-0">
                  <Image src={c.image} alt="" width={200} height={200} className="size-full" />
                </div>
                <div>
                  <p className="display d4 group-hover:text-rose">{c.name}</p>
                  <p className="eyebrow mt-1.5">
                    {c.count} {c.count === 1 ? "design" : "designs"} · from ${c.from}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products, grouped */}
      <section className="on-bone">
        <div className="shell band">
          {byCategory.map((cat, ci) => {
            const items = products.filter((p) => p.category === cat);
            return (
              <div key={cat} id={cat.toLowerCase()} className={ci > 0 ? "mt-20 scroll-mt-28" : "scroll-mt-28"}>
                <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-4">
                  <h2 className="display d3">{cat}</h2>
                  <p className="eyebrow">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 60} className="h-full">
                      <ProductCard product={p} priority={ci === 0 && i < 3} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where the money goes */}
      <section className="bg-leaf text-bone">
        <div className="shell band-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-bone/65">Where the money goes</p>
              <p className="quote mt-4">
                Every shirt, apron, tumbler and bracelet sends a portion of its price into
                the William Rivera Memorial Scholarship Fund.
              </p>
              <p className="mt-6 max-w-xl text-bone/80">
                The award is ${scholarship.award}, paid toward tuition or documented
                educational expenses for a student who grew up with a parent affected by
                mental illness or substance use. {scholarship.recipientsToDate} student has
                been funded so far.
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Link href="/scholarship" className="btn btn-solid">
                Read about the fund
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="on-bone">
        <div className="shell band-tight">
          <SectionHead
            eyebrow="The people wearing it"
            title="Worn across Indiana"
            lede="Families, grandparents, cooks at the grill, kids at a community booth. This is what the message looks like in a room."
          />
        </div>
        <div className="pb-16 md:pb-20">
          <WornStrip />
        </div>
      </section>
    </>
  );
}
