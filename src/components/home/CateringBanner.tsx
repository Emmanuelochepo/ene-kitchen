import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeadlineLg, BodyLg, LabelMd } from "@/components/ui/Typography";
import { Users, Star, Calendar } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Users, label: "Up to 500+ guests" },
  { icon: Star, label: "Premium service" },
  { icon: Calendar, label: "Book in advance" },
];

export function CateringBanner() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-14 md:py-24">
      <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[380px] flex items-center">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=85"
          alt="Catering event"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-primary/80" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 py-10 flex flex-col gap-6 max-w-xl">
          <LabelMd className="text-secondary-fixed-dim">Catering & Events</LabelMd>

          <HeadlineLg as="h2" className="text-inverse-on-surface">
            Planning an event? We handle the food.
          </HeadlineLg>

          <BodyLg className="text-inverse-on-surface/80">
            From intimate dinners to large celebrations — we bring authentic
            Nigerian cuisine to your venue, handled end-to-end.
          </BodyLg>

          <div className="flex flex-wrap gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-inverse-on-surface/10 border border-inverse-on-surface/20 rounded-full px-3 py-1.5">
                <Icon size={13} className="text-secondary-fixed-dim shrink-0" />
                <span className="font-body text-[12px] font-medium text-inverse-on-surface">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/catering">
              <Button variant="primary" className="w-full sm:w-auto justify-center">
                View Packages
              </Button>
            </Link>
            <a href="https://wa.me/2348107045116" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="w-full sm:w-auto justify-center border-inverse-on-surface/40 text-inverse-on-surface hover:bg-inverse-on-surface/10">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
