'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BANNER_CONTENT } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function BannerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Transform for the first banner opacity (fades out as you scroll)
  const firstBannerOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  const renderBannerContent = (
    content: (typeof BANNER_CONTENT)[number],
    index: number
  ) => {
    const imageUrl = IMAGE_MAP[content.image] || content.image;

    return (
      <>
        {/* Desktop Layout (>1399px): 2-column */}
        <div className="hidden min-[1400px]:flex absolute inset-0">
          {/* Left: Image with dim overlay (62.5% = 1200/1920) */}
          <div className="relative w-[62.5%] h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {/* Dim overlay: right to left gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(270deg, rgba(30, 31, 35, 0.5) 0%, rgba(30, 31, 35, 0) 100%)',
              }}
            />
          </div>

          {/* Right: Text panel (37.5% = 720/1920) */}
          <div className="w-[37.5%] h-full flex items-center bg-white">
            <motion.div
              className="pl-16 xl:pl-24 pr-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Label */}
              <p className="text-[16px] font-medium text-[#1B67FF] mb-4">
                {content.label}
              </p>

              {/* Title + Highlight (2 lines) */}
              <div className="text-[40px] font-bold text-[#111111] leading-tight mb-6">
                <p>{content.title}</p>
                <p>{content.highlight}</p>
              </div>

              {/* Description */}
              <div className="text-[20px] font-medium text-[#111111] leading-relaxed">
                {content.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Responsive Layout (≤1399px): 1-column stacked */}
        <div className="flex min-[1400px]:hidden flex-col absolute inset-0">
          {/* Top: Image */}
          <div className="flex-1 relative min-h-0">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }
              }
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              {/* Dim overlay for mobile as well */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(30, 31, 35, 0.5) 0%, rgba(30, 31, 35, 0) 100%)',
                }}
              />
            </motion.div>
          </div>

          {/* Bottom: Text panel */}
          <div className="flex-shrink-0 bg-white flex items-center">
            <motion.div
              className="container-ecotree py-8 md:py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            >
              {/* Label */}
              <p className="text-[10px] md:text-[14px] font-medium text-[#1B67FF] mb-2 md:mb-3">
                {content.label}
              </p>

              {/* Title + Highlight (2 lines) */}
              <div className="text-[18px] md:text-[28px] font-bold text-[#111111] leading-tight mb-3 md:mb-4">
                <p>{content.title}</p>
                <p>{content.highlight}</p>
              </div>

              {/* Description */}
              <div className="text-[12px] md:text-[16px] font-medium text-[#111111] leading-relaxed">
                {content.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky container - full screen, accounts for header height */}
      <div
        ref={sectionRef}
        className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden"
      >
        {/* Second Banner - Solution (always visible, behind) */}
        <div className="absolute inset-0">
          {renderBannerContent(BANNER_CONTENT[1], 1)}
        </div>

        {/* First Banner - Problem (fades out to reveal second) */}
        <motion.div
          style={{ opacity: firstBannerOpacity }}
          className="absolute inset-0"
        >
          {renderBannerContent(BANNER_CONTENT[0], 0)}
        </motion.div>
      </div>
    </div>
  );
}
