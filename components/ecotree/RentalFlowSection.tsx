'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_RENTAL_FLOW } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

const HEADER_HEIGHT = 64;

export default function RentalFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [phase, setPhase] = useState<'before' | 'animating' | 'after'>('before');
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const steps = ECOTREE_RENTAL_FLOW.steps;
  const totalSteps = steps.length;

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  }, []);

  // Handle touch move - prevent default during animation phase
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (phase === 'animating') {
      e.preventDefault();
    }
  }, [phase]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isTransitioning.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const deltaTime = Date.now() - touchStartTime.current;
    // 모바일에서 더 민감하게 반응하도록 조정
    const minSwipeDistance = 30;
    const velocity = Math.abs(deltaY) / deltaTime;
    const isValidSwipe = Math.abs(deltaY) > minSwipeDistance || velocity > 0.2;

    if (!isValidSwipe) {
      touchStartY.current = null;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const swipingDown = deltaY > 0;
    const swipingUp = deltaY < 0;
    const sectionInView = rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT;
    // 섹션이 헤더 근처에 있는지 확인 (더 넓은 범위로 트리거)
    const sectionNearHeader = rect.top <= HEADER_HEIGHT + 100 && rect.top >= HEADER_HEIGHT - 300;
    const sectionStillVisible = rect.bottom > HEADER_HEIGHT + 100;

    if (phase === 'before') {
      // 섹션이 헤더 근처에 있을 때만 트리거
      if (swipingDown && sectionNearHeader && sectionStillVisible) {
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
        const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
        window.scrollTo({ top: scrollTarget, behavior: 'instant' });
        setTimeout(() => { isTransitioning.current = false; }, 100);
        touchStartY.current = null;
        return;
      }
      touchStartY.current = null;
      return;
    }

    if (phase === 'animating') {
      if (swipingDown) {
        isTransitioning.current = true;
        if (currentStep < totalSteps) {
          setCurrentStep(prev => prev + 1);
        } else {
          setPhase('after');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
      } else if (swipingUp) {
        isTransitioning.current = true;
        if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
        } else {
          setPhase('before');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
      }
      touchStartY.current = null;
      return;
    }

    if (phase === 'after') {
      // 섹션이 화면에 보이고 헤더 근처에 있을 때만 다시 진입
      if (swipingUp && sectionInView && rect.top >= HEADER_HEIGHT - 300) {
        isTransitioning.current = true;
        setPhase('animating');
        setCurrentStep(totalSteps);
        document.body.style.overflow = 'hidden';
        const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
        window.scrollTo({ top: scrollTarget, behavior: 'instant' });
        setTimeout(() => { isTransitioning.current = false; }, 800);
      }
      touchStartY.current = null;
    }
  }, [currentStep, phase, totalSteps]);

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning.current) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    const sectionInView = rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT;
    const sectionAboveViewport = rect.bottom <= HEADER_HEIGHT;
    // 빠른 스크롤 대응: 섹션이 헤더에 도달했거나 이미 지나간 경우 모두 처리
    const sectionReachedHeader = rect.top <= HEADER_HEIGHT + 10;
    const sectionStillVisible = rect.bottom > HEADER_HEIGHT + 100;

    if (phase === 'before') {
      if (scrollingDown && sectionReachedHeader && sectionStillVisible) {
        e.preventDefault();
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
        // 섹션 상단으로 스크롤 고정
        const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
        window.scrollTo({ top: scrollTarget, behavior: 'instant' });
        setTimeout(() => { isTransitioning.current = false; }, 100);
      }
      return;
    }

    if (phase === 'animating') {
      e.preventDefault();
      if (scrollingDown) {
        isTransitioning.current = true;
        if (currentStep < totalSteps) {
          setCurrentStep(prev => prev + 1);
        } else {
          setPhase('after');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
      } else if (scrollingUp) {
        isTransitioning.current = true;
        if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
        } else {
          setPhase('before');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
      }
      return;
    }

    if (phase === 'after') {
      if (scrollingUp && sectionInView && !sectionAboveViewport) {
        if (rect.top >= HEADER_HEIGHT - 100) {
          e.preventDefault();
          isTransitioning.current = true;
          setPhase('animating');
          setCurrentStep(totalSteps);
          document.body.style.overflow = 'hidden';
          const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
          setTimeout(() => { isTransitioning.current = false; }, 800);
        }
      }
    }
  }, [currentStep, phase, totalSteps]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const currentStepData = steps[currentStep - 1];
  const currentImage = IMAGE_MAP[currentStepData.image];

  return (
    <section ref={containerRef} className="relative bg-white">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden">
        <div className="container-ecotree h-full flex flex-col justify-center">
          {/* Header - centered */}
          <div className="mb-8 md:mb-12 flex flex-col items-center">
            <div className="text-left">
              <p className="text-[10px] md:text-[16px] text-[#1B67FF] font-medium mb-2">
                {ECOTREE_RENTAL_FLOW.label}
              </p>
              <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
                {ECOTREE_RENTAL_FLOW.title}
              </h2>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-center">
            {/* Step number and title */}
            <div className="text-center mb-4">
              <span
                className="text-[32px] text-[#1B67FF] font-normal"
                style={{ fontFamily: 'SlowGothic, sans-serif' }}
              >
                {currentStepData.number}
              </span>
              <span className="text-[18px] font-semibold text-[#000000] ml-2">
                {currentStepData.title}
              </span>
            </div>

            {/* Description */}
            <p className="text-[10px] font-medium text-[#000000] text-center mb-6 px-4">
              {currentStepData.description}
            </p>

            {/* Image */}
            <div className="w-full h-[200px] relative rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src={currentImage || currentStepData.image}
                alt={currentStepData.title}
                fill
                className="object-cover object-center"
                placeholder={currentImage ? "blur" : undefined}
                priority
              />
            </div>

            {/* Concentric circle indicators */}
            <div className="flex gap-3 mt-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative w-[14px] h-[14px] flex items-center justify-center"
                >
                  {/* Outer circle */}
                  <div
                    className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#97BAFF]' : 'bg-[#E0EBFF]'
                    }`}
                  />
                  {/* Inner circle */}
                  <div
                    className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#1B67FF]' : 'bg-[#97BAFF]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-row gap-12 lg:gap-16 items-center">
            {/* Left: Steps with connecting dashed line */}
            <div className="w-[320px] lg:w-[400px] flex-shrink-0 relative">
              {/* Vertical dashed connecting line */}
              <div
                className="absolute left-[6px] top-[14px] bottom-[14px] w-[2px]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, #1B67FF 0px, #1B67FF 6px, transparent 6px, transparent 12px)'
                }}
              />

              <div className="space-y-6">
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  return (
                    <div
                      key={step.id}
                      className="flex items-center gap-4"
                    >
                      {/* Double circle indicator */}
                      <div className="flex-shrink-0 relative z-10 w-[14px] h-[14px] flex items-center justify-center">
                        {/* White background to cover dashed line */}
                        <div className="absolute w-[16px] h-[16px] rounded-full bg-white" />
                        {/* Outer circle */}
                        <div className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#97BAFF]' : 'bg-[#E0EBFF]'
                        }`} />
                        {/* Inner circle */}
                        <div className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#1B67FF]' : 'bg-[#97BAFF]'
                        }`} />
                      </div>

                      {/* Number and Text - opacity applied here */}
                      <div className={`flex items-center gap-3 flex-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                        <span
                          className={`text-[32px] leading-none transition-colors duration-300 ${
                            isActive ? 'text-[#1B67FF]' : 'text-[#C4C4C4]'
                          }`}
                          style={{ fontFamily: 'SlowGothic, sans-serif' }}
                        >
                          {step.number}
                        </span>

                        <div className="flex-1">
                          <h3 className="text-[20px] font-semibold text-[#000000]">
                            {step.title}
                          </h3>
                          <AnimatePresence mode="wait">
                            {isActive && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-[14px] font-medium text-[#000000] leading-relaxed mt-1"
                              >
                                {step.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 aspect-[16/10] relative rounded-2xl overflow-hidden bg-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage || currentStepData.image}
                    alt={currentStepData.title}
                    fill
                    className="object-cover object-center"
                    placeholder={currentImage ? "blur" : undefined}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
