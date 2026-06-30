import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeadlineXl, BodyLg, LabelMd } from "@/components/ui/Typography";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col items-start gap-6 order-2 lg:order-1 text-center lg:text-left mx-auto lg:mx-0">
          <LabelMd className="text-secondary">The Discerning Host</LabelMd>
          <HeadlineXl as="h1">
            Home-cooked Nigerian cuisine, made for how you actually eat
          </HeadlineXl>
          <BodyLg className="max-w-md">
            From weeknight dinners to weekend gatherings, Ene&apos;s Kitchen brings
            authentic, carefully prepared Nigerian dishes straight to your table —
            no shortcuts, no compromises.
          </BodyLg>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="primary">Order Now</Button>
            <Button variant="secondary">View Menu</Button>
          </div>
        </div>

        {/* Hero visual — placeholder until real photography is supplied */}
        <div className="order-1 lg:order-2 w-full">
          <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none rounded-lg bg-gradient-to-br from-primary-container to-primary shadow-overlay flex items-center justify-center">
            <ChefHat size={56} className="text-primary-fixed" strokeWidth={1.25} />
            <span className="absolute bottom-4 inset-x-4 text-center font-body text-[12px] text-primary-fixed/70">
              Hero photography placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
