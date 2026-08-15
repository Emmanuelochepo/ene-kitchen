"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeadlineLg, BodyLg, LabelMd } from "@/components/ui/Typography";
import { FeaturedDishCard } from "@/components/home/FeaturedDishCard";
import { createClient } from "@/lib/supabase-client";
import { useSiteSettings, useIsOpen } from "@/hooks/useStore";

export function FeaturedDishes() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { settings } = useSiteSettings();
  const { isOpen } = useIsOpen(settings);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 1 },
    },
  });

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("dishes")
      .select("*")
      .eq("active", true)
      .eq("featured", true)
      .eq("in_stock", true)
      .limit(6)
      .then(({ data }) => {
        setDishes(data ?? []);
        setLoading(false);
      });
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-14 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
          <div className="flex flex-col gap-2">
            <LabelMd className="text-secondary">Chef&apos;s Picks</LabelMd>
            <HeadlineLg as="h2" className="max-w-xs">
              This week&apos;s featured dishes
            </HeadlineLg>
          </div>
          {/* Arrow controls — visible on all sizes */}
          {!loading && dishes.length > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:brightness-110 transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="flex gap-5 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30%] animate-pulse">
                <div className="bg-surface-container-lowest rounded-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-surface-container-high" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="h-4 bg-surface-container-high rounded w-3/4" />
                    <div className="h-3 bg-surface-container-high rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-8">
            <BodyLg>No featured dishes yet. Check back soon!</BodyLg>
          </div>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 touch-pan-y">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="shrink-0 w-[80vw] sm:w-[45vw] lg:w-[calc(33.333%-14px)]"
                >
                  <FeaturedDishCard dish={dish} isOpen={isOpen} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dot indicators */}
        {!loading && dishes.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {dishes.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === selectedIndex
                    ? "w-6 h-2 bg-secondary"
                    : "w-2 h-2 bg-outline-variant hover:bg-outline"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link href="/menu">
            <Button variant="secondary">View Full Menu</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
