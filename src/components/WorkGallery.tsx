'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Project,
  PROJECTS,
  PORTFOLIO_CATEGORIES,
  CURATED_PROJECT_IDS,
  ADS_CAMPAIGNS,
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
  GraduationCap,
  Palette,
  Layers,
  Megaphone,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const WorkGallery: React.FC = () => {
  // Categorized state: default to compact Curated Highlights (8 premier works)
  const [selectedCategory, setSelectedCategory] = useState<string>('curated');
  const [selectedAdCampaign, setSelectedAdCampaign] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Active category metadata
  const activeCategory = useMemo(() => {
    return PORTFOLIO_CATEGORIES.find((c) => c.id === selectedCategory) || PORTFOLIO_CATEGORIES[0];
  }, [selectedCategory]);

  // Filtered projects based on active category and optional sub-campaign
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'curated') {
      return PROJECTS.filter((p) => (CURATED_PROJECT_IDS as readonly string[]).includes(p.id));
    }

    let list = PROJECTS.filter((p) => p.categorySlug === selectedCategory);
    if (selectedCategory === 'ads' && selectedAdCampaign !== 'all') {
      list = list.filter((p) => p.id.startsWith(`ads-${selectedAdCampaign}`));
    }
    return list;
  }, [selectedCategory, selectedAdCampaign]);

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
        return <Sparkles size={14} className="flex-shrink-0" />;
      case 'graduation':
        return <GraduationCap size={14} className="flex-shrink-0" />;
      case 'artworks':
        return <Palette size={14} className="flex-shrink-0" />;
      case 'digital-art':
        return <Layers size={14} className="flex-shrink-0" />;
      case 'ads':
        return <Megaphone size={14} className="flex-shrink-0" />;
      default:
        return <Sparkles size={14} className="flex-shrink-0" />;
    }
  };

  return (
    <section id="work" className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-[2px] bg-[#FF662B]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF7D3C]">
              Exhibition Archive
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] font-medium">
            Selected <span className="italic font-normal text-[#FF7D3C]">Works</span> &amp; Formats
          </h2>
        </div>
        <p className="mt-3 md:mt-0 font-sans text-sm md:text-base text-[var(--text-secondary)] max-w-sm leading-relaxed font-normal">
          From hand-pulled copper intaglio plates and stone lithographs to contemporary brand campaigns and digital art.
        </p>
      </div>

      {/* Primary Categorized Tabs Bar */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3" role="tablist" aria-label="Portfolio category filter">
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (cat.id !== 'ads') {
                  setSelectedAdCampaign('all');
                }
              }}
              className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF662B] to-[#D9481A] text-white shadow-[0_4px_16px_rgba(255,102,43,0.35)] scale-[1.02]'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#FF662B] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-[#FF7D3C] group-hover:scale-110 transition-transform'}>
                {getCategoryIcon(cat.id)}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--bg-canvas)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                }`}
              >
                {cat.count}
              </span>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFA05E] animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Categorized Editorial Context Banner */}
      <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
          <span className="p-1.5 rounded-lg bg-[var(--bg-canvas)] text-[#FF7D3C] flex-shrink-0">
            {getCategoryIcon(activeCategory.id)}
          </span>
          <p className="leading-relaxed font-sans">{activeCategory.description}</p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)] flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF662B]" />
          <span>
            {filteredProjects.length}{' '}
            {selectedCategory === 'graduation'
              ? 'Plates & Views'
              : selectedCategory === 'curated'
              ? 'Curated Masterworks'
              : 'Works Available'}
          </span>
        </div>
      </div>

      {/* Sub-Campaign Filter Chips for Advertising & Campaigns */}
      {selectedCategory === 'ads' && (
        <div className="mb-5 p-2.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 px-2 text-[11px] font-mono uppercase text-[var(--text-muted)]">
            <Filter size={11} className="text-[#FF7D3C]" />
            <span>Filter Campaign:</span>
          </div>
          {ADS_CAMPAIGNS.map((camp) => {
            const isCampActive = selectedAdCampaign === camp.id;
            return (
              <button
                key={camp.id}
                onClick={() => setSelectedAdCampaign(camp.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF662B] ${
                  isCampActive
                    ? 'bg-[#FF662B] text-white shadow-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF662B] border border-[var(--border-subtle)]'
                }`}
              >
                <span>{camp.label}</span>
                <span className="ml-1.5 opacity-70 font-mono text-[10px]">({camp.count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Asymmetric Editorial Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {filteredProjects.map((project, index) => {
          const isHovered = hoveredProjectId === project.id;

          let colSpan = 'md:col-span-6 lg:col-span-4';
          if (project.aspectRatio >= 1.5 && project.featured && index % 2 === 0) {
            colSpan = 'md:col-span-12 lg:col-span-8';
          } else if (project.aspectRatio >= 1.3) {
            colSpan = 'md:col-span-6 lg:col-span-6';
          } else {
            colSpan = 'md:col-span-6 lg:col-span-4';
          }

          const imgMetrics = getAssetMetrics(project.coverImage);

          return (
            <article
              key={project.id}
              className={`${colSpan} group relative flex flex-col justify-between`}
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
                  className={`relative cursor-pointer rounded-2xl overflow-hidden bg-[var(--bg-surface)] border transition-all duration-500 shadow-3d-card h-full flex flex-col justify-between preserve-3d ${
                    isHovered
                      ? 'border-[#FF662B]/80 shadow-[0_16px_40px_rgba(255,102,43,0.14)]'
                      : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {/* Stage 2 Hand-Drawn Frame Accent Trace */}
                  <svg
                    className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-30 overflow-visible text-[#FF662B]"
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

                  {/* Artwork Image Container */}
                  <div className="relative w-full overflow-hidden bg-[var(--bg-canvas)] flex items-center justify-center">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      width={imgMetrics.width}
                      height={imgMetrics.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`w-full h-auto object-contain transition-transform duration-700 ease-out ${
                        isHovered ? 'scale-[1.022]' : 'scale-100'
                      }`}
                    />

                    {/* Vignette Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)]/80 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
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
                      className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-md text-[11px] font-medium text-[var(--text-primary)] hover:text-[#FF7D3C] border border-[var(--border-subtle)] hover:border-[#FF662B] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
                      title={project.workUrlLabel}
                    >
                      <span>Source</span>
                      <ExternalLink size={12} className="text-[#FF7D3C]" />
                    </a>

                    {/* 3D Floating Quick Inspection Badge */}
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-md text-xs font-medium text-[#FF7D3C] border border-[var(--border-subtle)] shadow-sm">
                        <Eye size={13} />
                        <span>Inspect</span>
                      </span>
                    </div>

                    {/* Stage 1: Interactive Exact Line Art Butterfly That Lifts & Flaps on Hover */}
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

                  {/* Stage 3: Card Content & Metadata Settle into Active State */}
                  <div
                    style={{ transform: 'translateZ(18px)' }}
                    className="p-5 sm:p-6 bg-[var(--bg-surface)] flex flex-col justify-between flex-grow"
                  >
                    <div>
                      {/* Category pill & year */}
                      <div className="flex items-center justify-between text-xs mb-2.5">
                        <span
                          className={`font-sans font-medium uppercase tracking-wider text-[11px] transition-colors duration-300 ${
                            isHovered ? 'text-[#FF662B]' : 'text-[#FF7D3C]'
                          }`}
                        >
                          {project.category}
                        </span>
                        <span className="font-mono text-[var(--text-muted)]">{project.year}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-serif text-xl sm:text-2xl font-normal leading-snug transition-colors duration-300 flex items-center justify-between ${
                          isHovered ? 'text-[#FF7D3C]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight
                          size={18}
                          className={`text-[#FF662B] transition-all duration-300 flex-shrink-0 ml-2 ${
                            isHovered
                              ? 'opacity-100 translate-x-0.5 -translate-y-0.5'
                              : 'opacity-0'
                          }`}
                        />
                      </h3>

                      {/* Technique snippet */}
                      <p className="font-sans text-xs text-[var(--text-secondary)]/80 mt-2 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom details */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                      <span className="truncate max-w-[200px]">{project.techniqueOrRole}</span>
                      {project.galleryImages.length > 1 && (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--color-surface-hover)] text-[#FF7D3C] font-medium border border-[var(--border-subtle)]">
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

      {/* Discipline Navigation Cards for Curated View (Quickly explore full collections) */}
      {selectedCategory === 'curated' && (
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
            <h4 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
              Explore Complete Categorized Archives
            </h4>
            <span className="text-[11px] font-mono text-[#FF7D3C]">34 Total Documented Works</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PORTFOLIO_CATEGORIES.filter((c) => c.id !== 'curated').map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF662B] text-left transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-[var(--bg-canvas)] text-[#FF7D3C] group-hover:bg-[#FF662B] group-hover:text-white transition-colors flex-shrink-0">
                    {getCategoryIcon(cat.id)}
                  </span>
                  <div>
                    <p className="font-serif text-sm text-[var(--text-primary)] group-hover:text-[#FF7D3C] transition-colors font-medium">
                      {cat.label}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] font-mono">{cat.count} Works</p>
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-[var(--text-muted)] group-hover:text-[#FF662B] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2"
                />
              </button>
            ))}
          </div>
        </div>
      )}

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
