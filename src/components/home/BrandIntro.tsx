import { HeadlineLg, BodyLg, LabelMd } from "@/components/ui/Typography";

export function BrandIntro() {
  return (
    <section className="bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
          <LabelMd className="text-secondary">Our Story</LabelMd>
          <HeadlineLg as="h2">
            A kitchen built on the recipes families actually cook
          </HeadlineLg>
          <BodyLg>
            Ene&apos;s Kitchen started the way most good food does — around a
            family table. Every dish is slow-cooked using traditional methods
            and quality ingredients, then prepared fresh for daily delivery
            and special occasions across Lagos. We believe premium doesn&apos;t
            have to mean unfamiliar; it means doing the familiar exceptionally
            well.
          </BodyLg>
        </div>
      </div>
    </section>
  );
}
