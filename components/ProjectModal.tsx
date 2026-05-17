"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, GitFork, Code2, Mic, Sparkles, Layers, Zap, Trophy, MessageSquare, CloudSun, BarChart2, GitBranch, Monitor, BookOpen, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";
import { getThumbUrl, getImageSrc } from "@/components/ProjectCard";

const iconMap: Record<string, LucideIcon> = {
  Code2, Mic, Sparkles, Layers, Zap, Trophy, MessageSquare, CloudSun, BarChart2, GitBranch, Monitor, BookOpen,
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project: p, onClose }: Props) {
  const [bannerError, setBannerError] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (p) {
      setBannerError(false);
      setBannerLoaded(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [p]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (p) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [p]);

  if (!p) return null;
  const Icon = iconMap[p.icon] ?? Code2;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl
          border border-white/[0.09]
          bg-[#080808]
          shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_rgba(0,0,0,0.95)]
          transition-all duration-300
          ${visible ? "scale-100 translate-y-0" : "scale-[0.94] translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Top yellow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#F5C518] opacity-40" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-[#F5C518]/10 hover:border-[#F5C518]/30 flex items-center justify-center text-zinc-600 hover:text-[#F5C518] transition-all duration-150 cursor-pointer"
          aria-label="Close"
        >
          <X size={13} />
        </button>

        {/* Banner */}
        <div className="relative aspect-video overflow-hidden rounded-t-xl bg-zinc-900">
          {!bannerLoaded && !bannerError && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
          )}
          {!bannerError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getImageSrc(p, 1280)}
              alt={`${p.name} screenshot`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${bannerLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setBannerLoaded(true)}
              onError={() => setBannerError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${p.color}18, #000)` }}
            >
              <Icon size={72} style={{ color: p.color }} strokeWidth={1} />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080808] to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 sm:px-7 pb-7">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5 mt-1">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08]"
              style={{ background: `linear-gradient(135deg, ${p.color}18, #000)` }}
            >
              <Icon size={22} style={{ color: p.color }} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-black text-white tracking-tight mb-0.5 uppercase">{p.name}</h2>
              <p className="text-xs text-zinc-500 tracking-wide">{p.tagline}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#F5C518] bg-[#F5C518]/10 border border-[#F5C518]/20 px-2.5 py-1 rounded tracking-widest uppercase">
                <span className="w-1 h-1 rounded-full bg-[#F5C518] animate-[breathe_2s_ease_infinite]" />
                {p.status === "github" ? "Open Source" : "Live"}
              </span>
              <span className="text-[9px] font-bold text-zinc-600 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded uppercase tracking-widest">
                {p.cat}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-5" />

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed mb-6 tracking-wide">{p.desc}</p>

          {/* Highlights */}
          <div className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-3">
              — Highlights
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {p.hl.map((h) => (
                <div
                  key={h.l}
                  className="rounded-lg p-3 text-center border border-white/[0.06] bg-white/[0.02] hover:border-[#F5C518]/20 transition-colors"
                >
                  <div className="text-lg font-black tracking-tight text-[#F5C518]">{h.v}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mt-0.5">{h.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-3">— Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded hover:border-[#F5C518]/25 hover:text-zinc-200 transition-all"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  <span className="w-1 h-1 rounded-full shrink-0 bg-[#F5C518]/60" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-3">— Key Features</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {p.feats.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-zinc-500 tracking-wide">
                  <span className="text-[#F5C518] font-bold text-sm shrink-0">✦</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Gallery — reuse the already-cached banner URL at two crops */}
          <div className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-3">— Screenshots</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { w: 1280, opacity: "" },
                { w: 640, opacity: "opacity-60" },
              ].map(({ w, opacity }, i) => (
                <div key={w} className="rounded-lg overflow-hidden border border-white/[0.06] aspect-video bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageSrc(p, w)}
                    alt={`${p.name} view ${i + 1}`}
                    className={`w-full h-full object-cover ${opacity}`}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-5 border-t border-white/[0.06]">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#F5C518] text-black text-sm font-black tracking-wider uppercase hover:bg-[#E6B800] transition-all duration-150 hover:-translate-y-0.5"
            >
              <ExternalLink size={13} />
              {p.status === "github" ? "View on GitHub" : "Visit Live Site"}
            </a>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 text-sm font-bold tracking-wide hover:bg-white/[0.09] hover:border-[#F5C518]/25 hover:text-[#F5C518] transition-all duration-150"
              >
                <GitFork size={13} />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
