"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectsGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">
          All Projects
        </span>
        <span className="text-[10px] text-zinc-600 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-full">
          {projects.length} projects
        </span>
      </div>

      {/* Grid — 3 cols on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
