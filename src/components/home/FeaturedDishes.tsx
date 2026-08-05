"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeadlineLg, BodyLg, LabelMd } from "@/components/ui/Typography";
import { FeaturedDishCard } from "@/components/home/FeaturedDishCard";
import { createClient } from "@/lib/supabase-client";
import { useSiteSettings, useIsOpen } from "@/hooks/useStore";

export function FeaturedDishes() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSiteSettings();
  const { isOpen } = useIsOpen(settings);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("dishes")
      .select("*")
      .eq("active", true)
      .eq("featured", true)
      .eq("in_stock", true)
      .limit(3)
      .then(({ data }) => {
        setDishes(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <LabelMd className="text-secondary">Chef&apos;s Picks</LabelMd>
        <HeadlineLg as="h2">This week&apos;s featured dishes</HeadlineLg>
        <BodyLg className="max-w-lg">
          A rotating selection of our most-loved meals, prepared fresh and
          ready for same-day delivery.
        </BodyLg>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-surface-container-high" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-4 bg-surface-container-high rounded w-3/4" />
                <div className="h-3 bg-surface-container-high rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : dishes.length === 0 ? (
        <div className="text-center py-8">
          <BodyLg>No featured dishes at the moment. Check back soon!</BodyLg>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dishes.map((dish) => (
            <FeaturedDishCard key={dish.id} dish={dish} isOpen={isOpen} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <Link href="/menu">
          <Button variant="secondary">View Full Menu</Button>
        </Link>
      </div>
    </section>
  );
}
