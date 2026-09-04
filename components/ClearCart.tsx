"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/**
 * Empties the cart once the order is placed. Deliberately only on the thank-you
 * page: someone who abandons Square's checkout and comes back should still find
 * their cart intact.
 */
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
