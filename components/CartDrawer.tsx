"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { lineKey, useCart } from "./CartProvider";

/**
 * The cart panel. Sends slugs and quantities to /api/checkout, which prices the
 * order server-side and hands back a Square-hosted checkout URL.
 */
export default function CartDrawer() {
  const {
    enabled,
    entries,
    count,
    subtotal,
    open,
    setOpen,
    setQuantity,
    remove,
    lines,
  } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Closing also drops any stale error, so a failed attempt doesn't greet
     them the next time they open the cart. */
  const close = useCallback(() => {
    setState("idle");
    setOpen(false);
  }, [setOpen]);

  // Escape closes; Tab stays inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!enabled) return null;

  async function checkout() {
    setState("loading");

    /* Opened synchronously, while the click is still the active user gesture.
       A window.open() issued after the fetch resolves is treated as an unasked
       popup and blocked — Safari especially. The tab is parked on about:blank
       and pointed at Square once the link comes back. */
    const tab = window.open("", "_blank");
    if (tab) {
      try {
        /* Sever the back-reference before navigating away from about:blank, so
           the checkout page cannot reach back into this one. */
        tab.opener = null;
        tab.document.title = "Opening checkout…";
      } catch {
        /* Cosmetic only. */
      }
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url)
        throw new Error(data.error ?? "Checkout unavailable");

      if (tab && !tab.closed) {
        tab.location.href = data.url;
        /* This page stays put, so the button has to come back on its own. */
        setState("idle");
      } else {
        /* Popup blocked, or the shopper closed the tab. Better to go to Square
           in this tab than to strand someone who is trying to pay. */
        window.location.href = data.url;
      }
    } catch {
      tab?.close();
      setState("error");
    }
  }

  return (
    <>
      <div
        hidden={!open}
        onClick={close}
        className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        hidden={!open}
        className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l border-bone/12 bg-ink shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-bone/12 px-5 py-4">
          <p className="display d4">
            Your cart{count > 0 ? ` (${count})` : ""}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="text-[0.7rem] font-semibold tracking-[0.16em] text-ash uppercase transition-colors hover:text-bone"
          >
            Close
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="muted text-sm">Nothing in the cart yet.</p>
            <button type="button" onClick={close} className="cta-mini">
              Keep shopping
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-bone/10 overflow-y-auto px-5">
            {entries.map(({ product, size, quantity }) => (
              <li key={lineKey(product.slug, size)} className="flex gap-4 py-5">
                <div className="shot size-20 shrink-0">
                  <Image
                    src={product.image}
                    alt=""
                    width={200}
                    height={250}
                    className="size-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-bone">
                      {product.name}
                    </p>
                    <p className="display shrink-0 text-sm tracking-tight">
                      ${product.price * quantity}
                    </p>
                  </div>
                  {size && <p className="mt-1 text-xs font-semibold">{size}</p>}
                  <p className="muted mt-1 text-xs">${product.price} each</p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-bone/20">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.slug, size, quantity - 1)
                        }
                        className="px-2.5 py-1 text-sm text-ash transition-colors hover:text-bone"
                        aria-label={`Reduce ${product.name}${size ? `, ${size}` : ""} quantity`}
                      >
                        −
                      </button>
                      <span
                        className="min-w-8 text-center text-sm tabular-nums"
                        aria-live="polite"
                        aria-label={`${product.name}${size ? `, ${size}` : ""} quantity`}
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.slug, size, quantity + 1)
                        }
                        className="px-2.5 py-1 text-sm text-ash transition-colors hover:text-bone"
                        aria-label={`Increase ${product.name}${size ? `, ${size}` : ""} quantity`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.slug, size)}
                      className="text-xs text-ash underline underline-offset-4 transition-colors hover:text-rose"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {entries.length > 0 && (
          <div className="border-t border-bone/12 px-5 py-5">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Subtotal</p>
              <p className="display text-xl tracking-tight">${subtotal}</p>
            </div>
            <p className="muted mt-1.5 text-xs">
              Shipping and tax are calculated by Square at checkout.
            </p>

            {state === "error" && (
              <p
                role="alert"
                className="mt-4 bg-rose px-3 py-2 text-xs text-bone"
              >
                Checkout is unavailable right now. Please try again in a moment.
              </p>
            )}

            <button
              type="button"
              onClick={checkout}
              disabled={state === "loading"}
              className="btn btn-rose mt-4 w-full justify-center disabled:opacity-60"
            >
              {state === "loading" ? "Opening checkout…" : "Checkout"}
            </button>
            <p className="muted mt-3 text-center text-xs">
              Payment is handled securely by Square.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
