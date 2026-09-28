'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';

interface ActiveRipple {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  maxRadius: number;
  duration: number;
}

export const ButterflyRipple: React.FC = () => {
  const { isPaused, prefersReducedMotion } = useMotion();
  const { theme } = useTheme();
  const [ripples, setRipples] = useState<ActiveRipple[]>([]);
  const lastRippleTimeRef = useRef(0);
  const rippleIdCounter = useRef(0);

  // Trigger wing flutter on nearest 1 or 2 registered butterflies
  const triggerNearbyButterflies = useCallback((clickX: number, clickY: number) => {
    if (typeof document === 'undefined') return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-butterfly-target="true"]')
    );

    if (targets.length === 0) return;

    // Compute Euclidean distance from click to each butterfly
    const measured = targets.map((el) => {
      const rect = el.getBoundingClientRect();
      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height / 2;
      const dist = Math.hypot(clickX - bx, clickY - by);
      return { el, dist };
    });

    // Sort by distance and pick the nearest 1 or 2 (within reasonable radius, e.g. 700px)
    measured.sort((a, b) => a.dist - b.dist);
    const nearest = measured.slice(0, 2).filter((item) => item.dist < 750);

    nearest.forEach((item, index) => {
      // Stagger reaction by distance (~120-220ms connected reaction)
      const baseDelay = 120 + index * 90;
      const distanceFactor = Math.min(180, (item.dist / 700) * 120);
      const totalDelay = Math.round(baseDelay + distanceFactor);

      item.el.dispatchEvent(
        new CustomEvent('marwa:butterfly-react', {
          detail: { delay: totalDelay },
        })
      );
    });
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (isPaused || prefersReducedMotion) return;

      const now = performance.now();
      // Cooldown of 380ms
      if (now - lastRippleTimeRef.current < 380) return;

      // Do not trigger if user is selecting text
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // STRICT ELIGIBILITY CHECK:
      // Never trigger on links, buttons, project cards, inputs, navigation, dialogs
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], [role="dialog"], article, .preserve-3d, nav, header'
      );
      if (isInteractive) return;

      lastRippleTimeRef.current = now;

      const newRipple: ActiveRipple = {
        id: ++rippleIdCounter.current,
        x: e.clientX,
        y: e.clientY,
        createdAt: now,
        maxRadius: 130 + Math.random() * 40, // 130-170px expansion
        duration: 820, // 820ms fade
      };

      // Cap at max 2 active ripples simultaneously
      setRipples((prev) => [...prev.slice(-1), newRipple]);

      // Cause and effect: trigger nearest butterflies
      triggerNearbyButterflies(e.clientX, e.clientY);
    },
    [isPaused, prefersReducedMotion, triggerNearbyButterflies]
  );

  useEffect(() => {
    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Clean up expired ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      const now = performance.now();
      setRipples((prev) => prev.filter((r) => now - r.createdAt < r.duration));
    }, 850);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (prefersReducedMotion || ripples.length === 0) return null;

  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#D4BDE6' : '#7928CA'; // Lavender in dark mode, amethyst in light mode
  const auraColor = isDark ? 'rgba(212, 189, 230, 0.12)' : 'rgba(121, 40, 202, 0.1)';

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {ripples.map((ripple) => (
        <svg
          key={ripple.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.maxRadius * 2.2}px`,
            height: `${ripple.maxRadius * 2.2}px`,
          }}
          viewBox="0 0 200 200"
        >
          {/* Subtle outer expanding aura ring */}
          <circle
            cx="100"
            cy="100"
            r="10"
            fill={auraColor}
            className="animate-ripple-expand"
            style={{
              animationDuration: `${ripple.duration}ms`,
            }}
          />
          {/* Delicate hand-drawn fine line ripple */}
          <circle
            cx="100"
            cy="100"
            r="10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="4 2"
            className="animate-ripple-stroke"
            style={{
              animationDuration: `${ripple.duration}ms`,
            }}
          />
        </svg>
      ))}
    </div>
  );
};
