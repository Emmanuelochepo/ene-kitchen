"use client";

import { useCart } from "@/context/CartContext";
import { FoodCard } from "@/components/ui/FoodCard";

interface FeaturedDishCardProps {
  dish: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url?: string;
    badge_label?: string;
    badge_variant?: string;
    in_stock: boolean;
    is_chiller: boolean;
  };
  isOpen: boolean;
}

export function FeaturedDishCard({ dish, isOpen }: FeaturedDishCardProps) {
  const { addItem } = useCart();

  return (
    <FoodCard
      name={dish.name}
      description={dish.description}
      price={"₦" + dish.price.toLocaleString("en-NG")}
      image={dish.image_url}
      badge={dish.badge_label ? { label: dish.badge_label, variant: dish.badge_variant as any } : undefined}
      inStock={dish.in_stock}
      isChiller={dish.is_chiller}
      isOpen={isOpen}
      onAddToCart={() => addItem({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        priceFormatted: "₦" + dish.price.toLocaleString("en-NG"),
        image: dish.image_url,
      })}
    />
  );
}
