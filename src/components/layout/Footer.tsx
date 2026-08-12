import Link from "next/link";
import { Phone, Share2, Globe, MapPin, Mail, UtensilsCrossed } from "lucide-react";
import { BodyMd, LabelMd, LabelSm } from "@/components/ui/Typography";

const FOOTER_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary">
      {/* Top section */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <UtensilsCrossed size={16} className="text-on-secondary" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-[20px] text-inverse-on-surface leading-none">
              Ene&apos;s Kitchen
            </span>
          </div>
          <BodyMd className="text-inverse-on-surface/70 text-[13px] leading-relaxed max-w-xs">
            Authentic, premium Nigerian cuisine for daily dining and special occasions. Made fresh, delivered fast.
          </BodyMd>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-inverse-on-surface/10 flex items-center justify-center text-inverse-on-surface/70 hover:bg-inverse-on-surface/20 hover:text-inverse-on-surface transition-all">
              <Share2 size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-inverse-on-surface/10 flex items-center justify-center text-inverse-on-surface/70 hover:bg-inverse-on-surface/20 hover:text-inverse-on-surface transition-all">
              <Globe size={16} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <LabelMd className="text-secondary-fixed-dim">Quick Links</LabelMd>
          <nav className="flex flex-col gap-2">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="font-body text-[14px] text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <LabelMd className="text-secondary-fixed-dim">Contact</LabelMd>
          <div className="flex flex-col gap-3">
            <a href="tel:+2348107045116"
              className="flex items-start gap-2.5 text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors">
              <Phone size={15} className="shrink-0 mt-0.5" />
              <BodyMd className="text-[13px]">+234 810 704 5116</BodyMd>
            </a>
            <a href="mailto:hello@eneskitchen.com"
              className="flex items-start gap-2.5 text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors">
              <Mail size={15} className="shrink-0 mt-0.5" />
              <BodyMd className="text-[13px]">hello@eneskitchen.com</BodyMd>
            </a>
            <div className="flex items-start gap-2.5 text-inverse-on-surface/70">
              <MapPin size={15} className="shrink-0 mt-0.5" />
              <BodyMd className="text-[13px]">Lagos, Nigeria</BodyMd>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-3">
          <LabelMd className="text-secondary-fixed-dim">Hours</LabelMd>
          <div className="flex flex-col gap-2">
            {[
              ["Mon – Fri", "8:00 AM – 8:00 PM"],
              ["Saturday", "9:00 AM – 6:00 PM"],
              ["Sunday", "Closed"],
            ].map(([day, time]) => (
              <div key={day} className="flex flex-col">
                <LabelSm className="text-inverse-on-surface/50">{day}</LabelSm>
                <BodyMd className="text-inverse-on-surface/80 text-[13px]">{time}</BodyMd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-inverse-on-surface/10 px-5 md:px-12 py-5">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <BodyMd className="text-inverse-on-surface/40 text-[12px] text-center">
            © {new Date().getFullYear()} Ene&apos;s Kitchen. All rights reserved.
          </BodyMd>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link key={item} href="/contact"
                className="font-body text-[12px] text-inverse-on-surface/40 hover:text-inverse-on-surface/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
