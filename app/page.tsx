'use client';

import { useRef, useEffect } from 'react';
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

  // 페이지 진입 시 스크롤 초기화
  useEffect(() => {
    // snap 비활성화 후 스크롤 초기화 (snap으로 인한 튕김 방지)
    document.documentElement.style.scrollSnapType = 'none';
    window.scrollTo(0, 0);

    // 다음 프레임에서 snap 재활성화
    requestAnimationFrame(() => {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    });
  }, []);

  return (
    <>
      <Header />
      <ScrollSnapController snapEndRef={festivalRef} />
      <main>
        {/* main_1: Hero Section */}
        <HeroSection />

        {/* main_2: Banner Section (Problem & Insight) */}
        <BannerSection />

        {/* main_3: Process & Strength Section */}
        <ProcessStrengthSection />

        {/* main_4: Festival Section - snap ends here */}
        <div ref={festivalRef}>
          <FestivalSection />
        </div>

        {/* main_5: CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
