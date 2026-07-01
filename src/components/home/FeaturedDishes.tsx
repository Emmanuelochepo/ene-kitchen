import { Button } from "@/components/ui/Button";
import { FoodCard } from "@/components/ui/FoodCard";
import { HeadlineLg, BodyLg, LabelMd } from "@/components/ui/Typography";
import { DISHES } from "@/lib/menu-data";

// Pick 3 featured dishes by id
const FEATURED_IDS = ["jollof-rice-special", "pepper-soup", "efo-riro"];
const FEATURED_DISHES = FEATURED_IDS.map((id) => DISHES.find((d) => d.id === id)!);

export function FeaturedDishes() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {FEATURED_DISHES.map((dish) => (
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

      <div className="flex justify-center mt-12">
        <Button variant="secondary">View Full Menu</Button>
      </div>
    </section>
  );
}
