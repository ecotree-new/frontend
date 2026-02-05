'use client';

import { useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollSnapController from '@/components/ScrollSnapController';
import HeroSection from '@/components/ecotree/HeroSection';
import RentalFlowSection from '@/components/ecotree/RentalFlowSection';
import BusinessRangeSection from '@/components/ecotree/BusinessRangeSection';
import BrandTransitionSection from '@/components/ecotree/BrandTransitionSection';
import ProductShowcaseSection from '@/components/ecotree/ProductShowcaseSection';
import ProductVideoSection from '@/components/ecotree/ProductVideoSection';
import WashingProcessSection from '@/components/ecotree/WashingProcessSection';
import WashingFacilitySection from '@/components/ecotree/WashingFacilitySection';
import PostWashingSection from '@/components/ecotree/PostWashingSection';
import StatsSection from '@/components/ecotree/StatsSection';

export default function EcotreePage() {
  const snapEndRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <ScrollSnapController snapEndRef={snapEndRef} />
      <main>
        <HeroSection />
        <RentalFlowSection />
        <BusinessRangeSection />
        <BrandTransitionSection />
        <div ref={snapEndRef}>
          <ProductShowcaseSection />
          <ProductVideoSection />
          <WashingProcessSection />
          <WashingFacilitySection />
          <PostWashingSection />
          <StatsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
