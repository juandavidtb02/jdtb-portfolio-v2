"use client";

import { useEffect, useState, useRef } from "react";
import { useAchievements } from "@/lib/achievement-context";
import { ACHIEVEMENTS } from "@/lib/achievement-types";
import { useLanguage } from "@/lib/language-context";

interface PopupItem {
  uid: number;
  icon: string;
  name: string;
  description: string;
  visible: boolean;
}

export function AchievementPopup() {
  const { notifications, dismissNotification } = useAchievements();
  const { language } = useLanguage();
  const [items, setItems] = useState<PopupItem[]>([]);
  const processedUids = useRef(new Set<number>());

  useEffect(() => {
    notifications.forEach((notif) => {
      if (processedUids.current.has(notif.uid)) return;
      const def = ACHIEVEMENTS.find((a) => a.id === notif.id);
      if (!def) return;

      processedUids.current.add(notif.uid);

      const item: PopupItem = {
        uid: notif.uid,
        icon: def.icon,
        name: def.name[language],
        description: def.description[language],
        visible: false,
      };

      // Add then animate in
      setItems((prev) => [...prev, item]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setItems((prev) =>
            prev.map((i) =>
              i.uid === notif.uid ? { ...i, visible: true } : i,
            ),
          );
        });
      });

      // Auto-dismiss after 3.5s
      setTimeout(() => {
        setItems((prev) =>
          prev.map((i) => (i.uid === notif.uid ? { ...i, visible: false } : i)),
        );
        setTimeout(() => {
          setItems((prev) => prev.filter((i) => i.uid !== notif.uid));
          dismissNotification(notif.uid);
        }, 400);
      }, 3500);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9998] flex flex-col gap-3 pointer-events-none">
      {items.map((item) => (
        <div
          key={item.uid}
          className="pointer-events-auto transition-all duration-400 ease-out"
          style={{
            transform: item.visible ? "translateX(0)" : "translateX(120%)",
            opacity: item.visible ? 1 : 0,
          }}
        >
          <div
            className="flex items-start gap-3 px-4 py-3 rounded bg-card/95 backdrop-blur border border-neon-cyan/40 shadow-[0_0_20px_rgba(0,255,255,0.15)] min-w-[260px] max-w-[320px]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neon-cyan rounded-l" />

            <span className="text-2xl leading-none mt-0.5 flex-shrink-0">
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-[var(--font-pixel)] text-[9px] text-neon-cyan mb-0.5 uppercase tracking-wider">
                Achievement Unlocked!
              </p>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
