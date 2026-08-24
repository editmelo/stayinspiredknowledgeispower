"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Crisis help stays one tap away on every page. */}
      <div className="bg-rose text-bone">
        <div className="shell flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-1.5 text-center text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
          <span>In a crisis? Call or text 988</span>
          <span className="opacity-50" aria-hidden="true">
            /
          </span>
          <a href="tel:988" className="underline underline-offset-2 hover:no-underline">
            Reach the lifeline now
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-bone/12 bg-ink/92 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6 py-3.5">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Stay Inspired Knowledge Is Power, home">
            <Image
              src="/brand/seal.png"
              alt=""
              width={100}
              height={100}
              className="size-9 shrink-0 md:size-10"
              priority
            />
            <span className="hidden text-[0.6rem] leading-[1.35] font-semibold tracking-[0.2em] uppercase sm:block">
              Stay Inspired
              <br />
              <span className="text-ash">Knowledge Is Power</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                    active ? "text-bone" : "text-ash hover:text-bone"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full bg-rose transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
            <Link href="/speaking" className="btn btn-rose !py-2.5 !text-[0.7rem]">
              Book Miriam
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase lg:hidden"
          >
            {open ? "Close" : "Menu"}
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-0 z-40 flex h-[100dvh] flex-col justify-center bg-ink pt-24 lg:hidden"
      >
        <div className="grain" />
        <nav className="shell relative flex flex-col" aria-label="Main">
          {[...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display d3 border-b border-bone/10 py-4 transition-colors hover:text-rose-lit"
              style={{ animation: open ? `rise .6s var(--ease-out-quint) ${i * 45}ms both` : undefined }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
