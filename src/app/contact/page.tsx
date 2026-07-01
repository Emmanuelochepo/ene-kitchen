import type { Metadata } from "next";
import { HeadlineXl, BodyLg, LabelMd } from "@/components/ui/Typography";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact | Ene's Kitchen",
  description: "Get in touch with Ene's Kitchen for orders, catering enquiries, or any questions.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-10 md:pt-24 md:pb-12 text-center flex flex-col items-center gap-4">
        <LabelMd className="text-secondary">Get in Touch</LabelMd>
        <HeadlineXl as="h1">We&apos;d love to hear from you</HeadlineXl>
        <BodyLg className="max-w-xl">
          Whether you want to place an order, enquire about catering, or just
          say hello — we&apos;re here and quick to respond.
        </BodyLg>
      </section>
      <ContactContent />
    </main>
  );
}
