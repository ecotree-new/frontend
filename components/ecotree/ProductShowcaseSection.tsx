'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_PRODUCT_SHOWCASE } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

// Custom smooth scroll
function smoothScrollTo(target: number, duration: number = 800, onComplete?: () => void, reEnableSnap: boolean = false) {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

  // Disable snap during animation
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
      // Re-enable snap if requested (when going back to snap area)
      if (reEnableSnap) {
        document.documentElement.style.scrollSnapType = 'y mandatory';
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
  const isAnimating = useRef(false);
  const accumulatedDelta = useRef(0);
  const deltaResetTimer = useRef<NodeJS.Timeout | null>(null);

  const slides = ECOTREE_PRODUCT_SHOWCASE;
  const totalSlides = slides.length;
  const DELTA_THRESHOLD = 50;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if section is in view (more generous threshold since outside snap area)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const headerHeight = 64;

      // Section is in view when it's positioned at or near the header
      const inSection = rect.top <= headerHeight + 50 && rect.top >= headerHeight - 50;
      setIsInSection(inSection);

      // Reset hasExitedDown if we scroll back up to this section
      if (inSection && hasExitedDown) {
        setHasExitedDown(false);
        setCurrentSlide(totalSlides); // Reset to last slide when coming back
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasExitedDown, totalSlides]);

  // Lock body scroll when in section (but not after exiting down)
  useEffect(() => {
    if (isInSection && !isMobile && !hasExitedDown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isInSection, isMobile, hasExitedDown]);


  // Wheel event handler for slide transitions
  const handleWheel = useCallback((e: WheelEvent) => {
    // Don't handle if already exited down (free scroll mode)
    if (!sectionRef.current || !isInSection || isAnimating.current || isMobile || hasExitedDown) return;

    e.preventDefault();
    e.stopPropagation();

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
        isAnimating.current = true;
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, animationDuration);
      } else if (currentSlide === totalSlides) {
        // Exit to free scroll immediately
        document.body.style.overflow = '';
        document.documentElement.style.scrollSnapType = 'none';
        setHasExitedDown(true);
      }
    } else {
      if (currentSlide > 1) {
        isAnimating.current = true;
        setCurrentSlide(prev => prev - 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, animationDuration);
      } else if (currentSlide === 1) {
        // Exit to BrandTransitionSection (logo position)
        isAnimating.current = true;
        document.body.style.overflow = '';
        // ProductShowcaseSection is inside wrapper div, so get parent's previousElementSibling
        const wrapper = sectionRef.current.parentElement;
        const brandSection = wrapper?.previousElementSibling as HTMLElement;
        if (brandSection) {
          // Scroll to the logo position (section bottom at viewport bottom)
          const targetScroll = brandSection.offsetTop + brandSection.offsetHeight - window.innerHeight;
          // Re-enable snap since we're going back to snap area
          smoothScrollTo(targetScroll, 800, () => {
            isAnimating.current = false;
          }, true);
        } else {
          isAnimating.current = false;
        }
      }
    }
  }, [currentSlide, totalSlides, isInSection, isMobile, hasExitedDown]);

  useEffect(() => {
    // Don't add listener if mobile or already exited to free scroll
    if (isMobile || hasExitedDown) return;
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (deltaResetTimer.current) {
        clearTimeout(deltaResetTimer.current);
      }
    };
  }, [handleWheel, isMobile, hasExitedDown]);

  // Touch event handler for mobile
  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!sectionRef.current || !isInSection || isAnimating.current || !isMobile) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const threshold = 50;
    const animationDuration = 600;

    if (Math.abs(deltaY) < threshold) return;

    e.preventDefault();

    if (deltaY > 0) {
      if (currentSlide < totalSlides) {
        isAnimating.current = true;
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (currentSlide === totalSlides) {
        // Exit to next section immediately
        isAnimating.current = true;
        const nextSection = sectionRef.current.nextElementSibling as HTMLElement;
        if (nextSection) {
          const rect = nextSection.getBoundingClientRect();
          const targetScroll = window.scrollY + rect.top - 64;
          smoothScrollTo(targetScroll, 800, () => {
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
      } else if (currentSlide === 1) {
        // Exit to BrandTransitionSection (logo position)
        isAnimating.current = true;
        const wrapper = sectionRef.current.parentElement;
        const brandSection = wrapper?.previousElementSibling as HTMLElement;
        if (brandSection) {
          // Scroll to the logo position (section bottom at viewport bottom)
          const targetScroll = brandSection.offsetTop + brandSection.offsetHeight - window.innerHeight;
          // Re-enable snap since we're going back to snap area
          smoothScrollTo(targetScroll, 800, () => {
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
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd, isMobile]);

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
