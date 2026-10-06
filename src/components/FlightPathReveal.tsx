'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Butterfly } from './Butterfly';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';

interface FlightPathRevealProps {
  id?: string;
  className?: string;
  direction?: 'left-to-right' | 'right-to-left';
  label?: string;
  align?: 'left' | 'right';
}

export const FlightPathReveal: React.FC<FlightPathRevealProps> = ({
  id,
  className = '',
  direction = 'left-to-right',
  label,
  align = 'left',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const { isPaused, prefersReducedMotion } = useMotion();
  const { theme } = useTheme();

  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      setHasRevealed(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasRevealed(true);

          const path = pathRef.current;
          const butterfly = butterflyRef.current;
          if (!path) return;

          const pathLength = path.getTotalLength();
          path.style.strokeDasharray = `${pathLength}`;
          path.style.strokeDashoffset = `${pathLength}`;

          const startTime = performance.now();
          const duration = 1400; // ms

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out

            // Draw line
            path.style.strokeDashoffset = `${pathLength * (1 - easeProgress)}`;

            // Travel butterfly along path if dynamic
            if (butterfly) {
              const point = path.getPointAtLength(pathLength * easeProgress);
              butterfly.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
            }

            if (progress < 1) {
              animFrameId = requestAnimationFrame(step);
            } else {
              // Solid continuous line upon completion
              path.style.strokeDasharray = 'none';
              path.style.strokeDashoffset = '0';
            }
          };

          animFrameId = requestAnimationFrame(step);
        } else {
          // Reset when scrolled out of view so it plays again on re-entry
          setHasRevealed(false);
          if (animFrameId) cancelAnimationFrame(animFrameId);
          const path = pathRef.current;
          if (path) {
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = `${pathLength}`;
            path.style.strokeDashoffset = `${pathLength}`;
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion, isPaused]);

  if (prefersReducedMotion) return null;

  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#D4BDE6' : '#7928CA'; // Lavender in dark mode, royal amethyst in light mode
  const isLtr = direction === 'left-to-right';
  const isRightAligned = align === 'right';

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full max-w-5xl mx-auto py-3 sm:py-5 pointer-events-none overflow-visible flex flex-col items-center justify-center transition-opacity duration-700 ${
        hasRevealed ? 'opacity-90' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full h-12 sm:h-16 flex items-center justify-between">
        {/* Perched butterfly and label */}
        <div
          className={`absolute ${
            isRightAligned ? 'right-2 sm:right-6' : 'left-2 sm:left-6'
          } top-0 z-20 transform -translate-y-1/2 flex items-center gap-2`}
        >
          {isRightAligned && label && (
            <span className="font-serif italic text-sm sm:text-base text-amber-vibrant tracking-wide font-normal -mt-2">
              {label}
            </span>
          )}
          <div className={isRightAligned ? 'transform -scale-x-100' : ''}>
            <Butterfly
              variant="profile"
              state="resting"
              size={28}
              strokeColor={strokeColor}
              accentColor="#FF662B"
              fillOpacity={0.25}
              registerAsTarget={true}
            />
          </div>
          {!isRightAligned && label && (
            <span className="font-serif italic text-sm sm:text-base text-amber-vibrant tracking-wide font-normal -mt-2">
              {label}
            </span>
          )}
        </div>

        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 700 70"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Elegant hand-drawn continuous curving flight path */}
          <path
            ref={pathRef}
            d={
              isLtr
                ? 'M15,50 C180,15 360,60 680,25'
                : 'M680,50 C500,15 320,60 15,25'
            }
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          />
        </svg>
      </div>
    </div>
  );
};
