"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { categories, products, type Product } from "@/lib/content";

type Filter = Product["category"] | "All";

/**
 * Category index and product grid.
 *
 * Everything used to be stacked — four headed sections, one after another, so
 * reaching the bracelets meant scrolling past eleven other products. Now the
 * categories filter a single grid in place. All twelve render on the server, so
 * the page still works without JavaScript and search engines see the lot.
 */
export default function ShopBrowser({ squareReady }: { squareReady: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");

  const shown = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <>
      {/* Category index */}
      <section className="on-coal">
        <div className="shell band-tight">
          <div className="grid gap-px bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const active = filter === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setFilter(active ? "All" : c.name)}
                  aria-pressed={active}
                  className={`group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-ink ${
                    active ? "bg-ink" : "bg-coal"
                  }`}
                >
                  <div className="shot size-16 shrink-0">
                    <Image
                      src={c.image}
                      alt=""
                      width={200}
                      height={200}
                      className="size-full"
                    />
                  </div>
                  <div>
                    <p
                      className={`display d4 group-hover:text-rose ${active ? "text-rose" : ""}`}
                    >
                      {c.name}
                    </p>
                    <p className="eyebrow mt-1.5">
                      {c.count} {c.count === 1 ? "design" : "designs"} · from $
                      {c.from}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setFilter("All")}
              aria-pressed={filter === "All"}
              className={`tlink ${filter === "All" ? "text-rose" : ""}`}
            >
              All products
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="on-bone">
        <div className="shell band">
          <div id="collection" className="scroll-mt-28">
            <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-4">
              <h2 className="display d3">
                {filter === "All" ? "All products" : filter}
              </h2>
              <p className="eyebrow" aria-live="polite">
                {shown.length} {shown.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 60} className="h-full">
                  <ProductCard
                    product={p}
                    priority={i < 3}
                    squareReady={squareReady}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
