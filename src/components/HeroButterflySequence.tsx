'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Butterfly, ButterflyState } from './Butterfly';
import { useMotion } from '@/context/MotionContext';
import { RotateCcw } from 'lucide-react';

interface HeroButterflySequenceProps {
  portraitContainerRef: React.RefObject<HTMLDivElement | null>;
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
}

export const HeroButterflySequence: React.FC<HeroButterflySequenceProps> = ({
  portraitContainerRef,
  headlineRef,
}) => {
  const { isPaused, prefersReducedMotion } = useMotion();
  const flightButterflyRef = useRef<HTMLDivElement>(null);
  const [butterflyState, setButterflyState] = useState<ButterflyState>('resting');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPerched, setIsPerched] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const runEmergenceSequence = useCallback(() => {
    if (prefersReducedMotion || isPaused) {
      setButterflyState('static');
      return;
    }

    const flightEl = flightButterflyRef.current;
    const portraitEl = portraitContainerRef.current;
    const headlineEl = headlineRef.current;
    if (!flightEl || !portraitEl) return;

    setIsPlaying(true);
    setIsPerched(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Measure exact responsive bounds
    const portraitRect = portraitEl.getBoundingClientRect();
    const heroSection = portraitEl.closest('section');
    const heroRect = heroSection?.getBoundingClientRect() || portraitRect;

    // Artwork edge within Marwa's photo (top-left artwork on exhibition wall):
    // ~28% from left of photo, ~17% from top of photo
    const originX = portraitRect.left - heroRect.left + portraitRect.width * 0.28;
    const originY = portraitRect.top - heroRect.top + portraitRect.height * 0.17;

    // Target beside the headline word accent
    let targetX = heroRect.width * 0.22;
    let targetY = heroRect.height * 0.36;

    if (headlineEl) {
      const headRect = headlineEl.getBoundingClientRect();
      targetX = headRect.right - heroRect.left - 50;
      targetY = headRect.top - heroRect.top + 8;
    }

    // Midpoints for natural curved flight path
    const midX1 = originX - (originX - targetX) * 0.35;
    const midY1 = originY - 60;
    const midX2 = originX - (originX - targetX) * 0.75;
    const midY2 = Math.min(originY, targetY) - 100;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsPlaying(false);
        setHasPlayed(true);

        // Convert target position to viewport coordinates for cursor companion handoff
        const flightRect = flightEl.getBoundingClientRect();
        const handoffX = flightRect.left;
        const handoffY = flightRect.top;

        // Dispatch smooth handoff event to CursorButterfly
        window.dispatchEvent(
          new CustomEvent('marwa:hero-butterfly-handoff', {
            detail: { x: handoffX, y: handoffY },
          })
        );

        // Gracefully fade the hero flight layer as cursor companion takes flight
        gsap.to(flightEl, {
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
        });
      },
    });

    timelineRef.current = tl;

    // Initial state: Resting on artwork edge within the photograph
    setButterflyState('resting');
    gsap.set(flightEl, {
      x: originX,
      y: originY,
      scale: 0.65,
      rotation: -10,
      opacity: 0,
    });

    // Step 1: Butterfly appears resting quietly inside artwork edge
    tl.to(flightEl, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
      // Step 2: Wings slowly wake up (gentle wing flutter)
      .add(() => {
        setButterflyState('hovering');
      }, '+=0.25')
      .to(flightEl, {
        scale: 0.8,
        y: originY - 12,
        rotation: -4,
        duration: 0.55,
        ease: 'power1.out',
      })
      // Step 3: Lifts out of the photograph and crosses the boundary seamlessly
      .add(() => {
        setIsPerched(false);
        setButterflyState('flying');
      })
      .to(
        flightEl,
        {
          keyframes: [
            // Crossing boundary into main page
            {
              x: midX1,
              y: midY1,
              scale: 1.15,
              rotation: -22,
              duration: 0.75,
              ease: 'power1.inOut',
              onUpdate: () => {
                // Emit fine trail behind butterfly flight
                const rect = flightEl.getBoundingClientRect();
                window.dispatchEvent(
                  new CustomEvent('marwa:trail-point', {
                    detail: { x: rect.left + 18, y: rect.top + 18 },
                  })
                );
              },
            },
            // High curve over the hero layout
            {
              x: midX2,
              y: midY2,
              scale: 1.1,
              rotation: 14,
              duration: 0.85,
              ease: 'power1.inOut',
              onUpdate: () => {
                const rect = flightEl.getBoundingClientRect();
                window.dispatchEvent(
                  new CustomEvent('marwa:trail-point', {
                    detail: { x: rect.left + 18, y: rect.top + 18 },
                  })
                );
              },
            },
            // Gliding toward the key headline word
            {
              x: targetX,
              y: targetY,
              scale: 0.95,
              rotation: -6,
              duration: 0.8,
              ease: 'power2.out',
              onUpdate: () => {
                const rect = flightEl.getBoundingClientRect();
                window.dispatchEvent(
                  new CustomEvent('marwa:trail-point', {
                    detail: { x: rect.left + 18, y: rect.top + 18 },
                  })
                );
              },
            },
          ],
        },
        '+=0.05'
      )
      // Step 4: As it passes the hero heading, reveal the hand-drawn accent beneath the key word
      .add(() => {
        const accentSvg = document.getElementById('hero-hand-drawn-accent');
        const accentPath = accentSvg?.querySelector<SVGPathElement>('.accent-path');
        if (accentSvg && accentPath) {
          accentSvg.style.opacity = '1';
          gsap.to(accentPath, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      }, '-=0.45')
      // Step 5: Connected response: ~160ms later, nearby perched butterfly responds with gentle wing flutter
      .add(() => {
        const perchedButterfly = document.getElementById('hero-perched-butterfly');
        if (perchedButterfly) {
          setTimeout(() => {
            perchedButterfly.dispatchEvent(
              new CustomEvent('marwa:butterfly-react', {
                detail: { delay: 0 },
              })
            );
          }, 160); // approximately 120-220ms connected response
        }
        setButterflyState('hovering');
      }, '-=0.25')
      // Step 6: Gentle settling hover before handoff
      .to(flightEl, {
        y: targetY + 5,
        duration: 0.6,
        repeat: 1,
        yoyo: true,
        ease: 'sine.inOut',
      });
  }, [isPaused, prefersReducedMotion, portraitContainerRef, headlineRef]);

  useEffect(() => {
    // Check if played this session to avoid interrupting repeated navigation
    const timer = setTimeout(() => {
      runEmergenceSequence();
    }, 450);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [runEmergenceSequence]);

  return (
    <>
      {/* Flight Layer (Unclipped, seamless traversal across page coordinates) */}
      <div
        ref={flightButterflyRef}
        className="absolute top-0 left-0 pointer-events-none z-35 will-change-transform"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="relative">
          <Butterfly
            variant="profile"
            state={butterflyState}
            size={52}
            strokeColor="#D4BDE6"
            accentColor="#FF662B"
            fillOpacity={0.24}
            withSparkles={true}
            registerAsTarget={false}
          />
        </div>
      </div>

      {/* Replay Flight Button (Delicate and accessible) */}
      <button
        onClick={runEmergenceSequence}
        disabled={isPlaying}
        aria-label="Replay The Butterfly Effect emergence flight"
        title="Replay The Butterfly Effect emergence flight"
        className="group absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-sans font-medium text-[var(--text-primary)] shadow-sm hover:border-[#FF662B] hover:text-[#FF7D3C] transition-all duration-300 disabled:opacity-40"
      >
        <RotateCcw
          size={12}
          className={`transition-transform duration-500 text-[#FF7D3C] ${
            isPlaying ? 'animate-spin' : 'group-hover:-rotate-90'
          }`}
        />
        <span>{isPlaying ? 'Emerging...' : 'Replay Flight'}</span>
      </button>
    </>
  );
};
