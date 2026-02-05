'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_RENTAL_FLOW } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

// Custom smooth scroll with snap disable during animation
function smoothScrollTo(target: number, duration: number = 800) {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

  document.documentElement.style.scrollSnapType = 'none';

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    window.scrollTo(0, start + distance * easeProgress);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    }
  };

  requestAnimationFrame(animate);
}

export default function RentalFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const firstIndicatorRef = useRef<HTMLDivElement>(null);
  const lastIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [lineStyle, setLineStyle] = useState({ top: 7, height: 200 });
  const [isInSection, setIsInSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canExitDown, setCanExitDown] = useState(false);
  const [canExitUp, setCanExitUp] = useState(false);
  const isAnimating = useRef(false);
  const isExiting = useRef(false);
  const accumulatedDelta = useRef(0);
  const deltaResetTimer = useRef<NodeJS.Timeout | null>(null);

  const steps = ECOTREE_RENTAL_FLOW.steps;
  const totalSteps = steps.length;
  const DELTA_THRESHOLD = 50; // 트랙패드 누적 threshold

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const headerHeight = 64;
      const threshold = 10;

      const inSection = Math.abs(rect.top - headerHeight) < threshold;
      setIsInSection(inSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when in section (both desktop and mobile)
  useEffect(() => {
    if (isInSection && sectionRef.current && !isAnimating.current && !isExiting.current) {
      // 정확한 위치로 스크롤 보정 (섹션 이동/나가는 중이 아닐 때만)
      const targetY = sectionRef.current.offsetTop - 64;
      if (Math.abs(window.scrollY - targetY) > 1) {
        window.scrollTo(0, targetY);
      }
      document.body.style.overflow = 'hidden';
    } else if (!isInSection || isExiting.current) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isInSection]);

  // Reset exit flags when step changes
  useEffect(() => {
    if (currentStep !== totalSteps) {
      setCanExitDown(false);
    }
    if (currentStep !== 1) {
      setCanExitUp(false);
    }
  }, [currentStep, totalSteps]);

  // Wheel event handler for step transitions
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!sectionRef.current || !isInSection || isAnimating.current || isMobile) return;

    e.preventDefault();
    e.stopPropagation();

    // Accumulate delta for trackpad
    accumulatedDelta.current += e.deltaY;

    // Reset accumulated delta after a short delay
    if (deltaResetTimer.current) {
      clearTimeout(deltaResetTimer.current);
    }
    deltaResetTimer.current = setTimeout(() => {
      accumulatedDelta.current = 0;
    }, 150);

    // Only trigger action when threshold is reached
    if (Math.abs(accumulatedDelta.current) < DELTA_THRESHOLD) return;

    const direction = accumulatedDelta.current > 0 ? 'down' : 'up';
    accumulatedDelta.current = 0; // Reset after triggering

    const animationDuration = 600;

    if (direction === 'down') {
      if (currentStep < totalSteps) {
        isAnimating.current = true;
        setCurrentStep(prev => prev + 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, animationDuration);
      } else if (currentStep === totalSteps) {
        if (!canExitDown) {
          setCanExitDown(true);
        } else {
          isAnimating.current = true;
          isExiting.current = true;
          document.body.style.overflow = '';
          const nextSection = sectionRef.current.nextElementSibling as HTMLElement;
          if (nextSection) {
            smoothScrollTo(nextSection.offsetTop - 64, 800);
          }
          setTimeout(() => {
            isAnimating.current = false;
            isExiting.current = false;
            setCanExitDown(false);
          }, 1000);
        }
      }
    } else {
      if (currentStep > 1) {
        isAnimating.current = true;
        setCurrentStep(prev => prev - 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, animationDuration);
      } else if (currentStep === 1) {
        if (!canExitUp) {
          setCanExitUp(true);
        } else {
          isAnimating.current = true;
          isExiting.current = true;
          document.body.style.overflow = '';
          const prevSection = sectionRef.current.previousElementSibling as HTMLElement;
          if (prevSection) {
            smoothScrollTo(prevSection.offsetTop - 64, 800);
          }
          setTimeout(() => {
            isAnimating.current = false;
            isExiting.current = false;
            setCanExitUp(false);
          }, 1000);
        }
      }
    }
  }, [currentStep, totalSteps, isInSection, isMobile, canExitDown, canExitUp]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (deltaResetTimer.current) {
        clearTimeout(deltaResetTimer.current);
      }
    };
  }, [handleWheel, isMobile]);

  // Touch event handler for mobile
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isInSection || !isMobile || isExiting.current) return;

    touchDeltaY.current = touchStartY.current - e.touches[0].clientY;

    // 섹션 내에 있을 때 스크롤 방지 (나가는 중이 아닐 때만)
    e.preventDefault();
  }, [isInSection, isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!sectionRef.current || !isInSection || isAnimating.current || !isMobile) return;

    const deltaY = touchDeltaY.current;
    const threshold = 30;
    const animationDuration = 600;

    if (Math.abs(deltaY) < threshold) return;

    if (deltaY > 0) {
      if (currentStep < totalSteps) {
        isAnimating.current = true;
        setCurrentStep(prev => prev + 1);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (currentStep === totalSteps) {
        if (!canExitDown) {
          setCanExitDown(true);
        } else {
          isAnimating.current = true;
          isExiting.current = true;
          document.body.style.overflow = '';
          const nextSection = sectionRef.current.nextElementSibling as HTMLElement;
          if (nextSection) {
            smoothScrollTo(nextSection.offsetTop - 64, 800);
          }
          setTimeout(() => {
            isAnimating.current = false;
            isExiting.current = false;
            setCanExitDown(false);
          }, 1000);
        }
      }
    } else {
      if (currentStep > 1) {
        isAnimating.current = true;
        setCurrentStep(prev => prev - 1);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (currentStep === 1) {
        if (!canExitUp) {
          setCanExitUp(true);
        } else {
          isAnimating.current = true;
          isExiting.current = true;
          document.body.style.overflow = '';
          const prevSection = sectionRef.current.previousElementSibling as HTMLElement;
          if (prevSection) {
            smoothScrollTo(prevSection.offsetTop - 64, 800);
          }
          setTimeout(() => {
            isAnimating.current = false;
            isExiting.current = false;
            setCanExitUp(false);
          }, 1000);
        }
      }
    }
  }, [currentStep, totalSteps, isInSection, isMobile, canExitDown, canExitUp]);

  useEffect(() => {
    if (!isMobile) return;
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, isMobile]);

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
    <section ref={sectionRef} className="snap-section relative h-[calc(100vh-64px)] bg-white">
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
    </section>
  );
}
