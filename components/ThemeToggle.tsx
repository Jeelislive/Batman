"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-lg border border-white/[0.08] dark:border-white/[0.08] bg-white/[0.04] hover:bg-[#F5C518]/10 hover:border-[#F5C518]/30 flex items-center justify-center text-zinc-500 hover:text-[#F5C518] transition-all duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark"
        ? <Moon size={14} />
        : <Sun size={14} />
      }
    </button>
  );
}
