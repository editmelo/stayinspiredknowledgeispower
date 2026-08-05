"use client";

import { useMemo, useState } from "react";
import { org } from "@/lib/content";

const reasons = [
  { id: "speaking", label: "Book a speaking engagement" },
  { id: "scholarship", label: "Apply for the scholarship" },
  { id: "donate", label: "Donate to the scholarship fund" },
  { id: "bulk", label: "Bulk or group merch order" },
  { id: "press", label: "Press or partnership" },
  { id: "other", label: "Something else" },
];

const field =
  "mt-2.5 w-full border border-bone/25 bg-transparent px-4 py-3 text-base placeholder:text-ash/50 focus:border-lime focus:outline-none";

/**
 * Composes a pre-filled email and hands it to the visitor's mail app.
 * No server, no third-party form service, and nothing is stored here —
 * which also means no message can quietly go missing.
 */
export default function ContactForm() {
  const [reason, setReason] = useState("speaking");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const isSpeaking = reason === "speaking";
  const reasonLabel = reasons.find((r) => r.id === reason)?.label ?? "Enquiry";

  const mailto = useMemo(() => {
    const body = [
      `Reason: ${reasonLabel}`,
      name && `Name: ${name}`,
      orgName && `Organization: ${orgName}`,
      isSpeaking && date && `Preferred date: ${date}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${org.email}?subject=${encodeURIComponent(
      `${reasonLabel} — ${name || "website enquiry"}`,
    )}&body=${encodeURIComponent(body)}`;
  }, [reasonLabel, name, orgName, date, message, isSpeaking]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto;
      }}
      className="space-y-7"
    >
      <fieldset>
        <legend className="eyebrow">What is this about?</legend>
        <div className="mt-4 grid gap-px bg-bone/12 sm:grid-cols-2">
          {reasons.map((r) => (
            <label
              key={r.id}
              className={`flex cursor-pointer items-center gap-3 p-4 text-sm transition-colors ${
                reason === r.id ? "bg-rose text-bone" : "bg-ink hover:bg-coal"
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={r.id}
                checked={reason === r.id}
                onChange={() => setReason(r.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`size-2.5 shrink-0 border ${
                  reason === r.id ? "border-bone bg-bone" : "border-bone/40"
                }`}
              />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow block">
            Your name
          </label>
          <input
            id="name"
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="org" className="eyebrow block">
            School or organization
          </label>
          <input
            id="org"
            className={field}
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Optional"
            autoComplete="organization"
          />
        </div>
      </div>

      {isSpeaking && (
        <div>
          <label htmlFor="date" className="eyebrow block">
            Preferred date or window
          </label>
          <input
            id="date"
            className={field}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g. week of 14 September, or any Tuesday in October"
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="eyebrow block">
          Your message
        </label>
        <textarea
          id="message"
          rows={6}
          className={field}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isSpeaking
              ? "Who is the audience, roughly what age, how long do you have, and what would you like the talk to do?"
              : "Tell Miriam what you need."
          }
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="btn btn-rose">
          Open in your email app
        </button>
        <p className="muted-2 text-sm">
          This fills in an email to {org.email} so you keep a copy of what you sent.
        </p>
      </div>
    </form>
  );
}
