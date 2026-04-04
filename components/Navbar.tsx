import { GitFork } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-14 border-b border-white/[0.06] dark:border-white/[0.06] backdrop-blur-xl bg-black/90 dark:bg-black/90 light:bg-white/95">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Batman-style diamond logo */}
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div
              className="w-5 h-5 rotate-45 bg-[#F5C518] group-hover:bg-[#E6B800] transition-colors duration-200"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
          </div>
          <span className="text-sm font-bold tracking-tight text-white dark:text-white">
            JEEL PATEL
          </span>
        </a>

        {/* Right */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Jeelislive"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-white/[0.08] dark:border-white/[0.08] bg-white/[0.04] hover:bg-[#F5C518]/10 hover:border-[#F5C518]/30 flex items-center justify-center text-zinc-500 hover:text-[#F5C518] transition-all duration-200"
            aria-label="GitHub"
          >
            <GitFork size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
