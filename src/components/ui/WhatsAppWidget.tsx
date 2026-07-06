"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { LabelSm } from "@/components/ui/Typography";

/**
 * WhatsApp Widget — per Design.md:
 * - Floating circular button, bottom-right
 * - Brand green encased in a Cream border
 * - "Ene is online" tooltip in label-sm
 */
export function WhatsAppWidget() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      {!tooltipDismissed && (
        <div className="flex items-center gap-2 bg-surface-container-lowest rounded-full pl-4 pr-2 py-2 shadow-overlay border border-outline-variant animate-fade-in">
          <div className="flex items-center gap-2">
            {/* Online indicator dot */}
            <span className="w-2 h-2 rounded-full bg-[#25d366] shrink-0" />
            <LabelSm className="text-on-surface whitespace-nowrap">Ene is online</LabelSm>
          </div>
          <button
            onClick={() => setTooltipDismissed(true)}
            aria-label="Dismiss"
            className="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Main button */}
      <a
        href="https://wa.me/2348107045116"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ene's Kitchen on WhatsApp"
        className="
          w-14 h-14 rounded-full
          bg-[#25d366]
          ring-4 ring-surface ring-offset-0
          flex items-center justify-center
          shadow-overlay
          hover:scale-110 hover:shadow-[0px_16px_40px_rgba(37,211,102,0.35)]
          active:scale-95
          transition-all duration-200 cursor-pointer
        "
      >
        <MessageCircle size={26} className="text-white" fill="white" />
      </a>
    </div>
  );
}
