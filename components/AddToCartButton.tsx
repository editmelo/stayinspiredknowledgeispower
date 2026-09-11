"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { isSized, sizeGroups, type Product } from "@/lib/content";

/**
 * Adds one of a product to the cart, with a brief inline confirmation.
 *
 * Shirts must carry a size: without one the order reaches Miriam with nothing
 * to make, so the button refuses rather than quietly adding an unfulfillable
 * line. The server enforces the same rule.
 */
export default function AddToCartButton({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);
  const [missing, setMissing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sized = isSized(product);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function onAdd() {
    if (sized && !size) {
      setMissing(true);
      return;
    }
    add(product.slug, sized ? size : undefined);
    setMissing(false);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div>
      {sized && (
        <div className="relative mb-2.5">
          <select
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              if (e.target.value) setMissing(false);
            }}
            data-missing={missing ? "true" : undefined}
            aria-label={`Size for ${product.name}`}
            aria-invalid={missing || undefined}
            className="select-field"
          >
            <option value="">Choose a size</option>
            {sizeGroups.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <span
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs opacity-60"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={onAdd}
        className="btn btn-rose w-full justify-center"
        aria-label={`Add ${product.name} to cart`}
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>

      <p className="mt-2 h-4 text-center text-xs" aria-live="polite">
        {missing && <span className="text-rose">Choose a size first.</span>}
        {added && !missing && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
          >
            View cart
          </button>
        )}
      </p>
    </div>
  );
}
