'use client';

import React from 'react';
import { Butterfly, ButterflyVariant, ButterflyState } from './Butterfly';
import { useMotion } from '@/context/MotionContext';

interface ButterflyConfig {
  id: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  variant: ButterflyVariant;
  state: ButterflyState;
  size: number;
  rotation: number;
  strokeColor: string;
  accentColor: string;
  fillOpacity: number;
  opacity: number;
  hideOnMobile?: boolean;
}

// Carefully orchestrated decorative butterflies distributed across the page
const AMBIENT_BUTTERFLIES: ButterflyConfig[] = [
  // Near Top / Hero Margin
  {
    id: 'hero-margin-left',
    top: '18%',
    left: '3%',
    variant: 'angled',
    state: 'resting',
    size: 32,
    rotation: 15,
    strokeColor: '#D4BDE6',
    accentColor: '#FF662B',
    fillOpacity: 0.2,
    opacity: 0.75,
    hideOnMobile: true,
  },
  {
    id: 'hero-accent-right',
    top: '36%',
    right: '4%',
    variant: 'flutter',
    state: 'hovering',
    size: 28,
    rotation: -25,
    strokeColor: '#FF944D',
    accentColor: '#7928CA',
    fillOpacity: 0.25,
    opacity: 0.8,
    hideOnMobile: true,
  },
  // Work Section Margins & Headers
  {
    id: 'work-header-float',
    top: '46%',
    left: '8%',
    variant: 'profile',
    state: 'hovering',
    size: 36,
    rotation: -10,
    strokeColor: '#D4BDE6',
    accentColor: '#FF662B',
    fillOpacity: 0.2,
    opacity: 0.85,
  },
  {
    id: 'work-right-gutter',
    top: '56%',
    right: '2%',
    variant: 'angled',
    state: 'resting',
    size: 26,
    rotation: 40,
    strokeColor: '#E2CEF3',
    accentColor: '#9673D2',
    fillOpacity: 0.15,
    opacity: 0.65,
    hideOnMobile: true,
  },
  {
    id: 'work-mid-left',
    top: '64%',
    left: '2%',
    variant: 'flutter',
    state: 'resting',
    size: 30,
    rotation: -18,
    strokeColor: '#FAF7FC',
    accentColor: '#FF662B',
    fillOpacity: 0.2,
    opacity: 0.7,
    hideOnMobile: true,
  },
  // About Section Margins
  {
    id: 'about-heading-perch',
    top: '74%',
    right: '12%',
    variant: 'profile',
    state: 'hovering',
    size: 38,
    rotation: 12,
    strokeColor: '#FF944D',
    accentColor: '#D4BDE6',
    fillOpacity: 0.25,
    opacity: 0.85,
  },
  {
    id: 'about-lower-left',
    top: '84%',
    left: '5%',
    variant: 'angled',
    state: 'resting',
    size: 28,
    rotation: -30,
    strokeColor: '#D4BDE6',
    accentColor: '#7928CA',
    fillOpacity: 0.18,
    opacity: 0.7,
    hideOnMobile: true,
  },
];

export const ButterflyField: React.FC = () => {
  return null;
};

