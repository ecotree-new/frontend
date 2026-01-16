'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BANNER_CONTENT } from '@/lib/constants';

export default function BannerSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Transform for the first banner opacity (fades out as you scroll)
  const firstBannerOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky container - accounts for header height */}
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden flex items-center justify-center">
        {/* Second Banner - Insight (always visible, behind) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-ecotree">
            <div
              className="relative w-full rounded-2xl overflow-hidden max-w-[1110px] h-[400px] md:h-[500px] lg:h-[600px] short-h:lg:h-[450px]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${BANNER_CONTENT[1].image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to left, #1B67FF 10%, rgba(27, 103, 255, 0.7) 20%, transparent 100%)'
                }}
              />

              {/* Content */}
              <div className="relative h-full flex items-center justify-end p-6 md:p-12 pr-8 md:pr-16">
                <div className="text-left text-white">
                  <p className="text-[24px] md:text-[28px] lg:text-[32px] font-light">
                    {BANNER_CONTENT[1].preTitle}
                  </p>
                  <p className="text-[24px] md:text-[28px] lg:text-[32px] font-bold">
                    {BANNER_CONTENT[1].title}
                  </p>
                  <p className="text-[24px] md:text-[28px] lg:text-[32px] font-light mb-4 md:mb-8">
                    {BANNER_CONTENT[1].highlight}
                  </p>
                  <div className="text-[14px] md:text-[16px] font-normal text-white/90">
                    <p>다회용기로 운영된 행사는</p>
                    <p>일회용품 쓰레기를 95% 이상 줄입니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* First Banner - Problem (fades out to reveal second) */}
        <motion.div
          style={{ opacity: firstBannerOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container-ecotree">
            <div
              className="relative w-full rounded-2xl overflow-hidden max-w-[1110px] h-[400px] md:h-[500px] lg:h-[600px] short-h:lg:h-[450px]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${BANNER_CONTENT[0].image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to left, #1B67FF 10%, rgba(27, 103, 255, 0.7) 20%, transparent 100%)'
                }}
              />

              {/* Content */}
              <div className="relative h-full flex items-center justify-end p-6 md:p-12 pr-8 md:pr-16">
                <div className="text-left text-white">
                  <p className="text-[24px] md:text-[28px] lg:text-[32px] font-light">
                    {BANNER_CONTENT[0].title}
                  </p>
                  <p className="text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-4 md:mb-8">
                    {BANNER_CONTENT[0].highlight}
                  </p>
                  <div className="text-[14px] md:text-[16px] font-normal text-white/90">
                    <p>매년 수백 개의 축제와 행사에서</p>
                    <p>수십만 개의 일회용품이 버려집니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
