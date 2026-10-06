'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Butterfly } from './Butterfly';
import { Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
  isStar: boolean;
  rotation: number;
  rotSpeed: number;
}

export const SiteIntroAnimation: React.FC = () => {
  const [phase, setPhase] = useState<'playing' | 'fading' | 'finished'>('playing');
  const [showTypography, setShowTypography] = useState(false);
  const [butterflyPos, setButterflyPos] = useState({ x: -100, y: -100, angle: 0, opacity: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  // Check if intro has already been shown in this tab session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeen = sessionStorage.getItem('marwa_intro_seen');
    if (hasSeen === 'true') {
      // Allow user to test or replay, but if set, we could skip.
      // During development/review, let's always show it on fresh reload or first visit.
    }
  }, []);

  const finishIntro = useCallback(() => {
    setPhase('fading');
    setTimeout(() => {
      setPhase('finished');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('marwa_intro_seen', 'true');
      }
    }, 850);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const goldPalette = [
      '#FF662B', // Molten Amber
      '#FFB347', // Warm Gold
      '#FFD285', // Radiant Starlight
      '#EADCF5', // Lilac Frost
      '#D4BDE6', // Amethyst Shimmer
      '#FFFFFF', // Pure White Glimmer
    ];

    const addSparks = (x: number, y: number, count = 3, burst = false, speedMult = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst
          ? (Math.random() * 5 + 2) * speedMult
          : (Math.random() * 1.8 + 0.5) * speedMult;
        const color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
        const isStar = Math.random() > 0.65;
        const maxLife = burst ? Math.random() * 45 + 35 : Math.random() * 35 + 20;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed + (burst ? 0 : -0.4),
          vy: Math.sin(angle) * speed + 0.3,
          size: Math.random() * 3.2 + 1.2,
          alpha: 1,
          maxLife,
          life: 0,
          color,
          isStar,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    let hasBurst = false;
    startTimeRef.current = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000; // in seconds
      ctx.clearRect(0, 0, width, height);

      // Total sequence duration: ~3.4 seconds
      const totalDuration = 3.4;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Compute Butterfly Flight Path (Smooth cinematic S-curve swooping inwards and spiraling)
      let bx = 0;
      let by = 0;
      let bAngle = 0;
      let bOpacity = 0;

      if (progress < 0.28) {
        // Entrance: sweeping from bottom-left up towards center-right
        const p = progress / 0.28;
        bx = width * (0.05 + p * 0.5);
        by = height * (0.85 - Math.sin(p * Math.PI * 0.8) * 0.55);
        bAngle = -28 + p * 20;
        bOpacity = Math.min(p * 2.5, 1);
        addSparks(bx, by, 3);
      } else if (progress < 0.62) {
        // Flourish: swooping across the center and spreading stardust
        const p = (progress - 0.28) / (0.62 - 0.28);
        const loopRadiusX = width * 0.22;
        const loopRadiusY = height * 0.18;
        bx = width * 0.55 + Math.sin(p * Math.PI * 2) * loopRadiusX;
        by = height * 0.42 + Math.cos(p * Math.PI * 2) * -loopRadiusY;
        bAngle = Math.cos(p * Math.PI * 2) * 45;
        bOpacity = 1;
        addSparks(bx, by, 5);

        if (p > 0.4 && !hasBurst) {
          hasBurst = true;
          setShowTypography(true);
          // Magic explosion at the center!
          for (let k = 0; k < 60; k++) {
            addSparks(width * 0.5, height * 0.45, 1, true, 1.8);
          }
        }
      } else if (progress < 0.88) {
        // Ascending into light: soaring up towards top-right and dissolving
        const p = (progress - 0.62) / (0.88 - 0.62);
        bx = width * (0.55 + p * 0.35);
        by = height * (0.42 - p * 0.45);
        bAngle = -35;
        bOpacity = 1 - p * 0.8;
        addSparks(bx, by, 3);
      } else {
        bOpacity = 0;
      }

      setButterflyPos({ x: bx, y: by, angle: bAngle, opacity: bOpacity });

      // Update and Draw Stardust Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.rotation += pt.rotSpeed;
        pt.life++;
        pt.alpha = 1 - pt.life / pt.maxLife;

        if (pt.alpha <= 0 || pt.life >= pt.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(pt.alpha, 0);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = pt.isStar ? 12 : 6;

        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rotation);

        if (pt.isStar) {
          // Draw 4-point golden sparkle
          const s = pt.size * 2;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else {
          // Soft circular ember
          ctx.beginPath();
          ctx.arc(0, 0, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Check for completion
      if (progress >= 1 && phase === 'playing') {
        finishIntro();
        return;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase, finishIntro]);

  if (phase === 'finished') return null;

  return (
    <div
      role="banner"
      aria-label="Website Opening Sequence"
      onClick={finishIntro}
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden transition-all duration-800 cursor-pointer ${
        phase === 'fading'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #170928 0%, #08030E 65%, #040107 100%)',
      }}
    >
      {/* Background Stardust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Atmospheric Ambient Glow Spheres */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-amber-500/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none z-0 animate-pulse" />

      {/* The Flying Enchanted Butterfly */}
      {butterflyPos.opacity > 0 && (
        <div
          className="absolute z-30 pointer-events-none transition-opacity duration-300 will-change-transform"
          style={{
            left: `${butterflyPos.x}px`,
            top: `${butterflyPos.y}px`,
            transform: `translate(-50%, -50%) rotate(${butterflyPos.angle}deg)`,
            opacity: butterflyPos.opacity,
            filter: 'drop-shadow(0 0 16px rgba(255, 102, 43, 0.6)) drop-shadow(0 0 24px rgba(212, 189, 230, 0.4))',
          }}
        >
          <Butterfly
            variant="flutter"
            state="flying"
            size={56}
            strokeColor="#FAF4FD"
            accentColor="#FF662B"
            fillOpacity={0.35}
            bold={true}
            withSparkles={true}
          />
        </div>
      )}

      {/* Elegant Centered Typography Reveal */}
      <div
        className={`relative z-20 text-center px-6 transition-all duration-1000 transform ${
          showTypography
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/25 backdrop-blur-sm text-[11px] font-mono tracking-[0.25em] uppercase text-amber-vibrant">
          <Sparkles size={12} className="text-amber-flame animate-spin" />
          <span>Transformation in Fine Art</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-[0.12em] uppercase leading-tight drop-shadow-[0_4px_24px_rgba(255,102,43,0.35)]">
          Marwa Elbahnsawy
        </h1>

        <p className="mt-3 font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-lavender-soft/80 font-light">
          Printmaking • Fine Arts • Visual Metamorphosis
        </p>
      </div>

      {/* Discrete Skip Button */}
      <button
        onClick={finishIntro}
        aria-label="Skip Intro Animation"
        className="absolute top-6 right-6 z-40 group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-flame/40 backdrop-blur-md text-[11px] font-sans tracking-widest uppercase text-white/60 hover:text-white transition-all duration-300"
      >
        <span>Skip</span>
        <span className="text-[10px] text-amber-vibrant group-hover:translate-x-0.5 transition-transform">→</span>
      </button>

      {/* Poetic Bottom Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[10px] font-sans tracking-widest uppercase text-white/30 text-center pointer-events-none">
        Click anywhere to enter gallery
      </div>
    </div>
  );
};
