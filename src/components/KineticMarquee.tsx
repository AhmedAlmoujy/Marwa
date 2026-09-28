'use client';

import React from 'react';
import { Butterfly } from './Butterfly';

interface KineticMarqueeProps {
  inverted?: boolean;
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({ inverted = false }) => {
  const items = [
    'FACULTY OF FINE ARTS 2024',
    'INTAGLIO PRINTMAKING',
    'STONE LITHOGRAPHY',
    'BRAND IDENTITY ARCHITECTURE',
    'COMMERCIAL CAMPAIGNS',
    'TACTILE PAPER EMBOSSING',
    'METAMORPHOSIS',
    'IDEAS TAKE FLIGHT',
  ];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 border-y select-none ${
        inverted
          ? 'bg-[#221232] border-[#FF662B]/30 text-[#FFD2B8]'
          : 'bg-[#170C22] border-[#D4BDE6]/15 text-[#FAF4FD]'
      }`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee space-x-12 items-center">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap">
            <span className="font-serif italic text-base sm:text-lg tracking-widest uppercase font-medium">
              {text}
            </span>
            <div className="relative -top-0.5">
              <Butterfly
                variant={idx % 3 === 0 ? 'profile' : idx % 3 === 1 ? 'flutter' : 'angled'}
                state="hovering"
                size={22}
                strokeColor={inverted ? '#FF7D3C' : '#D4BDE6'}
                accentColor={inverted ? '#D4BDE6' : '#FF662B'}
                fillOpacity={0.25}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
