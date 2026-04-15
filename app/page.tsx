"use client";

import { LanguageProvider } from "@/lib/language-context";
import { AchievementProvider } from "@/lib/achievement-context";
import { Header } from "@/components/portfolio/header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { EasterEgg } from "@/components/portfolio/easter-egg";
import { RetroCursor } from "@/components/portfolio/retro-cursor";
import { AchievementPopup } from "@/components/portfolio/achievement-popup";
import { TrophyIndicator } from "@/components/portfolio/trophy-indicator";
import { SecretPopup } from "@/components/portfolio/secret-popup";

export default function Home() {
  return (
    <LanguageProvider>
      <AchievementProvider>
        <div className="min-h-screen bg-background text-foreground retro-grid relative">
          {/* Animated background - subtle stars and floating ships */}
          <AnimatedBackground />

          {/* Easter egg sprite in corner */}
          <EasterEgg />

          {/* Retro crosshair cursor */}
          <RetroCursor />

          {/* Achievement system UI */}
          <AchievementPopup />
          <TrophyIndicator />
          <SecretPopup />

          {/* Subtle scanlines overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
              }}
            />
          </div>

          <Header />

          <main>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      </AchievementProvider>
    </LanguageProvider>
  );
}
