export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20 text-center">
      <div className="max-w-2xl">
        <p className="font-body text-[14px] font-bold tracking-[0.05em] uppercase text-secondary mb-4">
          Ene&apos;s Kitchen
        </p>
        <h1 className="font-display font-bold text-[28px] md:text-[48px] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] text-primary mb-6">
          Phase 2 complete
        </h1>
        <p className="font-body text-[16px] md:text-[18px] leading-[1.6] text-on-surface-variant">
          Layout shell is live: announcement bar, responsive header with mobile
          menu, and footer. Ready to start Phase 3: the homepage itself.
        </p>
      </div>
    </main>
  );
}
