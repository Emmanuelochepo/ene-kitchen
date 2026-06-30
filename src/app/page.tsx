import { Hero } from "@/components/home/Hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <BrandIntro />
      <FeaturedDishes />
    </main>
  );
}
