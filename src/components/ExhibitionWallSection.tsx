'use client';

import React, { useRef, useState, useMemo } from 'react';
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

  // Filter the 8 authentic graduation plates and number them 1 to 8 starting from the left
  const graduationPlates = useMemo(() => {
    const plates = PROJECTS.filter((p) => p.categorySlug === 'graduation' && p.id !== 'grad-exhibition');
    const currentOrder = [...plates].reverse();
    return currentOrder.map((plate, index) => {
      const rawTitle = plate.title.replace(/^Plate \d\/\d:\s*/, '');
      return {
        ...plate,
        title: `Plate ${index + 1}/8: ${rawTitle}`,
      };
    });
  }, []);

  const handleNextPlate = () => {
    if (!selectedPlate) return;
    const currentIndex = graduationPlates.findIndex((p) => p.id === selectedPlate.id);
    const nextIndex = (currentIndex + 1) % graduationPlates.length;
    setSelectedPlate(graduationPlates[nextIndex]);
  };

  const handlePrevPlate = () => {
    if (!selectedPlate) return;
    const currentIndex = graduationPlates.findIndex((p) => p.id === selectedPlate.id);
    const prevIndex = (currentIndex - 1 + graduationPlates.length) % graduationPlates.length;
    setSelectedPlate(graduationPlates[prevIndex]);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="graduation-wall" className="py-8 md:py-12 bg-surface-elevated border-y border-(--border-subtle) relative overflow-hidden transition-colors duration-300 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-amber-flame" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-vibrant">
                Virtual Exhibition Walkthrough
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-(--text-primary) font-medium">
              The 7-Meter <span className="italic font-normal text-amber-vibrant">Graduation</span> Wall
            </h2>
            <p className="mt-3 font-sans text-base text-(--text-secondary) max-w-xl leading-relaxed font-normal">
              Experience the 8 original printmaking plates installed in museum sequence—from deep copper 
              intaglio chrysalis forms to airy Bavarian stone lithograph dispersions.
            </p>
          </div>

          {/* Horizontal Scroll Arrows */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-(--border-subtle) hover:border-amber-flame bg-(--bg-surface) text-(--text-primary) transition-colors shadow-sm"
              aria-label="Scroll left in gallery"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-(--border-subtle) hover:border-amber-flame bg-(--bg-surface) text-(--text-primary) transition-colors shadow-sm"
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
          const plateLabel = `PLATE ${index + 1}/8`;

          return (
            <div
              key={plate.id}
              className="shrink-0 snap-center group relative cursor-pointer"
              style={{ width: plate.aspectRatio < 0.8 ? '320px' : plate.aspectRatio > 1.8 ? '540px' : '420px' }}
              onClick={() => setSelectedPlate(plate)}
              onMouseEnter={() => setHoveredPlateId(plate.id)}
              onMouseLeave={() => setHoveredPlateId(null)}
            >
              {/* 3D Museum Frame with Dynamic Tilt */}
              <TiltCard3D maxTilt={6} glareOpacity={0.16} scale={1.02}>
                <div className="relative p-4 md:p-6 bg-(--bg-surface) rounded-2xl shadow-3d-card border border-(--border-subtle) group-hover:border-amber-flame/80 transition-all duration-300 preserve-3d">
                  {/* Artwork Canvas */}
                  <div className="relative w-full rounded-lg overflow-hidden bg-(--bg-canvas) border border-(--border-subtle) flex items-center justify-center">
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
                  </div>

                  {/* Museum Gallery Wall Label (Plaque) */}
                  <div style={{ transform: 'translateZ(15px)' }} className="mt-4 pt-3 border-t border-(--border-subtle) flex flex-col">
                    <div className="flex items-center justify-between text-[11px] text-amber-vibrant font-mono font-medium">
                      <span>{plateLabel}</span>
                      <span>2024</span>
                    </div>
                    <h3 className="font-serif text-base text-(--text-primary) font-normal leading-snug mt-1 group-hover:text-amber-vibrant transition-colors">
                      {plate.title}
                    </h3>
                    <p className="text-[11px] text-(--text-secondary)/80 mt-1 font-sans truncate">
                      {plate.techniqueOrRole}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          );
        })}
      </div>

      {/* Subtle Bottom Flipped Butterfly and Transformation Quote */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6 pt-4 border-t border-(--border-subtle)/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs md:text-sm text-(--text-secondary) leading-relaxed max-w-2xl italic">
          &ldquo;Every idea goes through its own transformation — from a first thought, through exploration, until it takes its final form. Let&apos;s discover what your idea can become.&rdquo;
        </p>

        {/* Flipped butterfly on the right facing left towards the quote */}
        <div className="shrink-0 flex items-center gap-2 transform -scale-x-100">
          <Butterfly
            variant="profile"
            state="hovering"
            size={32}
            strokeColor="#D4BDE6"
            accentColor="#FF662B"
            fillOpacity={0.25}
          />
        </div>
      </div>

      {/* Modal for inspect */}
      <ProjectDetailModal
        project={selectedPlate}
        onClose={() => setSelectedPlate(null)}
        onNext={handleNextPlate}
        onPrev={handlePrevPlate}
      />
    </section>
  );
};
