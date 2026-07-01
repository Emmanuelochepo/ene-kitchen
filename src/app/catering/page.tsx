import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeadlineXl, HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelMd } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering | Ene's Kitchen",
  description: "Premium Nigerian catering for weddings, corporate events, private dinners, and celebrations across Lagos.",
};

const PACKAGES = [
  {
    name: "Private Dinner",
    capacity: "Up to 20 guests",
    description: "An intimate, fully catered dining experience in your home or venue. Includes setup, service, and cleanup.",
    price: "From ₦150,000",
    includes: [
      "3-course Nigerian menu",
      "On-site chef & service staff",
      "Full setup & cleanup",
      "Custom menu consultation",
    ],
  },
  {
    name: "Social Events",
    capacity: "20–100 guests",
    description: "Birthdays, naming ceremonies, house warmings — we bring the full kitchen to your celebration.",
    price: "From ₦350,000",
    includes: [
      "Customizable buffet menu",
      "Full catering crew",
      "Serving equipment provided",
      "Small chops & drinks options",
      "Setup & cleanup",
    ],
    featured: true,
  },
  {
    name: "Corporate & Weddings",
    capacity: "100+ guests",
    description: "Large-scale events handled end-to-end. We work with your event coordinator and handle everything culinary.",
    price: "Custom quote",
    includes: [
      "Full event menu planning",
      "Tastings before your event",
      "Dedicated event manager",
      "Multiple food stations",
      "Full logistics & staffing",
    ],
  },
];

export default function CateringPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-16 md:pt-24 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left">
            <LabelMd className="text-secondary">Catering & Events</LabelMd>
            <HeadlineXl as="h1">
              Bringing the kitchen to your celebration
            </HeadlineXl>
            <BodyLg className="max-w-md mx-auto lg:mx-0">
              Whether it&apos;s an intimate dinner or a wedding for 500, we handle
              every dish with the same care we bring to our daily menu. Premium
              Nigerian cuisine, wherever you need it.
            </BodyLg>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button variant="primary">Request a Quote</Button>
              <Button variant="secondary">Chat on WhatsApp</Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-overlay w-full max-w-md mx-auto lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85"
                alt="Catering event setup with Nigerian dishes"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="text-center flex flex-col items-center gap-4 mb-12 md:mb-16">
            <LabelMd className="text-secondary">Our Packages</LabelMd>
            <HeadlineLg as="h2">Find the right fit for your event</HeadlineLg>
            <BodyLg className="max-w-lg">
              All packages are customisable. Reach out and we&apos;ll build a menu
              around your guests and occasion.
            </BodyLg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                noPadding
                className={`flex flex-col overflow-hidden ${
                  pkg.featured ? "ring-2 ring-secondary" : ""
                }`}
              >
                {pkg.featured && (
                  <div className="bg-secondary text-on-secondary text-center py-2">
                    <LabelMd>Most Popular</LabelMd>
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col gap-5 flex-1">
                  <div>
                    <HeadlineMd as="h3">{pkg.name}</HeadlineMd>
                    <LabelMd className="text-secondary mt-1">{pkg.capacity}</LabelMd>
                  </div>
                  <BodyMd>{pkg.description}</BodyMd>
                  <ul className="flex flex-col gap-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={16} className="text-secondary mt-0.5 shrink-0" />
                        <BodyMd className="text-on-surface">{item}</BodyMd>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-outline-variant flex flex-col gap-4">
                    <BodyLg as="span" className="font-bold text-secondary">
                      {pkg.price}
                    </BodyLg>
                    <Button variant={pkg.featured ? "primary" : "secondary"} className="w-full justify-center">
                      Get Started
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 text-center flex flex-col items-center gap-6">
        <HeadlineLg as="h2">Not sure which package fits?</HeadlineLg>
        <BodyLg className="max-w-lg">
          Send us a message and we&apos;ll figure it out together. We cater to all
          budgets and occasions — just tell us what you have in mind.
        </BodyLg>
        <Button variant="primary">Talk to Us on WhatsApp</Button>
      </section>
    </main>
  );
}
