"use client";

import { useState } from "react";
import { ArrowUpRight, Code2, Mic, Sparkles, Layers, Zap, Trophy, MessageSquare, CloudSun, BarChart2, GitBranch, Monitor, BookOpen, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";

const iconMap: Record<string, LucideIcon> = {
  Code2, Mic, Sparkles, Layers, Zap, Trophy, MessageSquare, CloudSun, BarChart2, GitBranch, Monitor, BookOpen,
};

export function getThumbUrl(url: string, w = 640) {
  if (url.includes("github.com/Jeelislive/Github-Analyzer")) {
    return "https://opengraph.githubassets.com/1/Jeelislive/Github-Analyzer";
  }
  return `https://image.thum.io/get/width/${w}/crop/720/noanimate/${url}`;
}

export function getImageSrc(project: { screenshot?: string; url: string }, w = 640): string {
  return project.screenshot ?? getThumbUrl(project.url, w);
}

interface Props {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

export function ProjectCard({ project: p, index, onOpen }: Props) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const delay = `${index * 55}ms`;
  const Icon = iconMap[p.icon] ?? Code2;

  function preloadModalImage() {
    const img = new window.Image();
    img.src = getImageSrc(p, 1280);
  }

  return (
    <article
      className="group relative flex flex-col rounded-xl border border-white/[0.07] bg-[#0c0c0c] dark:bg-[#0c0c0c] overflow-hidden cursor-pointer
        hover:-translate-y-1.5
        hover:border-[#F5C518]/25
        hover:shadow-[0_0_0_1px_rgba(245,197,24,0.12),0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,197,24,0.04)]
        transition-all duration-300 ease-out
        animate-[fadeUp_0.45s_ease_both]"
      style={{ animationDelay: delay }}
      onClick={() => onOpen(p)}
      onMouseEnter={preloadModalImage}
      role="button"
      tabIndex={0}
      aria-label={`View ${p.name} project`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p);
        }
      }}
    >
      {/* Top edge yellow glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#F5C518] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Screenshot */}
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        {/* Shimmer skeleton shown while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
        )}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageSrc(p, 640)}
            alt={`${p.name} screenshot`}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.05] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${p.color}15, #000)` }}
          >
            <Icon size={40} style={{ color: p.color }} strokeWidth={1.5} />
          </div>
        )}

        {/* Scan line effect on hover */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-[#F5C518]/[0.03] to-transparent animate-[scan_2s_linear_infinite]" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center">
          <span className="text-xs font-bold text-black bg-[#F5C518] px-4 py-1.5 rounded tracking-wider uppercase translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-250">
            EXPLORE →
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-sm font-bold text-white dark:text-white tracking-tight">{p.name}</span>
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#F5C518] bg-[#F5C518]/10 border border-[#F5C518]/20 px-2 py-0.5 rounded tracking-widest uppercase shrink-0">
            <span className="w-1 h-1 rounded-full bg-[#F5C518] animate-[breathe_2s_ease_infinite]" />
            {p.status === "github" ? "OSS" : "LIVE"}
          </span>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3 flex-1 tracking-wide">
          {p.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium text-zinc-600 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded tracking-wide"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {t}
            </span>
          ))}
          {p.tags.length > 3 && (
            <span
              className="text-[10px] font-medium text-zinc-600 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              +{p.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.05]">
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-700">
          {p.cat}
        </span>
        <ArrowUpRight
          size={13}
          className="text-zinc-700 group-hover:text-[#F5C518] transition-colors duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </article>
  );
}
