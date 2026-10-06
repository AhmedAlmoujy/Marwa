'use client';

import React from 'react';
import { MARWA_BIOGRAPHY } from '@/data/portfolioData';
import { TiltCard3D } from './TiltCard3D';
import { Butterfly } from './Butterfly';
import { ShieldCheck, ExternalLink, FolderGit2 } from 'lucide-react';

export const VerifiedArchivesSection: React.FC = () => {
  return (
    <section
      id="archives"
      className="py-8 md:py-10 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 transition-colors duration-300"
    >
      {/* Compact Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 pb-3 border-b border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-0.5 bg-amber-flame" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-amber-flame" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-vibrant">
                Direct Archive Sources
              </span>
            </div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-(--text-primary) font-medium">
            Verified Portfolio &amp; <span className="italic font-normal text-transparent bg-clip-text bg-linear-to-r from-amber-vibrant to-amber-glow">Repositories</span>
          </h2>
        </div>
        <p className="mt-2 md:mt-0 font-sans text-sm md:text-base text-(--text-secondary) max-w-md leading-relaxed font-normal">
          Direct verified links to official Google Drive source directories, Google Sites presentations, and high-resolution printmaking records.
        </p>
      </div>

      {/* Grid of Verified Links with 3D Tilt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {MARWA_BIOGRAPHY.contact.verifiedLinks.map((linkItem, idx) => {
          const isDrive = linkItem.url.includes('drive.google.com');

          return (
            <TiltCard3D
              key={idx}
              maxTilt={5}
              glareOpacity={0.14}
              scale={1.015}
              className="h-full"
            >
              <a
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-xl bg-(--bg-surface) border border-(--border-subtle) hover:border-amber-flame/80 hover:bg-surface-hover transition-all duration-300 flex flex-col justify-between h-full shadow-3d-card focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                        isDrive
                          ? 'bg-amber-flame/15 text-amber-vibrant border border-amber-flame/30'
                          : 'bg-purple-vivid/15 text-lavender-soft border border-purple-vivid/30'
                      }`}
                    >
                      <FolderGit2 size={10} />
                      <span>{isDrive ? 'Google Drive' : 'Google Sites'}</span>
                    </span>

                    <ExternalLink
                      size={13}
                      className="text-(--text-muted) group-hover:text-amber-flame group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-(--text-primary) group-hover:text-amber-vibrant transition-colors leading-snug">
                    {linkItem.label}
                  </h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-(--border-subtle) flex items-center justify-between text-[11px] text-(--text-muted)">
                  <span>{isDrive ? 'Raw Asset Folder' : 'Curated Exhibition'}</span>
                  <span className="text-amber-vibrant opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Open Archive &rarr;
                  </span>
                </div>
              </a>
            </TiltCard3D>
          );
        })}
      </div>
    </section>
  );
};
