import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialIcons from "@/components/SocialIcons";
import { PageHero } from "@/components/ui";
import { org, speaking } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & booking",
  description:
    "Book Miriam D. Rivera to speak, apply for the William Rivera Memorial Scholarship, donate to the fund, or ask about a bulk merch order.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start the
            <br />
            conversation.
          </>
        }
        wave="calm"
        lede="Speaking dates, scholarship applications, donations and group orders all come to the same inbox, and Miriam answers them herself."
      />

      <section className="on-coal">
        <div className="shell band">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <aside className="lg:col-span-5 lg:border-l lg:border-bone/12 lg:pl-14">
              <p className="eyebrow">Direct</p>
              <a
                href={`mailto:${org.email}`}
                className="mt-3 block text-xl wrap-anywhere transition-colors hover:text-rose-lit md:text-2xl"
              >
                {org.email}
              </a>

              <p className="eyebrow mt-10">Speaking availability</p>
              <p className="mt-3 text-sage">{speaking.status}</p>
              <a
                href={speaking.bookingForm}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-mini mt-4"
              >
                <span>Booking form</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="muted mt-3 text-sm">
                Miriam works with schools, youth programs, parent nights, staff development
                days, and community and faith organizations across Indiana.
              </p>

              <p className="eyebrow mt-10">Follow</p>
              <SocialIcons className="mt-4" size="size-6" />

              <div className="mt-10 border-l-2 border-rose pl-5">
                <p className="eyebrow">If you need help today</p>
                <p className="muted mt-2 text-sm">
                  This inbox is not monitored around the clock. Call or text 988 for the
                  Suicide &amp; Crisis Lifeline, any hour, free and confidential.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
