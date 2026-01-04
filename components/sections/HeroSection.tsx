'use client';

import Link from 'next/link';
import { HERO_CONTENT } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-background.mov" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-ecotree">
          <div className="text-left text-white">
            {/* Main Title */}
            <h1
              className="text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-4"
              style={{ wordBreak: 'keep-all' }}
            >
              행사를 바꾸는 친환경, 에코트리
            </h1>

            {/* Subtitle */}
            <p className="text-[14px] md:text-[16px] font-normal text-white/90 mb-8">
              {HERO_CONTENT.subtitle}
            </p>

            {/* CTA Button - 검은색 배경, radius 4px */}
            <Link
              href={HERO_CONTENT.ctaLink}
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-[14px] md:text-[16px] font-medium rounded-[4px] hover:font-bold transition-all"
            >
              {HERO_CONTENT.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
