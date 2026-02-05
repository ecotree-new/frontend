'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_RENTAL_FLOW } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

// Helper to get scroll container (snap container)
const getScrollContainer = () => {
  const snapContainer = document.querySelector('.snap-y');
  return snapContainer as HTMLElement | null;
};

export default function RentalFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const firstIndicatorRef = useRef<HTMLDivElement>(null);
  const lastIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [lineStyle, setLineStyle] = useState({ top: 7, height: 200 });
  const [isLocked, setIsLocked] = useState(false);
  const isExiting = useRef(false);  // 탈출 의도 플래그
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const steps = ECOTREE_RENTAL_FLOW.steps;
  const totalSteps = steps.length;

  // Lock/unlock scroll container
  useEffect(() => {
    const sc = getScrollContainer();
    if (!sc) return;

    if (isLocked) {
      sc.style.overflow = 'hidden';
    } else {
      sc.style.overflow = '';
    }

    return () => {
      sc.style.overflow = '';
    };
  }, [isLocked]);

  // Detect when scroll snap completes on this section
  useEffect(() => {
    if (isLocked) return;

    const sc = getScrollContainer();
    if (!sc || !containerRef.current) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // 탈출 중이면 lock하지 않음
        if (isExiting.current || !containerRef.current) return;

        const sectionTop = containerRef.current.offsetTop;
        const scrollTop = sc.scrollTop;

        // 스크롤 위치가 섹션 상단과 정확히 일치할 때만 lock
        if (Math.abs(scrollTop - sectionTop) < 10) {
          sc.style.overflow = 'hidden';
          setIsLocked(true);
        }
      }, 150); // 스크롤이 멈춘 후 150ms 대기
    };

    sc.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 체크 (이미 섹션에 있는 경우)
    handleScroll();

    return () => {
      sc.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isLocked]);

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isLocked) return;
    touchStartY.current = e.touches[0].clientY;
  }, [isLocked]);

  // Handle touch move - prevent scroll when locked
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isLocked) return;
    e.preventDefault();
  }, [isLocked]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isLocked || isTransitioning.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    touchStartY.current = null;

    if (Math.abs(deltaY) < 30) return;

    isTransitioning.current = true;

    const sc = getScrollContainer();
    const container = containerRef.current;

    if (deltaY > 0) {
      // Swipe up (scroll down)
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else if (sc && container) {
        // Last step, go to next section
        const nextSection = container.nextElementSibling as HTMLElement;
        if (nextSection) {
          isExiting.current = true;
          setIsLocked(false);
          sc.style.overflow = '';
          sc.style.scrollSnapType = 'none';

          sc.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
          setTimeout(() => {
            sc.style.scrollSnapType = '';
            isExiting.current = false;
          }, 1000);
        }
      }
    } else {
      // Swipe down (scroll up)
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
      } else if (sc && container) {
        // First step, go to previous section
        const prevSection = container.previousElementSibling as HTMLElement;
        if (prevSection) {
          isExiting.current = true;
          setIsLocked(false);
          sc.style.overflow = '';
          sc.style.scrollSnapType = 'none';

          sc.scrollTo({ top: prevSection.offsetTop, behavior: 'smooth' });
          setTimeout(() => {
            sc.style.scrollSnapType = '';
            isExiting.current = false;
          }, 1000);
        }
      }
    }

    setTimeout(() => {
      isTransitioning.current = false;
    }, 500);
  }, [isLocked, currentStep, totalSteps]);

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isLocked || isTransitioning.current) return;

    e.preventDefault();
    isTransitioning.current = true;

    const sc = getScrollContainer();
    const container = containerRef.current;

    if (e.deltaY > 0) {
      // Scroll down
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
        setTimeout(() => { isTransitioning.current = false; }, 500);
      } else if (sc && container) {
        // Last step, go to next section
        const nextSection = container.nextElementSibling as HTMLElement;
        if (nextSection) {
          isExiting.current = true;
          setIsLocked(false);
          sc.style.overflow = '';
          sc.style.scrollSnapType = 'none';

          sc.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
          setTimeout(() => {
            sc.style.scrollSnapType = '';
            isTransitioning.current = false;
            isExiting.current = false;
          }, 1000);
        }
      }
    } else {
      // Scroll up
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
        setTimeout(() => { isTransitioning.current = false; }, 500);
      } else if (sc && container) {
        // First step, go to previous section
        const prevSection = container.previousElementSibling as HTMLElement;
        if (prevSection) {
          isExiting.current = true;
          setIsLocked(false);
          sc.style.overflow = '';
          sc.style.scrollSnapType = 'none';

          sc.scrollTo({ top: prevSection.offsetTop, behavior: 'smooth' });
          setTimeout(() => {
            sc.style.scrollSnapType = '';
            isTransitioning.current = false;
            isExiting.current = false;
          }, 1000);
        }
      }
    }
  }, [isLocked, currentStep, totalSteps]);

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

  // 점선 위치 계산
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

  const currentStepData = steps[currentStep - 1];
  const currentImage = IMAGE_MAP[currentStepData.image];

  return (
    <div ref={containerRef} className="relative h-[calc(100vh-64px)] snap-start snap-always bg-white">
      <div className="h-full w-full overflow-hidden">
        <div className="container-ecotree h-full flex flex-col justify-center">
          {/* Header - left aligned */}
          <div className="mb-8 md:mb-12 short-h:md:mb-6">
            <p className="text-[10px] md:text-[16px] text-[#1B67FF] font-medium mb-2">
              {ECOTREE_RENTAL_FLOW.label}
            </p>
            <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
              {ECOTREE_RENTAL_FLOW.title}
            </h2>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col">
            <div className="mb-2">
              <span
                className="text-[20px] md:text-[32px] text-[#1B67FF] font-normal"
                style={{ fontFamily: 'SlowGothic, sans-serif' }}
              >
                {currentStepData.number}
              </span>
              <span className="text-[18px] font-semibold text-[#000000] ml-2">
                {currentStepData.title}
              </span>
            </div>

            <p className="text-[10px] font-medium text-[#000000] mb-6">
              {currentStepData.description}
            </p>

            <div className="w-full h-[200px] relative rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src={currentImage || currentStepData.image}
                alt={currentStepData.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative w-[14px] h-[14px] flex items-center justify-center"
                >
                  <div
                    className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#97BAFF]' : 'bg-[#E0EBFF]'
                    }`}
                  />
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
            <div ref={stepsContainerRef} className="w-[320px] lg:w-[400px] flex-shrink-0 relative">
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
                      <div
                        ref={isFirst ? firstIndicatorRef : isLast ? lastIndicatorRef : null}
                        className="flex-shrink-0 relative z-10 w-[14px] h-[14px] flex items-center justify-center mt-[9px]"
                      >
                        <div className="absolute w-[16px] h-[16px] rounded-full bg-white" />
                        <div className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#97BAFF]' : 'bg-[#E0EBFF]'
                        }`} />
                        <div className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#1B67FF]' : 'bg-[#97BAFF]'
                        }`} />
                      </div>

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
                              className="text-[16px] font-medium text-[#000000] leading-relaxed mt-2 pl-[44px]"
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

            <div className="h-[400px] aspect-[16/10] relative rounded-2xl overflow-hidden bg-gray-200">
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
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
