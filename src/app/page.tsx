import React from 'react';
import { SiteIntroAnimation } from '@/components/SiteIntroAnimation';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { CreativeProcessSection } from '@/components/CreativeProcessSection';
import { ExhibitionWallSection } from '@/components/ExhibitionWallSection';
import { WorkGallery } from '@/components/WorkGallery';
import { VerifiedArchivesSection } from '@/components/VerifiedArchivesSection';
import { ContactSection } from '@/components/ContactSection';
import { ButterflyDirector } from '@/components/ButterflyDirector';
import { ButterflyField } from '@/components/ButterflyField';
import { FlightPathReveal } from '@/components/FlightPathReveal';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-(--bg-canvas) text-(--text-primary) paper-grain flex flex-col justify-between overflow-x-hidden selection:bg-amber-flame selection:text-white transition-colors duration-300">
      {/* Cinematic Opening Sequence: Butterfly Sowing Stardust & Light */}
      <SiteIntroAnimation />

      {/* Central Interactive Storytelling System: The Butterfly Effect */}
      <ButterflyDirector />

      {/* Ambient Margin Butterflies with Connected Response Registry */}
      <ButterflyField />

      {/* Navigation Header with Theme & Motion Controls */}
      <SiteHeader />

      {/* Main Exhibition Narrative Flow */}
      <main id="main-content" className="grow">
        {/* 1. Signature Hero: The First Small Movement (Dense & impactful) */}
        <Hero />

        {/* Curved Flight Path Reveal: Hero → Creative Process / Graduation Wall */}
        <FlightPathReveal
          id="path-hero-to-work"
          direction="left-to-right"
          label="Follow the butterfly"
        />

        {/* 2. The Creative Process: The Journey of the Butterfly & The Graduation Project */}
        <CreativeProcessSection />

        {/* 3. Virtual 7-Meter Graduation Exhibition Wall Walkthrough */}
        <ExhibitionWallSection />

        {/* 4. Selected Work Curatorial Gallery */}
        <WorkGallery />

        {/* Compact Flight Path Reveal: Works → Direct Archive Repositories */}
        <FlightPathReveal
          id="path-work-to-archives"
          direction="left-to-right"
          align="right"
          label="Follow the butterfly"
        />

        {/* 5. Direct Archive Sources / Verified Portfolio & Work Links */}
        <VerifiedArchivesSection />
      </main>

      {/* Closing Canvas & Contact Finale */}
      <ContactSection />
    </div>
  );
}
