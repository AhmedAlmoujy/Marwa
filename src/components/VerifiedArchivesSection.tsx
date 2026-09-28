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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[2px] bg-[#FF662B]" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#FF662B]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FF7D3C]">
                Direct Archive Sources
              </span>
            </div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-medium">
            Verified Portfolio &amp; <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7D3C] to-[#FFA05E]">Repositories</span>
          </h2>
        </div>
        <p className="mt-2 md:mt-0 font-sans text-sm md:text-base text-[var(--text-secondary)] max-w-md leading-relaxed font-normal">
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
                className="group relative p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF662B]/80 hover:bg-[var(--color-surface-hover)] transition-all duration-300 flex flex-col justify-between h-full shadow-3d-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                        isDrive
                          ? 'bg-[#FF662B]/15 text-[#FF7D3C] border border-[#FF662B]/30'
                          : 'bg-[#7928CA]/15 text-[#D4BDE6] border border-[#7928CA]/30'
                      }`}
                    >
                      <FolderGit2 size={10} />
                      <span>{isDrive ? 'Google Drive' : 'Google Sites'}</span>
                    </span>

                    <ExternalLink
                      size={13}
                      className="text-[var(--text-muted)] group-hover:text-[#FF662B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[#FF7D3C] transition-colors leading-snug">
                    {linkItem.label}
                  </h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span>{isDrive ? 'Raw Asset Folder' : 'Curated Exhibition'}</span>
                  <span className="text-[#FF7D3C] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Open Archive &rarr;
                  </span>
                </div>

                {/* Decorative micro butterfly in corner of first card */}
                {idx === 0 && (
                  <div className="absolute -top-2.5 -right-2.5 pointer-events-none opacity-80 group-hover:scale-110 transition-transform">
                    <Butterfly
                      variant="flutter"
                      state="resting"
                      size={20}
                      strokeColor="#D4BDE6"
                      accentColor="#FF662B"
                    />
                  </div>
                )}
              </a>
            </TiltCard3D>
          );
        })}
      </div>
    </section>
  );
};
