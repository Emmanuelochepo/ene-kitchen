export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="font-body text-label-md tracking-[0.05em] uppercase text-secondary mb-4">
          Ene&apos;s Kitchen
        </p>
        <h1 className="font-display font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-primary mb-6">
          Phase 0 complete
        </h1>
        <p className="font-body text-[18px] leading-[1.6] text-on-surface-variant">
          Project scaffolded with Next.js, Tailwind, and the Ene&apos;s Kitchen
          design tokens. Ready to start Phase 1: the core component library.
        </p>
      </div>
    </main>
  );
}
