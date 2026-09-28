import React from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { KineticMarquee } from '@/components/KineticMarquee';
import { ExhibitionWallSection } from '@/components/ExhibitionWallSection';
import { WorkGallery } from '@/components/WorkGallery';
import { VerifiedArchivesSection } from '@/components/VerifiedArchivesSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { ButterflyDirector } from '@/components/ButterflyDirector';
import { ButterflyField } from '@/components/ButterflyField';
import { FlightPathReveal } from '@/components/FlightPathReveal';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-(--bg-canvas) text-(--text-primary) paper-grain flex flex-col justify-between overflow-x-hidden selection:bg-amber-flame selection:text-white transition-colors duration-300">
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

        {/* Compact Flight Path Reveal: Hero → Selected Works */}
        <FlightPathReveal
          id="path-hero-to-work"
          direction="left-to-right"
          label="The Butterfly Effect // From Internal Vision to Printed Impression"
        />

        {/* Kinetic Typographic Ribbon */}
        <KineticMarquee />

        {/* Virtual 7-Meter Graduation Exhibition Wall Walkthrough */}
        <ExhibitionWallSection />

        {/* Selected Work Curatorial Gallery with 3-Stage Chain Reaction */}
        <WorkGallery />

        {/* Compact Flight Path Reveal: Works → Direct Archive Repositories */}
        <FlightPathReveal
          id="path-work-to-archives"
          direction="right-to-left"
          label="Direct Archives // Verified Source Folders & Drive Repositories"
        />

        {/* Inverted Kinetic Ribbon for Dark Transition */}
        <KineticMarquee inverted />

        {/* Direct Archive Sources / Verified Portfolio & Work Links in the Middle */}
        <VerifiedArchivesSection />

        {/* Personal Overview, Philosophy & Academic Heritage */}
        <AboutSection />
      </main>

      {/* Closing Canvas & Contact Finale */}
      <ContactSection />
    </div>
  );
}
