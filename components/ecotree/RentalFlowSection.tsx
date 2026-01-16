'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_RENTAL_FLOW } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

const HEADER_HEIGHT = 64;

export default function RentalFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const firstIndicatorRef = useRef<HTMLDivElement>(null);
  const lastIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [phase, setPhase] = useState<'before' | 'animating' | 'after'>('before');
  const [lineStyle, setLineStyle] = useState({ top: 7, height: 200 });
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const steps = ECOTREE_RENTAL_FLOW.steps;
  const totalSteps = steps.length;

  // 점선 위치 계산 - 첫 번째와 마지막 인디케이터 중앙을 연결
  useEffect(() => {
    const updateLinePosition = () => {
      if (!firstIndicatorRef.current || !lastIndicatorRef.current || !stepsContainerRef.current) return;

      const containerRect = stepsContainerRef.current.getBoundingClientRect();
      const firstRect = firstIndicatorRef.current.getBoundingClientRect();
      const lastRect = lastIndicatorRef.current.getBoundingClientRect();

      const top = firstRect.top - containerRect.top + firstRect.height / 2;
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
      const height = bottom - top;

      setLineStyle({ top, height });
    };

    updateLinePosition();

    // ResizeObserver로 애니메이션 중 실시간 위치 업데이트
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateLinePosition);
    });

    if (stepsContainerRef.current) {
      resizeObserver.observe(stepsContainerRef.current);
    }

    window.addEventListener('resize', updateLinePosition);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateLinePosition);
    };
  }, [currentStep]);

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
    const minSwipeDistance = 50;
    const velocity = Math.abs(deltaY) / deltaTime;
    const isValidSwipe = Math.abs(deltaY) > minSwipeDistance || velocity > 0.3;

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
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 5 && rect.top >= HEADER_HEIGHT - 50;

    if (phase === 'before') {
      if (swipingDown && sectionAtHeader) {
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { isTransitioning.current = false; }, 100);
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
      if (swipingUp && sectionInView && rect.top >= HEADER_HEIGHT - 100) {
        isTransitioning.current = true;
        setPhase('animating');
        setCurrentStep(totalSteps);
        document.body.style.overflow = 'hidden';
        const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
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
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 5 && rect.top >= HEADER_HEIGHT - 50;

    if (phase === 'before') {
      if (scrollingDown && sectionAtHeader) {
        e.preventDefault();
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
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
          <div className="mb-8 md:mb-12 short-h:md:mb-6 flex flex-col items-center">
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
          <div className="hidden md:flex flex-row gap-12 lg:gap-16 short-h:gap-8 items-center">
            {/* Left: Steps with connecting dashed line */}
            <div ref={stepsContainerRef} className="w-[320px] lg:w-[400px] flex-shrink-0 relative">
              {/* Vertical dashed connecting line - 실시간 위치 계산 */}
              <div
                className="absolute left-[7px] w-[2px] -translate-x-1/2"
                style={{
                  top: `${lineStyle.top}px`,
                  height: `${lineStyle.height}px`,
                  backgroundImage: 'repeating-linear-gradient(to bottom, #1B67FF 0px, #1B67FF 6px, transparent 6px, transparent 12px)'
                }}
              />

              <div className="space-y-6 short-h:space-y-3">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isFirst = index === 0;
                  const isLast = index === steps.length - 1;
                  return (
                    <div
                      key={step.id}
                      className="flex items-start gap-4"
                    >
                      {/* Double circle indicator */}
                      <div
                        ref={isFirst ? firstIndicatorRef : isLast ? lastIndicatorRef : null}
                        className="flex-shrink-0 relative z-10 w-[14px] h-[14px] flex items-center justify-center mt-[9px]"
                      >
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

                      {/* Number and Text */}
                      <div className={`flex-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`text-[32px] leading-none transition-colors duration-300 ${
                              isActive ? 'text-[#1B67FF]' : 'text-[#C4C4C4]'
                            }`}
                            style={{ fontFamily: 'SlowGothic, sans-serif' }}
                          >
                            {step.number}
                          </span>
                          <h3 className="text-[20px] font-semibold text-[#000000]">
                            {step.title}
                          </h3>
                        </div>
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-[14px] font-medium text-[#000000] leading-relaxed mt-2 pl-[44px]"
                            >
                              {step.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
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
