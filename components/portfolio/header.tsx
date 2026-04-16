"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { useAchievements } from "@/lib/achievement-context";
import { Menu, X, Globe } from "lucide-react";

const navItems = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.education", href: "#education" },
  { key: "nav.contact", href: "#contact" },
];

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { unlockAchievement } = useAchievements();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-neon-cyan/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="font-[var(--font-pixel)] text-xs sm:text-sm text-neon-cyan hover:text-glow-cyan transition-all"
          >
            {"<DEV/>"}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => { setLanguage(language === "en" ? "es" : "en"); unlockAchievement("change_language"); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-neon-cyan/30 hover:border-neon-cyan/60 hover:neon-glow-cyan transition-all text-sm"
            >
              <Globe className="w-4 h-4 text-neon-cyan" />
              <span className="text-foreground">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neon-cyan hover:neon-glow-cyan transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neon-cyan/20 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/5 rounded transition-all"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
