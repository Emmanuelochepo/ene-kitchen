"use client";

import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { FoodCard } from "@/components/ui/FoodCard";
import { useCart } from "@/context/CartContext";
import { useSiteSettings, useIsOpen } from "@/hooks/useStore";
import { createClient } from "@/lib/supabase-client";

const ALL = "All" as const;

export function MenuGrid() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { settings } = useSiteSettings();
  const { isOpen } = useIsOpen(settings);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("dishes").select("*").eq("active", true).order("sort_order").order("created_at")
      .then(({ data }) => {
        const list = data ?? [];
        setDishes(list);
        const cats = Array.from(new Set(list.map((d: any) => d.category)));
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () => activeCategory === ALL ? dishes : dishes.filter((d) => d.category === activeCategory),
    [dishes, activeCategory]
  );

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-surface-container-lowest rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-surface-container-high" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-4 bg-surface-container-high rounded w-3/4" />
            <div className="h-3 bg-surface-container-high rounded w-full" />
            <div className="h-3 bg-surface-container-high rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="-mx-6 px-6 md:mx-0 md:px-0 mb-10 overflow-x-auto">
        <div className="flex gap-3 w-max md:w-auto md:flex-wrap">
          {[ALL, ...categories].map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}
              className={clsx(
                "shrink-0 rounded-full px-5 py-2.5 font-body text-[13px] md:text-[14px] font-bold transition-colors cursor-pointer",
                activeCategory === category ? "bg-secondary text-on-secondary" : "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary/5"
              )}>
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((dish) => (
          <FoodCard
            key={dish.id}
            name={dish.name}
            description={dish.description}
            price={"₦" + dish.price.toLocaleString("en-NG")}
            image={dish.image_url}
            badge={dish.badge_label ? { label: dish.badge_label, variant: dish.badge_variant } : undefined}
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
        ))}
      </div>
    </div>
  );
}
