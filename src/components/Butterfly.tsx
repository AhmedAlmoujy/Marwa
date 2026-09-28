'use client';

import React from 'react';

export type ButterflyVariant = 'profile' | 'angled' | 'flutter';
export type ButterflyState = 'resting' | 'hovering' | 'flying' | 'static' | 'reactive';

interface ButterflyProps {
  variant?: ButterflyVariant;
  state?: ButterflyState;
  size?: number;
  className?: string;
  strokeColor?: string;
  accentColor?: string;
  fillOpacity?: number;
  interactive?: boolean;
  withSparkles?: boolean;
  id?: string;
  registerAsTarget?: boolean;
  bold?: boolean;
  strokeWidthScale?: number;
}

/**
 * EXACT BUTTERFLY PATHS
 * Extracted with sub-pixel precision from Marwa El-Bahnsawy's continuous line art drawing.
 * Normalized to standard viewBox="0 0 100 100".
 * Primary Wing Base Junction is at (65.6px, 74.7px).
 */
const EXACT_PATHS = {
  // Forewing Outer Loop (Closed perimeter for fill & base stroke)
  foreLoop:
    'M 65.6 74.7 C 65.7 71.5, 65.7 68.3, 65.6 65.1 C 65.4 62.0, 65.1 58.8, 64.7 55.7 C 64.2 52.6, 63.6 49.4, 62.9 46.3 C 62.2 43.2, 61.4 40.2, 60.6 37.1 C 59.9 34.1, 58.6 30.9, 58.1 28.2 C 60.6 26.4, 63.5 24.4, 65.4 21.9 C 67.1 19.2, 68.5 16.4, 69.9 13.5 C 71.7 10.9, 73.9 8.5, 76.7 7.1 C 79.7 7.8, 81.5 10.4, 82.3 13.6 C 82.9 16.7, 83.4 19.8, 83.7 22.9 C 83.8 26.1, 83.8 29.3, 83.6 32.4 C 83.2 35.6, 82.7 38.7, 82.2 41.9 C 81.6 45.0, 80.8 48.0, 80.0 51.1 C 79.1 54.2, 78.1 57.1, 77.0 60.1 C 75.9 63.1, 74.8 66.1, 73.5 69.0 C 72.0 71.7, 70.1 74.2, 66.8 74.7 Z',

  // Forewing Leading Edge (The bold expressive hand-inked line rising to apex)
  foreLead:
    'M 65.6 74.7 C 65.7 72.1, 65.7 69.5, 65.7 67.0 C 65.6 64.4, 65.4 61.8, 65.1 59.3 C 64.8 56.7, 64.4 54.2, 64.0 51.7 C 63.5 49.2, 63.0 46.6, 62.5 44.1 C 61.8 41.7, 61.2 39.2, 60.5 36.7 C 59.9 34.2, 59.0 31.7, 57.9 29.3 C 58.7 27.5, 61.2 26.1, 63.5 24.5 C 65.0 22.4, 66.4 20.3, 67.7 18.0 C 68.8 15.7, 69.9 13.4, 71.4 11.3 C 73.1 9.3, 75.1 7.7, 77.5 7.0',

  // Forewing Trailing Perimeter (The delicate outer curve looping down)
  foreTrail:
    'M 77.5 7.0 C 79.9 8.0, 81.3 9.9, 82.0 12.4 C 82.6 14.9, 83.1 17.4, 83.4 19.8 C 83.6 22.3, 83.8 24.8, 83.8 27.3 C 83.8 29.9, 83.6 32.4, 83.3 34.8 C 82.9 37.3, 82.6 39.8, 82.2 42.3 C 81.6 44.7, 81.0 47.2, 80.4 49.6 C 79.7 52.0, 79.0 54.4, 78.2 56.8 C 77.3 59.1, 76.5 61.5, 75.7 63.9 C 74.8 66.2, 73.8 68.5, 72.6 70.7 C 71.2 72.8, 69.5 74.6, 66.8 74.7',

  // Left Wavy Wing Outer Crest (Graceful scalloped crest line)
  leftOut:
    'M 56.5 25.9 C 55.3 23.2, 53.1 20.6, 50.3 19.4 C 47.3 20.3, 44.6 21.8, 42.2 23.7 C 40.2 26.0, 38.3 28.5, 36.5 31.0 C 35.1 33.7, 33.7 36.5, 32.6 39.4 C 31.8 42.4, 31.4 45.4, 31.6 48.5 C 32.4 51.5, 33.8 54.3, 35.7 56.7 C 38.2 58.6, 40.9 60.1, 43.8 61.2 C 46.8 61.9, 49.8 62.6, 52.8 63.2 C 55.8 63.9, 58.8 64.7, 61.6 65.8 C 63.8 67.7, 65.2 70.5, 65.6 74.7',

  // Left Wavy Wing Inner Seam (The subtle curved inner line of the crest wing)
  leftIn:
    'M 56.5 25.9 C 55.5 27.6, 54.3 29.3, 53.2 30.9 C 52.0 32.5, 50.8 34.2, 49.7 35.9 C 48.8 37.7, 47.9 39.5, 47.2 41.3 C 46.6 43.3, 46.1 45.2, 45.9 47.2 C 45.9 49.2, 46.0 51.3, 46.3 53.3 C 46.8 55.2, 47.5 57.1, 48.4 58.9 C 49.2 60.7, 50.2 62.5, 51.2 64.2 C 52.4 65.8, 53.7 67.4, 55.1 68.8 C 56.7 70.1, 58.3 71.4, 60.0 72.4 C 61.7 73.4, 63.6 74.1, 65.6 74.7',

  // Left Wavy Wing Full Closed Loop (For translucent color wash)
  leftLoop:
    'M 56.5 25.9 C 55.2 23.1, 52.9 20.5, 50.0 19.4 C 47.0 20.5, 44.2 22.1, 41.7 24.1 C 39.8 26.6, 37.8 29.1, 36.1 31.8 C 34.6 34.6, 33.3 37.5, 32.2 40.5 C 31.6 43.6, 31.4 46.8, 31.9 50.0 C 33.0 53.0, 34.8 55.6, 37.1 57.8 C 39.8 59.6, 42.7 60.8, 45.8 61.7 C 48.9 62.4, 52.0 63.1, 55.1 63.7 C 58.2 64.2, 61.3 66.0, 64.1 69.3 C 65.8 72.6, 65.7 74.6, 63.2 74.2 C 59.8 72.4, 57.1 70.5, 54.8 68.5 C 52.7 66.2, 50.8 63.5, 49.3 60.8 C 47.9 57.9, 46.7 54.9, 46.1 51.8 C 45.9 48.6, 46.1 45.4, 46.8 42.3 C 48.0 39.3, 49.4 36.5, 51.1 33.8 C 53.0 31.2, 54.8 28.6, 56.5 25.9 Z',

  // Outer Hindwing Loop (The sweeping lower-left arc)
  hindOut:
    'M 65.6 74.7 C 63.9 71.6, 61.9 68.6, 59.5 65.8 C 56.8 63.4, 53.8 61.3, 50.6 59.8 C 47.1 58.8, 43.6 58.4, 40.0 58.4 C 36.4 58.6, 32.8 59.1, 29.3 59.8 C 25.9 60.8, 22.6 62.2, 19.7 64.3 C 17.5 67.1, 16.2 70.5, 15.9 74.1 C 16.7 77.5, 18.4 80.7, 20.6 83.5 C 23.3 85.9, 26.3 87.8, 29.6 89.3 C 33.1 90.3, 36.6 90.8, 40.2 90.9 C 43.7 90.7, 47.3 90.1, 50.8 89.2 C 54.1 88.0, 57.2 86.1, 59.8 83.7 C 62.1 80.9, 64.0 77.8, 65.6 74.7 Z',

  // Inner Hindwing Loop (The bold calligraphic bottom arc)
  hindIn:
    'M 65.6 74.7 C 64.2 72.4, 62.6 70.4, 60.7 68.6 C 58.7 66.9, 56.6 65.5, 54.3 64.3 C 51.8 63.3, 49.3 62.7, 46.8 62.2 C 44.2 62.0, 41.6 62.1, 39.0 62.3 C 36.4 62.7, 33.9 63.4, 31.6 64.5 C 29.4 65.9, 27.6 67.9, 26.5 70.3 C 26.4 72.9, 27.3 75.2, 29.1 77.2 C 31.2 78.8, 33.5 80.0, 35.9 80.8 C 38.5 81.3, 41.0 81.4, 43.7 81.4 C 46.3 81.3, 48.8 81.0, 51.4 80.7 C 53.9 80.1, 56.4 79.3, 58.8 78.4 C 61.1 77.2, 63.4 76.0, 65.6 74.7 Z',

  // Horizontal Body Loop (Small oval/teardrop loop at junction)
  body:
    'M 65.6 74.7 C 66.3 74.5, 67.0 74.3, 67.6 74.2 C 68.2 74.2, 68.8 74.1, 69.5 74.1 C 70.2 74.2, 70.9 74.2, 71.8 74.2 C 72.6 74.3, 73.1 74.6, 73.2 75.2 C 72.8 75.8, 72.2 76.1, 71.5 76.1 C 70.7 76.1, 70.0 76.1, 69.3 76.1 C 68.6 76.1, 68.0 76.1, 67.3 76.0 C 66.7 75.8, 66.1 75.4, 65.6 74.9 Z',

  // Downward Tail Flick (Graceful tapering ink flick)
  tail:
    'M 65.6 74.9 C 65.3 75.7, 65.0 76.5, 64.6 77.3 C 64.3 78.1, 64.0 78.9, 63.7 79.7 C 63.3 80.5, 63.0 81.2, 62.6 82.0 C 62.2 82.8, 61.8 83.6, 61.4 84.3 C 61.1 85.1, 60.7 85.8, 60.3 86.6 C 59.9 87.4, 59.5 88.2, 59.2 88.9 C 58.8 89.7, 58.4 90.5, 58.0 91.2 C 57.5 91.9, 57.0 92.6, 56.5 93.3',
};

