'use client';

import React, { useEffect, useRef } from 'react';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';

export interface TrailPoint {
  x: number;
  y: number;
  time: number;
  dx?: number;
  dy?: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  maxLife: number;
  life: number;
  size: number;
}

export const ButterflyTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPaused, prefersReducedMotion } = useMotion();
  const { theme } = useTheme();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: TrailPoint[] = [];
    let sparks: Spark[] = [];
    let animationFrameId: number;
    let lastPointTime = 0;
    let lastX = 0;
    let lastY = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Listener for butterfly movement points
    const handlePointAdded = (e: CustomEvent<TrailPoint>) => {
      if (isPaused || prefersReducedMotion) return;
      const { x, y } = e.detail;
      const now = performance.now();

      // Calculate direction change for occasional micro-speck emission
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        points.push({ x, y, time: now, dx, dy });
        // Keep bounded history (max 28 points)
        if (points.length > 28) {
          points.shift();
        }

        // Emit micro speck on sharp turn or fast burst (strict cap)
        if (dist > 18 && sparks.length < 12 && Math.random() < 0.35) {
          sparks.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            alpha: 0.85,
            maxLife: 400 + Math.random() * 250,
            life: 0,
            size: 0.8 + Math.random() * 0.9,
          });
        }

        lastX = x;
        lastY = y;
        lastPointTime = now;
      }
    };

    window.addEventListener('marwa:trail-point' as any, handlePointAdded as EventListener);

    // Animation Render Loop
    let lastFrameTime = performance.now();

    const render = (currentTime: number) => {
      const dt = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      // Clear Canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isPaused || prefersReducedMotion) {
        points = [];
        sparks = [];
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Filter out points older than 620ms (fades within 450-750ms)
      const maxAge = 620;
      points = points.filter((p) => currentTime - p.time < maxAge);

      // Render organic curved trail if at least 2 points exist
      if (points.length >= 2) {
        const primaryColor = '212, 104, 53'; // Warm terracotta #D46835
        const accentColor = '235, 125, 75'; // Luminous glowing highlight

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw multiple smoothed segments with fading opacity and width
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          // Compute midpoint for Catmull-Rom quadratic curve smoothing
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          const progress = i / (points.length - 1); // 0 (oldest) to 1 (newest)
          const ageRatio = 1 - (currentTime - p2.time) / maxAge;
          const alpha = Math.max(0, Math.min(1, progress * ageRatio * 0.85));
          const lineWidth = Math.max(0.6, progress * 2.8);

          ctx.beginPath();
          ctx.lineWidth = lineWidth;

          if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
          } else {
            const prevMidX = (points[i - 1].x + p1.x) / 2;
            const prevMidY = (points[i - 1].y + p1.y) / 2;
            ctx.moveTo(prevMidX, prevMidY);
          }

          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

          // Subtle blend into vibrant glow near newest point
          if (progress > 0.82) {
            ctx.strokeStyle = `rgba(${accentColor}, ${alpha * 0.95})`;
          } else {
            ctx.strokeStyle = `rgba(${primaryColor}, ${alpha})`;
          }

          ctx.stroke();
        }
      }

      // Render tiny fading specks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life += dt;
        if (spark.life >= spark.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        spark.x += spark.vx;
        spark.y += spark.vy;
        const sparkAlpha = (1 - spark.life / spark.maxLife) * spark.alpha;

        ctx.fillStyle = `rgba(212, 104, 53, ${sparkAlpha})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('marwa:trail-point' as any, handlePointAdded as EventListener);
    };
  }, [isPaused, prefersReducedMotion, theme]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
