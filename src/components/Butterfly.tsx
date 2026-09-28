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
}

export const Butterfly: React.FC<ButterflyProps> = ({
  variant = 'profile',
  state = 'resting',
  size = 48,
  className = '',
  strokeColor = '#D4BDE6', // Marbled Lilac
  accentColor = '#FF662B', // Molten Amber Flame
  fillOpacity = 0.12,
  withSparkles = false,
  id,
  registerAsTarget = true,
}) => {
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

  // SILHOUETTE 1: Elegant Freehand Side-view Profile (1st reference)
  if (variant === 'profile') {
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
        {withSparkles && (
          <g className="opacity-75" stroke={accentColor} strokeWidth="1" strokeLinecap="round">
            {/* Delicate hand-drawn micro sparkles */}
            <path d="M78 18L78 26M74 22L82 22" />
            <circle cx="88" cy="30" r="1" fill={accentColor} />
            <circle cx="68" cy="12" r="0.75" fill={accentColor} />
          </g>
        )}

        {/* Stable Body Group */}
        <g className={`butterfly-body ${bodyClass}`}>
          {/* Slender curved abdomen and thorax */}
          <path
            d="M32 40 C34 46, 35 55, 30 68 C29 70, 27 72, 26 73"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Delicate Head */}
          <ellipse
            cx="34"
            cy="37"
            rx="2.2"
            ry="2.8"
            transform="rotate(-15 34 37)"
            fill={strokeColor}
          />
          {/* Curled Expressive Antennae */}
          <path
            d="M35 35 C38 30, 44 26, 49 27 C51 27.5, 52 30, 50 31 C48 32, 46 30, 47 28"
            stroke={strokeColor}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M34 35 C35 28, 39 23, 43 21 C44.5 20.5, 46 22, 44 23.5"
            stroke={strokeColor}
            strokeWidth="0.85"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* Hindwing Group (Anchored at base) */}
        <g
          className={`butterfly-hindwing ${hindwingClass}`}
          style={{ transformOrigin: '32px 52px' }}
        >
          <path
            d="M32 52 C35 55, 48 57, 52 65 C55 72, 48 81, 40 83 C33 85, 27 78, 28 72 C29 67, 31 58, 32 52 Z"
            fill={accentColor}
            fillOpacity={fillOpacity}
            stroke={strokeColor}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle inner organic veins */}
          <path
            d="M33 54 C38 60, 44 67, 44 76 M35 57 C33 64, 32 72, 33 78"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>

        {/* Forewing Group (Anchored at thorax) */}
        <g
          className={`butterfly-forewing ${forewingClass}`}
          style={{ transformOrigin: '32px 42px' }}
        >
          {/* Sweeping expressive arched wing outline with organic scallops */}
          <path
            d="M32 42 C33 32, 44 14, 62 10 C68 9, 74 13, 73 19 C72 26, 65 31, 68 37 C70 41, 67 46, 61 49 C55 52, 43 49, 32 42 Z"
            fill={accentColor}
            fillOpacity={fillOpacity * 1.5}
            stroke={strokeColor}
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Delicate internal wing venation */}
          <path
            d="M35 41 C43 32, 53 23, 64 16 M37 42 C48 35, 57 32, 65 34 M38 43 C46 43, 54 44, 60 46"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Hand-drawn micro dots near cell */}
          <circle cx="56" cy="24" r="0.8" fill={strokeColor} opacity="0.6" />
          <circle cx="61" cy="28" r="0.65" fill={strokeColor} opacity="0.5" />
        </g>
      </svg>
    );
  }

  // SILHOUETTE 2: Layered Three-Quarter Silhouette (3rd reference)
  if (variant === 'angled') {
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
        {withSparkles && (
          <g className="opacity-75" stroke={accentColor} strokeWidth="1" strokeLinecap="round">
            <path d="M22 20L22 27M18.5 23.5L25.5 23.5" />
            <circle cx="16" cy="34" r="0.9" fill={accentColor} />
          </g>
        )}

        {/* Stable Body */}
        <g className={`butterfly-body ${bodyClass}`}>
          <path
            d="M48 44 C49 52, 47 62, 43 72 C41 75, 38 78, 36 80"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse cx="49" cy="40" rx="2.5" ry="3" transform="rotate(10 49 40)" fill={strokeColor} />
          {/* Forward curved antennae */}
          <path
            d="M50 37 C54 30, 60 25, 66 26 C68 26.5, 68 29, 66 30 C64 31, 62 29, 64 27"
            stroke={strokeColor}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M49 37 C51 31, 55 26, 59 23 C60.5 22, 62 24, 60 25.5"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* Hindwing */}
        <g
          className={`butterfly-hindwing ${hindwingClass}`}
          style={{ transformOrigin: '46px 54px' }}
        >
          <path
            d="M46 54 C48 60, 56 65, 58 74 C59 82, 51 88, 43 89 C36 90, 31 82, 33 75 C35 70, 42 60, 46 54 Z"
            fill={accentColor}
            fillOpacity={fillOpacity}
            stroke={strokeColor}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M45 58 C48 66, 50 76, 48 83 M43 62 C40 70, 38 77, 39 82"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Forewing */}
        <g
          className={`butterfly-forewing ${forewingClass}`}
          style={{ transformOrigin: '48px 46px' }}
        >
          <path
            d="M48 46 C52 35, 68 18, 84 14 C90 12.5, 94 17, 92 23 C90 31, 81 37, 83 44 C84 48, 80 54, 73 56 C64 58, 54 54, 48 46 Z"
            fill={accentColor}
            fillOpacity={fillOpacity * 1.5}
            stroke={strokeColor}
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M51 45 C60 37, 72 27, 85 20 M53 47 C65 41, 74 38, 81 40 M52 48 C61 49, 70 51, 75 52"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="76" cy="27" r="0.8" fill={strokeColor} opacity="0.6" />
        </g>
      </svg>
    );
  }

  // SILHOUETTE 3: Fluttering / Perched Side Silhouette (4th reference)
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
      {withSparkles && (
        <g className="opacity-75" stroke={accentColor} strokeWidth="1" strokeLinecap="round">
          <path d="M82 32L82 38M79 35L85 35" />
          <circle cx="75" cy="22" r="0.8" fill={accentColor} />
        </g>
      )}

      {/* Body */}
      <g className={`butterfly-body ${bodyClass}`}>
        <path
          d="M36 44 C38 50, 39 58, 34 68 C32 72, 28 76, 26 77"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="37" cy="40" rx="2.2" ry="2.7" transform="rotate(-10 37 40)" fill={strokeColor} />
        <path
          d="M38 38 C42 32, 47 28, 52 29 C54 29.5, 54 32, 52 33 C50 34, 49 32, 50 30"
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M37 38 C38 31, 41 26, 45 24 C46 23.5, 47 25, 46 26"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* Hindwing */}
      <g
        className={`butterfly-hindwing ${hindwingClass}`}
        style={{ transformOrigin: '35px 54px' }}
      >
        <path
          d="M35 54 C38 58, 47 62, 49 71 C51 78, 44 86, 37 87 C31 88, 27 81, 28 75 C29 69, 32 60, 35 54 Z"
          fill={accentColor}
          fillOpacity={fillOpacity}
          stroke={strokeColor}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M36 57 C40 64, 43 73, 41 81"
          stroke={strokeColor}
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* Forewing */}
      <g
        className={`butterfly-forewing ${forewingClass}`}
        style={{ transformOrigin: '36px 45px' }}
      >
        <path
          d="M36 45 C38 35, 50 16, 68 12 C74 10.5, 79 15, 78 21 C76 28, 69 33, 71 39 C73 44, 69 49, 63 51 C56 53, 46 50, 36 45 Z"
          fill={accentColor}
          fillOpacity={fillOpacity * 1.5}
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M39 44 C48 35, 59 25, 70 18 M40 45 C51 39, 60 35, 68 37 M41 46 C50 46, 58 47, 63 48"
          stroke={strokeColor}
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
};
