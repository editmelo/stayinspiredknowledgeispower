"use client";

import { useCart } from "./CartProvider";

/** Header cart trigger. Hidden entirely until Square is connected. */
export default function CartButton({ onOpen }: { onOpen?: () => void } = {}) {
  const { enabled, count, setOpen } = useCart();
  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        setOpen(true);
      }}
      className="relative flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-ash uppercase transition-colors hover:text-bone"
      aria-label={count > 0 ? `Open cart, ${count} item${count === 1 ? "" : "s"}` : "Open cart"}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3.5 5h2l2 11h10l2-8H7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      {count > 0 && (
        <span className="flex size-4.5 items-center justify-center rounded-full bg-rose text-[0.6rem] leading-none text-bone tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
