"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { FoodCard } from "@/components/ui/FoodCard";
import { DISHES, DISH_CATEGORIES, type DishCategory } from "@/lib/menu-data";

const ALL = "All" as const;

export function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState<DishCategory | typeof ALL>(ALL);

  const filtered = useMemo(
    () => (activeCategory === ALL ? DISHES : DISHES.filter((d) => d.category === activeCategory)),
    [activeCategory]
  );

  return (
    <div>
      {/* Category filter pills — horizontally scrollable on mobile so it never wraps awkwardly */}
      <div className="-mx-6 px-6 md:mx-0 md:px-0 mb-10 overflow-x-auto">
        <div className="flex gap-3 w-max md:w-auto md:flex-wrap">
          {[ALL, ...DISH_CATEGORIES].map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={clsx(
                  "shrink-0 rounded-full px-5 py-2.5 font-body text-[14px] font-bold transition-colors cursor-pointer",
                  isActive
                    ? "bg-secondary text-on-secondary"
                    : "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary/5"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="font-body text-on-surface-variant text-center py-12">
          No dishes found in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((dish) => (
            <FoodCard
              key={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
              badge={dish.badge}
            />
          ))}
        </div>
      )}
    </div>
  );
}
