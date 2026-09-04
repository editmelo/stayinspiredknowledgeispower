import { NextResponse } from "next/server";
import { products } from "@/lib/content";
import { SquareError, createCheckoutLink, getSquareConfig } from "@/lib/square";

/**
 * Starts a Square-hosted checkout.
 *
 * The browser sends slugs and quantities only — never prices. Prices are read
 * from the server's own catalog, so a tampered request cannot change what a
 * shopper is charged.
 */
export async function POST(request: Request) {
  const config = getSquareConfig();
  if (!config) {
    return NextResponse.json(
      { error: "The shop is not connected to Square yet." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const items = (payload as { items?: { slug?: unknown; quantity?: unknown }[] })?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items to check out." }, { status: 400 });
  }

  const lines = [];
  for (const item of items.slice(0, 50)) {
    const product = products.find((p) => p.slug === item.slug);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
    }
    const quantity = Number(item.quantity ?? 1);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return NextResponse.json({ error: "Quantity must be between 1 and 99." }, { status: 400 });
    }
    lines.push({ name: product.name, price: product.price, quantity });
  }

  const origin = new URL(request.url).origin;

  try {
    const url = await createCheckoutLink(lines, {
      idempotencyKey: crypto.randomUUID(),
      redirectUrl: `${origin}/shop/thank-you`,
      config,
    });
    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof SquareError) {
      console.error("Square checkout failed", error.status, error.detail);
    } else {
      console.error("Square checkout failed", error);
    }
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}
