import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  HeadlineXl,
  HeadlineLg,
  HeadlineMd,
  BodyLg,
  BodyMd,
  LabelMd,
  LabelSm,
} from "@/components/ui/Typography";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 py-12 border-b border-outline-variant">
      <LabelMd className="text-secondary">{title}</LabelMd>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </section>
  );
}

export default function ComponentsPreview() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 flex flex-col">
      <HeadlineXl className="mb-2">Component Library</HeadlineXl>
      <BodyLg className="mb-8">Phase 1 — internal preview, not a public page.</BodyLg>

      <Section title="Typography">
        <div className="flex flex-col gap-4 w-full">
          <HeadlineXl>Headline XL — Jollof Rice & Plantain</HeadlineXl>
          <HeadlineLg>Headline LG — Catering for Every Occasion</HeadlineLg>
          <HeadlineMd>Headline MD — Chef&apos;s Special</HeadlineMd>
          <BodyLg>Body LG — Slow-cooked in a rich tomato base with smoked spices.</BodyLg>
          <BodyMd>Body MD — Served hot, made fresh daily, delivered to your door.</BodyMd>
          <LabelMd>Label MD — Category Tag</LabelMd>
          <LabelSm>Label SM — Ene is online</LabelSm>
        </div>
      </Section>

      <Section title="Buttons">
        <Button variant="primary">Order Now</Button>
        <Button variant="secondary">View Menu</Button>
        <Button variant="icon" aria-label="Add to cart">
          +
        </Button>
        <Button variant="primary" disabled>
          Sold Out
        </Button>
      </Section>

      <Section title="Badges">
        <Badge variant="spice">Hot</Badge>
        <Badge variant="forest">Vegan</Badge>
        <Badge variant="gold">Popular</Badge>
      </Section>

      <Section title="Input Fields">
        <div className="w-full max-w-sm flex flex-col gap-4">
          <Input id="name" label="Full name" placeholder="Enter your name" />
          <Input id="email" label="Email" placeholder="you@example.com" error="Please enter a valid email" />
        </div>
      </Section>

      <Section title="Cards">
        <Card className="max-w-xs">
          <HeadlineMd className="mb-2">Jollof Rice Special</HeadlineMd>
          <BodyMd className="mb-4">With grilled chicken, fried plantain, and coleslaw.</BodyMd>
          <BodyLg className="font-bold text-secondary">₦8,500</BodyLg>
        </Card>

        <Card noPadding className="max-w-xs">
          <div className="aspect-[4/3] bg-surface-container-high flex items-center justify-center relative">
            <LabelSm className="text-on-surface-variant">Image 4:3</LabelSm>
            <Badge variant="spice" className="absolute top-3 right-3">
              Hot
            </Badge>
          </div>
          <div className="p-6">
            <HeadlineMd className="mb-2">Pepper Soup</HeadlineMd>
            <BodyLg className="font-bold text-secondary">₦6,000</BodyLg>
          </div>
        </Card>
      </Section>
    </main>
  );
}
