'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const SiteHeader: React.FC = () => {
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
          ? 'bg-(--header-bg) backdrop-blur-md border-b border-(--border-subtle) py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Typographic Monogram & Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-(--text-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame rounded-md"
        >
          <div className="relative w-8 h-8 flex items-center justify-center border border-amber-flame/50 rounded-full bg-(--bg-surface) shadow-[0_0_15px_rgba(255,102,43,0.15)] group-hover:border-amber-vibrant transition-colors duration-300">
            <span className="font-serif italic text-base font-semibold leading-none text-amber-vibrant">
              M
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wide font-medium leading-tight group-hover:text-amber-vibrant transition-colors">
              Marwa El-Bahnsawy
            </span>
            <span className="text-[10px] tracking-widest uppercase text-(--text-muted) font-sans font-medium">
              Artist · Graphic Designer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative py-1 text-sm tracking-wide text-(--text-secondary) hover:text-(--text-primary) font-sans transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame rounded"
            >
              {link.label}
              {/* Hand-drawn Animated SVG Underline */}
              <svg
                className="absolute left-0 bottom-0 w-full h-0.75 text-amber-flame scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 origin-left"
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
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="p-2 rounded-md text-(--text-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-flame"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16.25 bg-(--header-bg) backdrop-blur-xl border-b border-(--border-subtle) px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-(--text-primary) hover:text-amber-vibrant transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-(--border-subtle) flex items-center justify-between text-xs text-(--text-muted)">
              <span>m.a.elbahnsawy@gmail.com</span>
              <span>01033113869</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
