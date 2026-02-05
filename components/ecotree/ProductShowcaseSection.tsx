'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_PRODUCT_SHOWCASE } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

// Get the scroll container (.snap-y)
function getScrollContainer(): HTMLElement | null {
  return document.querySelector('.snap-y') as HTMLElement | null;
}

// Custom smooth scroll for the container
function smoothScrollTo(container: HTMLElement, target: number, duration: number = 800, onComplete?: () => void, reEnableSnap: boolean = false) {
  const start = container.scrollTop;
  const distance = target - start;
  const startTime = performance.now();

  // Disable snap during animation
  container.style.scrollSnapType = 'none';

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    container.scrollTop = start + distance * easeProgress;
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Re-enable snap if requested (when going back to snap area)
      if (reEnableSnap) {
        container.style.scrollSnapType = 'y mandatory';
      }
      onComplete?.();
    }
  };

  requestAnimationFrame(animate);
}

export default function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isInSection, setIsInSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasExitedDown, setHasExitedDown] = useState(false);
  const hasExitedDownRef = useRef(false);
  const isAnimating = useRef(false);
  const accumulatedDelta = useRef(0);
  const deltaResetTimer = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTop = useRef(0);
  const scrollLockRAF = useRef<number | null>(null);
  const scrollLockTarget = useRef<number | null>(null);

  const slides = ECOTREE_PRODUCT_SHOWCASE;
  const totalSlides = slides.length;
  const DELTA_THRESHOLD = 50;

  // 스크롤 위치를 강제로 고정하는 함수 (모멘텀 스크롤 방지)
  const lockScrollPosition = useCallback((targetScroll: number, duration: number = 500) => {
    const container = getScrollContainer();
    if (!container) return;

    // 기존 RAF 취소
    if (scrollLockRAF.current) {
      cancelAnimationFrame(scrollLockRAF.current);
    }

    scrollLockTarget.current = targetScroll;
    const startTime = performance.now();

    const lockFrame = () => {
      if (scrollLockTarget.current === null) return;

      const elapsed = performance.now() - startTime;
      container.scrollTop = scrollLockTarget.current;

      // duration 동안 매 프레임마다 위치 강제 고정
      if (elapsed < duration) {
        scrollLockRAF.current = requestAnimationFrame(lockFrame);
      } else {
        scrollLockRAF.current = null;
        scrollLockTarget.current = null;
      }
    };

    scrollLockRAF.current = requestAnimationFrame(lockFrame);
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (scrollLockRAF.current) {
        cancelAnimationFrame(scrollLockRAF.current);
      }
    };
  }, []);

  // Check if section is in view
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const headerHeight = 64;

      // Section is "in view" when its top is near the header position
      // Allow a tolerance of 50px for detection
      const inSection = rect.top <= headerHeight + 50 && rect.top >= headerHeight - 50;

      setIsInSection(inSection);

      // Track scroll position for direction detection
      lastScrollTop.current = container.scrollTop;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll container when in section (but not after exiting down)
  // 데스크톱 전용 - 모바일은 touchmove에서 처리
  useEffect(() => {
    const container = getScrollContainer();
    if (!container || !sectionRef.current) return;

    if (isInSection && !isMobile && !hasExitedDown && !hasExitedDownRef.current) {
      // Snap to exact position before locking
      const rect = sectionRef.current.getBoundingClientRect();
      const headerHeight = 64;
      const targetScroll = container.scrollTop + rect.top - headerHeight;

      container.style.overflow = 'hidden';
      container.scrollTop = targetScroll;
    } else if (!isMobile) {
      container.style.overflow = '';
    }
    return () => {
      if (!isMobile) {
        container.style.overflow = '';
      }
    };
  }, [isInSection, isMobile, hasExitedDown]);


  // Wheel event handler for slide transitions
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!sectionRef.current || isAnimating.current || isMobile) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const headerHeight = 64;
    const container = getScrollContainer();
    if (!container) return;

    // 역스크롤 시 섹션 진입 감지 (hasExitedDown 상태일 때)
    if (hasExitedDownRef.current && e.deltaY < 0) {
      // 섹션의 bottom이 뷰포트 하단 근처에 오면 감지 (더 일찍 감지)
      // rect.bottom >= window.innerHeight - 300: 섹션 하단이 뷰포트 하단에서 300px 이내
      const isSectionApproaching = rect.bottom >= window.innerHeight - 300 && rect.top > headerHeight;

      if (isSectionApproaching) {
        e.preventDefault();
        e.stopPropagation();

        // 애니메이션 잠금 - 다음 wheel 이벤트 무시
        isAnimating.current = true;

        hasExitedDownRef.current = false;
        setHasExitedDown(false);
        setCurrentSlide(totalSlides);

        // 섹션 위치 계산
        const targetScroll = container.scrollTop + rect.top - headerHeight;

        // 모멘텀 스크롤 방지: 500ms 동안 매 프레임마다 위치 강제 고정
        lockScrollPosition(targetScroll, 500);
        container.style.overflow = 'hidden';

        // state 업데이트 후 잠금 해제
        setTimeout(() => {
          isAnimating.current = false;
        }, 600);
        return;
      }
    }

    // 자유 스크롤 모드면 나머지 로직 스킵
    if (!isInSection || hasExitedDown || hasExitedDownRef.current) return;

    // Accumulate delta for trackpad
    accumulatedDelta.current += e.deltaY;

    if (deltaResetTimer.current) {
      clearTimeout(deltaResetTimer.current);
    }
    deltaResetTimer.current = setTimeout(() => {
      accumulatedDelta.current = 0;
    }, 150);

    if (Math.abs(accumulatedDelta.current) < DELTA_THRESHOLD) return;

    const direction = accumulatedDelta.current > 0 ? 'down' : 'up';
    accumulatedDelta.current = 0;

    const animationDuration = 600;

    if (direction === 'down') {
      if (currentSlide < totalSlides) {
        // Slide transition - prevent default scroll
        e.preventDefault();
        e.stopPropagation();
        isAnimating.current = true;
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, animationDuration);
      } else if (currentSlide === totalSlides) {
        // Exit to free scroll - let scroll happen naturally
        hasExitedDownRef.current = true;  // 즉시 반영 (useEffect보다 먼저)
        if (container) {
          container.style.overflow = '';
          container.style.scrollSnapType = 'none';
        }
        setHasExitedDown(true);
        // Don't preventDefault - allow natural scroll
      }
    } else {
      if (currentSlide > 1) {
        // Slide transition - prevent default scroll
        e.preventDefault();
        e.stopPropagation();
        isAnimating.current = true;
        setCurrentSlide(prev => prev - 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, animationDuration);
      } else if (currentSlide === 1 && container) {
        // Exit to BrandTransitionSection (logo position)
        e.preventDefault();
        e.stopPropagation();
        isAnimating.current = true;
        container.style.overflow = '';
        // ProductShowcaseSection is inside wrapper div, so get parent's previousElementSibling
        const wrapper = sectionRef.current.parentElement;
        const brandSection = wrapper?.previousElementSibling as HTMLElement;
        if (brandSection) {
          // Scroll to the logo position (section bottom at viewport bottom)
          const targetScroll = brandSection.offsetTop + brandSection.offsetHeight - window.innerHeight;
          // Re-enable snap since we're going back to snap area
          smoothScrollTo(container, targetScroll, 800, () => {
            isAnimating.current = false;
          }, true);
        } else {
          isAnimating.current = false;
        }
      }
    }
  }, [currentSlide, totalSlides, isInSection, isMobile, hasExitedDown, lockScrollPosition]);

  useEffect(() => {
    // Don't add listener if mobile
    if (isMobile) return;

    const container = getScrollContainer();
    if (!container) return;

    // Use capture phase to handle wheel events before ScrollSnapManager
    // 항상 리스너를 활성화하여 역스크롤 시 섹션 진입을 감지
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions);
      if (deltaResetTimer.current) {
        clearTimeout(deltaResetTimer.current);
      }
    };
  }, [handleWheel, isMobile]);

  // Touch event handler for mobile
  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  // 섹션 내에서 터치 스크롤 막기
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isInSection || hasExitedDownRef.current) return;
    // 섹션 내에서는 터치 스크롤 막기
    e.preventDefault();
  }, [isInSection]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!sectionRef.current || !isInSection || isAnimating.current || !isMobile) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const threshold = 50;
    const animationDuration = 600;
    const container = getScrollContainer();

    if (Math.abs(deltaY) < threshold) return;

    e.preventDefault();

    if (deltaY > 0) {
      if (currentSlide < totalSlides) {
        isAnimating.current = true;
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (currentSlide === totalSlides && container) {
        // Exit to next section immediately
        isAnimating.current = true;
        const nextSection = sectionRef.current.nextElementSibling as HTMLElement;
        if (nextSection) {
          const rect = nextSection.getBoundingClientRect();
          const targetScroll = container.scrollTop + rect.top - 64;
          smoothScrollTo(container, targetScroll, 800, () => {
            isAnimating.current = false;
          });
        } else {
          isAnimating.current = false;
        }
      }
    } else {
      if (currentSlide > 1) {
        isAnimating.current = true;
        setCurrentSlide(prev => prev - 1);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (currentSlide === 1 && container) {
        // Exit to BrandTransitionSection (logo position)
        isAnimating.current = true;
        const wrapper = sectionRef.current.parentElement;
        const brandSection = wrapper?.previousElementSibling as HTMLElement;
        if (brandSection) {
          // Scroll to the logo position (section bottom at viewport bottom)
          const targetScroll = brandSection.offsetTop + brandSection.offsetHeight - window.innerHeight;
          // Re-enable snap since we're going back to snap area
          smoothScrollTo(container, targetScroll, 800, () => {
            isAnimating.current = false;
          }, true);
        } else {
          isAnimating.current = false;
        }
      }
    }
  }, [currentSlide, totalSlides, isInSection, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const container = getScrollContainer();
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, isMobile]);

  // English title style
  const englishTitleStyle = {
    fontFamily: 'Alexandria, sans-serif',
    fontWeight: 200,
    lineHeight: '0.8',
  };

  return (
    <section ref={sectionRef} className="snap-section relative h-[calc(100vh-64px)] bg-[#FBFBFB] z-20">
      <div className="h-full w-full overflow-hidden bg-[#FBFBFB] z-10">
        <div className="container-ecotree h-full relative">
          {/* Slide 1: EVERY WHERE */}
          <AnimatePresence>
            {currentSlide === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
            )}
          </AnimatePresence>

          {/* Slide 2: VARIOUS */}
          <AnimatePresence>
            {currentSlide === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
            )}
          </AnimatePresence>

          {/* Slide 3: EASY */}
          <AnimatePresence>
            {currentSlide === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
