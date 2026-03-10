'use client';

import Link from 'next/link';
import { CTA_CONTENT } from '@/lib/constants';
import { R2_IMAGES } from '@/lib/r2';

export default function CTASection() {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${R2_IMAGES.ctaBg})` }}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #1B67FF 0%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-[18px] md:text-[40px] font-bold text-white">
          {CTA_CONTENT.preTitle} {CTA_CONTENT.title}
        </h2>

        {/* Button */}
        <Link
          href={CTA_CONTENT.buttonLink}
          className="mt-[28px] md:mt-[56px] inline-flex items-center justify-center bg-white text-[#1B67FF] font-medium hover:font-bold transition-all"
          style={{
            padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw + 4px, 24px)',
            fontSize: 'clamp(12px, 1.5vw + 4px, 16px)',
            borderRadius: '4px',
          }}
        >
          운영 상담하기
        </Link>
      </div>
    </section>
  );
}
