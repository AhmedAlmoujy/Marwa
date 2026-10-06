'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  Project,
  PROJECTS,
  PORTFOLIO_CATEGORIES,
  CURATED_PROJECT_IDS,
  getAssetMetrics,
} from '@/data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Butterfly } from './Butterfly';
import { TiltCard3D } from './TiltCard3D';
import {
  Eye,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Palette,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const WorkGallery: React.FC = () => {
  // Categorized state: default to compact Curated Highlights
  const [selectedCategory, setSelectedCategory] = useState<string>('curated');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Reset carousel to 0 whenever category changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedCategory]);

  // Active category metadata
  const activeCategory = useMemo(() => {
    return PORTFOLIO_CATEGORIES.find((c) => c.id === selectedCategory) || PORTFOLIO_CATEGORIES[0];
  }, [selectedCategory]);

  // Filtered projects based on the 6 dedicated categories
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'curated') {
      return PROJECTS.filter((p) => (CURATED_PROJECT_IDS as readonly string[]).includes(p.id));
    }
    if (selectedCategory === 'artworks') {
      return PROJECTS.filter((p) => p.categorySlug === 'artworks');
    }
    if (selectedCategory === 'digital-art') {
      return PROJECTS.filter((p) => p.categorySlug === 'digital-art');
    }
    if (selectedCategory === 'ads-haven') {
      return PROJECTS.filter((p) => p.id.startsWith('ads-haven'));
    }
    if (selectedCategory === 'ads-quadwaves') {
      return PROJECTS.filter((p) => p.id.startsWith('ads-quadwaves'));
    }
    if (selectedCategory === 'ads-commercial') {
      return PROJECTS.filter(
        (p) => p.categorySlug === 'ads' && !p.id.startsWith('ads-haven') && !p.id.startsWith('ads-quadwaves')
      );
    }
    return PROJECTS.filter((p) => p.categorySlug === selectedCategory);
  }, [selectedCategory]);

  // Carousel pagination calculations (displaying 3 items per view)
  const maxIndex = Math.max(0, filteredProjects.length - 3);
  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex < maxIndex;

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(carouselIndex, carouselIndex + 3);
  }, [filteredProjects, carouselIndex]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'curated':
        return <Sparkles size={14} className="shrink-0" />;
      case 'artworks':
        return <Palette size={14} className="shrink-0" />;
      case 'digital-art':
        return <Layers size={14} className="shrink-0" />;
      default:
        return <Sparkles size={14} className="shrink-0" />;
    }
  };

  return (
    <section id="work" className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 pb-3 border-b border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-0.5 bg-amber-flame" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-vibrant">
              Portfolio
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-(--text-primary) font-medium">
            Selected <span className="italic font-normal text-amber-vibrant">Work</span>
          </h2>
        </div>
      </div>

      {/* Primary Categorized Tabs Bar (6 Categories) */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3" role="tablist" aria-label="Portfolio category filter">
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat.id)}
              className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame ${
                isActive
                  ? 'bg-linear-to-r from-amber-flame to-amber-ember text-white shadow-[0_4px_16px_rgba(255,102,43,0.35)] scale-[1.02]'
                  : 'bg-(--bg-surface) border border-(--border-subtle) text-(--text-secondary) hover:border-amber-flame hover:text-(--text-primary)'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-amber-vibrant group-hover:scale-110 transition-transform'}>
                {getCategoryIcon(cat.id)}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-(--bg-canvas) text-(--text-muted) group-hover:text-(--text-primary)'
                }`}
              >
                {cat.count}
              </span>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-glow animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Categorized Editorial Context Banner with Sparkle ✨ and Slider Controls */}
      <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-(--bg-surface)/80 backdrop-blur-md border border-(--border-subtle) flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-(--text-secondary)">
          <span className="p-1.5 rounded-lg bg-(--bg-canvas) text-amber-vibrant shrink-0 flex items-center justify-center">
            <Sparkles size={14} className="text-amber-vibrant" />
          </span>
          <p className="leading-relaxed font-sans">{activeCategory.description}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-(--text-muted)">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-flame" />
            <span>
              {filteredProjects.length} Works Available
            </span>
          </div>

          {/* Slider Prev / Next Controls */}
          {filteredProjects.length > 3 && (
            <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-(--border-subtle)">
              <button
                onClick={handlePrevSlide}
                disabled={!canPrev}
                aria-label="Previous 3 works"
                className={`p-1.5 rounded-lg border transition-all duration-200 ${
                  canPrev
                    ? 'bg-(--bg-canvas) border-(--border-subtle) text-(--text-primary) hover:border-amber-flame hover:text-amber-vibrant cursor-pointer'
                    : 'bg-(--bg-canvas)/40 border-(--border-subtle)/40 text-(--text-muted)/40 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={15} />
              </button>
              <span className="font-mono text-[11px] text-(--text-secondary) px-1 min-w-[50px] text-center">
                {carouselIndex + 1}–{Math.min(carouselIndex + 3, filteredProjects.length)} / {filteredProjects.length}
              </span>
              <button
                onClick={handleNextSlide}
                disabled={!canNext}
                aria-label="Next 3 works"
                className={`p-1.5 rounded-lg border transition-all duration-200 ${
                  canNext
                    ? 'bg-(--bg-canvas) border-(--border-subtle) text-(--text-primary) hover:border-amber-flame hover:text-amber-vibrant cursor-pointer'
                    : 'bg-(--bg-canvas)/40 border-(--border-subtle)/40 text-(--text-muted)/40 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3-Item Carousel Gallery Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {visibleProjects.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between h-full"
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onFocus={() => setHoveredProjectId(project.id)}
                onBlur={() => setHoveredProjectId(null)}
                tabIndex={0}
                aria-label={`View project: ${project.title}`}
              >
                {/* 3D Interactive Tilt Card */}
                <TiltCard3D
                  maxTilt={5}
                  glareOpacity={0.16}
                  scale={1.02}
                  className="h-full focus:outline-none"
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className={`relative cursor-pointer rounded-2xl overflow-hidden bg-(--bg-surface) border transition-all duration-500 shadow-3d-card h-full flex flex-col justify-between preserve-3d ${
                      isHovered
                        ? 'border-amber-flame/80 shadow-[0_16px_40px_rgba(255,102,43,0.14)]'
                        : 'border-(--border-subtle)'
                    }`}
                  >
                    {/* Hand-Drawn Frame Accent Trace */}
                    <svg
                      className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-30 overflow-visible text-amber-flame"
                      viewBox="0 0 64 64"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M64 48 L64 16 C64 7, 57 0, 48 0 L16 0"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 96,
                          strokeDashoffset: isHovered ? 0 : 96,
                          transition: isHovered
                            ? 'stroke-dashoffset 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.12s'
                            : 'stroke-dashoffset 0.35s ease-out',
                        }}
                      />
                    </svg>

                    {/* Artwork Image Container - Uniform Height */}
                    <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-(--bg-canvas) flex items-center justify-center p-3">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-contain transition-transform duration-700 ease-out p-1.5 ${
                          isHovered ? 'scale-[1.03]' : 'scale-100'
                        }`}
                      />

                      {/* Vignette Overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t from-(--bg-canvas)/80 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      {/* 3D Floating Direct Work Link Badge */}
                      <a
                        href={project.workUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ transform: 'translateZ(30px)' }}
                        className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-(--bg-surface)/90 backdrop-blur-md text-[11px] font-medium text-(--text-primary) hover:text-amber-vibrant border border-(--border-subtle) hover:border-amber-flame shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame"
                        title={project.workUrlLabel}
                      >
                        <span>Source</span>
                        <ExternalLink size={12} className="text-amber-vibrant" />
                      </a>

                      {/* 3D Floating Quick Inspection Badge */}
                      <div
                        style={{ transform: 'translateZ(25px)' }}
                        className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
                          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-(--bg-surface)/90 backdrop-blur-md text-xs font-medium text-amber-vibrant border border-(--border-subtle) shadow-sm">
                          <Eye size={13} />
                          <span>Inspect</span>
                        </span>
                      </div>

                      {/* Interactive Line Art Butterfly That Lifts & Flaps on Hover */}
                      <div
                        style={{ transform: 'translateZ(35px)' }}
                        className={`absolute bottom-4 right-4 pointer-events-none transition-all duration-600 ease-out z-20 ${
                          isHovered
                            ? 'opacity-100 scale-120 -translate-y-4 -translate-x-2'
                            : 'opacity-0 scale-75 translate-y-2'
                        }`}
                      >
                        <Butterfly
                          variant={index % 2 === 0 ? 'profile' : 'flutter'}
                          state={isHovered ? 'flying' : 'resting'}
                          size={36}
                          strokeColor="#D4BDE6"
                          accentColor="#FF662B"
                          fillOpacity={0.25}
                          withSparkles={true}
                          registerAsTarget={true}
                        />
                      </div>
                    </div>

                    {/* Card Content & Metadata */}
                    <div
                      style={{ transform: 'translateZ(18px)' }}
                      className="p-5 sm:p-6 bg-(--bg-surface) flex flex-col justify-between grow"
                    >
                      <div>
                        {/* Category pill & year */}
                        <div className="flex items-center justify-between text-xs mb-2.5">
                          <span
                            className={`font-sans font-medium uppercase tracking-wider text-[11px] transition-colors duration-300 ${
                              isHovered ? 'text-amber-flame' : 'text-amber-vibrant'
                            }`}
                          >
                            {project.category}
                          </span>
                          <span className="font-mono text-(--text-muted)">{project.year}</span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`font-serif text-xl sm:text-2xl font-normal leading-snug transition-colors duration-300 flex items-center justify-between ${
                            isHovered ? 'text-amber-vibrant' : 'text-(--text-primary)'
                          }`}
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight
                            size={18}
                            className={`text-amber-flame transition-all duration-300 shrink-0 ml-2 ${
                              isHovered
                                ? 'opacity-100 translate-x-0.5 -translate-y-0.5'
                                : 'opacity-0'
                            }`}
                          />
                        </h3>

                        {/* Technique snippet */}
                        <p className="font-sans text-xs text-(--text-secondary)/80 mt-2 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Bottom details */}
                      <div className="mt-4 pt-3 border-t border-(--border-subtle) flex items-center justify-between text-[11px] text-(--text-muted)">
                        <span className="truncate max-w-50">{project.techniqueOrRole}</span>
                        {project.galleryImages.length > 1 && (
                          <span className="px-2 py-0.5 rounded-full bg-surface-hover text-amber-vibrant font-medium border border-(--border-subtle)">
                            {project.galleryImages.length} plates
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </article>
            );
          })}
        </div>

        {/* Bottom Carousel Navigation Controls */}
        {filteredProjects.length > 3 && (
          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              onClick={handlePrevSlide}
              disabled={!canPrev}
              aria-label="Previous works"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
                canPrev
                  ? 'bg-(--bg-surface) border-(--border-subtle) text-(--text-primary) hover:border-amber-flame hover:text-amber-vibrant shadow-sm cursor-pointer'
                  : 'bg-(--bg-surface)/40 border-(--border-subtle)/30 text-(--text-muted)/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={15} />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    carouselIndex === i
                      ? 'w-6 bg-amber-flame'
                      : 'w-2 bg-(--border-subtle) hover:bg-amber-vibrant/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              disabled={!canNext}
              aria-label="Next works"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
                canNext
                  ? 'bg-(--bg-surface) border-(--border-subtle) text-(--text-primary) hover:border-amber-flame hover:text-amber-vibrant shadow-sm cursor-pointer'
                  : 'bg-(--bg-surface)/40 border-(--border-subtle)/30 text-(--text-muted)/40 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Accessible Detail Dialog / Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </section>
  );
};
