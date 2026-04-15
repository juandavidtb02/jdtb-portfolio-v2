"use client";

import { useEffect, useState } from "react";
import { useAchievements } from "@/lib/achievement-context";
import { useLanguage } from "@/lib/language-context";

export function SecretPopup() {
  const { showSecret, dismissSecret } = useAchievements();
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!showSecret) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(dismissSecret, 500);
    }, 4500);
    return () => clearTimeout(timer);
  }, [showSecret, dismissSecret]);

  if (!showSecret) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div
        className="pointer-events-auto transition-all duration-500 ease-out"
        style={{
          transform: visible ? "scale(1)" : "scale(0.8)",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="relative px-8 py-6 rounded bg-card/98 backdrop-blur border-2 border-yellow-400/70 shadow-[0_0_40px_rgba(251,191,36,0.4),0_0_80px_rgba(251,191,36,0.15)] text-center max-w-sm"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-yellow-400" />
          <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-yellow-400" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-yellow-400" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-yellow-400" />

          <div className="text-4xl mb-3">🎮</div>
          <p className="font-[var(--font-pixel)] text-xs text-yellow-400 mb-2 tracking-wider uppercase">
            Secret Unlocked!
          </p>
          <h3 className="text-xl font-bold text-foreground mb-3">
            {language === "es" ? "¡Platinado!" : "Platinum!"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {language === "es"
              ? "Exploraste el portafolio completo.\nGracias por jugar."
              : "You have explored the full portfolio.\nThanks for playing."}
          </p>
          <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
          <p className="mt-3 font-[var(--font-pixel)] text-[9px] text-yellow-400/60">
            👑 ACHIEVEMENT: PLATINADO
          </p>
        </div>
      </div>
    </div>
  );
}
