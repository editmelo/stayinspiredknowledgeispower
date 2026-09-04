"use client";

import { useState } from "react";

/**
 * Hands off to Square-hosted checkout. Sends the slug only — the server reads
 * the price from its own catalog, so the amount charged is never client-set.
 */
export default function BuyButton({
  slug,
  name,
  className = "btn btn-rose w-full justify-center",
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function buy() {
    setState("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ slug, quantity: 1 }] }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout unavailable");
      window.location.href = data.url;
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={buy}
        disabled={state === "loading"}
        className={`${className} disabled:opacity-60`}
        aria-label={`Buy ${name}`}
      >
        {state === "loading" ? "Opening checkout…" : "Buy now"}
      </button>
      {state === "error" && (
        <p role="alert" className="mt-2 bg-rose px-2.5 py-1.5 text-xs text-bone">
          Checkout is unavailable right now. Please try again, or email us.
        </p>
      )}
    </div>
  );
}
