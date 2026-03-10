'use client';

import Image from 'next/image';
import { FOODTRUCK_CTA } from '@/lib/constants';

export default function CTASection() {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#1B67FF]"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-[18px] md:text-[40px] font-bold text-white">
          {FOODTRUCK_CTA.title}
        </h2>
        <h2 className="text-[18px] md:text-[40px] font-bold text-white">
          {FOODTRUCK_CTA.subtitle}
        </h2>

        {/* Button */}
        <a
          href={FOODTRUCK_CTA.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[28px] md:mt-[56px] inline-flex items-center justify-center bg-white text-[#1B67FF] font-medium hover:font-bold transition-all"
          style={{
            padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw + 4px, 24px)',
            fontSize: 'clamp(12px, 1.5vw + 4px, 16px)',
            borderRadius: '4px',
          }}
        >
          {FOODTRUCK_CTA.buttonText}
        </a>
      </div>

      {/* Foodtruck Image - 그라데이션 아래(z-0), 하단 더 내림 */}
      <div className="absolute -right-[20px] md:-right-[10px] -bottom-[30px] md:-bottom-[50px] w-[240px] md:w-[480px] lg:w-[580px] h-[160px] md:h-[300px] lg:h-[370px] z-0">
        <Image
          src="https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev/images/foodtruck/foodtruck.png"
          alt="푸드트럭"
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      {/* Gradient overlay - 이미지 위에 */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(90deg, #1B67FF 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
    </section>
  );
}
