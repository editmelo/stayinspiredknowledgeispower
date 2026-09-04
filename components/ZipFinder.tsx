"use client";

import { useState } from "react";

/**
 * Sends a ZIP code straight into SAMHSA's official treatment locator.
 * It opens in a new tab so nobody loses their place on this page.
 */
export default function ZipFinder() {
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\d{5}$/.test(zip)) {
          setError("Enter a five digit ZIP code.");
          return;
        }
        setError("");
        window.open(
          `https://findtreatment.gov/locator?sAddr=${encodeURIComponent(zip)}`,
          "_blank",
          "noopener,noreferrer",
        );
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="zip" className="eyebrow block">
            Your ZIP code
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              setError("");
            }}
            placeholder="46204"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "zip-error" : "zip-help"}
            className="mt-2.5 w-full border border-bone/25 bg-transparent px-4 py-3.5 text-lg tracking-[0.1em] placeholder:text-ash/50 focus:border-lime focus:outline-none"
          />
        </div>
        <button type="submit" className="btn btn-rose shrink-0">
          Find treatment near me
        </button>
      </div>

      {error ? (
        <p id="zip-error" role="alert" className="mt-3 text-sm text-rose">
          {error}
        </p>
      ) : (
        <p id="zip-help" className="muted-2 mt-3 text-sm">
          Results open on FindTreatment.gov in a new tab.
        </p>
      )}
    </form>
  );
}
