import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { type Product } from "@/lib/content";
import { getSquareConfig } from "@/lib/square";

function Shot({ product, priority }: { product: Product; priority: boolean }) {
  return (
    <div className="shot aspect-4/5">
      <Image
        src={product.image}
        alt={product.name}
        width={900}
        height={1125}
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
        priority={priority}
      />
      <span className="absolute top-3 left-3 bg-ink/85 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-bone uppercase backdrop-blur-sm">
        {product.category}
      </span>
    </div>
  );
}

function Meta({ product }: { product: Product }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="display d4">{product.name}</h3>
        <p className="display shrink-0 text-lg tracking-tight">${product.price}</p>
      </div>
      <p className="muted mt-2.5 text-sm">{product.note}</p>
    </>
  );
}

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  /* Once Square is connected the card sells directly. Until then it points at
     the shop page — nothing leaves the site. */
  const squareReady = getSquareConfig() !== null;

  if (!squareReady) {
    return (
      <Link
        href="/shop"
        className="card group h-full"
        aria-label={`${product.name}, $${product.price}`}
      >
        <Shot product={product} priority={priority} />
        <div className="flex flex-1 flex-col p-5">
          <Meta product={product} />
          <p className="cta-mini mt-5">
            Shop this
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="card group h-full">
      <Shot product={product} priority={priority} />
      <div className="flex flex-1 flex-col p-5">
        <Meta product={product} />
        <div className="mt-5 flex-1" />
        <AddToCartButton slug={product.slug} name={product.name} />
      </div>
    </div>
  );
}
