'use client';

import { useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BannerSection from '@/components/sections/BannerSection';
import ProcessStrengthSection from '@/components/sections/ProcessStrengthSection';
import FestivalSection from '@/components/sections/FestivalSection';
import CTASection from '@/components/sections/CTASection';
import ScrollSnapController from '@/components/ScrollSnapController';

export default function Home() {
  const festivalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <ScrollSnapController snapEndRef={festivalRef} />
      <main>
        {/* main_1: Hero Section */}
        <HeroSection />

        {/* Snap scroll ends after Hero */}
        <div ref={festivalRef} />

        {/* main_2: Banner Section (Problem & Insight) */}
        <BannerSection />

        {/* main_3: Process & Strength Section */}
        <ProcessStrengthSection />

        {/* main_4: Festival Section */}
        <FestivalSection />

        {/* main_5: CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
