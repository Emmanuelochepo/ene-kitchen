import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "icon";
type ButtonSize = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Button — pill-shaped per Design.md "Shapes" spec.
 * primary: Spice Orange fill, white text. For main CTAs (Add to Cart, Order Now).
 * secondary: transparent with Forest Green border. For lower-emphasis actions.
 * icon: circular, Soft Gold background. For compact actions like add-to-cart icon.
 */
export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-bold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizes = {
    default: "px-8 py-4 text-[16px]",
    sm: "px-5 py-2.5 text-[14px]",
  };

  const variants = {
    primary:
      "bg-secondary text-on-secondary hover:shadow-[inset_0_0_0_999px_rgba(255,255,255,0.08)] active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.08)]",
    secondary:
      "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary/5 active:bg-primary/10",
    icon: "bg-tertiary-fixed-dim text-on-tertiary-fixed hover:shadow-[inset_0_0_0_999px_rgba(255,255,255,0.15)] active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.08)] !p-3 aspect-square",
  };

  return (
    <button className={clsx(base, variant !== "icon" && sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
