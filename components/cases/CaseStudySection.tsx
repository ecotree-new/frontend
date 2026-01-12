'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ECOTREE_CASES, FOODTRUCK_CASES } from '@/lib/constants';

interface CaseCardProps {
  label: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

function CaseCard({ label, title, description, image, link }: CaseCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
      {/* Image - Fixed height, width shrinks with viewport */}
      <div className="w-full md:w-auto md:flex-shrink-0">
        <div className="relative w-full md:w-[280px] lg:w-[340px] xl:w-[400px] h-[200px] lg:h-[240px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        {/* Label */}
        <span className="inline-block px-4 py-1.5 bg-[#E0EBFF] text-[#1B67FF] text-[14px] font-bold rounded-full w-fit mb-3">
          {label}
        </span>

        {/* Title */}
        <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#111111] leading-tight mb-3 whitespace-pre-line">
          {title}
        </h3>

        {/* Description - wraps based on available width */}
        <p className="text-[14px] lg:text-[16px] text-[#111111] leading-relaxed mb-3">
          {description}
        </p>

        {/* View More Button */}
        <Link
          href={link}
          className="inline-flex items-center gap-1 text-[16px] md:text-[16px] text-[#1B67FF] font-semibold hover:font-bold transition-all cursor-pointer group"
        >
          view more
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function CaseStudySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ecotree fades out from 0-50%, Foodtruck fades in from 40-60%
  const ecotreeOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const foodtruckOpacity = useTransform(scrollYProgress, [0.4, 0.5, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
        <section className="h-full pt-20 pb-10 bg-white flex flex-col">
          <div className="container-ecotree flex-1 flex flex-col">
            {/* Section Label (above Main Title) */}
            <div className="relative h-6 mb-4">
              <motion.p
                style={{ opacity: ecotreeOpacity }}
                className="absolute inset-0 text-[14px] md:text-[16px] text-[#1B67FF] font-medium"
              >
                에코트리 운영 사례
              </motion.p>
              <motion.p
                style={{ opacity: foodtruckOpacity }}
                className="absolute inset-0 text-[14px] md:text-[16px] text-[#1B67FF] font-medium"
              >
                한국 세계음식 푸드트럭 중앙회 운영 사례
              </motion.p>
            </div>

            {/* Main Title (Fixed) - Line break at 839px */}
            <div className="mb-8 lg:mb-12">
              <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#111111] leading-tight">
                <span className="hidden min-[840px]:inline">현장에서 나온 운영 인사이트, 사례로 확인하세요.</span>
                <span className="min-[840px]:hidden">
                  현장에서 나온 운영 인사이트,
                  <br />
                  사례로 확인하세요.
                </span>
              </h2>
            </div>

            {/* Content Area */}
            <div className="relative flex-1">
              {/* Ecotree Cases */}
              <motion.div
                style={{ opacity: ecotreeOpacity }}
                className="absolute inset-0"
              >
                {/* Case Cards */}
                <div className="space-y-6">
                  {ECOTREE_CASES.map((caseItem) => (
                    <CaseCard
                      key={caseItem.id}
                      label={caseItem.label}
                      title={caseItem.title}
                      description={caseItem.description}
                      image={caseItem.image}
                      link={caseItem.link}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Foodtruck Cases */}
              <motion.div
                style={{ opacity: foodtruckOpacity }}
                className="absolute inset-0"
              >
                {/* Case Cards */}
                <div className="space-y-6">
                  {FOODTRUCK_CASES.map((caseItem) => (
                    <CaseCard
                      key={caseItem.id}
                      label={caseItem.label}
                      title={caseItem.title}
                      description={caseItem.description}
                      image={caseItem.image}
                      link={caseItem.link}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
