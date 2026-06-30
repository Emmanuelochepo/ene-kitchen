import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** "raised" = card-level ambient shadow. "overlay" = modal/widget-level shadow. */
  elevation?: "raised" | "overlay";
  /** Disable internal padding when the card needs edge-to-edge content (e.g. an image at the top). */
  noPadding?: boolean;
}

/**
 * Card — white surface, 12px rounded corners, soft diffused ambient shadow
 * tinted with Primary Green (per Design.md "Elevation & Depth").
 */
export function Card({ children, elevation = "raised", noPadding = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-surface-container-lowest rounded-md overflow-hidden",
        elevation === "raised" ? "shadow-raised" : "shadow-overlay",
        !noPadding && "p-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
