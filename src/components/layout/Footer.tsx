import Link from "next/link";
import { Phone, Share2, Globe } from "lucide-react";
import { HeadlineMd, BodyMd, LabelMd } from "@/components/ui/Typography";

const FOOTER_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-inverse-on-surface">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-3">
          <HeadlineMd as="span" className="text-inverse-on-surface">
            Ene&apos;s Kitchen
          </HeadlineMd>
          <BodyMd className="text-inverse-on-surface/80">
            Authentic, premium Nigerian cuisine for daily dining and special occasions.
          </BodyMd>
        </div>

        <div className="flex flex-col gap-3">
          <LabelMd className="text-secondary-fixed-dim">Explore</LabelMd>
          <nav className="flex flex-col gap-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[15px] text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <LabelMd className="text-secondary-fixed-dim">Contact</LabelMd>
          <a
            href="tel:+2348000000000"
            className="font-body text-[15px] text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors flex items-center gap-2"
          >
            <Phone size={16} /> +234 800 000 0000
          </a>
          <BodyMd className="text-inverse-on-surface/80">Lagos, Nigeria</BodyMd>
        </div>

        <div className="flex flex-col gap-3">
          <LabelMd className="text-secondary-fixed-dim">Follow</LabelMd>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors">
              <Share2 size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-inverse-on-surface/10 px-6 md:px-12 py-4">
        <BodyMd className="text-inverse-on-surface/60 text-[13px] text-center">
          © {new Date().getFullYear()} Ene&apos;s Kitchen. All rights reserved.
        </BodyMd>
      </div>
    </footer>
  );
}
