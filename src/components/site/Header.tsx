"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { navigation } from "./navigation";

export function Header() {
  const pathname = usePathname();
  // Le menu est ouvert « pour » une page : il se referme de lui-même dès que l'URL change.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 aria-[current=page]:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={buttonClasses("primary", "md", "hidden sm:inline-flex")}>
            Contact
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-slate-900 hover:bg-slate-100 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenFor(open ? null : pathname)}
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </Container>

      <nav id={menuId} aria-label="Navigation mobile" hidden={!open} className="border-t border-slate-200 bg-white md:hidden">
        <Container className="py-4">
          <ul className="flex flex-col gap-1">
            {[...navigation, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50 aria-[current=page]:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
