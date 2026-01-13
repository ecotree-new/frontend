'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PROCESS_CARDS, STRENGTH_CARDS } from '@/lib/constants';

export default function ProcessStrengthSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentSection, setCurrentSection] = useState<'process' | 'strength'>('process');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 섹션 전환 감지
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.4) {
        setCurrentSection('strength');
      } else {
        setCurrentSection('process');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // 뷰포트 진입/이탈 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        } else {
          setHasEntered(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Process 섹션 opacity
  const processOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);

  // Strength 섹션 opacity
  const strengthOpacity = useTransform(scrollYProgress, [0.35, 0.45, 1], [0, 1, 1]);

  // 타이틀 애니메이션 variants
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  // 타이틀바 애니메이션 variants
  const titleBarVariants = {
    hidden: { opacity: 0, y: -30, scaleX: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  // 카드 컨테이너 애니메이션
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  // 개별 카드 애니메이션
  const cardVariants = {
    hidden: { opacity: 0, x: -60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden flex items-center justify-center bg-[#EDF3FF]">

        {/* Process Section */}
        <motion.div
          style={{ opacity: processOpacity }}
          className="absolute inset-0 flex items-center justify-center py-8 md:py-10 lg:py-20"
        >
          <div className="container-ecotree">
            <AnimatePresence mode="wait">
              {hasEntered && currentSection === 'process' && (
                <motion.div
                  key="process-content"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {/* Title */}
                  <motion.div
                    variants={titleVariants}
                    className="text-center mb-4 md:mb-6 lg:mb-12"
                  >
                    <h2 className="text-[24px] md:text-[28px] lg:text-[40px] font-bold text-[#111111] mb-1 md:mb-2">
                      에코트리는
                    </h2>
                    <h2 className="text-[24px] md:text-[28px] lg:text-[40px] font-bold text-[#111111]">
                      이렇게 운영합니다.
                    </h2>
                  </motion.div>

                  {/* Title Bar - 라운드 없음 */}
                  <motion.div
                    variants={titleBarVariants}
                    className="bg-[#1B67FF] text-white text-center py-2 md:py-2 lg:py-3 origin-center"
                  >
                    <p className="text-[13px] md:text-[14px] lg:text-[16px] font-medium">
                      체계적인 4단계 순환 시스템
                    </p>
                  </motion.div>

                  {/* Cards Grid - 24px gap from title bar */}
                  {/* W > 1024px: 4열, 768px < W ≤ 1024px: 3열 + 4번째 span, W ≤ 768px: 2열 2행 */}
                  <motion.div
                    variants={cardContainerVariants}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 mt-3 md:mt-4 lg:mt-6"
                  >
                    {PROCESS_CARDS.map((card, index) => (
                      <motion.div
                        key={card.id}
                        variants={cardVariants}
                        className={`bg-white rounded-[12px] md:rounded-[16px] lg:rounded-[24px] p-3 md:p-4 lg:p-[35px] ${
                          index === 3 ? 'md:col-span-3 lg:col-span-1' : ''
                        }`}
                      >
                        {/* Icon & Number Row */}
                        <div className="flex justify-between items-start mb-3 md:mb-4 lg:mb-[46px]">
                          {/* Icon - 배경 없이 아이콘만 */}
                          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16 flex items-center justify-center">
                            <Image
                              src={card.icon}
                              alt={card.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Number - SlowGothic 폰트 */}
                          <span
                            className="text-[28px] md:text-[36px] lg:text-[64px] leading-none text-[#E0EBFF]"
                            style={{ fontFamily: 'SlowGothic, sans-serif' }}
                          >
                            {String(card.id).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[14px] md:text-[16px] lg:text-[28px] font-bold text-[#111111] mb-2 md:mb-3 lg:mb-[46px]">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] md:text-[12px] lg:text-[16px] text-[#727783] leading-relaxed whitespace-pre-line">
                          {card.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Strength Section */}
        <motion.div
          style={{ opacity: strengthOpacity }}
          className="absolute inset-0 flex items-center justify-center py-8 md:py-10 lg:py-20"
        >
          <div className="container-ecotree">
            <AnimatePresence mode="wait">
              {hasEntered && currentSection === 'strength' && (
                <motion.div
                  key="strength-content"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {/* Title */}
                  <motion.div
                    variants={titleVariants}
                    className="text-center mb-4 md:mb-6 lg:mb-12"
                  >
                    <h2 className="text-[24px] md:text-[28px] lg:text-[40px] font-bold text-[#111111] mb-1 md:mb-2">
                      에코트리는
                    </h2>
                    <h2 className="text-[24px] md:text-[28px] lg:text-[40px] font-bold text-[#111111]">
                      그래서 다릅니다.
                    </h2>
                  </motion.div>

                  {/* Title Bar - 라운드 없음 */}
                  <motion.div
                    variants={titleBarVariants}
                    className="bg-[#1B67FF] text-white text-center py-2 md:py-2 lg:py-3 origin-center"
                  >
                    <p className="text-[13px] md:text-[14px] lg:text-[16px] font-medium">
                      에코트리만의 차별화된 경쟁력
                    </p>
                  </motion.div>

                  {/* Cards Grid - 24px gap from title bar */}
                  {/* W > 1024px: 3열, W ≤ 1024px: 2열 + 3번째 카드 전체 너비 */}
                  <motion.div
                    variants={cardContainerVariants}
                    className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 mt-3 md:mt-4 lg:mt-6"
                  >
                    {STRENGTH_CARDS.map((card, index) => (
                      <motion.div
                        key={card.id}
                        variants={cardVariants}
                        className={`bg-white rounded-[12px] md:rounded-[16px] lg:rounded-[24px] py-4 md:py-6 lg:py-[69px] px-3 md:px-4 lg:px-[35px] ${
                          index === 2 ? 'col-span-2 lg:col-span-1' : ''
                        }`}
                      >
                        {/* Label */}
                        <div className="mb-1 md:mb-2 lg:mb-4">
                          <span className="inline-block px-2 md:px-3 lg:px-4 py-0.5 bg-[#E0EBFF] text-[#1B67FF] text-[10px] md:text-[11px] lg:text-[13px] font-medium rounded-full">
                            {card.label}
                          </span>
                        </div>

                        {/* Value */}
                        <div className="mb-1 md:mb-1 lg:mb-2">
                          <span className="text-[24px] md:text-[28px] lg:text-[56px] font-bold text-[#1B67FF]">
                            {card.value}
                          </span>
                          <span className="text-[10px] md:text-[12px] lg:text-[20px] text-[#1B67FF] ml-1 md:ml-1 lg:ml-2">
                            {card.unit}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[12px] md:text-[14px] lg:text-[22px] text-[#1B67FF] mb-1 md:mb-1 lg:mb-4">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[10px] md:text-[11px] lg:text-[16px] text-[#97BAFF] leading-relaxed whitespace-pre-line">
                          {card.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
