"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { useAchievements } from "@/lib/achievement-context";
import { personalInfo } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, Heart, Instagram } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const { unlockAchievement, isUnlocked } = useAchievements();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const scrollTriggered = useRef(false);

  const instagramUnlocked = isUnlocked("complete_all");

  // Trigger scroll_footer achievement when footer enters viewport
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scrollTriggered.current) {
          scrollTriggered.current = true;
          unlockAchievement("scroll_footer");
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [unlockAchievement]);

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border">
      {/* Background decoration */}
      <div className="absolute inset-0 retro-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a
            href="#home"
            className="font-[var(--font-pixel)] text-sm text-neon-cyan hover:text-glow-cyan transition-all"
          >
            {"<DEV/>"}
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 hover:neon-glow-cyan transition-all"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}

            {/* Instagram — locked until all achievements */}
            {instagramUnlocked ? (
              <a
                href="https://instagram.com/david.torres02"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-neon-magenta hover:border-neon-magenta/50 transition-all animate-fade-in-up"
              >
                <Instagram className="w-5 h-5" />
              </a>
            ) : (
              <div
                title="Locked — Complete all achievements to unlock"
                aria-label="Instagram (locked)"
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground opacity-40 cursor-not-allowed relative group"
              >
                <Instagram className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-card border border-border px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  🔒 Complete all achievements
                </span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              &copy; {currentYear} {personalInfo.name}. {t("footer.rights")}.
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              {t("footer.madeWith")}{" "}
              <Heart className="w-3 h-3 text-neon-magenta fill-neon-magenta" />{" "}
              & code
            </p>
          </div>

          {/* Decorative pixel elements */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 bg-neon-cyan/50 animate-pulse" />
            <div
              className="w-2 h-2 bg-neon-magenta/50 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 bg-neon-lime/50 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
            <div
              className="w-2 h-2 bg-neon-blue/50 animate-pulse"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
