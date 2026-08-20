"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { BodyMd, LabelSm } from "@/components/ui/Typography";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl shadow-overlay border border-outline-variant p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
            <Cookie size={17} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body font-bold text-[14px] text-on-surface mb-1">We use cookies</p>
            <BodyMd className="text-[12px] leading-relaxed">
              We use cookies to improve your experience and remember your cart. Your order data is stored securely.{" "}
              <Link href="/contact" className="text-secondary underline underline-offset-2">Learn more</Link>
            </BodyMd>
          </div>
          <button onClick={decline} className="text-outline hover:text-on-surface transition-colors cursor-pointer shrink-0 p-1">
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-3">
          <button onClick={decline}
            className="flex-1 rounded-full border border-outline-variant py-2.5 font-body text-[13px] font-bold text-on-surface-variant hover:border-outline transition-all cursor-pointer">
            Decline
          </button>
          <button onClick={accept}
            className="flex-1 rounded-full bg-primary text-on-primary py-2.5 font-body text-[13px] font-bold hover:brightness-110 transition-all cursor-pointer">
            Accept All
          </button>
        </div>
        <LabelSm className="text-on-surface-variant text-center text-[10px]">
          You can change this anytime in your browser settings
        </LabelSm>
      </div>
    </div>
  );
}
