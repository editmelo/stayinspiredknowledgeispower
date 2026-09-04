import type { Metadata } from "next";
import Link from "next/link";
import ShopBrowser from "@/components/ShopBrowser";
import WornStrip from "@/components/WornStrip";
import { PageHero, SectionHead } from "@/components/ui";
import { scholarship } from "@/lib/content";
import { getSquareConfig } from "@/lib/square";

export const metadata: Metadata = {
  title: "Shop the collection",
  description:
    "Shirts, aprons, tumblers and bracelets carrying a mental health message. A portion of every sale funds the William Rivera Memorial Scholarship Fund.",
};

export default function ShopPage() {
  const squareReady = getSquareConfig() !== null;

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
          <a href="#collection" className="btn btn-rose">
            Shop the collection
          </a>
          <Link href="/scholarship" className="btn btn-ghost">
            See what it funds
          </Link>
        </div>
      </PageHero>

      <ShopBrowser squareReady={squareReady} />

      {/* Where the money goes */}
      <section className="bg-leaf text-bone">
        <div className="shell band-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-bone/65">Where the money goes</p>
              <p className="quote mt-4">
                Every shirt, apron, tumbler and bracelet sends a portion of its
                price into the William Rivera Memorial Scholarship Fund.
              </p>
              <p className="mt-6 max-w-xl text-bone/80">
                The award is ${scholarship.award}, paid toward tuition or
                documented educational expenses for a student who grew up with a
                parent affected by mental illness or substance use.{" "}
                {scholarship.recipientsToDate} student has been funded so far.
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
