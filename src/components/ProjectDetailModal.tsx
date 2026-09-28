'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Project, getAssetMetrics } from '@/data/portfolioData';
import { Butterfly } from './Butterfly';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [project]);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus modal
    modalRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onNext, onPrev]);

  if (!project) return null;

  const currentImg = project.galleryImages[activeImageIndex] || project.coverImage;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#06030A]/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-(--bg-surface) text-(--text-primary) rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.65)] border border-(--border-subtle) overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-(--bg-canvas) text-(--text-primary) hover:bg-amber-flame hover:text-white transition-all border border-(--border-subtle) shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame"
        >
          <X size={18} />
        </button>

        {/* Left Side: Artwork Media Viewer */}
        <div className="relative w-full md:w-3/5 bg-(--bg-canvas) flex flex-col justify-center items-center p-6 md:p-10 min-h-87.5 md:min-h-140">
          {/* Main Visual */}
          {(() => {
            const currentDims = getAssetMetrics(currentImg);
            return (
              <div
                className={`relative w-full h-80 md:h-120 flex items-center justify-center transition-all duration-300 ${
                  isZoomed ? 'cursor-zoom-out scale-105' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
              >
                <Image
                  src={currentImg}
                  alt={project.title}
                  width={currentDims.width}
                  height={currentDims.height}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="max-h-[70vh] w-auto h-auto max-w-full object-contain mx-auto"
                  priority
                />
              </div>
            );
          })()}

          {/* Image enlargement button */}
          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? 'Reset zoom' : 'Enlarge image'}
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--bg-surface)/90 backdrop-blur-md text-xs text-amber-vibrant border border-(--border-subtle) shadow-sm hover:bg-amber-flame hover:text-white transition-colors"
          >
            {isZoomed ? (
              <>
                <Minimize2 size={12} />
                <span>Reset view</span>
              </>
            ) : (
              <>
                <Maximize2 size={12} />
                <span>Enlarge</span>
              </>
            )}
          </button>

          {/* Multi-image thumbnail strip (if gallery has > 1 images) */}
          {project.galleryImages.length > 1 && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 max-w-50 overflow-x-auto p-1 bg-(--bg-surface)/90 backdrop-blur-md rounded-full border border-(--border-subtle)">
              {project.galleryImages.map((img, idx) => {
                const thumbDims = getAssetMetrics(img);
                return (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform ${
                      activeImageIndex === idx
                        ? 'border-amber-flame scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <div className="relative w-full h-full">
                      <Image src={img} alt="" width={thumbDims.width} height={thumbDims.height} className="w-full h-full object-cover" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Arrows for Multiple Images */}
          {project.galleryImages.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.galleryImages.length - 1));
                }}
                className="pointer-events-auto p-2 rounded-full bg-(--bg-surface)/85 hover:bg-amber-flame text-(--text-primary) hover:text-white transition-colors shadow-sm border border-(--border-subtle)"
                aria-label="Previous image in gallery"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev < project.galleryImages.length - 1 ? prev + 1 : 0));
                }}
                className="pointer-events-auto p-2 rounded-full bg-(--bg-surface)/85 hover:bg-amber-flame text-(--text-primary) hover:text-white transition-colors shadow-sm border border-(--border-subtle)"
                aria-label="Next image in gallery"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Editorial Curatorial Details */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-(--bg-surface)">
          <div>
            {/* Category & Year Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-vibrant bg-amber-flame/15 px-3 py-1 rounded-full border border-amber-flame/30">
                {project.category}
              </span>
              <span className="text-xs text-(--text-muted) font-mono">{project.year}</span>
            </div>

            {/* Project Title */}
            <h2
              id="modal-project-title"
              className="font-serif text-2xl md:text-3xl text-(--text-primary) font-medium leading-snug mb-4"
            >
              {project.title}
            </h2>

            {/* Curatorial Description */}
            <div className="space-y-3 text-base text-(--text-secondary) leading-relaxed mb-6 font-sans font-normal">
              <p>{project.longDescription || project.description}</p>
            </div>

            {/* Technique & Metadata Specs */}
            <div className="border-t border-(--border-subtle) pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-(--text-muted) font-medium">Technique / Role:</span>
                <span className="text-(--text-primary) font-medium text-right">{project.techniqueOrRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--text-muted) font-medium">Medium:</span>
                <span className="text-(--text-primary) font-medium text-right">{project.medium}</span>
              </div>
              {project.dimensions && (
                <div className="flex justify-between">
                  <span className="text-(--text-muted) font-medium">Dimensions:</span>
                  <span className="text-(--text-primary) font-medium text-right">{project.dimensions}</span>
                </div>
              )}
              {project.sourceFolder && (
                <div className="flex justify-between pt-1 text-[11px] text-(--text-muted)">
                  <span>Source Archive:</span>
                  <span>{project.sourceFolder}</span>
                </div>
              )}
            </div>

            {/* Primary Action Button: Verified Source Link */}
            <div className="mt-5 pt-4 border-t border-(--border-subtle)">
              <a
                href={project.workUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-xl bg-linear-to-r from-amber-flame to-amber-ember text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_6px_20px_rgba(255,102,43,0.3)] hover:shadow-[0_8px_24px_rgba(255,102,43,0.45)] hover:scale-[1.01] transition-all"
              >
                <span>{project.workUrlLabel}</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Bottom Footer Controls: Previous / Next Project */}
          <div className="pt-6 mt-6 border-t border-(--border-subtle) flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={!onPrev}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-(--text-primary) hover:bg-(--bg-canvas) hover:text-amber-vibrant disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
              <button
                onClick={onNext}
                disabled={!onNext}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-(--text-primary) hover:bg-(--bg-canvas) hover:text-amber-vibrant disabled:opacity-30 transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Delicate corner decorative butterfly */}
            <Butterfly
              variant="profile"
              state="resting"
              size={24}
              strokeColor="#D4BDE6"
              accentColor="#FF662B"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
