/**
 * Square hosted checkout.
 *
 * Card details never touch this site. We create a Square-hosted payment link
 * server-side and send the shopper there; Square handles the card form, PCI,
 * receipts and refunds, and the sale lands in the same Square account as her
 * in-person vendor-booth sales.
 *
 * Uses the REST API over plain fetch rather than the `square` SDK: this needs
 * exactly one endpoint, and the REST contract is pinned by SQUARE_VERSION
 * rather than moving with SDK major versions.
 */

const SQUARE_VERSION = "2025-01-23";

export type CheckoutLine = {
  name: string;
  /** Price in whole dollars, as stored in lib/content.ts. */
  price: number;
  quantity: number;
};

export type SquareConfig = {
  accessToken: string;
  locationId: string;
  apiBase: string;
};

/** Returns null when Square is not configured, so callers can fall back. */
export function getSquareConfig(): SquareConfig | null {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!accessToken || !locationId) return null;

  const sandbox = process.env.SQUARE_ENVIRONMENT !== "production";
  return {
    accessToken,
    locationId,
    apiBase: sandbox ? "https://connect.squareupsandbox.com" : "https://connect.squareup.com",
  };
}

export class SquareError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly detail?: unknown,
  ) {
    super(message);
    this.name = "SquareError";
  }
}

/**
 * Creates a hosted checkout page for one or more line items and returns its URL.
 *
 * `idempotencyKey` must be unique per attempt — Square replays the same link
 * for a repeated key, which stops a double-submit becoming a second order.
 */
export async function createCheckoutLink(
  lines: CheckoutLine[],
  opts: { idempotencyKey: string; redirectUrl?: string; config?: SquareConfig },
): Promise<string> {
  const config = opts.config ?? getSquareConfig();
  if (!config) {
    throw new SquareError("Square is not configured on this environment.", 500);
  }
  if (lines.length === 0) {
    throw new SquareError("Cannot start a checkout with no items.", 400);
  }

  const res = await fetch(`${config.apiBase}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Square-Version": SQUARE_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idempotency_key: opts.idempotencyKey,
      order: {
        location_id: config.locationId,
        line_items: lines.map((l) => ({
          name: l.name,
          quantity: String(l.quantity),
          base_price_money: { amount: Math.round(l.price * 100), currency: "USD" },
        })),
      },
      checkout_options: {
        /* Physical goods: Square collects the delivery address at checkout. */
        ask_for_shipping_address: true,
        redirect_url: opts.redirectUrl,
      },
    }),
    cache: "no-store",
  });

  const body = (await res.json().catch(() => null)) as
    | { payment_link?: { url?: string }; errors?: unknown }
    | null;

  if (!res.ok || !body?.payment_link?.url) {
    throw new SquareError(
      "Square did not return a checkout link.",
      res.status,
      body?.errors ?? body,
    );
  }
  return body.payment_link.url;
}
