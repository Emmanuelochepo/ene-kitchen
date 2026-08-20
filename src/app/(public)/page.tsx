import { Hero } from "@/components/home/Hero";
import { CategoryLinks } from "@/components/home/CategoryLinks";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BrandIntro } from "@/components/home/BrandIntro";
import { CateringBanner } from "@/components/home/CateringBanner";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <CategoryLinks />
      <FeaturedDishes />
      <HowItWorks />
      <BrandIntro />
      <CateringBanner />
    </main>
  );
}
