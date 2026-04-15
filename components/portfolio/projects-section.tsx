"use client";

import { useLanguage } from "@/lib/language-context";
import { projects } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/use-in-view";
import { ExternalLink, Github, Folder } from "lucide-react";

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-pixel)] text-xs text-neon-magenta mb-2">
            {"// "}
            {t("projects.subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-neon-cyan text-glow-cyan">
              {t("projects.title")}
            </span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Project Card */}
              <div className="h-full flex flex-col bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-neon-cyan/50 transition-all duration-300 hover:neon-glow-cyan overflow-hidden">
                {/* Image/Preview Area */}
                <div className="relative h-48 bg-gradient-to-br from-neon-cyan/10 via-background to-neon-magenta/10 overflow-hidden">
                  {/* Scanlines effect */}
                  <div className="absolute inset-0 scanlines pointer-events-none" />

                  {/* Project Icon Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-lg bg-secondary/50 border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Folder className="w-10 h-10 text-neon-cyan" />
                      </div>
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-lg bg-neon-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* HUD overlay */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${project.demoUrl && project.demoUrl !== "#" ? "bg-neon-lime animate-pulse" : "bg-red-500"}`} />
                    <span className={`font-[var(--font-pixel)] text-[8px] ${project.demoUrl && project.demoUrl !== "#" ? "text-neon-lime" : "text-red-400"}`}>
                      {project.demoUrl && project.demoUrl !== "#" ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>

                  {/* Project number */}
                  <div className="absolute top-2 right-2">
                    <span className="font-[var(--font-pixel)] text-xs text-muted-foreground">
                      #{String(project.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-neon-cyan transition-colors">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {language === "en"
                      ? project.description.en
                      : project.description.es}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded border border-border/50 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons — pushed to bottom */}
                  <div className="flex gap-3 mt-auto">
                    {project.demoUrl && project.demoUrl !== "#" ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded text-sm font-medium hover:bg-neon-cyan/20 hover:border-neon-cyan/50 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t("projects.viewDemo")}
                      </a>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary/30 text-muted-foreground/50 border border-border/30 rounded text-sm font-medium cursor-not-allowed">
                        <ExternalLink className="w-4 h-4" />
                        Offline
                      </span>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary/50 text-foreground border border-border rounded text-sm font-medium hover:border-neon-magenta/30 hover:text-neon-magenta transition-all"
                    >
                      <Github className="w-4 h-4" />
                      {t("projects.viewCode")}
                    </a>
                  </div>
                </div>

                {/* Bottom decorative bar */}
                <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
