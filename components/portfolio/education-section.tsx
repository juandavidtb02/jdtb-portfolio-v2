"use client"

import { useLanguage } from "@/lib/language-context"
import { education } from "@/lib/portfolio-data"
import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, Calendar, Award } from "lucide-react"

export function EducationSection() {
  const { language, t } = useLanguage()
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="education" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-magenta/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-pixel)] text-xs text-neon-magenta mb-2">
            {"// "}{t("education.subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-neon-cyan text-glow-cyan">{t("education.title")}</span>
          </h2>
        </div>

        {/* Education List */}
        <div ref={ref} className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`group relative transition-all duration-700 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Education Card */}
              <div className="relative bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-neon-magenta/50 transition-all hover:neon-glow-magenta p-6">
                {/* Achievement badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-neon-lime/20 border border-neon-lime/50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-neon-lime" />
                </div>

                {/* HUD corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-magenta/30 rounded-tl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-magenta/30 rounded-br" />

                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-neon-magenta" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Institution */}
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-neon-magenta transition-colors">
                      {edu.institution}
                    </h3>

                    {/* Program */}
                    <p className="text-muted-foreground mb-3">
                      {language === "en" ? edu.program.en : edu.program.es}
                    </p>

                    {/* Date */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                      <Calendar className="w-3 h-3 text-neon-cyan" />
                      <span className="font-[var(--font-pixel)] text-xs text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>

                  {/* XP indicator */}
                  <div className="hidden sm:flex flex-col items-center gap-1">
                    <span className="font-[var(--font-pixel)] text-xs text-neon-lime">+500</span>
                    <span className="text-[8px] text-muted-foreground">XP</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
