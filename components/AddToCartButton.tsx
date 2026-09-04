"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

/** Adds one of a product to the cart, with a brief inline confirmation. */
export default function AddToCartButton({ slug, name }: { slug: string; name: string }) {
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function onAdd() {
    add(slug);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div>
      <button
        type="button"
        onClick={onAdd}
        className="btn btn-rose w-full justify-center"
        aria-label={`Add ${name} to cart`}
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
      <p className="mt-2 h-4 text-center text-xs" aria-live="polite">
        {added && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-ash underline underline-offset-4 transition-colors hover:text-bone"
          >
            View cart
          </button>
        )}
      </p>
    </div>
  );
}
