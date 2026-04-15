"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import {
  type AchievementId,
  ACHIEVEMENTS,
  PREREQUISITE_IDS,
} from "./achievement-types";

const STORAGE_KEY = "portfolio-achievements";

interface QueuedNotification {
  id: AchievementId;
  uid: number;
}

interface AchievementContextType {
  unlockedAchievements: AchievementId[];
  unlockedCount: number;
  totalAchievements: number;
  notifications: QueuedNotification[];
  showSecret: boolean;
  unlockAchievement: (id: AchievementId) => void;
  isUnlocked: (id: AchievementId) => boolean;
  getProgress: () => number;
  dismissNotification: (uid: number) => void;
  dismissSecret: () => void;
  resetAchievements: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(
  undefined,
);

let uidCounter = 0;

// Tiny retro sound effect
function playAchievementSound() {
  try {
    const ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.08 + 0.1,
      );
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.1);
    });
  } catch {
    // Silently ignore — AudioContext may be blocked
  }
}

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);
  const [notifications, setNotifications] = useState<QueuedNotification[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const didAutoUnlock = useRef(false);
  // Tracks IDs already shown as notifications (persists across re-renders)
  const notifiedRef = useRef(new Set<AchievementId>());

  const isUnlocked = useCallback(
    (id: AchievementId) => unlocked.includes(id),
    [unlocked],
  );

  const getProgress = useCallback(
    () => unlocked.length / ACHIEVEMENTS.length,
    [unlocked],
  );

  const unlockAchievement = useCallback((id: AchievementId) => {
    // complete_all can only be triggered internally
    if (id === "complete_all") return;
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  // Fire notifications whenever unlocked array gains new IDs
  useEffect(() => {
    unlocked.forEach((id) => {
      if (notifiedRef.current.has(id)) return;
      notifiedRef.current.add(id);
      playAchievementSound();
      setNotifications((n) => [...n, { id, uid: ++uidCounter }]);
    });
  }, [unlocked]);

  // Auto-unlock complete_all when all 4 prerequisites done
  useEffect(() => {
    if (didAutoUnlock.current) return;
    const allPrereqsDone = PREREQUISITE_IDS.every((id) =>
      unlocked.includes(id),
    );
    if (allPrereqsDone && !unlocked.includes("complete_all")) {
      didAutoUnlock.current = true;
      setUnlocked((prev) => [...prev, "complete_all"]);
      setTimeout(() => setShowSecret(true), 1000);
    }
  }, [unlocked]);

  const dismissNotification = useCallback((uid: number) => {
    setNotifications((n) => n.filter((x) => x.uid !== uid));
  }, []);

  const dismissSecret = useCallback(() => setShowSecret(false), []);

  const resetAchievements = useCallback(() => {
    setUnlocked([]);
    setNotifications([]);
    setShowSecret(false);
    notifiedRef.current.clear();
    didAutoUnlock.current = false;
  }, []);

  return (
    <AchievementContext.Provider
      value={{
        unlockedAchievements: unlocked,
        unlockedCount: unlocked.length,
        totalAchievements: ACHIEVEMENTS.length,
        notifications,
        showSecret,
        unlockAchievement,
        isUnlocked,
        getProgress,
        dismissNotification,
        dismissSecret,
        resetAchievements,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx)
    throw new Error("useAchievements must be used inside AchievementProvider");
  return ctx;
}
