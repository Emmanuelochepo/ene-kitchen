import { LabelSm } from "@/components/ui/Typography";

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-inverse-on-surface px-4 py-2">
      <p className="text-center">
        <LabelSm as="span" className="tracking-[0.02em]">
          Same-day delivery across Lagos, Mon–Sat · Chef&apos;s Special: Ofada Rice this week
        </LabelSm>
      </p>
    </div>
  );
}
