'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroButterflySequence } from './HeroButterflySequence';
import { Butterfly } from './Butterfly';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

import { TiltCard3D } from './TiltCard3D';

export const Hero: React.FC = () => {
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  return (
    <section className="relative pt-28 pb-8 md:pt-36 md:pb-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between overflow-visible">
      {/* Background ambient accents in fluid art purple and fiery amber */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#FF662B]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[480px] h-[480px] bg-[#7928CA]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Signature Butterfly Emergence Sequence */}
      <HeroButterflySequence
        portraitContainerRef={portraitContainerRef}
        headlineRef={headlineRef}
      />

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & Narrative (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col z-10 order-2 lg:order-1">
          {/* Subtle introduction eyebrow */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-[2px] bg-[#FF662B]" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#FF7D3C]">
              Marwa El-Bahnsawy — Graphic Designer & Artist
            </span>
          </div>

          {/* Expressive Editorial Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] mb-3.5"
          >
            A little imagination.
            <br />
            A different{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7D3C] via-[#FFA05E] to-[#FF5722] relative inline-block">
              perspective.
              {/* Hand-drawn SVG Accent Underline revealed as butterfly passes */}
              <svg
                id="hero-hand-drawn-accent"
                className="absolute -bottom-2.5 left-0 w-full h-[8px] text-[#FF662B] pointer-events-none opacity-0 transition-opacity duration-300"
                viewBox="0 0 260 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8 C50 3, 150 11, 257 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="260"
                  strokeDashoffset="260"
                  className="accent-path"
                />
              </svg>
              {/* Connected decorative accent butterfly perched on typography */}
              <span className="absolute -top-7 -right-9 hidden md:inline-block pointer-events-none">
                <Butterfly
                  id="hero-perched-butterfly"
                  variant="flutter"
                  state="resting"
                  size={34}
                  strokeColor="#D4BDE6"
                  accentColor="#FF662B"
                  registerAsTarget={true}
                />
              </span>
            </span>
          </h1>

          {/* Editorial Subheadline & Verified Background */}
          <p className="font-sans text-base md:text-[17px] text-[var(--text-secondary)] max-w-xl leading-relaxed mb-5 font-normal">
            Where classical fine-art printmaking craft meets contemporary brand direction. 
            A 2024 graduate of the Faculty of Fine Arts (Printed Design Division), translating 
            tactile paper etchings into vibrant digital identities.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="#work"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF662B] to-[#D9481A] text-white font-sans text-sm font-medium tracking-wide shadow-[0_8px_24px_rgba(255,102,43,0.35)] hover:shadow-[0_12px_32px_rgba(255,102,43,0.5)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7D3C]"
            >
              <span>Explore My Work</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] font-sans text-sm font-medium tracking-wide hover:border-[#FF662B] hover:bg-[var(--color-surface-hover)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7D3C]"
            >
              <span>Let’s Create Together</span>
            </Link>
          </div>

          {/* Metadata badges: Fine Arts Printmaking & Digital Identity */}
          <div className="mt-5 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-6 sm:gap-8 text-xs text-[var(--text-muted)]">
            <div>
              <p className="font-semibold text-[#FF7D3C] uppercase tracking-wider text-[11px]">Academic Root</p>
              <p className="font-sans text-[var(--text-secondary)]">Faculty of Fine Arts, 2024</p>
            </div>
            <div>
              <p className="font-semibold text-[#FF7D3C] uppercase tracking-wider text-[11px]">Core Craft</p>
              <p className="font-sans text-[var(--text-secondary)]">Printed Design, Intaglio & Brand Identity</p>
            </div>
            <div>
              <p className="font-semibold text-[#FF7D3C] uppercase tracking-wider text-[11px]">Location</p>
              <p className="font-sans text-[var(--text-secondary)]">Egypt • Available Globally</p>
            </div>
          </div>
        </div>

        {/* Right Column: Real Main Portrait Photo with 3D Tilt & Light Flare (5 cols on desktop) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-[380px] sm:max-w-[420px]"
          >
            {/* Soft decorative background frame with amber & purple aura */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-[#FF662B]/30 via-[#7928CA]/30 to-transparent rounded-2xl -rotate-1 pointer-events-none transition-transform duration-700 hover:rotate-0" />

            {/* 3D Interactive Tilt Card for Main Portrait */}
            <TiltCard3D
              maxTilt={8}
              glareOpacity={0.22}
              scale={1.02}
              className="relative w-full rounded-2xl overflow-hidden shadow-3d-card border border-[var(--border-subtle)] bg-[var(--bg-surface)] group"
            >
              <Image
                src="/assets/marwa_portrait.jpg"
                alt="Marwa El-Bahnsawy — Graphic Designer & Artist in burgundy hijab with warm studio lighting"
                width={950}
                height={1024}
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Delicate paper sheen gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)]/70 via-transparent to-transparent pointer-events-none" />

              {/* 3D Floating Caption pill */}
              <div
                style={{ transform: 'translateZ(25px)' }}
                className="absolute bottom-4 left-4 z-20 bg-[var(--bg-surface)]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] shadow-md flex items-center gap-2 transition-transform duration-300 group-hover:scale-105"
              >
                <Sparkles size={12} className="text-[#FF7D3C]" />
                <span className="text-[11px] font-sans font-medium text-[var(--text-primary)]">
                  Marwa El-Bahnsawy • Studio Portrait
                </span>
              </div>
            </TiltCard3D>

            {/* Rotating Circular Editorial Seal Badge */}
            <div className="absolute -top-10 -left-10 z-20 hidden sm:flex items-center justify-center w-28 h-28 pointer-events-none">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 120 120">
                <path
                  id="circlePathHero"
                  d="M 60, 60 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                  fill="none"
                />
                <text className="text-[9.5px] uppercase tracking-[0.24em] fill-[#FF7D3C] font-mono font-medium">
                  <textPath href="#circlePathHero">
                    IDEAS TAKE FLIGHT • FINE ARTS 2024 • PRINTED DESIGN •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Butterfly
                  variant="angled"
                  state="hovering"
                  size={32}
                  strokeColor="#D4BDE6"
                  accentColor="#FF662B"
                  fillOpacity={0.25}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Invitation */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#9E85B5] pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF662B] animate-pulse" />
          <span className="tracking-widest uppercase font-medium text-[10px]">
            Scroll to explore collection
          </span>
        </div>
        <Link
          href="#work"
          aria-label="Scroll down to Selected Work"
          className="flex items-center gap-2 text-[#FF7D3C] hover:text-[#FFA05E] transition-colors p-2"
        >
          <span className="hidden sm:inline text-xs font-medium">Selected Works</span>
          <ArrowDown size={14} className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
};
