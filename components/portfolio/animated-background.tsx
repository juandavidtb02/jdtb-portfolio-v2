"use client";

import { useEffect, useRef } from "react";

// Pixel art sprites as arrays (1 = colored pixel, 0 = transparent)
const SPRITES = {
  // Small spaceship (8x8)
  ship1: [
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // UFO style ship (10x6)
  ufo: [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  ],
  // Invader type 1 (11x8)
  invader1: [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
  ],
  // Star (3x3)
  star: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  // Rocket (7x12)
  rocket: [
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0],
  ],
  // Pac-Man (9x9)
  pacman: [
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Ghost (8x10)
  ghost: [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
  ],
  // Heart (7x6)
  heart: [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ],
  // Asteroid (8x7)
  asteroid: [
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ],
};

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Helper to draw pixel sprite
    const drawSprite = (
      sprite: number[][],
      x: number,
      y: number,
      pixelSize: number,
      color: string,
      alpha: number = 1,
    ) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      for (let row = 0; row < sprite.length; row++) {
        for (let col = 0; col < sprite[row].length; col++) {
          if (sprite[row][col] === 1) {
            ctx.fillRect(
              x + col * pixelSize,
              y + row * pixelSize,
              pixelSize,
              pixelSize,
            );
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    // Gentle twinkling star class - SLOWER animation
    class TwinklingStar {
      x: number;
      y: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() > 0.9 ? 2 : 1;
        this.alpha = Math.random() * 0.3 + 0.1; // Lower base alpha
        this.twinkleSpeed = Math.random() * 0.005 + 0.002; // MUCH slower twinkle
        this.phase = Math.random() * Math.PI * 2;
        this.color =
          Math.random() > 0.85
            ? Math.random() > 0.5
              ? "#00ffff"
              : "#ff00ff"
            : "#ffffff";
      }

      update(time: number) {
        // Gentler twinkle - smaller range
        this.alpha =
          0.15 + Math.sin(time * this.twinkleSpeed + this.phase) * 0.15;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.alpha);
        if (this.size === 1) {
          ctx.fillRect(this.x, this.y, 1, 1);
        } else {
          drawSprite(
            SPRITES.star,
            this.x,
            this.y,
            1,
            this.color,
            Math.max(0, this.alpha),
          );
        }
        ctx.globalAlpha = 1;
      }
    }

    // Floating spaceship class - SLOWER and fewer
    class Spaceship {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      sprite: number[][];
      color: string;
      pixelSize: number;
      wobblePhase: number;

      constructor(scattered = false) {
        const options = [
          { sprite: SPRITES.ship1, color: ["#00ffff", "#ff00ff", "#00ff80"][Math.floor(Math.random() * 3)] },
          { sprite: SPRITES.ufo, color: ["#00ffff", "#ff00ff", "#ffff00"][Math.floor(Math.random() * 3)] },
          { sprite: SPRITES.invader1, color: ["#00ffff", "#ff00ff", "#ff6600"][Math.floor(Math.random() * 3)] },
          { sprite: SPRITES.rocket, color: ["#ff4444", "#ff8800", "#ffffff"][Math.floor(Math.random() * 3)] },
          { sprite: SPRITES.pacman, color: "#ffff00" },
          { sprite: SPRITES.ghost, color: ["#aaaaff", "#ff88ff", "#88ffff"][Math.floor(Math.random() * 3)] },
          { sprite: SPRITES.heart, color: "#ff4488" },
          { sprite: SPRITES.asteroid, color: ["#aaaaaa", "#887755", "#ccbbaa"][Math.floor(Math.random() * 3)] },
        ];
        const chosen = options[Math.floor(Math.random() * options.length)];
        this.sprite = chosen.sprite;
        this.color = chosen.color;
        this.pixelSize = Math.random() * 1.5 + 1.5;
        if (scattered) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        } else {
          this.x = Math.random() > 0.5 ? -50 : canvas.width + 50;
          this.y = Math.random() * canvas.height;
        }
        this.speedX = (Math.random() * 0.25 + 0.08) * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.wobblePhase = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        this.x += this.speedX;
        this.y +=
          this.speedY + Math.sin(time * 0.0005 + this.wobblePhase) * 0.1; // Slower wobble

        // Wrap around
        const width = this.sprite[0].length * this.pixelSize;
        const height = this.sprite.length * this.pixelSize;
        if (this.speedX > 0 && this.x > canvas.width + width) this.x = -width;
        if (this.speedX < 0 && this.x < -width) this.x = canvas.width + width;
        if (this.y < -height) this.y = canvas.height + height;
        if (this.y > canvas.height + height) this.y = -height;
      }

      draw() {
        drawSprite(
          this.sprite,
          this.x,
          this.y,
          this.pixelSize,
          this.color,
          0.25,
        ); // Lower opacity
      }
    }

    // Initialize elements - FEWER of each
    const stars: TwinklingStar[] = Array.from(
      { length: 120 },
      () => new TwinklingStar(),
    );
    const spaceships: Spaceship[] = Array.from(
      { length: 12 },
      () => new Spaceship(true),
    );

    // Shooting star class
    class ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      alpha: number;
      life: number;
      maxLife: number;
      color: string;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 6 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.length = Math.random() * 80 + 40;
        this.alpha = 0;
        this.maxLife = Math.random() * 60 + 40;
        this.life = 0;
        this.color = Math.random() > 0.5 ? "#00ffff" : "#ffffff";
      }

      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;
        // Fade in then out
        if (this.life < this.maxLife * 0.3) {
          this.alpha = this.life / (this.maxLife * 0.3);
        } else {
          this.alpha = 1 - (this.life - this.maxLife * 0.3) / (this.maxLife * 0.7);
        }
        if (this.life >= this.maxLife) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha) * 0.7;
        const grad = ctx.createLinearGradient(
          this.x, this.y,
          this.x - this.vx * (this.length / Math.hypot(this.vx, this.vy)),
          this.y - this.vy * (this.length / Math.hypot(this.vx, this.vy)),
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - this.vx * (this.length / Math.hypot(this.vx, this.vy)),
          this.y - this.vy * (this.length / Math.hypot(this.vx, this.vy)),
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    // Floating pixel particle class
    class PixelParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      phase: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() > 0.5 ? 2 : 1;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.2 + 0.05;
        this.phase = Math.random() * Math.PI * 2;
        this.color = ["#00ffff", "#ff00ff", "#00ff80", "#ffff00"][Math.floor(Math.random() * 4)];
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = 0.1 + Math.abs(Math.sin(time * 0.001 + this.phase)) * 0.15;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
      }
    }

    // Stagger shooting star spawns so they don't all appear at once
    const shootingStars: ShootingStar[] = Array.from({ length: 5 }, (_, i) => {
      const s = new ShootingStar();
      s.life = Math.floor((s.maxLife / 5) * i); // offset start
      return s;
    });

    const particles: PixelParticle[] = Array.from({ length: 40 }, () => new PixelParticle());

    let animationId: number;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        star.update(time);
        star.draw();
      });

      // Draw pixel particles
      particles.forEach((p) => {
        p.update(time);
        p.draw();
      });

      // Draw shooting stars
      shootingStars.forEach((s) => {
        s.update();
        s.draw();
      });

      // Draw and update spaceships
      spaceships.forEach((ship) => {
        ship.update(time);
        ship.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.65 }}
    />
  );
}
