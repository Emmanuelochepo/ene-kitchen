"use client";

import { useCart } from "@/context/CartContext";
import { FoodCard } from "@/components/ui/FoodCard";
import type { Dish } from "@/lib/menu-data";

export function FeaturedDishCard({ dish }: { dish: Dish }) {
  const { addItem } = useCart();

  return (
    <FoodCard
      name={dish.name}
      description={dish.description}
      price={dish.priceFormatted}
      image={dish.image}
      badge={dish.badge}
      onAddToCart={() =>
        addItem({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          priceFormatted: dish.priceFormatted,
          image: dish.image,
        })
      }
    />
  );
}
