'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Project, PROJECTS, getAssetMetrics } from '@/data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Butterfly } from './Butterfly';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

import { TiltCard3D } from './TiltCard3D';

export const ExhibitionWallSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPlate, setSelectedPlate] = useState<Project | null>(null);
  const [hoveredPlateId, setHoveredPlateId] = useState<string | null>(null);

  // Filter the 8 graduation plates + exhibition view
  const graduationPlates = PROJECTS.filter((p) => p.categorySlug === 'graduation');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 md:py-12 bg-[var(--color-surface-elevated)] border-y border-[var(--border-subtle)] relative overflow-hidden transition-colors duration-300">
      {/* Delicate background ambient butterflies */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-40">
        <Butterfly variant="profile" state="resting" size={38} strokeColor="#D4BDE6" accentColor="#FF662B" />
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-40">
        <Butterfly variant="flutter" state="hovering" size={42} strokeColor="#FF7D3C" accentColor="#D4BDE6" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#FF662B]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7D3C]">
                Virtual Exhibition Walkthrough
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] font-medium">
              The 7-Meter <span className="italic font-normal text-[#FF7D3C]">Graduation</span> Wall
            </h2>
            <p className="mt-3 font-sans text-base text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal">
              Experience the 8 original printmaking plates installed in museum sequence—from deep copper 
              intaglio chrysalis forms to airy Bavarian stone lithograph dispersions.
            </p>
          </div>

          {/* Horizontal Scroll Arrows */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-[var(--border-subtle)] hover:border-[#FF662B] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors shadow-sm"
              aria-label="Scroll left in gallery"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[var(--border-subtle)] hover:border-[#FF662B] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors shadow-sm"
              aria-label="Scroll right in gallery"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Panoramic Wall Scroll Runway with 3D Museum Mats */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto px-6 md:px-12 pb-3 scrollbar-none snap-x snap-mandatory focus:outline-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {graduationPlates.map((plate, index) => {
          const isHovered = hoveredPlateId === plate.id;
          const imgMetrics = getAssetMetrics(plate.coverImage);

          return (
            <div
              key={plate.id}
              className="flex-shrink-0 snap-center group relative cursor-pointer"
              style={{ width: plate.aspectRatio < 0.8 ? '320px' : plate.aspectRatio > 1.8 ? '540px' : '420px' }}
              onClick={() => setSelectedPlate(plate)}
              onMouseEnter={() => setHoveredPlateId(plate.id)}
              onMouseLeave={() => setHoveredPlateId(null)}
            >
              {/* 3D Museum Frame with Dynamic Tilt */}
              <TiltCard3D maxTilt={6} glareOpacity={0.16} scale={1.02}>
                <div className="relative p-4 md:p-6 bg-[var(--bg-surface)] rounded-2xl shadow-3d-card border border-[var(--border-subtle)] group-hover:border-[#FF662B]/80 transition-all duration-300 preserve-3d">
                  {/* Artwork Canvas */}
                  <div className="relative w-full rounded-lg overflow-hidden bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-center justify-center">
                    <Image
                      src={plate.coverImage}
                      alt={plate.title}
                      width={imgMetrics.width}
                      height={imgMetrics.height}
                      sizes="(max-width: 768px) 80vw, 450px"
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Spot Lighting Vignette Effect */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/25 pointer-events-none" />

                    {/* 3D Floating perched butterfly that lifts up on hover */}
                    <div
                      style={{ transform: 'translateZ(30px)' }}
                      className={`absolute -top-3 -right-3 pointer-events-none transition-all duration-500 z-20 ${
                        isHovered ? 'scale-125 opacity-100 -translate-y-2' : 'scale-90 opacity-70'
                      }`}
                    >
                      <Butterfly
                        variant={index % 2 === 0 ? 'profile' : 'angled'}
                        state={isHovered ? 'flying' : 'resting'}
                        size={32}
                        strokeColor="#D4BDE6"
                        accentColor="#FF662B"
                      />
                    </div>
                  </div>

                  {/* Museum Gallery Wall Label (Plaque) */}
                  <div style={{ transform: 'translateZ(15px)' }} className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-col">
                    <div className="flex items-center justify-between text-[11px] text-[#FF7D3C] font-mono">
                      <span>PLATE {index === 0 ? 'OVERVIEW' : `${index}/8`}</span>
                      <span>2024</span>
                    </div>
                    <h3 className="font-serif text-base text-[var(--text-primary)] font-normal leading-snug mt-1 group-hover:text-[#FF7D3C] transition-colors">
                      {plate.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)]/80 mt-1 font-sans truncate">
                      {plate.techniqueOrRole}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          );
        })}
      </div>

      {/* Modal for inspect */}
      <ProjectDetailModal
        project={selectedPlate}
        onClose={() => setSelectedPlate(null)}
      />
    </section>
  );
};
