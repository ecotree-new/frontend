'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ECOTREE_CASES, FOODTRUCK_CASES } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

interface CaseCardProps {
  label: string;
  title: string;
  description: string;
  image: string;
}

function CaseCard({ label, title, description, image }: CaseCardProps) {
  const importedImage = IMAGE_MAP[image];

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
      {/* Image - Fixed height, width shrinks with viewport */}
      <div className="w-full md:w-auto md:flex-shrink-0">
        <div className="relative w-full md:w-[280px] lg:w-[340px] xl:w-[400px] h-[150px] md:h-[200px] lg:h-[240px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={importedImage || image}
            alt={title}
            fill
            className="object-cover object-center"
            placeholder={importedImage ? "blur" : undefined}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        {/* Label */}
        <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-[#E0EBFF] text-[#1B67FF] text-[10px] md:text-[14px] font-bold rounded-full w-fit mb-3">
          {label}
        </span>

        {/* Title */}
        <h3 className="text-[14px] md:text-[20px] lg:text-[24px] font-semibold text-[#111111] leading-tight mb-3 whitespace-pre-line">
          {title}
        </h3>

        {/* Description - wraps based on available width */}
        <p className="text-[10px] md:text-[14px] lg:text-[16px] text-[#111111] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function CaseStudySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ecotree fades out from 0-50%, Foodtruck fades in from 40-60%
  const ecotreeOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const foodtruckOpacity = useTransform(scrollYProgress, [0.4, 0.5, 1], [0, 1, 1]);

  // 모바일: 일반 플로우 레이아웃 (Ecotree + Foodtruck 순차 표시)
  if (isMobile) {
    return (
      <section className="bg-white py-16">
        <div className="container-ecotree">
          {/* Ecotree 섹션 */}
          <div className="mb-16">
            <p className="text-[10px] text-[#1B67FF] font-medium mb-4">
              에코트리 운영 사례
            </p>
            <h2 className="text-[18px] font-bold text-[#111111] leading-tight mb-8">
              현장에서 나온 운영 인사이트,
              <br />
              사례로 확인하세요.
            </h2>
            <div className="space-y-6">
              {ECOTREE_CASES.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  label={caseItem.label}
                  title={caseItem.title}
                  description={caseItem.description}
                  image={caseItem.image}
                                  />
              ))}
            </div>
          </div>

          {/* Foodtruck 섹션 */}
          <div>
            <p className="text-[10px] text-[#1B67FF] font-medium mb-4">
              한국 세계음식 푸드트럭 중앙회 운영 사례
            </p>
            <h2 className="text-[18px] font-bold text-[#111111] leading-tight mb-8">
              현장에서 나온 운영 인사이트,
              <br />
              사례로 확인하세요.
            </h2>
            <div className="space-y-6">
              {FOODTRUCK_CASES.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  label={caseItem.label}
                  title={caseItem.title}
                  description={caseItem.description}
                  image={caseItem.image}
                                  />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // PC: 기존 sticky + scroll fade 레이아웃
  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
        <section className="h-full bg-white flex flex-col justify-center overflow-hidden">
          <div className="container-ecotree">
            {/* Section Label (above Main Title) */}
            <div className="relative h-6 mb-4">
              <motion.p
                style={{ opacity: ecotreeOpacity }}
                className="absolute inset-0 text-[14px] lg:text-[16px] text-[#1B67FF] font-medium"
              >
                에코트리 운영 사례
              </motion.p>
              <motion.p
                style={{ opacity: foodtruckOpacity }}
                className="absolute inset-0 text-[14px] lg:text-[16px] text-[#1B67FF] font-medium"
              >
                한국 세계음식 푸드트럭 중앙회 운영 사례
              </motion.p>
            </div>

            {/* Main Title (Fixed) - Line break at 839px */}
            <div className="mb-8 lg:mb-12">
              <h2 className="text-[36px] lg:text-[40px] font-bold text-[#111111] leading-tight">
                <span className="hidden min-[840px]:inline">현장에서 나온 운영 인사이트, 사례로 확인하세요.</span>
                <span className="min-[840px]:hidden">
                  현장에서 나온 운영 인사이트,
                  <br />
                  사례로 확인하세요.
                </span>
              </h2>
            </div>

            {/* Content Area */}
            <div className="relative">
              {/* Ecotree Cases - Base layer for height */}
              <motion.div style={{ opacity: ecotreeOpacity }}>
                <div className="space-y-6">
                  {ECOTREE_CASES.map((caseItem) => (
                    <CaseCard
                      key={caseItem.id}
                      label={caseItem.label}
                      title={caseItem.title}
                      description={caseItem.description}
                      image={caseItem.image}
                                          />
                  ))}
                </div>
              </motion.div>

              {/* Foodtruck Cases - Absolute overlay */}
              <motion.div
                style={{ opacity: foodtruckOpacity }}
                className="absolute inset-0"
              >
                <div className="space-y-6">
                  {FOODTRUCK_CASES.map((caseItem) => (
                    <CaseCard
                      key={caseItem.id}
                      label={caseItem.label}
                      title={caseItem.title}
                      description={caseItem.description}
                      image={caseItem.image}
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
