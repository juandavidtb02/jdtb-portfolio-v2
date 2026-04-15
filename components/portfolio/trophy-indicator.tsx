"use client";

import { useState } from "react";
import { useAchievements } from "@/lib/achievement-context";
import { ACHIEVEMENTS } from "@/lib/achievement-types";
import { useLanguage } from "@/lib/language-context";

export function TrophyIndicator() {
  const { unlockedAchievements, unlockedCount, totalAchievements } = useAchievements();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const allDone = unlockedCount === totalAchievements;

  if (unlockedCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9997] flex flex-col items-end gap-2">

      {/* Achievement list panel — shows above trophy when open */}
      {open && (
        <div
          className="mb-1 w-64 bg-card/95 backdrop-blur border border-neon-cyan/30 rounded shadow-[0_0_20px_rgba(0,255,255,0.1)]"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          <div className="px-4 py-2 border-b border-neon-cyan/20">
            <p className="font-[var(--font-pixel)] text-[9px] text-neon-cyan uppercase tracking-wider">
              Achievements {unlockedCount}/{totalAchievements}
            </p>
          </div>
          <ul className="py-2">
            {ACHIEVEMENTS.map((ach) => {
              const unlocked = unlockedAchievements.includes(ach.id);
              return (
                <li
                  key={ach.id}
                  className={`flex items-center gap-3 px-4 py-2 ${
                    unlocked ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span className="text-base leading-none w-5 text-center flex-shrink-0">
                    {unlocked ? ach.icon : "🔒"}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold leading-tight ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {ach.name[language]}
                    </p>
                    {unlocked && (
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {ach.description[language]}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Trophy row — clickable */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded bg-card/80 border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all"
      >
        <span
          className="text-2xl select-none"
          style={
            allDone
              ? {
                  filter: "drop-shadow(0 0 6px #fbbf24) drop-shadow(0 0 12px #f59e0b)",
                  animation: "trophyFloat 2.5s ease-in-out infinite",
                }
              : undefined
          }
        >
          🏆
        </span>
        <span
          className="font-[var(--font-pixel)] text-xs"
          style={allDone ? { color: "#fbbf24", textShadow: "0 0 8px #f59e0b" } : { color: "white" }}
        >
          {unlockedCount}/{totalAchievements}
        </span>
      </button>

      <style jsx>{`
        @keyframes trophyFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
