'use client';

import React, { useEffect, useState } from 'react';
import { ButterflyTrail } from './ButterflyTrail';
import { ButterflyRipple } from './ButterflyRipple';
import { CursorButterfly } from './CursorButterfly';
import { useMotion } from '@/context/MotionContext';

/**
 * Global Configuration for The Butterfly Effect
 * Controls butterfly count, trail length, effect intensity, and animation speed
 */
export const BUTTERFLY_EFFECT_CONFIG = {
  butterflyCount: 1, // Cursor companion count (restrained, 1 primary companion)
  trailLength: 120, // Max target trail length in pixels (80-150px)
  trailFadeDuration: 620, // Trail segment fade time in ms (450-750ms)
  effectIntensity: 0.8, // Opacity and scale multiplier (restrained & poetic)
  animationSpeed: 1.0, // Overall motion velocity multiplier
  cursorOffset: 34, // 24-40px offset from pointer
  rippleRadius: 150, // Expansion radius for empty-space ripples (100-180px)
  rippleDuration: 820, // Duration for ripple fade in ms (700-1000ms)
  connectedResponseDelay: 160, // Delay between connected responses in ms (120-220ms)
};

export const ButterflyDirector: React.FC = () => {
  const { isPaused, togglePause, prefersReducedMotion } = useMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Pause animations when browser tab is hidden to conserve power and motion budget
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('tab-hidden-paused');
      } else {
        document.body.classList.remove('tab-hidden-paused');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!mounted || prefersReducedMotion) {
    return null;
  }

  return (
    <div id="butterfly-director" className="pointer-events-none" aria-hidden="true">
      {/* 1. Organic Canvas Flight Trail */}
      <ButterflyTrail />

      {/* 2. Empty-Space Background Ripples with Connected Reaction */}
      <ButterflyRipple />

      {/* 3. Pointer-following Companion Butterfly */}
      <CursorButterfly offsetDistance={BUTTERFLY_EFFECT_CONFIG.cursorOffset} />
    </div>
  );
};
