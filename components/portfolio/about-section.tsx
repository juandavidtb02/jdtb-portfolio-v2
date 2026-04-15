"use client";

import { useLanguage } from "@/lib/language-context";
import { useInView } from "@/hooks/use-in-view";
import { User, Briefcase, Code2, Languages } from "lucide-react";

export function AboutSection() {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const stats = [
    { icon: Briefcase, value: "3+", label: t("about.stats.experience") },
    { icon: Code2, value: "4+", label: t("about.stats.projects") },
    { icon: User, value: "14+", label: t("about.stats.technologies") },
  ];

  const languages = [
    { name: language === "en" ? "Spanish" : "Español", level: language === "en" ? "Native" : "Nativo" },
    { name: language === "en" ? "English" : "Inglés", level: "B1" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-pixel)] text-xs text-neon-magenta mb-2">
            {"// "}
            {t("about.subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-neon-cyan text-glow-cyan">
              {t("about.title")}
            </span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Main Card */}
          <div className="relative max-w-4xl mx-auto">
            {/* HUD Border */}
            <div className="hud-border rounded-lg bg-card/50 backdrop-blur-sm p-8 sm:p-10">
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-3 h-3 border-l border-t border-neon-cyan/50" />
              <div className="absolute top-4 right-4 w-3 h-3 border-r border-t border-neon-cyan/50" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-neon-cyan/50" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-neon-cyan/50" />

              {/* Content */}
              <div className="relative">
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground ml-2">
                    about.tsx
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.description")}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center p-4 rounded border border-border/50 bg-secondary/30 hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all group"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <stat.icon className="w-6 h-6 mx-auto mb-2 text-neon-cyan group-hover:text-glow-cyan transition-all" />
                      <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div className="border border-border/50 rounded px-4 py-3 bg-secondary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-neon-magenta" />
                      <span className="text-sm font-semibold text-neon-magenta">{t("about.stats.languages")}:</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      {languages.map((lang, index) => (
                        <span key={lang.name} className="text-foreground">
                          {lang.name} <span className="text-muted-foreground">({lang.level})</span>
                          {index < languages.length - 1 && <span className="text-muted-foreground ml-4">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
