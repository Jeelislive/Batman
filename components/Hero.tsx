export function Hero({ count }: { count: number }) {
  return (
    <section className="relative pt-20 pb-16 px-5 sm:px-8 text-center">

      {/* Status badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F5C518]/20 bg-[#F5C518]/5 text-xs font-semibold text-[#F5C518] mb-8 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] shadow-[0_0_8px_#F5C518] animate-[breathe_2.2s_ease_infinite]" />
        {count} Projects Deployed
      </div>

      {/* Main heading — pure solid, no gradients */}
      <h1 className="text-[clamp(40px,7vw,80px)] font-black tracking-[-0.04em] leading-[1.0] mb-6 text-white dark:text-white light:text-black">
        CRAFTING
        <br />
        <span className="text-[#F5C518] bat-glow">
          PRODUCTS
        </span>
        <br />
        THAT SHIP
      </h1>

      <p className="text-sm sm:text-base font-medium text-zinc-500 dark:text-zinc-500 max-w-sm mx-auto leading-relaxed tracking-wide">
        Full-stack engineer.
        <br />
        Click any project to explore.
      </p>

      {/* Divider line */}
      <div className="flex items-center gap-4 max-w-xs mx-auto mt-10 mb-10">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#F5C518]/40" />
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
        {[
          { n: count.toString(), l: "Projects" },
          { n: "100%", l: "Live" },
          { n: "2+", l: "Years" },
          { n: "∞", l: "Passion" },
        ].map((s, i, arr) => (
          <div key={s.l} className="flex items-center gap-6 sm:gap-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white dark:text-white light:text-black">
                {s.n}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 mt-1">
                {s.l}
              </div>
            </div>
            {i < arr.length - 1 && (
              <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
