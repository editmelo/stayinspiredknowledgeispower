import Image from "next/image";
import { org, type Product } from "@/lib/content";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <a
      href={org.legacyStore}
      target="_blank"
      rel="noopener noreferrer"
      className="card group h-full"
      aria-label={`${product.name}, $${product.price} — opens the shop in a new tab`}
    >
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

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display d4">{product.name}</h3>
          <p className="display shrink-0 text-lg tracking-tight">${product.price}</p>
        </div>
        <p className="muted mt-2.5 text-sm">{product.note}</p>
        <p className="cta-mini mt-5">
          Shop this
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </p>
      </div>
    </a>
  );
}
