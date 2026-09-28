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
}

export const FlightPathReveal: React.FC<FlightPathRevealProps> = ({
  id,
  className = '',
  direction = 'left-to-right',
  label,
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

    // Use IntersectionObserver to trigger when section transition enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasRevealed) {
          setHasRevealed(true);
          observer.unobserve(container);

          // Animate flight along path
          const path = pathRef.current;
          const butterfly = butterflyRef.current;
          if (!path || !butterfly) return;

          const pathLength = path.getTotalLength();
          path.style.strokeDasharray = `${pathLength}`;
          path.style.strokeDashoffset = `${pathLength}`;

          const startTime = performance.now();
          const duration = 1200; // ms

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out

            // Draw line
            path.style.strokeDashoffset = `${pathLength * (1 - easeProgress)}`;

            // Travel butterfly along path
            const point = path.getPointAtLength(pathLength * easeProgress);
            butterfly.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasRevealed, prefersReducedMotion, isPaused]);

  if (prefersReducedMotion) return null;

  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#D4BDE6' : '#7928CA'; // Lavender in dark mode, royal amethyst in light mode
  const isLtr = direction === 'left-to-right';

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full max-w-4xl mx-auto py-1 sm:py-2 pointer-events-none overflow-visible flex flex-col items-center justify-center opacity-70 transition-opacity duration-700 ${
        hasRevealed ? 'opacity-85' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full h-8 sm:h-10">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 600 60"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Subtle curved flight path */}
          <path
            ref={pathRef}
            d={
              isLtr
                ? 'M20,45 C150,10 320,55 580,20'
                : 'M580,45 C450,10 280,55 20,20'
            }
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          />
        </svg>

        {/* Small traveling butterfly */}
        <div
          ref={butterflyRef}
          className="absolute top-0 left-0 transition-opacity duration-500"
          style={{
            transform: isLtr ? 'translate3d(20px, 45px, 0)' : 'translate3d(580px, 45px, 0)',
            opacity: hasRevealed ? 1 : 0,
          }}
        >
          <div className="transform -translate-x-1/2 -translate-y-1/2">
            <Butterfly
              variant="flutter"
              state={hasRevealed ? 'hovering' : 'resting'}
              size={22}
              strokeColor={strokeColor}
              accentColor="#FF662B"
              fillOpacity={0.2}
              registerAsTarget={true}
            />
          </div>
        </div>
      </div>

      {label && (
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-vibrant mt-1 opacity-75">
          {label}
        </span>
      )}
    </div>
  );
};
