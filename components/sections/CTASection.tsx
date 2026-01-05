'use client';

import Link from 'next/link';
import { CTA_CONTENT } from '@/lib/constants';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-[#FBFBFB]">
      <div className="container-ecotree">
        <div className="bg-[#1B67FF] rounded-3xl py-16 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text */}
          <div className="text-white text-center md:text-left">
            <p className="text-[32px] md:text-[40px] font-light">
              {CTA_CONTENT.preTitle}
            </p>
            <p className="text-[32px] md:text-[40px] font-bold">
              {CTA_CONTENT.title}
            </p>
          </div>

          {/* CTA Button - w:135, h:40, padding 8px 24px, border-radius 4px */}
          <Link
            href={CTA_CONTENT.buttonLink}
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 h-[40px] px-6 py-2 bg-white text-[#1B67FF] text-[16px] font-medium rounded-[4px] hover:font-bold transition-all"
          >
            {CTA_CONTENT.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
