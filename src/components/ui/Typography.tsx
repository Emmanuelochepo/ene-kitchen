import { clsx } from "clsx";
import type { ElementType, ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Headline — Playfair Display, for hero/section/card titles.
 * xl: hero sections only. lg: section titles. md: card/component titles.
 */
export function HeadlineXl({ children, className, as: Tag = "h1" }: TypographyProps) {
  return (
    <Tag
      className={clsx(
        "font-display font-bold text-[28px] leading-[1.2] tracking-[-0.02em]",
        "md:text-[48px] md:leading-[1.1]",
        "text-primary",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function HeadlineLg({ children, className, as: Tag = "h2" }: TypographyProps) {
  return (
    <Tag
      className={clsx(
        "font-display font-bold text-[28px] leading-[1.2]",
        "md:text-[32px]",
        "text-primary",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function HeadlineMd({ children, className, as: Tag = "h3" }: TypographyProps) {
  return (
    <Tag className={clsx("font-display font-semibold text-[24px] leading-[1.3]", "text-primary", className)}>
      {children}
    </Tag>
  );
}

/** Body — DM Sans, for descriptions and paragraph copy. */
export function BodyLg({ children, className, as: Tag = "p" }: TypographyProps) {
  return (
    <Tag className={clsx("font-body text-[18px] leading-[1.6] font-normal", "text-on-surface-variant", className)}>
      {children}
    </Tag>
  );
}

export function BodyMd({ children, className, as: Tag = "p" }: TypographyProps) {
  return (
    <Tag className={clsx("font-body text-[16px] leading-[1.5] font-normal", "text-on-surface-variant", className)}>
      {children}
    </Tag>
  );
}

/** Label — DM Sans, for tags, badges, and small UI metadata. */
export function LabelMd({ children, className, as: Tag = "span" }: TypographyProps) {
  return (
    <Tag
      className={clsx(
        "font-body text-[14px] leading-none font-bold uppercase tracking-[0.05em]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function LabelSm({ children, className, as: Tag = "span" }: TypographyProps) {
  return (
    <Tag className={clsx("font-body text-[12px] leading-none font-medium", className)}>
      {children}
    </Tag>
  );
}
