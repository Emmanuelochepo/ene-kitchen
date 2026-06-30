import { clsx } from "clsx";
import type { ReactNode } from "react";

type BadgeVariant = "spice" | "gold" | "forest";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Badge — small circular/pill indicator for food card tags
 * like "Hot," "Vegan," or "Popular" (per Design.md "Food Cards").
 */
export function Badge({ children, variant = "spice", className }: BadgeProps) {
  const variants = {
    spice: "bg-secondary text-on-secondary",
    gold: "bg-tertiary-fixed-dim text-on-tertiary-fixed",
    forest: "bg-primary text-on-primary",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-3 py-1",
        "font-body text-[12px] font-medium leading-none whitespace-nowrap",
        "shadow-raised",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
