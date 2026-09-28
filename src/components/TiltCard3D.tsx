'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useMotion } from '@/context/MotionContext';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default 10)
  glareOpacity?: number; // 0 to 1
  onClick?: () => void;
  scale?: number; // default 1.02
  perspective?: number; // default 1000
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glareOpacity = 0.25,
  onClick,
  scale = 1.02,
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMotion();

  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const x = (clientX - rect.left) / rect.width; // 0 to 1
      const y = (clientY - rect.top) / rect.height; // 0 to 1

      const tiltY = (x - 0.5) * (maxTilt * 2);
      const tiltX = (0.5 - y) * (maxTilt * 2);

      setRotX(tiltX);
      setRotY(tiltY);
      setGlarePos({
        x: x * 100,
        y: y * 100,
        opacity: glareOpacity,
      });
    },
    [maxTilt, glareOpacity, prefersReducedMotion]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const transformStyle = prefersReducedMotion
    ? undefined
    : {
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d' as const,
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={transformStyle}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* 3D Specular Glare / Sheen Overlay */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-30 overflow-hidden"
          style={{
            opacity: isHovered ? glarePos.opacity : 0,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 125, 60, 0.12) 35%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
