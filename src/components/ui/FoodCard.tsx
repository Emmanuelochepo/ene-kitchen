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
  onAddToCart?: () => void;
}

/**
 * Food Card — per Design.md:
 * - 12px rounded corners, 4:3 image at top
 * - headline-md title, bold spice-orange price
 * - circular badge top-right for Hot/Vegan/Popular
 * - circular orange "Add to Cart" Plus button (secondary-container bg)
 */
export function FoodCard({ name, description, price, image, badge, onAddToCart }: FoodCardProps) {
  return (
    <Card noPadding className="h-full flex flex-col group card-hover">
      {/* 4:3 image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-outline text-[12px] font-body">
            No image
          </div>
        )}
        {badge && (
          <Badge variant={badge.variant} className="absolute top-3 right-3 z-10">
            {badge.label}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
        <HeadlineMd className="text-[18px] md:text-[20px] leading-snug">{name}</HeadlineMd>
        <BodyMd className="flex-1 leading-relaxed text-[14px] md:text-[15px]">{description}</BodyMd>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between gap-4 mt-3">
          <BodyLg as="span" className="font-bold text-secondary text-[16px] md:text-[18px]">
            {price}
          </BodyLg>
          <button
            aria-label={`Add ${name} to cart`}
            onClick={onAddToCart}
            className="
              w-9 h-9 md:w-10 md:h-10 rounded-full shrink-0
              bg-secondary-container text-on-secondary-container
              flex items-center justify-center
              hover:brightness-95 active:scale-95
              transition-all duration-150 cursor-pointer
            "
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Card>
  );
}
