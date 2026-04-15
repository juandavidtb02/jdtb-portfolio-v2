"use client"

import { useLanguage } from "@/lib/language-context"
import { skills } from "@/lib/portfolio-data"
import { useInView } from "@/hooks/use-in-view"
import { Monitor, Server, Wrench } from "lucide-react"

interface SkillBarProps {
  name: string
  level: number
  delay: number
  isInView: boolean
  color: "cyan" | "magenta" | "lime"
}

function SkillBar({ name, level, delay, isInView, color }: SkillBarProps) {
  const colorClasses = {
    cyan: {
      bar: "bg-gradient-to-r from-neon-cyan to-neon-blue",
      glow: "shadow-[0_0_10px_rgba(0,255,255,0.5)]",
      text: "text-neon-cyan",
    },
    magenta: {
      bar: "bg-gradient-to-r from-neon-magenta to-pink-500",
      glow: "shadow-[0_0_10px_rgba(255,0,255,0.5)]",
      text: "text-neon-magenta",
    },
    lime: {
      bar: "bg-gradient-to-r from-neon-lime to-emerald-500",
      glow: "shadow-[0_0_10px_rgba(0,255,128,0.5)]",
      text: "text-neon-lime",
    },
  }

  const classes = colorClasses[color]

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground group-hover:text-neon-cyan transition-colors">
          {name}
        </span>
        <span className={`font-[var(--font-pixel)] text-xs ${classes.text}`}>
          LV.{level}
        </span>
      </div>
      <div className="relative h-3 bg-secondary/50 rounded-full overflow-hidden border border-border/50">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-foreground/20"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>
        
        {/* Progress bar */}
        <div
          className={`h-full ${classes.bar} ${classes.glow} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: isInView ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
              style={{ animationDelay: `${delay}ms` }}
            />
          </div>
        </div>

        {/* Power indicator dots */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-500 ${
                isInView && level > 80 - i * 10 ? "bg-white" : "bg-white/20"
              }`}
              style={{ transitionDelay: `${delay + 500 + i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  const { t } = useLanguage()
  const { ref, isInView } = useInView({ threshold: 0.2 })

  const categories = [
    { 
      key: "frontend", 
      label: t("skills.frontend"), 
      icon: Monitor, 
      skills: skills.frontend, 
      color: "cyan" as const 
    },
    { 
      key: "backend", 
      label: t("skills.backend"), 
      icon: Server, 
      skills: skills.backend, 
      color: "magenta" as const 
    },
    { 
      key: "tools", 
      label: t("skills.tools"), 
      icon: Wrench, 
      skills: skills.tools, 
      color: "lime" as const 
    },
  ]

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 retro-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-pixel)] text-xs text-neon-magenta mb-2">
            {"// "}{t("skills.subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-neon-cyan text-glow-cyan">{t("skills.title")}</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <div
              key={category.key}
              className={`relative transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              {/* Category Card */}
              <div className="h-full bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-neon-cyan/30 transition-all p-6">
                {/* HUD corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-neon-cyan/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-neon-cyan/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-neon-cyan/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-neon-cyan/30 rounded-br-lg" />

                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <div className={`p-2 rounded bg-${category.color === "cyan" ? "neon-cyan" : category.color === "magenta" ? "neon-magenta" : "neon-lime"}/10`}>
                    <category.icon className={`w-5 h-5 text-neon-${category.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.label}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIndex * 150 + skillIndex * 100}
                      isInView={isInView}
                      color={category.color}
                    />
                  ))}
                </div>

                {/* XP Total */}
                <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">TOTAL XP</span>
                  <span className={`font-[var(--font-pixel)] text-sm text-neon-${category.color}`}>
                    {category.skills.reduce((sum, s) => sum + s.level, 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  )
}
