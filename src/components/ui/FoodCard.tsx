import { UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HeadlineMd, BodyLg, BodyMd } from "@/components/ui/Typography";

export interface FoodCardProps {
  name: string;
  description: string;
  price: string;
  badge?: { label: string; variant?: "spice" | "gold" | "forest" };
}

/**
 * Food Card — per Design.md "Food Cards": 12px rounded corners,
 * 4:3 image at top, headline-md title, bold spice-orange price,
 * small circular badge top-right for Hot/Vegan/Popular.
 *
 * Image area is a placeholder until real food photography is supplied.
 */
export function FoodCard({ name, description, price, badge }: FoodCardProps) {
  return (
    <Card noPadding className="h-full flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-surface-container-high flex items-center justify-center">
        <UtensilsCrossed size={32} className="text-outline" strokeWidth={1.25} />
        {badge && (
          <Badge variant={badge.variant} className="absolute top-3 right-3">
            {badge.label}
          </Badge>
        )}
      </div>
      <div className="p-6 flex flex-col gap-2 flex-1">
        <HeadlineMd className="text-[20px] md:text-[24px]">{name}</HeadlineMd>
        <BodyMd className="flex-1">{description}</BodyMd>
        <BodyLg as="span" className="font-bold text-secondary">
          {price}
        </BodyLg>
      </div>
    </Card>
  );
}
