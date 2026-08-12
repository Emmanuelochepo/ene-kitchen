"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <UtensilsCrossed size={15} className="text-on-primary" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-[18px] md:text-[22px] text-primary leading-none">
              Ene&apos;s Kitchen
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={clsx(
                  "nav-link font-body text-[15px] font-medium transition-colors",
                  pathname === link.href ? "text-secondary" : "text-on-surface hover:text-secondary"
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/checkout" aria-label="Cart" className="relative p-2 text-primary hover:text-secondary transition-colors">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <div className="hidden lg:block">
              <Link href="/menu">
                <Button variant="primary" size="sm">Order Now</Button>
              </Link>
            </div>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-primary cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
        className={clsx(
          "fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Side drawer — slides from right */}
      <div className={clsx(
        "fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-primary flex flex-col transition-transform duration-300 ease-out lg:hidden",
        drawerOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-inverse-on-surface/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <UtensilsCrossed size={15} className="text-on-secondary" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-[18px] text-inverse-on-surface leading-none">
              Ene&apos;s Kitchen
            </span>
          </div>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close menu"
            className="p-2 text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors cursor-pointer">
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={clsx(
                "flex items-center px-4 py-3.5 rounded-xl font-body text-[17px] font-medium transition-all",
                pathname === link.href
                  ? "bg-inverse-on-surface/15 text-inverse-on-surface"
                  : "text-inverse-on-surface/70 hover:bg-inverse-on-surface/10 hover:text-inverse-on-surface"
              )}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-4 pb-8 flex flex-col gap-3">
          <Link href="/checkout" className="flex items-center gap-3 px-4 py-3 rounded-xl text-inverse-on-surface/70 hover:bg-inverse-on-surface/10 transition-all">
            <ShoppingCart size={20} />
            <span className="font-body text-[16px] font-medium">
              Cart {totalItems > 0 && <span className="text-secondary font-bold">({totalItems})</span>}
            </span>
          </Link>
          <Link href="/menu" className="w-full">
            <Button variant="primary" className="w-full justify-center bg-secondary text-on-secondary hover:brightness-95">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
