import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeadlineXl, BodyLg, LabelMd } from "@/components/ui/Typography";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <div className="flex flex-col items-center lg:items-start gap-6 order-2 lg:order-1 text-center lg:text-left">
          <LabelMd className="text-secondary">The Discerning Host</LabelMd>
          <HeadlineXl as="h1">
            Home-cooked Nigerian cuisine, made for how you actually eat
          </HeadlineXl>
          <BodyLg className="max-w-md mx-auto lg:mx-0">
            From weeknight dinners to weekend gatherings, Ene&apos;s Kitchen brings
            authentic, carefully prepared Nigerian dishes straight to your table —
            no shortcuts, no compromises.
          </BodyLg>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="primary">Order Now</Button>
            <Button variant="secondary">View Menu</Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="order-1 lg:order-2 w-full">
          <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none rounded-lg overflow-hidden shadow-overlay">
            <Image
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85"
              alt="A beautiful spread of Nigerian dishes"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Subtle gradient to blend bottom edge into cream bg */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
