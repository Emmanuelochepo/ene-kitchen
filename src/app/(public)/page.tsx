import { Hero } from "@/components/home/Hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CateringBanner } from "@/components/home/CateringBanner";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <FeaturedDishes />
      <HowItWorks />
      <BrandIntro />
      <CateringBanner />
    </main>
  );
}
