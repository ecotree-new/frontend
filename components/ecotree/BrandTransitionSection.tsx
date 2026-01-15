'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { ECOTREE_BRAND_TRANSITION } from '@/lib/constants';

const HEADER_HEIGHT = 64;

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'before' | 'title' | 'animating' | 'logo' | 'after'>('before');
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const bgControls = useAnimationControls();
  const contentControls = useAnimationControls(); // Title + Image together
  const logoControls = useAnimationControls();

  // Auto animation from title to logo
  const animateToLogo = useCallback(async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setPhase('animating');

    // Calculate scroll distance based on viewport and image height
    const scrollDistance = window.innerHeight * 0.8 + 4000; // viewport + image height

    // Start all animations - title and image scroll together as one unit
    await Promise.all([
      // Background: stays light until 30%, then darkens quickly
      bgControls.start({
        backgroundColor: ['#FBFBFB', '#FBFBFB', '#1E1F23'],
        transition: { duration: 5, times: [0, 0.3, 0.55], ease: 'easeOut' }
      }),
      // Content (title + image): scrolls up by calculated distance
      contentControls.start({
        y: -scrollDistance,
        transition: {
          duration: 5,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }),
      // Logo: fades in quickly
      logoControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut', delay: 1.5 }
      })
    ]);

    setPhase('logo');
    document.body.style.overflow = '';
    isAnimating.current = false;
  }, [bgControls, contentControls, logoControls]);

  // Reverse animation from logo to title
  const animateToTitle = useCallback(async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setPhase('animating');
    document.body.style.overflow = 'hidden';

    await Promise.all([
      bgControls.start({
        backgroundColor: '#FBFBFB',
        transition: { duration: 1.5, ease: 'easeInOut' }
      }),
      contentControls.start({
        y: 0,
        transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
      }),
      logoControls.start({
        opacity: 0,
        y: 30,
        transition: { duration: 0.3, ease: 'easeOut' }
      })
    ]);

    setPhase('title');
    isAnimating.current = false;
  }, [bgControls, contentControls, logoControls]);

  // Handle wheel events
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAnimating.current) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 100;
    const sectionInView = rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT;

    // Enter title phase when section reaches header
    if (phase === 'before' && scrollingDown && sectionAtHeader) {
      e.preventDefault();
      setPhase('title');
      document.body.style.overflow = 'hidden';
      return;
    }

    // In title phase, scroll down triggers animation to logo
    if (phase === 'title') {
      e.preventDefault();
      if (scrollingDown) {
        animateToLogo();
      } else if (scrollingUp) {
        setPhase('before');
        document.body.style.overflow = '';
      }
      return;
    }

    // In logo phase
    if (phase === 'logo') {
      e.preventDefault();
      if (scrollingDown) {
        setPhase('after');
        document.body.style.overflow = '';
      } else if (scrollingUp) {
        // Lock scroll position before animating back
        const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
        window.scrollTo({ top: scrollTarget, behavior: 'instant' });
        animateToTitle();
      }
      return;
    }

    // Coming back from after phase
    if (phase === 'after' && scrollingUp && sectionInView && rect.top >= HEADER_HEIGHT - 100) {
      e.preventDefault();
      setPhase('logo');
      document.body.style.overflow = 'hidden';
      const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  }, [phase, animateToLogo, animateToTitle]);

  // Handle touch events
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (phase === 'title' || phase === 'logo' || phase === 'animating') {
      e.preventDefault();
    }
  }, [phase]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAnimating.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const minSwipeDistance = 30;

    if (Math.abs(deltaY) < minSwipeDistance) {
      touchStartY.current = null;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const swipingDown = deltaY > 0;
    const swipingUp = deltaY < 0;
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 100;
    const sectionInView = rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT;

    if (phase === 'before' && swipingDown && sectionAtHeader) {
      setPhase('title');
      document.body.style.overflow = 'hidden';
    } else if (phase === 'title' && swipingDown) {
      animateToLogo();
    } else if (phase === 'title' && swipingUp) {
      setPhase('before');
      document.body.style.overflow = '';
    } else if (phase === 'logo' && swipingDown) {
      setPhase('after');
      document.body.style.overflow = '';
    } else if (phase === 'logo' && swipingUp) {
      animateToTitle();
    } else if (phase === 'after' && swipingUp && sectionInView && rect.top >= HEADER_HEIGHT - 100) {
      setPhase('logo');
      document.body.style.overflow = 'hidden';
      const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }

    touchStartY.current = null;
  }, [phase, animateToLogo, animateToTitle]);

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

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[calc(100vh-64px)] bg-[#FBFBFB]">
      <motion.div
        animate={bgControls}
        initial={{ backgroundColor: '#FBFBFB' }}
        className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden z-10"
      >
        {/* Title + Image Container - scrolls up together */}
        <motion.div
          animate={contentControls}
          initial={{ y: 0 }}
          className="absolute inset-x-0 top-0"
        >
          {/* Title - centered in initial viewport */}
          <h2 className="h-[calc(100vh-64px)] flex items-center justify-center text-[24px] md:text-[48px] font-bold text-[#000000] text-center whitespace-nowrap">
            {ECOTREE_BRAND_TRANSITION.title}
          </h2>

          {/* Product Images - directly below title */}
          <div className="relative w-[800px] md:w-[1000px] lg:w-[1200px] h-[3200px] md:h-[4000px] lg:h-[4800px] mx-auto -mt-[20vh]">
            <Image
              src={ECOTREE_BRAND_TRANSITION.productImages}
              alt="다회용기 제품들"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Brand Logo Section */}
        <motion.div
          animate={logoControls}
          initial={{ opacity: 0, y: 30 }}
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
              src={ECOTREE_BRAND_TRANSITION.brandIcon}
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
