import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Input — cream background, 12px rounded corners, no border until focus.
 * Focus state uses a 1px Forest Green ring (per Design.md "Input Fields").
 */
export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="font-body text-[14px] font-medium text-on-surface">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "w-full rounded-md bg-surface-container-low px-4 py-3",
          "font-body text-[16px] text-on-surface placeholder:text-outline",
          "border border-transparent outline-none transition-shadow duration-150",
          "focus:ring-1 focus:ring-primary focus:border-transparent",
          error && "ring-1 ring-error",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="font-body text-[12px] text-error">{error}</span>}
    </div>
  );
}
