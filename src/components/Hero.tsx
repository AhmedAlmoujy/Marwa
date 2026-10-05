'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroButterflySequence } from './HeroButterflySequence';
import { Butterfly } from './Butterfly';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

export const Hero: React.FC = () => {
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between overflow-visible">
      {/* Background ambient accents in fluid art purple and fiery amber */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-flame/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-120 h-120 bg-purple-vivid/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Signature Butterfly Emergence Sequence (Moved to Graduation section as requested) */}
      {/* <HeroButterflySequence
        portraitContainerRef={portraitContainerRef}
        headlineRef={headlineRef}
      /> */}

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Typography & Narrative (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col z-10 order-2 lg:order-1">
          {/* Subtle introduction eyebrow */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-0.5 bg-amber-flame" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-amber-vibrant">
              Marwa El-Bahnsawy — Artist &amp; Graphic Designer
            </span>
          </div>

          {/* Expressive Editorial Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-tight text-(--text-primary) mb-4"
          >
            A little imagination.
            <br />
            A new world of{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-linear-to-r from-amber-vibrant via-amber-glow to-[#FF5722] relative inline-block">
              transformation.
              {/* Hand-drawn SVG Accent Underline revealed as butterfly passes */}
              <svg
                id="hero-hand-drawn-accent"
                className="absolute -bottom-2.5 left-0 w-full h-2.5 text-amber-flame pointer-events-none opacity-0 transition-opacity duration-300"
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
              {/* Connected decorative accent butterfly perched lower over letter n to its right */}
              <span className="absolute -top-2 sm:-top-3 md:-top-3.5 -right-3 sm:-right-4 hidden md:inline-block pointer-events-none transform -rotate-12 -scale-x-100">
                <Butterfly
                  id="hero-perched-butterfly"
                  variant="profile"
                  state="resting"
                  size={26}
                  strokeColor="#D4BDE6"
                  accentColor="#FF662B"
                  registerAsTarget={true}
                />
              </span>
            </span>
          </h1>

          {/* Editorial Subheadline & Verified Background with Read More expansion */}
          <div className="font-sans text-base md:text-[16.5px] text-(--text-secondary) max-w-xl leading-relaxed mb-2 font-normal space-y-3">
            <p>
              My name is Marwa El-Bahnsawy, and I am a graduate of the Faculty of Fine Arts, Graphic Department – Printed Design Division, Class of 2024.
            </p>
            <p>
              I’m an artist with a passion for graphic design, driven by the desire to create visually captivating and meaningful work. My artistic background shapes the way I approach design — through exploration, experimentation, and attention to the details that give a visual idea its depth.
            </p>

            {/* Expandable part about the butterfly */}
            {isReadMoreOpen && (
              <div className="mt-4 pt-3.5 border-t border-dashed border-amber-flame/30 text-sm md:text-[15px] text-(--text-secondary) space-y-3 animate-fadeIn">
                <h4 className="font-serif italic font-semibold text-amber-vibrant text-base sm:text-lg tracking-wide uppercase">
                  THE BUTTERFLY
                </h4>
                <p>
                  The butterfly has always been a personal symbol in my artistic journey. It was at the heart of my graduation project, and over time, it came to represent something beyond the subject itself: transformation.
                </p>
                <p>
                  Much like a butterfly emerging from its cocoon, a creative idea goes through its own transformation — from a first thought, through exploration and experimentation, until it takes its final visual form.
                </p>
                <p>
                  For me, the creative process is not only about the final design, but about everything that happens along the way: discovering an idea, exploring possibilities, and transforming it into a visual expression with its own character.
                </p>
                <p>
                  This connection between art and design, exploration and transformation continues to shape my creative perspective and the way I approach every project.
                </p>
              </div>
            )}

            <button
              onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
              className="inline-flex items-center gap-1.5 mt-2 text-xs md:text-sm font-medium text-amber-vibrant hover:text-amber-glow transition-colors focus:outline-none group cursor-pointer hover:underline underline-offset-4"
            >
              <span>{isReadMoreOpen ? '( read less )' : '( read more -> )'}</span>
            </button>
          </div>

          {/* Line separator before CTAs (as requested in sketch) */}
          <div className="w-full border-t border-(--border-subtle) my-5" />

          {/* Interactive CTAs placed underneath the line */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="#work"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-linear-to-r from-amber-flame to-amber-ember text-white font-sans text-sm font-medium tracking-wide shadow-[0_8px_24px_rgba(255,102,43,0.35)] hover:shadow-[0_12px_32px_rgba(255,102,43,0.5)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-vibrant"
            >
              <span>Explore My Work</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-(--border-subtle) text-(--text-primary) font-sans text-sm font-medium tracking-wide hover:border-amber-flame hover:bg-surface-hover hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-vibrant"
            >
              <span>Let’s Create Together</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Real Main Portrait Photo with 3D Tilt & Light Flare (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-95 sm:max-w-105"
          >
            {/* Soft decorative background frame with amber & purple aura */}
            <div className="absolute -inset-4 sm:-inset-5 bg-linear-to-tr from-amber-flame/35 via-purple-vivid/30 to-amber-flame/20 rounded-3xl border border-purple-vivid/30 -rotate-1 pointer-events-none transition-transform duration-700 hover:rotate-0" />

            {/* 3D Interactive Tilt Card for Main Portrait */}
            <TiltCard3D
              maxTilt={8}
              glareOpacity={0.22}
              scale={1.02}
              className="relative w-full rounded-2xl overflow-hidden shadow-3d-card border border-(--border-subtle) bg-(--bg-surface) group"
            >
              <Image
                src="/assets/marwa_portrait.jpg"
                alt="Marwa El-Bahnsawy — Artist & Graphic Designer in burgundy hijab with warm studio lighting"
                width={950}
                height={1024}
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Delicate paper sheen gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-(--bg-canvas)/70 via-transparent to-transparent pointer-events-none" />

              {/* 3D Floating Caption pill */}
              <div
                style={{ transform: 'translateZ(25px)' }}
                className="absolute bottom-4 left-4 z-20 bg-(--bg-surface)/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-(--border-subtle) shadow-md flex items-center gap-2 transition-transform duration-300 group-hover:scale-105"
              >
                <Sparkles size={12} className="text-amber-vibrant" />
                <span className="text-[11px] font-sans font-medium text-(--text-primary)">
                  Marwa El-Bahnsawy • Studio Portrait
                </span>
              </div>
            </TiltCard3D>

            {/* Top-left perching Butterfly resting on the outer background frame outside the photo */}
            <div className="absolute -top-11 sm:-top-13 -left-11 sm:-left-13 z-20 flex items-center justify-center w-24 h-24 sm:w-26 sm:h-26 pointer-events-none">
              <svg className="w-full h-full animate-spin-slow opacity-85" viewBox="0 0 140 140">
                <path
                  id="circlePathHero"
                  d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                  fill="none"
                />
                <text className="text-[9px] uppercase tracking-[0.22em] fill-amber-vibrant font-mono font-medium">
                  <textPath href="#circlePathHero">
                    IDEAS TAKE FLIGHT • FINE ARTS 2024 • PRINTED DESIGN •
                  </textPath>
                </text>
              </svg>
              {/* Butterfly positioned on the background frame facing towards text */}
              <div className="absolute inset-0 flex items-center justify-center transform -scale-x-100">
                <Butterfly
                  variant="angled"
                  state="hovering"
                  size={30}
                  strokeColor="#D4BDE6"
                  accentColor="#FF662B"
                  fillOpacity={0.28}
                />
              </div>
            </div>

            {/* Metadata badges placed underneath portrait photo in subtle small text (as requested in sketch) */}
            <div className="mt-4 pt-3 flex flex-wrap justify-between items-center text-[11px] text-(--text-muted) border-t border-(--border-subtle)/60 px-1 gap-2 w-full">
              <div>
                <span className="font-semibold text-amber-vibrant uppercase tracking-wider text-[10px]">Academic Root: </span>
                <span className="text-(--text-secondary)">Faculty of Fine Arts, 2024</span>
              </div>
              <div>
                <span className="font-semibold text-amber-vibrant uppercase tracking-wider text-[10px]">Core Craft: </span>
                <span className="text-(--text-secondary)">Printed Design &amp; Brand Identity</span>
              </div>
              <div>
                <span className="font-semibold text-amber-vibrant uppercase tracking-wider text-[10px]">Location: </span>
                <span className="text-(--text-secondary)">Egypt • Available Globally</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
