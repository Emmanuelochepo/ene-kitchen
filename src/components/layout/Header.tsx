"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeadlineMd } from "@/components/ui/Typography";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-outline-variant">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <HeadlineMd as="span" className="text-[20px] md:text-[24px]">
            Ene&apos;s Kitchen
          </HeadlineMd>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[16px] text-on-surface hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button
            aria-label="View cart"
            className="p-2 text-primary hover:text-secondary transition-colors cursor-pointer"
          >
            <ShoppingBag size={22} />
          </button>
          <Button variant="primary" size="sm">
            Order Now
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-label="View cart"
            className="p-2 text-primary hover:text-secondary transition-colors cursor-pointer"
          >
            <ShoppingBag size={22} />
          </button>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-50 p-2 text-primary cursor-pointer"
          >
            <Menu
              size={26}
              className={`absolute inset-2 transition-all duration-300 ${
                menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={26}
              className={`transition-all duration-300 ${
                menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 top-16 bg-inverse-surface/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile menu panel — overlays content, doesn't push it down */}
      <nav
        className={`lg:hidden absolute top-full inset-x-0 bg-surface border-t border-outline-variant px-6 py-6 flex flex-col gap-1 shadow-overlay transition-all duration-300 ease-out origin-top ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-body text-[18px] text-on-surface py-3 border-b border-outline-variant last:border-b-0"
          >
            {link.label}
          </Link>
        ))}
        <Button variant="primary" className="w-full mt-4 justify-center">
          Order Now
        </Button>
      </nav>
    </header>
  );
}
