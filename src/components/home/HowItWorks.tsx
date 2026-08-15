import { ShoppingBag, ClipboardList, Bike } from "lucide-react";
import { HeadlineLg, HeadlineMd, BodyMd, LabelMd } from "@/components/ui/Typography";

const STEPS = [
  {
    icon: ShoppingBag,
    step: "01",
    title: "Browse the Menu",
    description: "Explore our full menu of authentic Nigerian dishes. Filter by category, search by name, or browse Chef's picks.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Place Your Order",
    description: "Add dishes to your cart, fill in your delivery details, choose how you want to pay, and confirm via WhatsApp.",
  },
  {
    icon: Bike,
    step: "03",
    title: "Get It Delivered",
    description: "We prepare your order fresh and deliver straight to your door — same day, across Lagos in 45–60 minutes.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-14 md:py-24">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <LabelMd className="text-secondary">Simple Process</LabelMd>
          <HeadlineLg as="h2">How it works</HeadlineLg>
          <BodyMd className="max-w-md">
            Getting a fresh home-cooked Nigerian meal delivered to you takes less than 3 minutes.
          </BodyMd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[2px] bg-gradient-to-r from-outline-variant via-secondary to-outline-variant" />

          {STEPS.map(({ icon: Icon, step, title, description }, i) => (
            <div key={step} className="flex flex-col items-center text-center gap-4 relative">
              {/* Icon circle */}
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-raised ${
                  i === 1 ? "bg-primary" : "bg-surface-container-lowest"
                }`}>
                  <Icon size={28} className={i === 1 ? "text-on-primary" : "text-primary"} strokeWidth={1.5} />
                </div>
                {/* Step number badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="font-body font-bold text-[10px]">{i + 1}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <HeadlineMd as="h3" className="text-[17px] md:text-[19px]">{title}</HeadlineMd>
                <BodyMd className="text-[13px] md:text-[14px] leading-relaxed max-w-xs mx-auto">
                  {description}
                </BodyMd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
