import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Dot grid */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0" />

      {/* Subtle yellow vignette at top */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% -10%, rgba(245,197,24,0.06), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Hero count={projects.length} />

          <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
            <ProjectsGrid />
          </section>
        </main>

        <footer className="border-t border-white/[0.05] py-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-1 h-1 rotate-45 bg-[#F5C518]/50" />
            <p className="text-[11px] font-semibold text-zinc-700 tracking-widest uppercase">
              Built by{" "}
              <a
                href="https://github.com/Jeelislive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-[#F5C518] transition-colors"
              >
                Jeel Patel
              </a>
            </p>
            <div className="w-1 h-1 rotate-45 bg-[#F5C518]/50" />
          </div>
        </footer>
      </div>
    </div>
  );
}
