import Image from "next/image";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HeadlineMd, BodyLg, BodyMd } from "@/components/ui/Typography";

export interface FoodCardProps {
  name: string;
  description: string;
  price: string;
  image?: string;
  badge?: { label: string; variant?: "spice" | "gold" | "forest" };
  inStock?: boolean;
  isChiller?: boolean;
  isOpen?: boolean;
  onAddToCart?: () => void;
}

export function FoodCard({
  name, description, price, image, badge,
  inStock = true, isChiller = false, isOpen = true,
  onAddToCart,
}: FoodCardProps) {
  // Can only add to cart if: kitchen is open AND item is in stock
  const canOrder = isOpen && inStock;

  return (
    <Card noPadding className="h-full flex flex-col group card-hover">
      {/* 4:3 image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
        {image ? (
          <Image
            src={image} alt={name} fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${canOrder ? "group-hover:scale-105" : "grayscale opacity-60"}`}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-outline text-[12px] font-body">No image</div>
        )}

        {/* Sold out overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-inverse-surface/50 flex items-center justify-center">
            <span className="bg-inverse-surface text-inverse-on-surface font-body font-bold text-[13px] px-4 py-2 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Chiller badge */}
        {isChiller && inStock && (
          <Badge variant="forest" className="absolute top-3 left-3 z-10">Chiller</Badge>
        )}

        {badge && inStock && (
          <Badge variant={badge.variant} className="absolute top-3 right-3 z-10">{badge.label}</Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
        <HeadlineMd className="text-[16px] md:text-[18px] leading-snug">{name}</HeadlineMd>
        <BodyMd className="flex-1 leading-relaxed text-[13px] md:text-[14px]">{description}</BodyMd>

        <div className="flex items-center justify-between gap-4 mt-3">
          <BodyLg as="span" className={`font-bold text-[15px] md:text-[16px] ${canOrder ? "text-secondary" : "text-outline"}`}>
            {price}
          </BodyLg>
          <button
            aria-label={`Add ${name} to cart`}
            onClick={canOrder ? onAddToCart : undefined}
            disabled={!canOrder}
            className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-150
              ${canOrder
                ? "bg-secondary-container text-on-secondary-container hover:brightness-95 active:scale-95 cursor-pointer"
                : "bg-surface-container text-outline cursor-not-allowed"
              }`}
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Card>
  );
}
