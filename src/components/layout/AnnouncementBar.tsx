"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { LabelSm } from "@/components/ui/Typography";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if user already dismissed it this session
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      // Small delay so it slides in after page load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem("announcement-dismissed", "1");
  }

  return (
    <div
      className={`fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-primary text-inverse-on-surface rounded-full px-5 py-3 shadow-overlay flex items-center gap-3">
        <span className="text-secondary-fixed-dim text-[16px] shrink-0">🍽️</span>
        <LabelSm as="p" className="flex-1 text-center tracking-[0.02em] leading-relaxed">
          Same-day delivery across Lagos, Mon–Sat · Chef&apos;s Special: Ofada Rice this week
        </LabelSm>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-inverse-on-surface/60 hover:text-inverse-on-surface hover:bg-inverse-on-surface/10 transition-colors cursor-pointer"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
