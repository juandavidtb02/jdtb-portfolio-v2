"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { useAchievements } from "@/lib/achievement-context";

// Pixel art sprites
const INVADER_1 = [
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
];

const INVADER_2 = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 1, 0, 1],
];

const SPACESHIP = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 0, 1, 0],
];

const EXPLOSION = [
  [1, 0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 1],
];

interface Entity {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  sprite: number[][];
  color: string;
  pixelSize: number;
  type: "invader" | "ship";
  health: number;
  team: "cyan" | "magenta";
  shootCooldown: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  vx: number;
  color: string;
  team: "cyan" | "magenta";
}

interface ExplosionType {
  id: number;
  x: number;
  y: number;
  frame: number;
  color: string;
}

// Audio context for sounds
const createAudioContext = () => {
  if (typeof window !== "undefined") {
    return new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
  }
  return null;
};

const playSound = (
  audioContext: AudioContext | null,
  type: "shoot" | "explosion" | "win",
  muted: boolean,
) => {
  if (!audioContext || muted) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (type === "shoot") {
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      audioContext.currentTime + 0.1,
    );
    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.1,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } else if (type === "explosion") {
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      30,
      audioContext.currentTime + 0.2,
    );
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.2,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === "win") {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.15);
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }
};

export function EasterEgg() {
  const { unlockAchievement } = useAchievements();
  const [warActive, setWarActive] = useState(false);
  const [warFading, setWarFading] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<ExplosionType[]>([]);
  const [scores, setScores] = useState({ cyan: 0, magenta: 0 });
  const [winner, setWinner] = useState<"cyan" | "magenta" | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const bulletIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastTimeRef = useRef(0);
  const isMutedRef = useRef(false);
  const warTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Keep ref in sync with state
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const stopWar = useCallback(() => {
    if (warTimeoutRef.current) clearTimeout(warTimeoutRef.current);
    setWarFading(false);
    setWarActive(false);
    setWinner(null);
    setEntities([]);
    setBullets([]);
    setExplosions([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const startWar = useCallback(() => {
    if (warActive) return;

    // Initialize audio context on user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }

    unlockAchievement("activate_war");
    setWarActive(true);
    setScores({ cyan: 0, magenta: 0 });
    setWinner(null);
    bulletIdRef.current = 0;
    explosionIdRef.current = 0;

    const newEntities: Entity[] = [];
    let id = 0;

    const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const screenHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    // Cyan team (LEFT side) - 2x2 grid
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const baseY = centerY - 80 + row * 120;
        newEntities.push({
          id: id++,
          x: -80 - col * 50,
          y: baseY + (Math.random() - 0.5) * 40,
          vx: 5 + Math.random() * 2,
          vy: (Math.random() - 0.5) * 1.5,
          sprite: row % 2 === 0 ? INVADER_1 : INVADER_2,
          color: "#00ffff",
          pixelSize: 3,
          type: "invader",
          health: 6,
          team: "cyan",
          shootCooldown: Math.random() * 20,
        });
      }
    }

    // Magenta team (RIGHT side) - 2x2 grid
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const baseY = centerY - 80 + row * 120;
        newEntities.push({
          id: id++,
          x: screenWidth + 80 + col * 50,
          y: baseY + (Math.random() - 0.5) * 40,
          vx: -(5 + Math.random() * 2),
          vy: (Math.random() - 0.5) * 1.5,
          sprite: row % 2 === 0 ? INVADER_1 : INVADER_2,
          color: "#ff00ff",
          pixelSize: 3,
          type: "invader",
          health: 6,
          team: "magenta",
          shootCooldown: Math.random() * 20,
        });
      }
    }

    // Boss ships - one on each side, at center height
    newEntities.push({
      id: id++,
      x: -120,
      y: centerY - 20,
      vx: 6,
      vy: 0,
      sprite: SPACESHIP,
      color: "#00ff80",
      pixelSize: 4,
      type: "ship",
      health: 40,
      team: "cyan",
      shootCooldown: 0,
    });

    newEntities.push({
      id: id++,
      x: screenWidth + 120,
      y: centerY - 20,
      vx: -6,
      vy: 0,
      sprite: SPACESHIP,
      color: "#ff6600",
      pixelSize: 4,
      type: "ship",
      health: 40,
      team: "magenta",
      shootCooldown: 0,
    });

    setEntities(newEntities);
    setBullets([]);
    setExplosions([]);

    // Auto-fade after 6 seconds
    warTimeoutRef.current = setTimeout(() => {
      setWarFading(true);
      setTimeout(() => {
        setWarFading(false);
        setWarActive(false);
        setWinner(null);
        setEntities([]);
        setBullets([]);
        setExplosions([]);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }, 1000);
    }, 6000);
  }, [warActive]);

  // Game loop
  useEffect(() => {
    if (!warActive) return;

    const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const screenHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const centerX = screenWidth / 2;

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (deltaTime > 100) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Update entities
      setEntities((prev) => {
        if (prev.length === 0) return prev;

        return prev
          .map((e) => {
            let newX = e.x + e.vx;
            let newY = e.y + e.vy;
            let newVy = e.vy;
            let newVx = e.vx;

            // Bounce off top/bottom walls
            if (newY < 100 || newY > screenHeight - 100) {
              newVy *= -1;
              newY = e.y + newVy;
            }

            // Teams move toward center and bounce back
            if (e.team === "cyan") {
              // Cyan comes from left, bounces when past center
              if (newX > centerX + 100) {
                newVx = -Math.abs(newVx) * 0.95;
              } else if (newX < 50) {
                newVx = Math.abs(newVx);
              }
            } else {
              // Magenta comes from right, bounces when past center
              if (newX < centerX - 100) {
                newVx = Math.abs(newVx) * 0.95;
              } else if (newX > screenWidth - 50) {
                newVx = -Math.abs(newVx);
              }
            }

            // Keep minimum speed toward enemy
            if (Math.abs(newVx) < 2) {
              newVx = e.team === "cyan" ? 2.5 : -2.5;
            }

            return {
              ...e,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              shootCooldown: Math.max(0, e.shootCooldown - 1),
            };
          })
          .filter((e) => e.health > 0);
      });

      // Shooting - high frequency, horizontal bullets
      setEntities((prev) => {
        prev.forEach((entity) => {
          if (
            entity.health > 0 &&
            entity.shootCooldown <= 0 &&
            Math.random() < 0.07
          ) {
            const isCyan = entity.team === "cyan";
            const spriteWidth = entity.sprite[0].length * entity.pixelSize;
            const bulletX = isCyan ? entity.x + spriteWidth + 5 : entity.x - 15;
            const bulletY =
              entity.y + (entity.sprite.length * entity.pixelSize) / 2;

            setBullets((b) => [
              ...b,
              {
                id: bulletIdRef.current++,
                x: bulletX,
                y: bulletY,
                vx: isCyan ? 18 : -18,
                color: entity.color,
                team: entity.team,
              },
            ]);

            playSound(audioContextRef.current, "shoot", isMutedRef.current);

            entity.shootCooldown = 5 + Math.random() * 10;
          }
        });
        return prev;
      });

      // Update bullets and check collisions
      setBullets((prev) => {
        const newBullets: Bullet[] = [];

        prev.forEach((bullet) => {
          const newX = bullet.x + bullet.vx;

          if (newX < -30 || newX > screenWidth + 30) return;

          let hitSomething = false;

          setEntities((ents) => {
            return ents.map((entity) => {
              if (hitSomething) return entity;
              if (bullet.team === entity.team) return entity;
              if (entity.health <= 0) return entity;

              const entityWidth = entity.sprite[0].length * entity.pixelSize;
              const entityHeight = entity.sprite.length * entity.pixelSize;

              if (
                newX > entity.x - 5 &&
                newX < entity.x + entityWidth + 5 &&
                bullet.y > entity.y - 5 &&
                bullet.y < entity.y + entityHeight + 5
              ) {
                hitSomething = true;
                const newHealth = entity.health - 1;

                if (newHealth <= 0) {
                  setExplosions((exp) => [
                    ...exp,
                    {
                      id: explosionIdRef.current++,
                      x: entity.x,
                      y: entity.y,
                      frame: 0,
                      color: entity.color,
                    },
                  ]);

                  playSound(
                    audioContextRef.current,
                    "explosion",
                    isMutedRef.current,
                  );

                  const points = entity.type === "ship" ? 100 : 10;
                  const scoringTeam =
                    entity.team === "cyan" ? "magenta" : "cyan";
                  setScores((s) => ({
                    ...s,
                    [scoringTeam]: s[scoringTeam] + points,
                  }));
                }

                return { ...entity, health: newHealth };
              }
              return entity;
            });
          });

          if (!hitSomething) {
            newBullets.push({ ...bullet, x: newX });
          }
        });

        return newBullets;
      });

      // Update explosions
      setExplosions((prev) =>
        prev
          .map((e) => ({ ...e, frame: e.frame + 1 }))
          .filter((e) => e.frame < 10),
      );

      // Check win condition
      setEntities((prev) => {
        const cyanAlive = prev.filter(
          (e) => e.team === "cyan" && e.health > 0,
        ).length;
        const magentaAlive = prev.filter(
          (e) => e.team === "magenta" && e.health > 0,
        ).length;

        if (cyanAlive === 0 && !winner) {
          setWinner("magenta");
          playSound(audioContextRef.current, "win", isMutedRef.current);
          if (warTimeoutRef.current) clearTimeout(warTimeoutRef.current);
          setWarFading(true);
          setTimeout(() => {
            setWarFading(false);
            setWarActive(false);
            setWinner(null);
            setEntities([]);
            setBullets([]);
            setExplosions([]);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
          }, 1000);
        } else if (magentaAlive === 0 && !winner) {
          setWinner("cyan");
          playSound(audioContextRef.current, "win", isMutedRef.current);
          if (warTimeoutRef.current) clearTimeout(warTimeoutRef.current);
          setWarFading(true);
          setTimeout(() => {
            setWarFading(false);
            setWarActive(false);
            setWinner(null);
            setEntities([]);
            setBullets([]);
            setExplosions([]);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
          }, 1000);
        }

        return prev;
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [warActive, winner]);

  // Render pixel sprite
  const renderSprite = (
    sprite: number[][],
    x: number,
    y: number,
    pixelSize: number,
    color: string,
  ) => (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {sprite.map((row, rowIdx) =>
        row.map((pixel, colIdx) =>
          pixel === 1 ? (
            <div
              key={`${rowIdx}-${colIdx}`}
              className="absolute"
              style={{
                left: colIdx * pixelSize,
                top: rowIdx * pixelSize,
                width: pixelSize,
                height: pixelSize,
                backgroundColor: color,
                boxShadow: `0 0 ${pixelSize}px ${color}40`,
              }}
            />
          ) : null,
        ),
      )}
    </div>
  );

  return (
    <>
      {/* Control buttons */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-2">
        {/* Click Me / War button — Space Invader pixel icon */}
        <button
          onClick={startWar}
          disabled={warActive || warFading}
          title={(warActive || warFading) ? "WAR!" : "Click Me"}
          className={`
            w-12 h-12
            flex items-center justify-center
            transition-all duration-300
            ${
              warActive || warFading
                ? "bg-muted cursor-not-allowed"
                : "bg-background hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] active:scale-95"
            }
          `}
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          <svg
            width="28"
            height="22"
            viewBox="0 0 11 8"
            style={{ imageRendering: "pixelated" }}
            fill={(warActive || warFading) ? "rgba(150,150,150,0.4)" : "#00ffff"}
          >
            {/* Space Invader pixel art — 11x8 grid */}
            {[
              [0,0,1,0,0,0,0,0,1,0,0],
              [0,0,0,1,0,0,0,1,0,0,0],
              [0,0,1,1,1,1,1,1,1,0,0],
              [0,1,1,0,1,1,1,0,1,1,0],
              [1,1,1,1,1,1,1,1,1,1,1],
              [1,0,1,1,1,1,1,1,1,0,1],
              [1,0,1,0,0,0,0,0,1,0,1],
              [0,0,0,1,1,0,1,1,0,0,0],
            ].map((row, r) =>
              row.map((px, c) =>
                px ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} /> : null
              )
            )}
          </svg>
        </button>

        {/* Mute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`
            w-12 h-12
            flex items-center justify-center
            font-mono text-sm font-bold
            border-2 transition-all duration-300
            bg-background border-muted-foreground/50 text-muted-foreground 
            hover:border-primary hover:text-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]
            active:scale-95
          `}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Stop button - only show when war is active */}
        {(warActive && !warFading) && (
          <button
            onClick={stopWar}
            className={`
              w-12 h-12
              flex items-center justify-center
              font-mono text-sm font-bold
              border-2 transition-all duration-300
              bg-background border-destructive/70 text-destructive 
              hover:bg-destructive hover:text-destructive-foreground hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]
              active:scale-95
            `}
            title="Stop War"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* War overlay - semi transparent */}
      {(warActive || warFading) && (
        <div
          className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
          style={{
            opacity: warFading ? 0 : 0.35,
            transition: warFading ? "opacity 1s ease-out" : "none",
          }}
        >
          {/* Score display */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-6 z-50">
            <div className="text-[#00ffff] bg-background/95 px-4 py-2 border-2 border-[#00ffff]/50 font-mono text-sm shadow-[0_0_10px_rgba(0,255,255,0.2)]">
              CYAN: {scores.cyan}
            </div>
            <div className="text-[#ff00ff] bg-background/95 px-4 py-2 border-2 border-[#ff00ff]/50 font-mono text-sm shadow-[0_0_10px_rgba(255,0,255,0.2)]">
              MAGENTA: {scores.magenta}
            </div>
          </div>

          {/* Entities */}
          {entities
            .filter((e) => e.health > 0)
            .map((entity) => (
              <div key={entity.id}>
                {renderSprite(
                  entity.sprite,
                  entity.x,
                  entity.y,
                  entity.pixelSize,
                  entity.color,
                )}
              </div>
            ))}

          {/* Bullets - horizontal */}
          {bullets.map((bullet) => (
            <div
              key={bullet.id}
              className="absolute"
              style={{
                left: bullet.x,
                top: bullet.y - 2,
                width: 16,
                height: 4,
                backgroundColor: bullet.color,
                boxShadow: `0 0 8px ${bullet.color}, 0 0 15px ${bullet.color}40`,
              }}
            />
          ))}

          {/* Explosions */}
          {explosions.map((exp) => (
            <div key={exp.id} style={{ opacity: 1 - exp.frame / 10 }}>
              {renderSprite(EXPLOSION, exp.x, exp.y, 4, exp.color)}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
