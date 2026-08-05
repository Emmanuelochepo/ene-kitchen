"use client";

import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { Search, X } from "lucide-react";
import { FoodCard } from "@/components/ui/FoodCard";
import { useCart } from "@/context/CartContext";
import { useSiteSettings, useIsOpen } from "@/hooks/useStore";
import { createClient } from "@/lib/supabase-client";

const ALL = "All" as const;

export function MenuGrid() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { settings } = useSiteSettings();
  const { isOpen } = useIsOpen(settings);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("dishes")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .order("created_at")
      .then(({ data }) => {
        const list = data ?? [];
        setDishes(list);
        const cats = Array.from(new Set(list.map((d: any) => d.category)));
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = dishes;

    // Filter by category
    if (activeCategory !== ALL) {
      result = result.filter((d) => d.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [dishes, activeCategory, searchQuery]);

  if (loading) return (
    <div className="flex flex-col gap-8">
      <div className="h-12 bg-surface-container-high rounded-full animate-pulse w-full" />
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
    </div>
  );

  return (
    <div className="flex flex-col gap-8">

      {/* Search bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="text"
          placeholder="Search dishes, e.g. jollof, chicken, vegan..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActiveCategory(ALL); // reset category when searching
          }}
          className="w-full rounded-full bg-surface-container-lowest border border-outline-variant pl-11 pr-10 py-3 font-body text-[15px] text-on-surface placeholder:text-outline outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-raised"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category filters — hidden when searching */}
      {!searchQuery && (
        <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto">
          <div className="flex gap-3 w-max md:w-auto md:flex-wrap">
            {[ALL, ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={clsx(
                  "shrink-0 rounded-full px-5 py-2.5 font-body text-[13px] md:text-[14px] font-bold transition-colors cursor-pointer",
                  activeCategory === category
                    ? "bg-secondary text-on-secondary"
                    : "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary/5"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Search size={32} className="text-outline" />
          <p className="font-body font-bold text-[16px] text-on-surface">
            No dishes found for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="font-body text-[14px] text-on-surface-variant">
            Try a different keyword or browse by category.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="font-body text-[14px] text-secondary font-bold hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          {searchQuery && (
            <p className="font-body text-[13px] text-on-surface-variant">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
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
        </>
      )}
    </div>
  );
}
