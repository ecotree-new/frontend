'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ECOTREE_PRODUCT_SHOWCASE } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function ProductShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = ECOTREE_PRODUCT_SHOWCASE;

  // useScroll로 스크롤 진행도 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 각 슬라이드의 opacity를 useTransform으로 계산
  // 0~0.33: slide 0, 0.33~0.66: slide 1, 0.66~1: slide 2
  const slide0Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 1, 0]);
  const slide1Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
  const slide2Opacity = useTransform(scrollYProgress, [0.61, 0.66, 1], [0, 1, 1]);

  // English title style
  const englishTitleStyle = {
    fontFamily: 'Alexandria, sans-serif',
    fontWeight: 200,
    lineHeight: '0.8',
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#FBFBFB] z-20">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden bg-[#FBFBFB] z-10">
        <div className="container-ecotree h-full relative">
          {/* Slide 1: EVERY WHERE */}
          <motion.div
            style={{ opacity: slide0Opacity }}
            className="absolute inset-0 flex items-center"
          >
            {/* Left half - Image area */}
            <div className="relative w-[50%] aspect-[5/5.5]">
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <Image
                  src={IMAGE_MAP[slides[0].image] || slides[0].image}
                  alt={slides[0].koreanTitle}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* EVERY - top left (half overlaps image) */}
              <span
                className="absolute -top-[8%] left-[2%] text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10"
                style={englishTitleStyle}
              >
                EVERY
              </span>
            </div>

            {/* Right half - Korean text at top, WHERE at bottom */}
            <div className="relative w-1/2 aspect-[3/4] flex flex-col justify-between">
              {/* Korean text - top */}
              <p className="text-[24px] md:text-[48px] text-[#111111] font-bold pl-8 mt-[15%]">
                {slides[0].koreanTitle}
              </p>

              {/* WHERE - overlaps image right side */}
              <span
                className="text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10 -ml-[15%] -translate-y-[75%]"
                style={englishTitleStyle}
              >
                WHERE
              </span>
            </div>
          </motion.div>

          {/* Slide 2: VARIOUS */}
          <motion.div
            style={{ opacity: slide1Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* VARIOUS - top left, overlaps image */}
            <span
              className="absolute top-[8%] left-0 text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10"
              style={englishTitleStyle}
            >
              VARIOUS
            </span>

            {/* Image - wide landscape, centered */}
            <div className="relative w-[75%] aspect-[2/1] overflow-hidden z-0 -mt-[10%]">
              <Image
                src={IMAGE_MAP[slides[1].image] || slides[1].image}
                alt={slides[1].koreanTitle}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Korean text - bottom left */}
            <p className="absolute bottom-[15%] left-0 text-[24px] md:text-[48px] text-[#111111] font-bold z-10">
              {slides[1].koreanTitle}
            </p>
          </motion.div>

          {/* Slide 3: EASY */}
          <motion.div
            style={{ opacity: slide2Opacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Image - left (z-0) */}
            <div className="absolute left-0 w-[784px] aspect-[784/500] overflow-hidden z-0">
              <Image
                src={IMAGE_MAP[slides[2].image] || slides[2].image}
                alt={slides[2].koreanTitle}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* EASY - top right corner, E half overlaps image */}
            <span
              className="absolute right-[2%] top-[12.5%] text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10"
              style={englishTitleStyle}
            >
              EASY
            </span>

            {/* Korean text - right side, left-aligned */}
            <p className="absolute bottom-[20%] right-0 text-left text-[24px] md:text-[48px] text-[#111111] font-bold whitespace-pre-line z-10">
              {slides[2].koreanTitle}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
