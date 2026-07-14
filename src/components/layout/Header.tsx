"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeadlineMd } from "@/components/ui/Typography";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
            <Link key={link.href} href={link.href} className="nav-link font-body text-[16px] text-on-surface hover:text-secondary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/checkout" aria-label={`View cart (${totalItems} items)`} className="relative p-2 text-primary hover:text-secondary transition-colors">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Link href="/menu">
            <Button variant="primary" size="sm">Order Now</Button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/checkout" aria-label={`View cart (${totalItems} items)`} className="relative p-2 text-primary hover:text-secondary transition-colors">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-50 p-2 text-primary cursor-pointer"
          >
            <Menu size={26} className={`absolute inset-2 transition-all duration-300 ${menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
            <X size={26} className={`transition-all duration-300 ${menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div onClick={() => setMenuOpen(false)} aria-hidden="true"
        className={`lg:hidden fixed inset-0 top-16 bg-inverse-surface/40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile menu panel */}
      <nav className={`lg:hidden absolute top-full inset-x-0 bg-surface border-t border-outline-variant px-6 py-6 flex flex-col gap-1 shadow-overlay transition-all duration-300 ease-out origin-top ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
            className="font-body text-[18px] text-on-surface py-3 border-b border-outline-variant last:border-b-0">
            {link.label}
          </Link>
        ))}
        <Link href="/menu" onClick={() => setMenuOpen(false)}>
          <Button variant="primary" className="w-full mt-4 justify-center">
            Order Now
          </Button>
        </Link>
      </nav>
    </header>
  );
}
