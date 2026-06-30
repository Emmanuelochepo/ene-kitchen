import { Button } from "@/components/ui/Button";
import { FoodCard } from "@/components/ui/FoodCard";
import { HeadlineLg, BodyLg, LabelMd } from "@/components/ui/Typography";

const FEATURED_DISHES = [
  {
    name: "Jollof Rice Special",
    description: "Smoky party-style jollof with grilled chicken and fried plantain.",
    price: "₦8,500",
    badge: { label: "Popular", variant: "gold" as const },
  },
  {
    name: "Pepper Soup",
    description: "Goat meat simmered in a peppery, aromatic broth.",
    price: "₦6,000",
    badge: { label: "Hot", variant: "spice" as const },
  },
  {
    name: "Vegetable Efo Riro",
    description: "Slow-cooked spinach stew with assorted vegetables and palm oil.",
    price: "₦7,000",
    badge: { label: "Vegan", variant: "forest" as const },
  },
];

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
          <FoodCard key={dish.name} {...dish} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="secondary">View Full Menu</Button>
      </div>
    </section>
  );
}
