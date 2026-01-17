'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ECOTREE_BRAND_TRANSITION } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

const HEADER_HEIGHT = 64;

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(4500);
  const isAutoScrolling = useRef(false);
  const hasTriggeredDown = useRef(false);
  const touchStartY = useRef<number | null>(null);

  // Calculate scroll distance based on viewport
  useEffect(() => {
    const calculateDistance = () => {
      const isMobile = window.innerWidth < 768;
      const imageHeight = isMobile ? window.innerWidth * 4.8 : 4000;
      const distance = window.innerHeight * 0.8 + imageHeight;
      setScrollDistance(distance);
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, []);

  // useScroll로 스크롤 진행도 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // easeInOutCubic 이징 함수
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // 자동 스크롤 트리거 (커스텀 애니메이션)
  const triggerAutoScroll = useCallback((direction: 'down' | 'up') => {
    if (isAutoScrolling.current || !containerRef.current) return;

    isAutoScrolling.current = true;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const startScroll = window.scrollY;
    let targetScroll: number;

    if (direction === 'down') {
      // 섹션 끝까지 스크롤
      targetScroll = window.scrollY + rect.top - HEADER_HEIGHT + container.offsetHeight - window.innerHeight + HEADER_HEIGHT;
      hasTriggeredDown.current = true;
    } else {
      // 섹션 시작점까지 스크롤
      targetScroll = window.scrollY + rect.top - HEADER_HEIGHT;
      hasTriggeredDown.current = false;
    }

    const distance = targetScroll - startScroll;
    const duration = 4000; // 4초 (느린 스크롤)
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);
      const currentScroll = startScroll + distance * easedProgress;

      window.scrollTo(0, currentScroll);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isAutoScrolling.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // wheel 이벤트 핸들러
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAutoScrolling.current) {
      e.preventDefault();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // 섹션 상단이 헤더에 도달했을 때
    const sectionAtTop = rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 50;
    // 섹션 하단이 뷰포트 하단 근처에 있을 때
    const sectionAtBottom = rect.bottom <= window.innerHeight + 50 && rect.bottom >= window.innerHeight - 50;

    if (scrollingDown && sectionAtTop && !hasTriggeredDown.current) {
      e.preventDefault();
      triggerAutoScroll('down');
    } else if (scrollingUp && sectionAtBottom && hasTriggeredDown.current) {
      e.preventDefault();
      triggerAutoScroll('up');
    }
  }, [triggerAutoScroll]);

  // touch 이벤트 핸들러
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isAutoScrolling.current) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAutoScrolling.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const isValidSwipe = Math.abs(deltaY) > 30;

    if (!isValidSwipe) {
      touchStartY.current = null;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const swipingDown = deltaY > 0;
    const swipingUp = deltaY < 0;

    const sectionNearTop = rect.top <= HEADER_HEIGHT + 100 && rect.top >= HEADER_HEIGHT - 100;
    const sectionNearBottom = rect.bottom <= window.innerHeight + 100 && rect.bottom >= window.innerHeight - 100;

    if (swipingDown && sectionNearTop && !hasTriggeredDown.current) {
      triggerAutoScroll('down');
    } else if (swipingUp && sectionNearBottom && hasTriggeredDown.current) {
      triggerAutoScroll('up');
    }

    touchStartY.current = null;
  }, [triggerAutoScroll]);

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

  // 타이틀 opacity (0~0.15) - 처음에 보이다가 사라짐
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [1, 1, 1, 0]);

  // 이미지 스크롤 (0.05~0.75) - content가 위로 스크롤
  const contentY = useTransform(scrollYProgress, [0.05, 0.75], [0, -scrollDistance]);

  // 배경색 전환 (0.25~0.45)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 1],
    ['#FBFBFB', '#FBFBFB', '#1E1F23', '#1E1F23']
  );

  // 로고 opacity (0.55~0.7)
  const logoOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const logoY = useTransform(scrollYProgress, [0.55, 0.7], [30, 0]);

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-[#FBFBFB]">
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden z-10"
      >
        {/* Title + Image Container - scrolls up together */}
        <motion.div
          style={{ y: contentY }}
          className="absolute inset-x-0 top-0"
        >
          {/* Title - centered in initial viewport */}
          <motion.h2
            style={{ opacity: titleOpacity }}
            className="h-[calc(100vh-64px)] flex items-center justify-center text-[24px] md:text-[48px] font-bold text-[#000000] text-center whitespace-nowrap"
          >
            {ECOTREE_BRAND_TRANSITION.title}
          </motion.h2>

          {/* Product Images - directly below title */}
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
          {/* Dots indicator */}
          <div className="flex gap-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>

          {/* Brand Name */}
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-white tracking-wider mb-6">
            {ECOTREE_BRAND_TRANSITION.brandName}
          </h2>

          {/* Brand Icon */}
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
