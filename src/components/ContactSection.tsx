'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MARWA_BIOGRAPHY } from '@/data/portfolioData';
import { Butterfly } from './Butterfly';
import { Mail, Phone, ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(MARWA_BIOGRAPHY.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] pt-10 pb-8 px-6 md:px-12 overflow-hidden scroll-mt-20 border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      {/* Ambient fluid art background glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#7928CA]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-1/4 w-60 h-60 bg-[#FF662B]/12 rounded-full blur-3xl pointer-events-none" />

      {/* Contact Finale: Balanced 3-Butterfly Gathering */}
      <div className="absolute top-6 right-8 md:right-24 pointer-events-none opacity-90 transition-all duration-700">
        <div className="relative">
          {/* Butterfly 1: Primary graceful herald */}
          <div
            className={`transition-transform duration-700 ease-out ${
              isCtaHovered ? '-translate-y-2 scale-110 -rotate-8' : 'translate-y-0 scale-100 -rotate-12'
            }`}
          >
            <Butterfly
              variant="profile"
              state={isCtaHovered ? 'hovering' : 'resting'}
              size={46}
              strokeColor="#D4BDE6"
              accentColor="#FF662B"
              fillOpacity={0.25}
              withSparkles={true}
              registerAsTarget={true}
            />
          </div>

          {/* Butterfly 2: Gentle angled companion */}
          <div
            className={`absolute -top-5 -left-8 transition-transform duration-700 ease-out ${
              isCtaHovered ? '-translate-x-2 -translate-y-1 scale-90 rotate-12' : 'translate-x-0 scale-75 rotate-18'
            }`}
          >
            <Butterfly
              variant="angled"
              state={isCtaHovered ? 'hovering' : 'resting'}
              size={32}
              strokeColor="#FAF7FC"
              accentColor="#7928CA"
              fillOpacity={0.2}
              registerAsTarget={true}
            />
          </div>

          {/* Butterfly 3: Lower perched companion */}
          <div
            className={`absolute top-10 -left-4 transition-transform duration-700 ease-out ${
              isCtaHovered ? 'translate-x-1 translate-y-1 scale-80 rotate-2' : 'scale-65 -rotate-6'
            }`}
          >
            <Butterfly
              variant="flutter"
              state={isCtaHovered ? 'hovering' : 'resting'}
              size={28}
              strokeColor="#FF944D"
              accentColor="#D4BDE6"
              fillOpacity={0.25}
              registerAsTarget={true}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Bold Invitation */}
        <div className="max-w-3xl mb-6 md:mb-8">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[2px] bg-[#FF662B]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FF7D3C]">
              Start a Conversation
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-[var(--text-primary)] mb-3">
            Let’s make something <br />
            worth{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#FF7D3C] via-[#FF5500] to-[#D4BDE6] bg-clip-text text-transparent relative inline-block">
              looking
              {/* Hand-drawn underline revealed on contact CTA hover/focus */}
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-[6px] text-[#FF662B] pointer-events-none overflow-visible"
                viewBox="0 0 240 12"
                fill="none"
              >
                <path
                  d="M2 8 C50 2, 130 11, 238 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 240,
                    strokeDashoffset: isCtaHovered ? 0 : 240,
                    transition: 'stroke-dashoffset 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />
              </svg>
            </span>{' '}
            at.
          </h2>

          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-normal">
            Whether for a comprehensive visual identity, cultural exhibition print design, 
            commercial advertising campaign, or experimental printmaking project.
          </p>
        </div>

        {/* Contact Links & Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl">
          {/* Email Action Card */}
          <div
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
            onFocus={() => setIsCtaHovered(true)}
            onBlur={() => setIsCtaHovered(false)}
            className="group relative p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF662B]/80 transition-all duration-300 shadow-3d-card hover:shadow-[0_8px_24px_rgba(255,102,43,0.14)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#FF7D3C] font-sans font-medium flex items-center gap-1.5">
                <Mail size={12} className="text-[#FF662B]" /> Direct Email
              </span>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--bg-canvas)] text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#FF662B] transition-colors border border-[var(--border-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`mailto:${MARWA_BIOGRAPHY.contact.email}`}
              className="font-sans font-medium text-lg sm:text-xl text-[var(--text-primary)] hover:text-[#FF7D3C] transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] rounded"
            >
              <span className="break-all">{MARWA_BIOGRAPHY.contact.email}</span>
              <ArrowUpRight
                size={18}
                className="text-[#FF662B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 ml-2"
              />
            </a>

            <p className="font-sans text-[11px] text-[var(--text-muted)] mt-1.5">
              Inquiries, commissions, & collaboration proposals
            </p>
          </div>

          {/* Telephone Action Card */}
          <div
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
            onFocus={() => setIsCtaHovered(true)}
            onBlur={() => setIsCtaHovered(false)}
            className="group relative p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF662B]/80 transition-all duration-300 shadow-3d-card hover:shadow-[0_8px_24px_rgba(255,102,43,0.14)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#FF7D3C] font-sans font-medium flex items-center gap-1.5">
                <Phone size={12} className="text-[#FF662B]" /> Telephone & WhatsApp
              </span>
              <Phone size={12} className="text-[#FF662B]" />
            </div>

            <a
              href={`tel:${MARWA_BIOGRAPHY.contact.phone}`}
              className="font-sans font-semibold tracking-wider text-xl sm:text-2xl text-[var(--text-primary)] hover:text-[#FF7D3C] transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] rounded"
            >
              <span>{MARWA_BIOGRAPHY.contact.phone}</span>
              <ArrowUpRight
                size={18}
                className="text-[#FF662B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 ml-2"
              />
            </a>

            <p className="font-sans text-[11px] text-[var(--text-muted)] mt-1.5">
              Direct voice or mobile messaging ({MARWA_BIOGRAPHY.contact.phoneFormatted})
            </p>
          </div>
        </div>

        {/* Bottom Credits & Verified Academic Note */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span className="font-medium text-[var(--text-primary)]">
              © {new Date().getFullYear()} Marwa El-Bahnsawy
            </span>
            <span className="hidden sm:inline text-[#FF662B]">•</span>
            <span>Faculty of Fine Arts, Graphic Department (Printed Design Division, 2024)</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#work"
              className="hover:text-[#FF7D3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] rounded"
            >
              Back to Gallery
            </Link>
            <a
              href={MARWA_BIOGRAPHY.contact.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF7D3C] transition-colors flex items-center gap-1 text-[var(--text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] rounded"
            >
              <span>Personal Overview</span>
              <ArrowUpRight size={11} className="text-[#FF662B]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