export const Butterfly: React.FC<ButterflyProps> = ({
  variant = 'profile',
  state = 'resting',
  size = 48,
  className = '',
  strokeColor = '#D4BDE6', // Marbled Lilac (Dark mode) / Deep Amethyst
  accentColor = '#FF662B', // Molten Amber Flame
  fillOpacity = 0.12,
  withSparkles = false,
  id,
  registerAsTarget = true,
  bold = false,
  strokeWidthScale = 1.0,
}) => {
  const scale = bold ? 1.85 : (strokeWidthScale || 1.0);
  const [internalReactive, setInternalReactive] = React.useState(false);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const el = svgRef.current;
    if (!el || !registerAsTarget) return;

    const handleReact = (e: CustomEvent<{ delay?: number }>) => {
      const delay = e.detail?.delay || 0;
      const t1 = setTimeout(() => {
        setInternalReactive(true);
      }, delay);
      const t2 = setTimeout(() => {
        setInternalReactive(false);
      }, delay + 800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    el.addEventListener('marwa:butterfly-react' as any, handleReact as unknown as EventListener);
    return () => {
      el.removeEventListener('marwa:butterfly-react' as any, handleReact as unknown as EventListener);
    };
  }, [registerAsTarget]);

  const effectiveState = internalReactive ? 'reactive' : state;

  // Determine animation classes
  let forewingClass = '';
  let hindwingClass = '';
  let bodyClass = '';

  if (effectiveState === 'resting') {
    forewingClass = 'flap-forewing-resting';
    hindwingClass = 'flap-hindwing-resting';
  } else if (effectiveState === 'hovering') {
    forewingClass = 'flap-forewing-hovering';
    hindwingClass = 'flap-hindwing-hovering';
    bodyClass = 'body-flutter';
  } else if (effectiveState === 'flying') {
    forewingClass = 'flap-forewing-flying';
    hindwingClass = 'flap-hindwing-flying';
    bodyClass = 'body-flutter';
  } else if (effectiveState === 'reactive') {
    forewingClass = 'flap-forewing-reactive';
    hindwingClass = 'flap-hindwing-reactive';
    bodyClass = 'body-flutter';
  }

  // Perspective transforms for natural pose variation while preserving the exact drawing
  let variantTransform = '';
  if (variant === 'angled') {
    // Subtle dynamic flight angle for badges and hero seals
    variantTransform = 'rotate(-6 65.6 74.7) scale(1.02, 0.98)';
  } else if (variant === 'flutter') {
    // Elevated flutter posture for active hover/action cues
    variantTransform = 'rotate(4 65.6 74.7) scale(0.99, 1.01)';
  }

  return (
    <svg
      ref={svgRef}
      id={id}
      data-butterfly-target="true"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`butterfly-svg select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* Optional Delicate Celestial Sparkles near the wing apex */}
      {withSparkles && (
        <g className="opacity-75" stroke={accentColor} strokeWidth="1" strokeLinecap="round">
          <path d="M80 8L80 14M77 11L83 11" />
          <circle cx="86" cy="18" r="1.1" fill={accentColor} />
          <circle cx="70" cy="5" r="0.85" fill={accentColor} />
        </g>
      )}

      {/* Main Butterfly Container with Variant Transform */}
      <g transform={variantTransform || undefined}>
        {/* ============================================================== */}
        {/* Translucent Aura Color Wash (Gives soft luminescence to wings) */}
        {/* ============================================================== */}
        {fillOpacity > 0 && (
          <g className="butterfly-glow-layer pointer-events-none">
            {/* Forewing Translucent Wash */}
            <path
              d={EXACT_PATHS.foreLoop}
              fill={accentColor}
              fillOpacity={fillOpacity * 1.3}
              className={`butterfly-forewing ${forewingClass}`}
              style={{ transformOrigin: '65.6px 74.7px' }}
            />
            {/* Left Wavy Wing Translucent Wash */}
            <path
              d={EXACT_PATHS.leftLoop}
              fill={accentColor}
              fillOpacity={fillOpacity * 0.9}
              className={`butterfly-forewing ${forewingClass}`}
              style={{ transformOrigin: '65.6px 74.7px' }}
            />
            {/* Hindwing Translucent Wash */}
            <path
              d={EXACT_PATHS.hindOut}
              fill={accentColor}
              fillOpacity={fillOpacity * 0.8}
              className={`butterfly-hindwing ${hindwingClass}`}
              style={{ transformOrigin: '65.6px 74.7px' }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* Hindwing Group (Anchored at Junction 65.6px, 74.7px)          */}
        {/* ============================================================== */}
        <g
          className={`butterfly-hindwing ${hindwingClass}`}
          style={{ transformOrigin: '65.6px 74.7px' }}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Rounded Hindwing Loop */}
          <path d={EXACT_PATHS.hindOut} strokeWidth={(1.4 * scale).toFixed(2)} />
          {/* Inner Hindwing Loop with Bold Ink Arc on Bottom */}
          <path d={EXACT_PATHS.hindIn} strokeWidth={(2.5 * scale).toFixed(2)} />
        </g>

        {/* ============================================================== */}
        {/* Left/Back Wavy Wing Group (Anchored at Junction 65.6px, 74.7px)*/}
        {/* ============================================================== */}
        <g
          className={`butterfly-forewing ${forewingClass}`}
          style={{ transformOrigin: '65.6px 74.7px' }}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Scalloped Crest Edge */}
          <path d={EXACT_PATHS.leftOut} strokeWidth={(1.5 * scale).toFixed(2)} />
          {/* Inner Subtle Seam Curve */}
          <path d={EXACT_PATHS.leftIn} strokeWidth={(1.3 * scale).toFixed(2)} opacity="0.9" />
        </g>

        {/* ============================================================== */}
        {/* Forewing Group (Anchored at Junction 65.6px, 74.7px)           */}
        {/* ============================================================== */}
        <g
          className={`butterfly-forewing ${forewingClass}`}
          style={{ transformOrigin: '65.6px 74.7px' }}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Trailing Edge */}
          <path d={EXACT_PATHS.foreTrail} strokeWidth={(1.4 * scale).toFixed(2)} />
          {/* Bold Expressive Leading Edge Line (Signature ink stroke) */}
          <path d={EXACT_PATHS.foreLead} strokeWidth={(2.7 * scale).toFixed(2)} />
        </g>

        {/* ============================================================== */}
        {/* Stable Body & Tail Group (Anchored at Base Junction)           */}
        {/* ============================================================== */}
        <g
          className={`butterfly-body ${bodyClass}`}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Small Horizontal Oval/Teardrop Body Loop */}
          <path d={EXACT_PATHS.body} strokeWidth={(1.7 * scale).toFixed(2)} />
          {/* Delicate Downward Tail Flick Line */}
          <path d={EXACT_PATHS.tail} strokeWidth={(1.5 * scale).toFixed(2)} />
        </g>
      </g>
    </svg>
  );
};
