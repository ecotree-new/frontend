'use client';

import Link from 'next/link';
import { HERO_CONTENT } from '@/lib/constants';
import { R2_VIDEOS, R2_IMAGES } from '@/lib/images';

export default function HeroSection() {
  return (
    <section className="snap-section relative h-[calc(100vh-64px)] min-h-[500px] md:min-h-[600px] w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={R2_IMAGES.heroPoster}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={R2_VIDEOS.heroBackground} type="video/mp4" />
      </video>

      {/* Overlay - #000000 60% */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-ecotree">
          <div className="text-center text-white">
            {/* Main Title */}
            <h1
              className="text-[28px] md:text-[40px] lg:text-[56px] font-bold leading-tight mb-3 md:mb-4"
              style={{ wordBreak: 'keep-all' }}
            >
              행사를 바꾸는 친환경, 에코트리
            </h1>

            {/* Subtitle */}
            <p className="text-[12px] md:text-[20px] font-medium text-white/90 mb-6 md:mb-8">
              {HERO_CONTENT.subtitle}
            </p>

            {/* CTA Button */}
            <Link
              href={HERO_CONTENT.ctaLink}
              className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-[#1B67FF] text-white text-[10px] md:text-[16px] font-medium rounded-[4px] hover:opacity-90 transition-all"
            >
              {HERO_CONTENT.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
