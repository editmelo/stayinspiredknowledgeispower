"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { allSizes, isSized, products, type Product } from "@/lib/content";

/**
 * The shopping cart.
 *
 * Holds slugs, sizes and quantities only — never prices. The server reads
 * prices from its own catalog when it builds the Square checkout, so nothing a
 * shopper can edit in localStorage changes what they are charged.
 *
 * A line is identified by slug *and* size: the same shirt in Adult L and Youth
 * M are two separate lines, not one with a quantity of two.
 *
 * localStorage is an external store, so it is read through useSyncExternalStore
 * rather than an effect: the server snapshot is empty, hydration matches, and
 * a second tab editing the cart updates this one.
 */

/* v2: lines gained a size, so any v1 cart is discarded rather than migrated —
   a stored shirt with no size would fail at checkout. */
const STORAGE_KEY = "sikip.cart.v2";
const MAX_QTY = 99;

export type CartLine = { slug: string; size?: string; quantity: number };
export type CartEntry = { product: Product; size?: string; quantity: number };

/** Identity of a line. Two sizes of one shirt are two lines. */
export const lineKey = (slug: string, size?: string) => `${slug}|${size ?? ""}`;

/** Drops anything that is not a live product, clamps quantities, and enforces
    that sized goods carry a valid size and unsized goods carry none. */
function sanitise(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartLine[] = [];
  for (const entry of raw) {
    const slug = (entry as CartLine)?.slug;
    if (typeof slug !== "string") continue;
    const product = products.find((p) => p.slug === slug);
    if (!product) continue;

    const rawSize = (entry as CartLine)?.size;
    let size: string | undefined;
    if (isSized(product)) {
      if (typeof rawSize !== "string" || !allSizes.includes(rawSize)) continue;
      size = rawSize;
    } else if (rawSize !== undefined && rawSize !== null && rawSize !== "") {
      continue;
    }

    const key = lineKey(slug, size);
    if (seen.has(key)) continue;

    const quantity = Math.floor(Number((entry as CartLine)?.quantity));
    if (!Number.isFinite(quantity) || quantity < 1) continue;

    seen.add(key);
    out.push({
      slug,
      ...(size ? { size } : {}),
      quantity: Math.min(quantity, MAX_QTY),
    });
  }
  return out;
}

/* ---- the store ---------------------------------------------------------- */

const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();

/** Must stay referentially stable between changes or React will loop. */
let snapshot: CartLine[] = EMPTY;
let loaded = false;

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = sanitise(JSON.parse(raw));
    return parsed.length > 0 ? parsed : EMPTY;
  } catch {
    /* Private mode, or a corrupt value. An empty cart is the safe fallback. */
    return EMPTY;
  }
}

function getSnapshot(): CartLine[] {
  if (!loaded) {
    loaded = true;
    snapshot = readStorage();
  }
  return snapshot;
}

/* Server render has no storage, so the cart always starts empty there. */
function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    snapshot = readStorage();
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(next: CartLine[]) {
  loaded = true;
  snapshot = next.length > 0 ? next : EMPTY;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* Not being able to persist should never break checking out. */
  }
  listeners.forEach((l) => l());
}

/* ---- the context -------------------------------------------------------- */

type CartValue = {
  /** False until Square is connected; the cart stays out of the way. */
  enabled: boolean;
  lines: CartLine[];
  entries: CartEntry[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, size?: string, quantity?: number) => void;
  setQuantity: (
    slug: string,
    size: string | undefined,
    quantity: number,
  ) => void;
  remove: (slug: string, size?: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartValue | null>(null);

export default function CartProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  const add = useCallback((slug: string, size?: string, quantity = 1) => {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
    /* Guard here as well as on the server: a sized product must not reach the
       cart without one, or the shopper only discovers it at checkout. */
    if (isSized(product) && (!size || !allSizes.includes(size))) return;
    if (!isSized(product) && size) return;

    const key = lineKey(slug, size);
    const prev = getSnapshot();
    const found = prev.find((l) => lineKey(l.slug, l.size) === key);
    commit(
      found
        ? prev.map((l) =>
            lineKey(l.slug, l.size) === key
              ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QTY) }
              : l,
          )
        : [
            ...prev,
            {
              slug,
              ...(size ? { size } : {}),
              quantity: Math.min(quantity, MAX_QTY),
            },
          ],
    );
  }, []);

  const setQuantity = useCallback(
    (slug: string, size: string | undefined, quantity: number) => {
      const key = lineKey(slug, size);
      const prev = getSnapshot();
      commit(
        quantity < 1
          ? prev.filter((l) => lineKey(l.slug, l.size) !== key)
          : prev.map((l) =>
              lineKey(l.slug, l.size) === key
                ? { ...l, quantity: Math.min(quantity, MAX_QTY) }
                : l,
            ),
      );
    },
    [],
  );

  const remove = useCallback((slug: string, size?: string) => {
    const key = lineKey(slug, size);
    commit(getSnapshot().filter((l) => lineKey(l.slug, l.size) !== key));
  }, []);

  const clear = useCallback(() => commit([]), []);

  const value = useMemo<CartValue>(() => {
    const entries = lines.flatMap((l) => {
      const product = products.find((p) => p.slug === l.slug);
      return product ? [{ product, size: l.size, quantity: l.quantity }] : [];
    });
    return {
      enabled,
      lines,
      entries,
      count: entries.reduce((n, e) => n + e.quantity, 0),
      subtotal: entries.reduce((n, e) => n + e.product.price * e.quantity, 0),
      open,
      setOpen,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [enabled, lines, open, add, setQuantity, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
