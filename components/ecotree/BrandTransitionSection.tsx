'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ECOTREE_BRAND_TRANSITION } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

const HEADER_HEIGHT = 64;

// Custom smooth scroll with snap disable during animation
function smoothScrollTo(target: number, duration: number = 800, onComplete?: () => void, reEnableSnap: boolean = true) {
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
      // Only re-enable snap if requested
      if (reEnableSnap) {
        document.documentElement.style.scrollSnapType = 'y mandatory';
      }
      onComplete?.();
    }
  };

  requestAnimationFrame(animate);
}

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(4500);
  const [isMobile, setIsMobile] = useState(false);
  const isAutoScrolling = useRef(false);
  const accumulatedDelta = useRef(0);
  const deltaResetTimer = useRef<NodeJS.Timeout | null>(null);

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

  // Calculate scroll distance based on viewport
  useEffect(() => {
    const calculateDistance = () => {
      const mobile = window.innerWidth < 768;
      const imageHeight = mobile ? window.innerWidth * 4.8 : 4000;
      const distance = window.innerHeight * 0.8 + imageHeight;
      setScrollDistance(distance);
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, []);

  // useScroll for scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Check if at title position (section top is near header)
  const isAtTitle = useCallback(() => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    // More generous threshold for non-snap sections
    return rect.top <= HEADER_HEIGHT + 100 && rect.top >= HEADER_HEIGHT - 100;
  }, []);

  // Check if at logo position (section bottom is near viewport bottom)
  const isAtLogo = useCallback(() => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    return rect.bottom <= window.innerHeight + 100 && rect.bottom >= window.innerHeight - 100;
  }, []);

  // Trigger auto scroll animation
  const triggerAutoScroll = useCallback((direction: 'down' | 'up') => {
    if (isAutoScrolling.current || !containerRef.current) return;

    isAutoScrolling.current = true;
    document.body.style.overflow = 'hidden';

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    let targetScroll: number;

    if (direction === 'down') {
      // Scroll to logo position (end of section)
      targetScroll = window.scrollY + rect.top - HEADER_HEIGHT + container.offsetHeight - window.innerHeight + HEADER_HEIGHT;
    } else {
      // Scroll back to title position
      targetScroll = window.scrollY + rect.top - HEADER_HEIGHT;
    }

    smoothScrollTo(targetScroll, 4000, () => {
      isAutoScrolling.current = false;
      document.body.style.overflow = '';
    });
  }, []);

  // Scroll to next section (ProductShowcaseSection)
  const scrollToNextSection = useCallback(() => {
    if (!containerRef.current || isAutoScrolling.current) return;

    isAutoScrolling.current = true;
    document.body.style.overflow = 'hidden';

    // Calculate absolute target position: BrandTransitionSection ends, ProductShowcaseSection begins
    // Target scroll = position where next section's top is at header level
    const thisSection = containerRef.current;
    const targetScroll = thisSection.offsetTop + thisSection.offsetHeight - HEADER_HEIGHT + 2;
    // Don't re-enable snap since we're entering non-snap area
    smoothScrollTo(targetScroll, 800, () => {
      document.body.style.overflow = '';
      // Keep blocking for a bit to prevent trackpad momentum interference
      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 200);
    }, false);
  }, []);

  // Scroll to previous section
  const scrollToPrevSection = useCallback(() => {
    if (!containerRef.current || isAutoScrolling.current) return;

    isAutoScrolling.current = true;
    document.body.style.overflow = 'hidden';

    const prevSection = containerRef.current.previousElementSibling as HTMLElement;
    if (prevSection) {
      const rect = prevSection.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.top - HEADER_HEIGHT;
      smoothScrollTo(targetScroll, 800, () => {
        document.body.style.overflow = '';
        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 200);
      });
    } else {
      document.body.style.overflow = '';
      isAutoScrolling.current = false;
    }
  }, []);

  // Wheel event handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAutoScrolling.current || isMobile) return;

    const atTitle = isAtTitle();
    const atLogo = isAtLogo();

    // Only handle when at specific positions
    if (!atTitle && !atLogo) return;

    // Double-check we're actually within this section's scroll range
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // If the section top is way below or above viewport, don't handle
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

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

    if (direction === 'down') {
      if (atTitle) {
        // At title, start auto scroll to logo
        triggerAutoScroll('down');
      } else if (atLogo) {
        // At logo, scroll to next section
        scrollToNextSection();
      }
    } else {
      if (atLogo) {
        // At logo, scroll back to title
        triggerAutoScroll('up');
      } else if (atTitle) {
        // At title, scroll to previous section
        scrollToPrevSection();
      }
    }
  }, [isMobile, isAtTitle, isAtLogo, triggerAutoScroll, scrollToNextSection, scrollToPrevSection]);

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

  // Touch event handlers for mobile
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAutoScrolling.current || touchStartY.current === null || !isMobile) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const isValidSwipe = Math.abs(deltaY) > 30;

    if (!isValidSwipe) {
      touchStartY.current = null;
      return;
    }

    const atTitle = isAtTitle();
    const atLogo = isAtLogo();

    if (!atTitle && !atLogo) {
      touchStartY.current = null;
      return;
    }

    const swipingDown = deltaY > 0;
    const swipingUp = deltaY < 0;

    if (swipingDown) {
      if (atTitle) {
        triggerAutoScroll('down');
      } else if (atLogo) {
        scrollToNextSection();
      }
    } else if (swipingUp) {
      if (atLogo) {
        triggerAutoScroll('up');
      } else if (atTitle) {
        scrollToPrevSection();
      }
    }

    touchStartY.current = null;
  }, [isMobile, isAtTitle, isAtLogo, triggerAutoScroll, scrollToNextSection, scrollToPrevSection]);

  useEffect(() => {
    if (!isMobile) return;
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd, isMobile]);

  // Transform values
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [1, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.75], [0, -scrollDistance]);
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 1],
    ['#FBFBFB', '#FBFBFB', '#1E1F23', '#1E1F23']
  );
  const logoOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const logoY = useTransform(scrollYProgress, [0.55, 0.7], [30, 0]);

  return (
    <section ref={containerRef} className="snap-section relative h-[600vh] bg-[#FBFBFB]">
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden z-10"
      >
        {/* Title + Image Container */}
        <motion.div
          style={{ y: contentY }}
          className="absolute inset-x-0 top-0"
        >
          {/* Title */}
          <motion.h2
            style={{ opacity: titleOpacity }}
            className="h-[calc(100vh-64px)] flex items-center justify-center text-[24px] md:text-[48px] font-bold text-[#000000] text-center whitespace-nowrap"
          >
            {ECOTREE_BRAND_TRANSITION.title}
          </motion.h2>

          {/* Product Images */}
          <div className="relative w-[120vw] md:w-[1000px] lg:w-[1200px] h-[480vw] md:h-[4000px] lg:h-[4800px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:mx-auto -mt-[20vh]">
            <Image
              src={IMAGE_MAP[ECOTREE_BRAND_TRANSITION.productImages] || ECOTREE_BRAND_TRANSITION.productImages}
              alt="다회용기 제품들"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Brand Logo Section */}
        <motion.div
          style={{ opacity: logoOpacity, y: logoY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex gap-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>

          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-white tracking-wider mb-6">
            {ECOTREE_BRAND_TRANSITION.brandName}
          </h2>

          <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
            <Image
              src={IMAGE_MAP[ECOTREE_BRAND_TRANSITION.brandIcon] || ECOTREE_BRAND_TRANSITION.brandIcon}
              alt="Ecotree Icon"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
