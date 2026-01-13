'use client';

import Link from 'next/link';
import { CTA_CONTENT } from '@/lib/constants';

export default function CTASection() {
  return (
    <section className="py-10 md:py-20 lg:py-32 bg-[#FBFBFB]">
      <div className="container-ecotree">
        {/*
          360px: py-8 (32px), px-4 (16px), text-16px, rounded-xl
          768px: py-16 (64px), px-16 (64px), text-40px, rounded-3xl
        */}
        <div
          className="bg-[#1B67FF] flex flex-row items-center justify-between px-8 md:px-16"
          style={{
            paddingTop: 'clamp(24px, 4vw + 8px, 64px)',
            paddingBottom: 'clamp(24px, 4vw + 8px, 64px)',
            borderRadius: 'clamp(12px, 2vw + 4px, 24px)',
            gap: 'clamp(16px, 3vw, 32px)',
          }}
        >
          {/* Text */}
          <div className="text-white text-left min-w-0">
            <p
              className="font-light leading-tight"
              style={{ fontSize: 'clamp(16px, 4vw + 2px, 40px)' }}
            >
              {CTA_CONTENT.preTitle}
            </p>
            <p
              className="font-bold leading-tight"
              style={{ fontSize: 'clamp(16px, 4vw + 2px, 40px)' }}
            >
              {CTA_CONTENT.title}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href={CTA_CONTENT.buttonLink}
            className="flex-shrink-0 inline-flex items-center justify-center bg-white text-[#1B67FF] font-medium hover:font-bold transition-all whitespace-nowrap"
            style={{
              padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw + 4px, 24px)',
              fontSize: 'clamp(12px, 1.5vw + 4px, 16px)',
              borderRadius: '4px',
            }}
          >
            {CTA_CONTENT.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
