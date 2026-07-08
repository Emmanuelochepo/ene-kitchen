"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { FoodCard } from "@/components/ui/FoodCard";
import { useCart } from "@/context/CartContext";
import { useSiteSettings, useIsOpen, useMenuStock } from "@/hooks/useStore";
import { DISHES, DISH_CATEGORIES, type DishCategory } from "@/lib/menu-data";

const ALL = "All" as const;

export function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState<DishCategory | typeof ALL>(ALL);
  const { addItem } = useCart();
  const { settings } = useSiteSettings();
  const { isOpen } = useIsOpen(settings);
  const { stock } = useMenuStock();

  const filtered = useMemo(
    () => (activeCategory === ALL ? DISHES : DISHES.filter((d) => d.category === activeCategory)),
    [activeCategory]
  );

  return (
    <div>
      {/* Category filters */}
      <div className="-mx-6 px-6 md:mx-0 md:px-0 mb-10 overflow-x-auto">
        <div className="flex gap-3 w-max md:w-auto md:flex-wrap">
          {[ALL, ...DISH_CATEGORIES].map((category) => {
            const isActive = category === activeCategory;
            return (
              <button key={category} onClick={() => setActiveCategory(category)}
                className={clsx(
                  "shrink-0 rounded-full px-5 py-2.5 font-body text-[13px] md:text-[14px] font-bold transition-colors cursor-pointer",
                  isActive ? "bg-secondary text-on-secondary" : "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary/5"
                )}>
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((dish) => {
          const stockInfo = stock[dish.id];
          const inStock = stockInfo ? stockInfo.inStock : true;
          const isChiller = stockInfo ? stockInfo.isChiller : false;

          return (
            <FoodCard
              key={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.priceFormatted}
              image={dish.image}
              badge={dish.badge}
              inStock={inStock}
              isChiller={isChiller}
              isOpen={isOpen}
              onAddToCart={() => addItem({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                priceFormatted: dish.priceFormatted,
                image: dish.image,
              })}
            />
          );
        })}
      </div>
    </div>
  );
}
