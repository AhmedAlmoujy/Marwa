'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';
import { Butterfly } from './Butterfly';
import { Play, Pause, Menu, X, Sun, Moon } from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const { isPaused, togglePause } = useMotion();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Selected Work', href: '#work' },
    { label: 'Direct Archives', href: '#archives' },
    { label: 'Exhibition & About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-subtle)] py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Typographic Monogram & Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] rounded-md"
        >
          <div className="relative w-8 h-8 flex items-center justify-center border border-[#FF662B]/50 rounded-full bg-[var(--bg-surface)] shadow-[0_0_15px_rgba(255,102,43,0.15)] group-hover:border-[#FF7D3C] transition-colors duration-300">
            <span className="font-serif italic text-base font-semibold leading-none text-[#FF7D3C]">
              M
            </span>
            <div className="absolute -top-2.5 -right-2.5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5">
              <Butterfly
                variant="angled"
                state="resting"
                size={18}
                strokeColor={theme === 'dark' ? '#D4BDE6' : '#7928CA'}
                accentColor="#FF662B"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wide font-medium leading-tight group-hover:text-[#FF7D3C] transition-colors">
              Marwa El-Bahnsawy
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] font-sans font-medium">
              Graphic Designer & Artist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative py-1 text-sm tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-sans transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B] rounded"
            >
              {link.label}
              {/* Hand-drawn Animated SVG Underline */}
              <svg
                className="absolute left-0 bottom-0 w-full h-[3px] text-[#FF662B] scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 origin-left"
                viewBox="0 0 100 6"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 3.5 C25 1, 75 5.5, 100 3"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          ))}

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] hover:border-[#FF662B] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={13} className="text-[#FF7D3C]" />
                <span className="text-[11px] font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-[#7928CA]" />
                <span className="text-[11px] font-medium">Dark</span>
              </>
            )}
          </button>

          {/* Pause / Resume Animation Control (Accessibility) */}
          <button
            onClick={togglePause}
            aria-label={isPaused ? 'Resume website animations' : 'Pause website animations'}
            title={isPaused ? 'Resume website animations' : 'Pause website animations'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] hover:border-[#FF662B] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
          >
            {isPaused ? (
              <>
                <Play size={12} className="text-[#FF7D3C] fill-[#FF7D3C]" />
                <span className="text-[11px]">Play</span>
              </>
            ) : (
              <>
                <Pause size={12} className="text-[#FF7D3C]" />
                <span className="text-[11px]">Pause</span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs"
          >
            {theme === 'dark' ? <Sun size={14} className="text-[#FF7D3C]" /> : <Moon size={14} className="text-[#7928CA]" />}
          </button>
          <button
            onClick={togglePause}
            aria-label={isPaused ? 'Resume animations' : 'Pause animations'}
            className="p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[#FF7D3C] text-xs"
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="p-2 rounded-md text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF662B]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-[var(--text-primary)] hover:text-[#FF7D3C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>m.a.elbahnsawy@gmail.com</span>
              <span>01033113869</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
