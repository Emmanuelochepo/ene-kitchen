import Link from "next/link";
import { Flame, UtensilsCrossed, Beef, Salad, Coffee, Drumstick } from "lucide-react";
import { HeadlineLg, LabelMd, LabelSm } from "@/components/ui/Typography";

const CATEGORIES = [
  { label: "Rice & Grains", icon: UtensilsCrossed, color: "bg-secondary-fixed text-on-secondary-fixed", param: "Rice & Grains" },
  { label: "Soups & Swallow", icon: Flame, color: "bg-primary-fixed text-primary", param: "Soups & Swallow" },
  { label: "Proteins & Grills", icon: Beef, color: "bg-tertiary-fixed text-on-tertiary-fixed-variant", param: "Proteins & Grills" },
  { label: "Sides", icon: Drumstick, color: "bg-surface-container-high text-on-surface", param: "Sides" },
  { label: "Vegan", icon: Salad, color: "bg-[#dcfce7] text-[#166534]", param: "Vegan" },
  { label: "Drinks", icon: Coffee, color: "bg-surface-container-highest text-on-surface-variant", param: "Drinks" },
];

export function CategoryLinks() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-10 md:py-16">
      <div className="flex flex-col items-center text-center gap-3 mb-8">
        <LabelMd className="text-secondary">Browse by Category</LabelMd>
        <HeadlineLg as="h2" className="text-[20px] md:text-[28px]">What are you craving?</HeadlineLg>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {CATEGORIES.map(({ label, icon: Icon, color, param }) => (
          <Link key={label} href={`/menu?category=${encodeURIComponent(param)}`}
            className="flex flex-col items-center gap-2.5 group">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-raised transition-all duration-200 group-hover:scale-105 group-hover:shadow-overlay ${color}`}>
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <LabelSm className="text-on-surface text-center leading-tight font-bold text-[10px] md:text-[11px]">
              {label}
            </LabelSm>
          </Link>
        ))}
      </div>
    </section>
  );
}
