import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Input — always-visible outline border per Emmanuel's preference,
 * 12px rounded corners, focus ring in Forest Green.
 */
export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="font-body text-[13px] md:text-[14px] font-medium text-on-surface">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "w-full rounded-md bg-surface-container-low px-4 py-3",
          "font-body text-[15px] md:text-[16px] text-on-surface placeholder:text-outline",
          // Always-visible border, stronger on focus
          "border border-outline-variant outline-none transition-all duration-150",
          "hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20",
          error && "border-error focus:ring-error/20",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="font-body text-[12px] text-error">{error}</span>}
    </div>
  );
}
