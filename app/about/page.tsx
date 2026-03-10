'use client';

import { useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollSnapController from '@/components/ScrollSnapController';
import VisionMissionSection from '@/components/sections/about/VisionMissionSection';
import CoreValueSection from '@/components/sections/about/CoreValueSection';
import BusinessPurposeSection from '@/components/sections/about/BusinessPurposeSection';
import DirectionsSection from '@/components/sections/about/DirectionsSection';

export default function AboutPage() {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <ScrollSnapController snapEndRef={footerRef} />
      <main>
        {/* Section 1: Vision & Mission (스크롤 애니메이션) */}
        <VisionMissionSection />

        {/* Section 2: Core Value (핵심 가치) */}
        <CoreValueSection />

        {/* Section 3: Business Purpose (사업 목적) */}
        <BusinessPurposeSection />

        {/* Section 4: Directions (오시는 길) */}
        <DirectionsSection />
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
