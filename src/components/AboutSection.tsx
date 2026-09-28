'use client';

import React from 'react';
import Image from 'next/image';
import { MARWA_BIOGRAPHY } from '@/data/portfolioData';
import { Butterfly } from './Butterfly';
import { Award, BookOpen, Layers, Palette } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Side: Real Artwork Showcase (Exhibition Installation) with 3D Tilt */}
        <div className="lg:col-span-5 relative">
          {/* Decorative Amber & Purple Offset Aura Frame */}
          <div className="absolute -inset-4 bg-linear-to-br from-amber-flame/20 via-purple-vivid/25 to-transparent rounded-2xl rotate-2 pointer-events-none" />

          {/* Exhibition Image Card with 3D Perspective */}
          <TiltCard3D maxTilt={6} glareOpacity={0.15}>
            <div className="relative rounded-xl overflow-hidden border border-(--border-subtle) shadow-3d-card bg-(--bg-surface) flex items-center justify-center preserve-3d">
              <Image
                src="/assets/printmaking-exhibition.jpg"
                alt="Installation view of Marwa El-Bahnsawy’s 2024 graduation printmaking exhibition"
                width={1411}
                height={2048}
                sizes="(max-width: 768px) 100vw, 450px"
                className="w-full h-auto object-contain"
              />
              {/* Glass caption banner */}
              <div
                style={{ transform: 'translateZ(25px)' }}
                className="absolute bottom-0 inset-x-0 p-5 bg-linear-to-t from-(--bg-canvas)/95 via-(--bg-canvas)/80 to-transparent text-(--text-primary)"
              >
                <span className="text-[10px] tracking-widest uppercase font-mono text-amber-vibrant">
                  Faculty of Fine Arts • 2024
                </span>
                <p className="font-serif text-lg leading-snug mt-1 text-(--text-primary)">
                  7-Meter Printmaking Graduation Installation
                </p>
                <p className="text-xs text-(--text-secondary) mt-0.5">
                  8 Plates: Four Intaglio &amp; Four Stone Lithographs
                </p>
              </div>
            </div>
          </TiltCard3D>

          {/* Decorative Corner Perched Butterfly */}
          <div className="absolute -bottom-6 -right-6 pointer-events-none z-20">
            <Butterfly
              variant="profile"
              state="resting"
              size={48}
              strokeColor="#D4BDE6"
              accentColor="#FF662B"
              fillOpacity={0.25}
              withSparkles={true}
            />
          </div>
        </div>

        {/* Right Side: Editorial Narrative & Verified Background */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-0.5 bg-amber-flame" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-vibrant">
              Personal Overview &amp; Philosophy
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-(--text-primary) font-medium leading-tight mb-3">
            Combining academic craft with a distinct, <span className="italic font-normal text-amber-vibrant">tactile</span> artistic voice.
          </h2>

          {/* Verified Biography Paragraphs */}
          <div className="space-y-3.5 text-base md:text-[17px] text-(--text-secondary) leading-relaxed font-sans mb-4 font-normal">
            {MARWA_BIOGRAPHY.biographyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Academic & Professional Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-(--border-subtle)">
            <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-subtle) shadow-sm">
              <div className="flex items-center gap-2.5 text-(--text-primary) font-medium text-sm mb-1.5">
                <BookOpen size={16} className="text-amber-vibrant" />
                <span>Academic Training</span>
              </div>
              <p className="text-xs text-(--text-secondary) leading-normal">
                Faculty of Fine Arts, Graphic Department — Printed Design Division, Class of 2024.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-subtle) shadow-sm">
              <div className="flex items-center gap-2.5 text-(--text-primary) font-medium text-sm mb-1.5">
                <Layers size={16} className="text-amber-vibrant" />
                <span>Printmaking Mastery</span>
              </div>
              <p className="text-xs text-(--text-secondary) leading-normal">
                Specialized in deep copper intaglio etching, aquatint, drypoint, and Bavarian stone lithography.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-subtle) shadow-sm">
              <div className="flex items-center gap-2.5 text-(--text-primary) font-medium text-sm mb-1.5">
                <Palette size={16} className="text-amber-vibrant" />
                <span>Brand Systems &amp; Ads</span>
              </div>
              <p className="text-xs text-(--text-secondary) leading-normal">
                Visual identity design for regional studios, automotive centers, luxury campaigns, and retail.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-subtle) shadow-sm">
              <div className="flex items-center gap-2.5 text-(--text-primary) font-medium text-sm mb-1.5">
                <Award size={16} className="text-amber-vibrant" />
                <span>Artistic Perspective</span>
              </div>
              <p className="text-xs text-(--text-secondary) leading-normal">
                Merging organic biological metamorphosis with rigorous typography and negative space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
