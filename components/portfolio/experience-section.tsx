"use client";

import { useLanguage } from "@/lib/language-context";
import { experiences } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/use-in-view";
import { Building2, Calendar, ChevronRight } from "lucide-react";

export function ExperienceSection() {
  const { language, t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-pixel)] text-xs text-neon-magenta mb-2">
            {"// "}
            {t("experience.subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-neon-cyan text-glow-cyan">
              {t("experience.title")}
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-lime" />

          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative pl-12 sm:pl-20 transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 sm:left-6 top-6 w-4 h-4 rounded-full bg-background border-2 border-neon-cyan neon-glow-cyan">
                  <div className="absolute inset-1 rounded-full bg-neon-cyan animate-pulse" />
                </div>

                {/* Card */}
                <div className="group relative bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-neon-cyan/50 transition-all hover:neon-glow-cyan p-6">
                  {/* HUD corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-cyan/30 rounded-tl" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-cyan/30 rounded-tr" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-cyan/30 rounded-bl" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-cyan/30 rounded-br" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-neon-magenta" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {exp.company}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate
                          ? formatDate(exp.endDate)
                          : t("experience.present")}
                      </span>
                    </div>
                  </div>

                  {/* Position */}
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronRight className="w-4 h-4 text-neon-cyan" />
                    <span className="font-[var(--font-pixel)] text-xs text-neon-cyan">
                      {language === "en" ? exp.position.en : exp.position.es}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {language === "en"
                      ? exp.description.en
                      : exp.description.es}
                  </p>

                  {/* Technologies */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono bg-secondary/50 text-neon-cyan border border-neon-cyan/20 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quest indicator */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 rounded-full bg-neon-lime" />
                    <span className="font-[var(--font-pixel)] text-[8px] text-neon-lime">
                      COMPLETED
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
