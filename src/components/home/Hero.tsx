import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeadlineXl, BodyLg, LabelMd, LabelSm } from "@/components/ui/Typography";
import { Star, Clock, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: Star, label: "Premium Quality" },
  { icon: Clock, label: "Same-day Delivery" },
  { icon: ShieldCheck, label: "Made Fresh Daily" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #042419 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-12 pt-10 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Text */}
          <div className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left order-2 lg:order-1 animate-fade-in-up">
            <LabelMd className="text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              Authentic Nigerian Cuisine
            </LabelMd>

            <HeadlineXl as="h1" className="max-w-sm mx-auto lg:mx-0">
              Home-cooked flavours, delivered to your door
            </HeadlineXl>

            <BodyLg className="max-w-md mx-auto lg:mx-0">
              From weeknight dinners to weekend celebrations — fresh, authentic
              Nigerian dishes made from scratch and delivered same-day across Lagos.
            </BodyLg>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {STATS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-surface-container-low border border-outline-variant rounded-full px-3 py-1.5">
                  <Icon size={13} className="text-secondary shrink-0" />
                  <LabelSm className="text-on-surface">{label}</LabelSm>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
              <Link href="/menu" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full justify-center">Order Now</Button>
              </Link>
              <Link href="/menu" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full justify-center">View Menu</Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-overlay">
                <Image
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85"
                  alt="A beautiful spread of Nigerian dishes"
                  fill priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating card — delivery time */}
              <div className="absolute -bottom-4 -left-2 md:-left-6 bg-surface-container-lowest rounded-xl shadow-overlay px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-on-secondary-container" />
                </div>
                <div>
                  <p className="font-display font-bold text-[15px] text-primary leading-none">45–60 min</p>
                  <LabelSm className="text-on-surface-variant">Avg. delivery time</LabelSm>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-3 -right-2 md:-right-4 bg-primary rounded-xl shadow-overlay px-4 py-2.5">
                <p className="font-display font-bold text-[13px] text-inverse-on-surface leading-none">🔥 Chef&apos;s Special</p>
                <LabelSm className="text-inverse-on-surface/70">Available today</LabelSm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
