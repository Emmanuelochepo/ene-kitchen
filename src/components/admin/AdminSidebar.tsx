"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import {
  ChefHat, LayoutDashboard, ShoppingBag,
  UtensilsCrossed, Settings, LogOut, Menu, X,
} from "lucide-react";
import { clsx } from "clsx";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-outline-variant">
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <ChefHat size={18} className="text-on-secondary" />
        </div>
        <div>
          <p className="font-display font-bold text-[15px] text-primary leading-none">Ene&apos;s Kitchen</p>
          <p className="font-body text-[11px] text-on-surface-variant mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-[14px] font-medium transition-colors",
                active
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-6 border-t border-outline-variant pt-4">
        <button onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-[14px] font-medium text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors cursor-pointer">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 bg-surface-container-lowest border-r border-outline-variant flex-col min-h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-surface-container-lowest border-b border-outline-variant px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <ChefHat size={14} className="text-on-secondary" />
          </div>
          <span className="font-display font-bold text-[14px] text-primary">Admin Panel</span>
        </div>
        <button onClick={() => setMobileOpen((o) => !o)} className="p-2 text-on-surface cursor-pointer">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-inverse-surface/40" onClick={() => setMobileOpen(false)}>
          <aside className="absolute top-14 left-0 bottom-0 w-56 bg-surface-container-lowest border-r border-outline-variant" onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile top padding */}
      <div className="md:hidden h-14 shrink-0" />
    </>
  );
}
