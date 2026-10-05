'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Butterfly, ButterflyState } from './Butterfly';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';

interface CursorButterflyProps {
  offsetDistance?: number;
}

export const CursorButterfly: React.FC<CursorButterflyProps> = ({
  offsetDistance = 32, // 24-40px offset from interaction point
}) => {
  const { isPaused, prefersReducedMotion } = useMotion();
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState<ButterflyState>('hovering');
  const [isFinePointer, setIsFinePointer] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Physics & smoothing refs (no React state on mousemove to avoid re-renders)
  const posRef = useRef({
    currentX: -200,
    currentY: -200,
    targetX: -200,
    targetY: -200,
    mouseX: -200,
    mouseY: -200,
    vx: 0,
    vy: 0,
    rotation: 0,
    scaleX: 1,
    lastMovingTime: 0,
  });

  const animIdRef = useRef<number | null>(null);

  // Check pointer capability (fine pointer only: mouse/trackpad, NOT touch/coarse)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine)');
    setIsFinePointer(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Listen for hero sequence handoff event
  useEffect(() => {
    const handleHandoff = (e: CustomEvent<{ x: number; y: number }>) => {
      if (prefersReducedMotion || isPaused) return;

      const { x, y } = e.detail;
      posRef.current.currentX = x;
      posRef.current.currentY = y;
      posRef.current.targetX = x;
      posRef.current.targetY = y;
      posRef.current.mouseX = x;
      posRef.current.mouseY = y;
      setIsActive(true);
      setState('hovering');
    };

    window.addEventListener('marwa:hero-butterfly-handoff' as any, handleHandoff as EventListener);
    return () => {
      window.removeEventListener('marwa:hero-butterfly-handoff' as any, handleHandoff as EventListener);
    };
  }, [isPaused, prefersReducedMotion]);

  // Pointer move handler with spring lag
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isPaused || prefersReducedMotion || !isFinePointer) return;

      posRef.current.mouseX = e.clientX;
      posRef.current.mouseY = e.clientY;

      // Position butterfly slightly behind / off to side of cursor so pointer stays visible
      const targetX = e.clientX + offsetDistance;
      const targetY = e.clientY - offsetDistance * 0.75;

      posRef.current.targetX = targetX;
      posRef.current.targetY = targetY;
      posRef.current.lastMovingTime = performance.now();

      if (!isActive && posRef.current.currentX < 0) {
        posRef.current.currentX = targetX;
        posRef.current.currentY = targetY;
        setIsActive(true);
      }
    },
    [isPaused, prefersReducedMotion, isFinePointer, offsetDistance, isActive]
  );

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return;

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isFinePointer, prefersReducedMotion, handlePointerMove]);

  // Continuous physics animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return;

    let lastTime = performance.now();
    let trailEmitCounter = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isPaused && isActive && containerRef.current) {
        const p = posRef.current;

        // Spring-like lerp lag
        const spring = 8.5;
        const dx = p.targetX - p.currentX;
        const dy = p.targetY - p.currentY;
        const speed = Math.hypot(dx, dy);

        p.currentX += dx * spring * dt;
        p.currentY += dy * spring * dt;

        // Calculate angle pointing directly towards mouse cursor target (so butterfly faces mouse)
        const toMouseX = p.mouseX - p.currentX;
        const toMouseY = p.mouseY - p.currentY;
        const distToMouse = Math.hypot(toMouseX, toMouseY);

        if (distToMouse > 2) {
          // Angle in degrees facing mouse
          const moveAngle = Math.atan2(toMouseY, toMouseX) * (180 / Math.PI);
          // Butterfly SVG head is top-right (+45deg offset), so target rotation faces cursor:
          const targetRotation = moveAngle + 45;

          // Smoothly interpolate rotation angle
          let diff = (targetRotation - p.rotation) % 360;
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          p.rotation += diff * 8.0 * dt;
        }

        // Apply hardware-accelerated transform to butterfly container
        containerRef.current.style.transform = `translate3d(${p.currentX.toFixed(1)}px, ${p.currentY.toFixed(1)}px, 0) rotate(${p.rotation.toFixed(1)}deg)`;

        // Emit trail points periodically when moving
        trailEmitCounter++;
        if (speed > 2.0 && trailEmitCounter % 2 === 0) {
          window.dispatchEvent(
            new CustomEvent('marwa:trail-point', {
              detail: {
                x: p.currentX + 16,
                y: p.currentY + 16,
                dx,
                dy,
              },
            })
          );
        }

        // Dynamic Wing Flapping speed control:
        // Moving fast -> 'flying'
        // Stopped -> 'hovering' or 'resting'
        const timeSinceMove = now - p.lastMovingTime;
        if (speed > 8.0 && state !== 'flying') {
          setState('flying');
        } else if (speed <= 8.0 && timeSinceMove > 280 && state !== 'hovering') {
          setState('hovering');
        }
      }

      animIdRef.current = requestAnimationFrame(tick);
    };

    animIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [isFinePointer, isPaused, prefersReducedMotion, isActive, state]);

  if (!isFinePointer || prefersReducedMotion || !isActive) return null;

  const isDark = theme === 'dark';
  const strokeColor = '#D46835';
  const accentColor = '#D46835';

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-35 will-change-transform"
      style={{
        transform: `translate3d(${posRef.current.currentX}px, ${posRef.current.currentY}px, 0)`,
        filter: isDark
          ? 'drop-shadow(0 6px 14px rgba(212, 104, 53, 0.45)) drop-shadow(0 0 10px rgba(212, 104, 53, 0.35))'
          : 'drop-shadow(0 4px 12px rgba(212, 104, 53, 0.4)) drop-shadow(0 0 8px rgba(212, 104, 53, 0.25))',
      }}
      aria-hidden="true"
    >
      <div className="relative">
        <Butterfly
          variant="profile"
          state={state}
          size={42}
          strokeColor={strokeColor}
          accentColor={accentColor}
          bold={true}
          fillOpacity={0.22}
          withSparkles={false}
          registerAsTarget={false}
        />
      </div>
    </div>
  );
};
