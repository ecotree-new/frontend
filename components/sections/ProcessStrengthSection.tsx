'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { PROCESS_CARDS, STRENGTH_CARDS } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function ProcessStrengthSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentSection, setCurrentSection] = useState<'process' | 'strength'>('process');
  const [isInSection, setIsInSection] = useState(false);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Track if we're in the section and sync state
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    // We're in the section when progress is between 0 and ~0.67
    const inSection = value > 0 && value < 0.67;
    setIsInSection(inSection);

    // Sync state with scroll position
    if (value > 0.33 && currentSection !== 'strength') {
      setCurrentSection('strength');
    } else if (value <= 0.33 && currentSection !== 'process') {
      setCurrentSection('process');
    }
  });

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

  // Handle wheel event for snap-like transition
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || !isInSection || isAnimating.current) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Calculate snap positions
    const processPosition = containerTop; // Start (Process)
    const strengthPosition = containerTop + containerHeight / 2; // Middle (Strength)
    const exitPosition = containerTop + containerHeight - viewportHeight; // End (exit)

    // Determine current state based on scroll position
    const middlePoint = containerTop + containerHeight / 4;
    const isAtProcess = scrollY < middlePoint;
    const isAtStrength = scrollY >= middlePoint && scrollY < exitPosition - 100;

    if (e.deltaY > 0) {
      // Scrolling down
      if (isAtProcess) {
        // Process → Strength
        e.preventDefault();
        isAnimating.current = true;
        setCurrentSection('strength');
        window.scrollTo({
          top: strengthPosition,
          behavior: 'smooth'
        });
        setTimeout(() => { isAnimating.current = false; }, 800);
      } else if (isAtStrength) {
        // Strength → Exit
        e.preventDefault();
        isAnimating.current = true;
        window.scrollTo({
          top: exitPosition + 100,
          behavior: 'smooth'
        });
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    } else if (e.deltaY < 0) {
      // Scrolling up
      if (isAtStrength) {
        // Strength → Process
        e.preventDefault();
        isAnimating.current = true;
        setCurrentSection('process');
        window.scrollTo({
          top: processPosition,
          behavior: 'smooth'
        });
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    }
  }, [isInSection, currentSection]);

  // 모바일 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    // 섹션 내에 있으면 CSS scroll-snap 일시 비활성화 (모바일만 영향)
    if (isInSection) {
      document.documentElement.style.scrollSnapType = 'none';
    }
  }, [isInSection]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!containerRef.current || isAnimating.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const swipeThreshold = 50;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const processPosition = containerTop;
    const strengthPosition = containerTop + containerHeight / 2;
    const exitPosition = containerTop + containerHeight - viewportHeight;

    const middlePoint = containerTop + containerHeight / 4;
    const isAtProcess = scrollY >= containerTop - 100 && scrollY < middlePoint;
    const isAtStrength = scrollY >= middlePoint && scrollY < exitPosition - 100;

    // 섹션 내에서 스냅 로직 실행
    if ((isAtProcess || isAtStrength) && Math.abs(deltaY) >= swipeThreshold) {
      if (deltaY > 0) {
        // 스와이프 위로 (스크롤 다운)
        if (isAtProcess) {
          isAnimating.current = true;
          setCurrentSection('strength');
          window.scrollTo({ top: strengthPosition, behavior: 'smooth' });
          setTimeout(() => {
            isAnimating.current = false;
            document.documentElement.style.scrollSnapType = 'y mandatory';
          }, 800);
          return;
        } else if (isAtStrength) {
          // Strength → Exit: FestivalSection 시작점으로 이동 (섹션 완전히 벗어남)
          isAnimating.current = true;
          const festivalStart = containerTop + containerHeight; // ProcessStrengthSection 끝 = FestivalSection 시작
          window.scrollTo({ top: festivalStart, behavior: 'smooth' });
          setTimeout(() => {
            isAnimating.current = false;
            // scroll-snap 복원하지 않음 - 자유 스크롤 영역
          }, 800);
          return;
        }
      } else if (deltaY < 0) {
        // 스와이프 아래로 (스크롤 업)
        if (isAtStrength) {
          isAnimating.current = true;
          setCurrentSection('process');
          window.scrollTo({ top: processPosition, behavior: 'smooth' });
          setTimeout(() => {
            isAnimating.current = false;
            document.documentElement.style.scrollSnapType = 'y mandatory';
          }, 800);
          return;
        }
      }
    }

    // 스냅 로직이 실행되지 않았으면 바로 scroll-snap 복원
    document.documentElement.style.scrollSnapType = 'y mandatory';
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);

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
    <div ref={containerRef} className="snap-section relative h-[300vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden flex items-center justify-center bg-[#F4F5F7]">

        {/* Process Section */}
        <motion.div
          style={{ opacity: processOpacity }}
          className="absolute inset-0 flex items-center justify-center py-8 md:py-10 lg:py-20 short-h:lg:py-8"
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
                    className="text-center mb-4 md:mb-6 lg:mb-12 short-h:lg:mb-4"
                  >
                    <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] mb-1 md:mb-2">
                      에코트리는
                    </h2>
                    <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111]">
                      이렇게 운영합니다.
                    </h2>
                  </motion.div>

                  {/* Title Bar - 라운드 없음 */}
                  <motion.div
                    variants={titleBarVariants}
                    className="bg-[#1B67FF] text-white text-center py-2 md:py-2 lg:py-3 origin-center"
                  >
                    <p className="text-[12px] md:text-[20px] lg:text-[20px] font-medium">
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
                        <div className="flex justify-between items-start mb-3 md:mb-4 lg:mb-[46px] short-h:lg:mb-4">
                          {/* Icon - 배경 없이 아이콘만 */}
                          <div className="w-8 h-8 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
                            <Image
                              src={IMAGE_MAP[card.icon] || card.icon}
                              alt={card.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Number - SlowGothic 폰트 */}
                          <span
                            className="text-[30px] md:text-[48px] lg:text-[64px] leading-none text-[#DDE7FF]"
                            style={{ fontFamily: 'SlowGothic, sans-serif' }}
                          >
                            {String(card.id).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] md:text-[24px] lg:text-[32px] font-semibold text-[#111111] mb-2 md:mb-3 lg:mb-[46px] short-h:lg:mb-4">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#727783] font-medium leading-relaxed whitespace-pre-line">
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
          className="absolute inset-0 flex items-center justify-center py-8 md:py-10 lg:py-20 short-h:lg:py-8"
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
                    className="text-center mb-4 md:mb-6 lg:mb-12 short-h:lg:mb-4"
                  >
                    <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] mb-1 md:mb-2">
                      에코트리는
                    </h2>
                    <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111]">
                      그래서 다릅니다.
                    </h2>
                  </motion.div>

                  {/* Title Bar - 라운드 없음 */}
                  <motion.div
                    variants={titleBarVariants}
                    className="bg-[#1B67FF] text-white text-center py-2 md:py-2 lg:py-3 origin-center"
                  >
                    <p className="text-[12px] md:text-[20px] lg:text-[20px] font-medium">
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
                        className={`bg-white rounded-[12px] md:rounded-[16px] lg:rounded-[24px] py-4 md:py-10 lg:py-[69px] short-h:lg:py-6 px-3 md:px-[35px] lg:px-[35px] ${
                          index === 2 ? 'col-span-2 lg:col-span-1' : ''
                        }`}
                      >
                        {/* Label */}
                        <div className="mb-1 md:mb-2 lg:mb-4">
                          <span className="inline-block px-2 md:px-3 lg:px-4 py-0.5 bg-[#E0EBFF] text-[#1B67FF] text-[10px] md:text-[14px] lg:text-[14px] font-medium rounded-full">
                            {card.label}
                          </span>
                        </div>

                        {/* Value */}
                        <div className="mb-1 md:mb-1 lg:mb-1">
                          <span className="text-[16px] md:text-[28px] lg:text-[32px] font-semibold text-[#111111]">
                            {card.value}
                          </span>
                          <span className="text-[16px] md:text-[28px] lg:text-[32px] font-semibold text-[#111111] ml-1 md:ml-1 lg:ml-1">
                            {card.unit}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] md:text-[28px] lg:text-[32px] font-semibold text-[#111111] mb-1 md:mb-1 lg:mb-4">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[10px] md:text-[16px] lg:text-[16px] font-medium text-[#727783] leading-relaxed whitespace-pre-line">
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
