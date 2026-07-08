"use client";

import { Clock } from "lucide-react";
import { useSiteSettings, useIsOpen } from "@/hooks/useStore";

export function ClosedBanner() {
  const { settings } = useSiteSettings();
  const { isOpen, reason, nextOpenMsg } = useIsOpen(settings);

  if (isOpen || !settings) return null;

  return (
    <div className="bg-tertiary-fixed border-b border-outline-variant px-4 py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-3 text-center flex-wrap">
        <Clock size={16} className="text-on-tertiary-fixed-variant shrink-0" />
        <p className="font-body text-[13px] text-on-surface">
          <span className="font-bold">{reason}</span>{" "}
          <span className="text-on-surface-variant">{nextOpenMsg}</span>
        </p>
      </div>
    </div>
  );
}
