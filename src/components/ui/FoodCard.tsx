import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
 * Food Card — per Design.md spec:
 * - 12px rounded corners, 4:3 image at top
 * - headline-md title, bold spice-orange price
 * - small circular badge top-right for Hot/Vegan/Popular
 * - circular soft-gold "Add to Cart" icon button (Design.md "Icon Buttons")
 */
export function FoodCard({ name, description, price, image, badge, onAddToCart }: FoodCardProps) {
  return (
    <Card noPadding className="h-full flex flex-col group">
      {/* Image — 4:3 aspect ratio */}
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
      <div className="p-6 flex flex-col gap-2 flex-1">
        <HeadlineMd className="text-[20px] leading-snug">{name}</HeadlineMd>
        <BodyMd className="flex-1 leading-relaxed">{description}</BodyMd>

        {/* Price row + Add to Cart */}
        <div className="flex items-center justify-between gap-4 mt-2">
          <BodyLg as="span" className="font-bold text-secondary">
            {price}
          </BodyLg>
          <Button
            variant="icon"
            aria-label={`Add ${name} to cart`}
            onClick={onAddToCart}
            className="shrink-0"
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
