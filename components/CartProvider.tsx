"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { products, type Product } from "@/lib/content";

/**
 * The shopping cart.
 *
 * Holds slugs and quantities only — never prices. The server reads prices from
 * its own catalog when it builds the Square checkout, so nothing a shopper can
 * edit in localStorage changes what they are charged.
 *
 * localStorage is an external store, so it is read through useSyncExternalStore
 * rather than an effect: the server snapshot is empty, hydration matches, and
 * a second tab editing the cart updates this one.
 */

const STORAGE_KEY = "sikip.cart.v1";
const MAX_QTY = 99;

export type CartLine = { slug: string; quantity: number };
export type CartEntry = { product: Product; quantity: number };

/** Drops anything that is not a live product, and clamps quantities. */
function sanitise(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartLine[] = [];
  for (const entry of raw) {
    const slug = (entry as CartLine)?.slug;
    if (typeof slug !== "string" || seen.has(slug)) continue;
    if (!products.some((p) => p.slug === slug)) continue;
    const quantity = Math.floor(Number((entry as CartLine)?.quantity));
    if (!Number.isFinite(quantity) || quantity < 1) continue;
    seen.add(slug);
    out.push({ slug, quantity: Math.min(quantity, MAX_QTY) });
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
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
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

  const add = useCallback((slug: string, quantity = 1) => {
    if (!products.some((p) => p.slug === slug)) return;
    const prev = getSnapshot();
    const found = prev.find((l) => l.slug === slug);
    commit(
      found
        ? prev.map((l) =>
            l.slug === slug
              ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QTY) }
              : l,
          )
        : [...prev, { slug, quantity: Math.min(quantity, MAX_QTY) }],
    );
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const prev = getSnapshot();
    commit(
      quantity < 1
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) =>
            l.slug === slug
              ? { ...l, quantity: Math.min(quantity, MAX_QTY) }
              : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    commit(getSnapshot().filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => commit([]), []);

  const value = useMemo<CartValue>(() => {
    const entries = lines.flatMap((l) => {
      const product = products.find((p) => p.slug === l.slug);
      return product ? [{ product, quantity: l.quantity }] : [];
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
