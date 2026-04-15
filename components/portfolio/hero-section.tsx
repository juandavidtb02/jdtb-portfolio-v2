"use client";

import { useLanguage } from "@/lib/language-context";
import { personalInfo } from "@/lib/portfolio-data";
import { useAchievements } from "@/lib/achievement-context";
import { Download, ArrowDown, Gamepad2 } from "lucide-react";

export function HeroSection() {
  const { language, t } = useLanguage();
  const { unlockAchievement } = useAchievements();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 retro-grid opacity-50" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse-glow opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-neon-magenta rounded-full animate-float opacity-60" />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-neon-lime rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-neon-blue rounded-full animate-float opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-lime/30 bg-neon-lime/5 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-neon-lime rounded-full animate-pulse" />
              <span className="text-sm text-neon-lime">{t("hero.status")}</span>
            </div>

            {/* Greeting */}
            <p
              className="text-lg sm:text-xl text-muted-foreground mb-2 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {t("hero.greeting")}
            </p>

            {/* Name */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-foreground">
                {personalInfo.name.split(" ")[0]}
              </span>{" "}
              <span className="text-neon-cyan text-glow-cyan">
                {personalInfo.name.split(" ")[1]}
              </span>
            </h1>

            {/* Title */}
            <h2
              className="font-[var(--font-pixel)] text-xs sm:text-sm text-neon-magenta mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {">> "}
              {language === "en"
                ? personalInfo.title.en
                : personalInfo.title.es}
            </h2>

            {/* Description */}
            <p
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {t("hero.description")}
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href={
                  language === "es"
                    ? "https://drive.google.com/uc?export=download&id=13GnWQCLRlMiuJW95J92NPYUVwQUQ9Hno"
                    : "https://drive.google.com/uc?export=download&id=114j0xd_e-N2YR06XloLibSLqG1DWyOry"
                }
                download
                onClick={() => unlockAchievement("download_cv")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-cyan text-background font-semibold rounded hover:neon-glow-cyan transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                {t("hero.downloadCV")}
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neon-magenta/50 text-neon-magenta font-semibold rounded hover:bg-neon-magenta/10 hover:border-neon-magenta transition-all hover:scale-105"
              >
                <Gamepad2 className="w-5 h-5" />
                {t("hero.viewProjects")}
              </a>
            </div>
          </div>

          {/* Photo Frame */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* HUD Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-neon-cyan animate-border-glow" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-neon-cyan animate-border-glow" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-neon-cyan animate-border-glow" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-neon-cyan animate-border-glow" />

                {/* Photo container */}
                <div className="w-full h-full rounded-lg border border-neon-cyan/30 overflow-hidden bg-gradient-to-br from-neon-cyan/10 via-background to-neon-magenta/10 flex items-center justify-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                    <img
                      src="/profilepic.jpg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top grayscale"
                    />
                  </div>
                </div>

                {/* Scanning line effect */}
                <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                  <div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
                    style={{
                      animation: "scanLine 3s linear infinite",
                    }}
                  />
                </div>

                {/* Status indicators */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                  <div
                    className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors"
          >
            <span className="text-xs font-[var(--font-pixel)]">SCROLL</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </section>
  );
}
