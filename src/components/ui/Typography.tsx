import { clsx } from "clsx";
import type { ElementType, ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function HeadlineXl({ children, className, as: Tag = "h1" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-display font-bold text-[22px] leading-[1.2] tracking-[-0.01em]",
      "sm:text-[28px] md:text-[36px] lg:text-[48px] md:leading-[1.1] lg:tracking-[-0.02em]",
      "text-primary", className
    )}>
      {children}
    </Tag>
  );
}

export function HeadlineLg({ children, className, as: Tag = "h2" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-display font-bold text-[20px] leading-[1.25]",
      "sm:text-[24px] md:text-[28px] lg:text-[32px]",
      "text-primary", className
    )}>
      {children}
    </Tag>
  );
}

export function HeadlineMd({ children, className, as: Tag = "h3" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-display font-semibold text-[17px] leading-[1.3]",
      "md:text-[20px] lg:text-[24px]",
      "text-primary", className
    )}>
      {children}
    </Tag>
  );
}

export function BodyLg({ children, className, as: Tag = "p" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-body text-[14px] leading-[1.6] font-normal",
      "md:text-[16px] lg:text-[18px]",
      "text-on-surface-variant", className
    )}>
      {children}
    </Tag>
  );
}

export function BodyMd({ children, className, as: Tag = "p" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-body text-[13px] leading-[1.5] font-normal",
      "md:text-[15px] lg:text-[16px]",
      "text-on-surface-variant", className
    )}>
      {children}
    </Tag>
  );
}

export function LabelMd({ children, className, as: Tag = "span" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-body text-[11px] leading-none font-bold uppercase tracking-[0.05em]",
      "md:text-[13px] lg:text-[14px]",
      className
    )}>
      {children}
    </Tag>
  );
}

export function LabelSm({ children, className, as: Tag = "span" }: TypographyProps) {
  return (
    <Tag className={clsx(
      "font-body text-[10px] leading-none font-medium",
      "md:text-[11px] lg:text-[12px]",
      className
    )}>
      {children}
    </Tag>
  );
}
