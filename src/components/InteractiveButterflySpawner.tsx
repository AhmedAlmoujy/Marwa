'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Butterfly, ButterflyVariant } from './Butterfly';
import { useMotion } from '@/context/MotionContext';
import { Sparkles } from 'lucide-react';

interface SpawnedButterfly {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  size: number;
  variant: ButterflyVariant;
  color: string;
}

export const InteractiveButterflySpawner: React.FC = () => {
  const { isPaused, prefersReducedMotion } = useMotion();
  const [butterflies, setButterflies] = useState<SpawnedButterfly[]>([]);

  // Spawn a single butterfly at (x, y)
  const spawnButterflyAt = useCallback((x: number, y: number, customVx?: number, customVy?: number) => {
    if (isPaused || prefersReducedMotion) return;

    const variants: ButterflyVariant[] = ['profile', 'angled', 'flutter'];
    const colors = ['#3B165C', '#4F1176', '#7D45C6', '#9673D2', '#6B297C'];
    
    const id = Date.now() + Math.random();
    const variant = variants[Math.floor(Math.random() * variants.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.floor(Math.random() * 18) + 32; // 32 to 50px
    const vx = customVx !== undefined ? customVx : (Math.random() - 0.5) * 160;
    const vy = customVy !== undefined ? customVy : -(Math.random() * 180 + 120);
    const rotation = (Math.random() - 0.5) * 45;

    const newButterfly: SpawnedButterfly = {
      id,
      x,
      y,
      vx,
      vy,
      rotation,
      size,
      variant,
      color,
    };

    setButterflies((prev) => [...prev.slice(-15), newButterfly]);

    // Auto cleanup after 2.8s
    setTimeout(() => {
      setButterflies((prev) => prev.filter((b) => b.id !== id));
    }, 2800);
  }, [isPaused, prefersReducedMotion]);

  // Click anywhere to release a butterfly
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't intercept button or input or link clicks to avoid interfering with intent
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('[role="dialog"]')
      ) {
        return;
      }

      spawnButterflyAt(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, [spawnButterflyAt]);

  // Release Swarm Function
  const releaseSwarm = () => {
    const count = 7;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const startX = screenW * (0.2 + (i / count) * 0.6) + (Math.random() - 0.5) * 100;
        const startY = screenH * 0.75 + (Math.random() - 0.5) * 80;
        const vx = (Math.random() - 0.4) * 220;
        const vy = -(Math.random() * 260 + 180);
        spawnButterflyAt(startX, startY, vx, vy);
      }, i * 160);
    }
  };

  return (
    <>
      {/* Floating Interactive Butterfly Swarm Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={releaseSwarm}
          aria-label="Release a swarm of butterflies"
          title="Click to release a flight of butterflies across the screen"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E2CEF3] text-[#4F1176] shadow-[0_4px_20px_rgba(79,17,118,0.12)] hover:shadow-[0_8px_28px_rgba(79,17,118,0.22)] hover:border-[#7D45C6] hover:bg-[#F8F3FC] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D45C6]"
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            <span className="text-base group-hover:scale-125 transition-transform duration-300">
              🦋
            </span>
          </div>
          <span className="text-xs font-medium tracking-wide">Release Flight</span>
          <Sparkles size={13} className="text-[#A788DC] group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>

      {/* Render Active Click-Spawned Butterflies */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        {butterflies.map((b) => (
          <div
            key={b.id}
            className="absolute will-change-transform animate-flyOut"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              ['--vx' as string]: `${b.vx}px`,
              ['--vy' as string]: `${b.vy}px`,
              ['--rot' as string]: `${b.rotation}deg`,
            }}
          >
            <div className="relative -top-1/2 -left-1/2">
              <Butterfly
                variant={b.variant}
                state="flying"
                size={b.size}
                strokeColor={b.color}
                accentColor="#CCAAE6"
                fillOpacity={0.2}
                withSparkles={true}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
