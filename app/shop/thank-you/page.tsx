import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your order supports the William Rivera Memorial Scholarship Fund.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <PageHero
      eyebrow="Order received"
      title={
        <>
          Thank you.
          <br />
          You just funded a little of someone&rsquo;s tuition.
        </>
      }
      wave="calm"
      lede="Square has emailed your receipt. A portion of what you just spent goes into the William Rivera Memorial Scholarship Fund."
    >
      <div className="flex flex-wrap gap-3">
        <Link href="/shop" className="btn btn-rose">
          Back to the shop
        </Link>
        <Link href="/scholarship" className="btn btn-ghost">
          About the fund
        </Link>
      </div>
      <p className="muted mt-6 text-sm">
        Questions about an order?{" "}
        <a href={`mailto:${org.email}`} className="underline underline-offset-4">
          {org.email}
        </a>
      </p>
    </PageHero>
  );
}
