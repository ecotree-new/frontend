'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FOODTRUCK_CTA } from '@/lib/constants';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-20 lg:py-40"
    >
      <div className="container-ecotree">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl md:rounded-3xl px-6 py-8 min-[500px]:px-8 min-[500px]:py-10 md:px-16 md:py-16 overflow-hidden bg-[#1B67FF]"
        >
          {/* Gradient Overlay - 이미지 위에 */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to right, #1B67FF 0%, #1B67FF 5%, rgba(0, 0, 0, 0.4) 100%)'
            }}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 relative z-20">
            {/* Text Content */}
            <div>
              <p className="text-[16px] md:text-[24px] lg:text-[32px] font-light text-white">
                {FOODTRUCK_CTA.title}
              </p>
              <h3 className="text-[16px] md:text-[24px] lg:text-[32px] font-semibold text-white">
                {FOODTRUCK_CTA.subtitle}
              </h3>
            </div>

            {/* CTA Button - 모바일에서 왼쪽 정렬 */}
            <a
              href={FOODTRUCK_CTA.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 md:px-6 md:py-2 bg-white rounded-lg md:rounded text-[14px] md:text-[16px] font-medium text-[#1B67FF] hover:font-bold transition-all"
            >
              {FOODTRUCK_CTA.buttonText}
            </a>
          </div>

          {/* Foodtruck Image */}
          <div className="absolute -right-8 md:-right-12 -bottom-[24px] md:-bottom-[48px] w-[300px] md:w-[520px] h-[180px] md:h-[300px]">
            <Image
              src="https://pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev/images/foodtruck/foodtruck.png"
              alt="푸드트럭"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
