'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FOODTRUCK_HERO_TILES, FOODTRUCK_HERO_MAIN_COPY } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

type ScrollPhase = 'before' | 'animating' | 'after';

const HEADER_HEIGHT = 64; // h-16 = 64px

export default function HeroStepSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isWide, setIsWide] = useState(true);
  const [phase, setPhase] = useState<ScrollPhase>('before');
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const totalSteps = FOODTRUCK_HERO_TILES.length + 1; // tiles + main copy

  // Check viewport width
  useEffect(() => {
    const checkWidth = () => {
      setIsWide(window.innerWidth > 1280);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

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

  // Handle touch end - detect swipe direction
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isTransitioning.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const deltaTime = Date.now() - touchStartTime.current;

    // Minimum swipe distance (50px) or fast swipe (velocity > 0.3px/ms)
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
    const sectionAboveViewport = rect.bottom <= HEADER_HEIGHT;
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 100;

    // Phase: BEFORE
    if (phase === 'before') {
      if (swipingDown && sectionAtHeader) {
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { isTransitioning.current = false; }, 100);
        touchStartY.current = null;
        return;
      }
      touchStartY.current = null;
      return;
    }

    // Phase: ANIMATING
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
        touchStartY.current = null;
        return;
      }

      if (swipingUp) {
        isTransitioning.current = true;
        if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
        } else {
          setPhase('before');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
        touchStartY.current = null;
        return;
      }
    }

    // Phase: AFTER
    if (phase === 'after') {
      if (swipingUp && sectionInView && !sectionAboveViewport) {
        if (rect.top >= HEADER_HEIGHT - 100) {
          isTransitioning.current = true;
          setPhase('animating');
          setCurrentStep(totalSteps);
          document.body.style.overflow = 'hidden';
          const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
          setTimeout(() => { isTransitioning.current = false; }, 800);
          touchStartY.current = null;
          return;
        }
      }
      touchStartY.current = null;
      return;
    }

    touchStartY.current = null;
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
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 100;

    // Phase: BEFORE
    if (phase === 'before') {
      if (scrollingDown && sectionAtHeader) {
        e.preventDefault();
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { isTransitioning.current = false; }, 100);
        return;
      }
      return;
    }

    // Phase: ANIMATING
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
        return;
      }

      if (scrollingUp) {
        isTransitioning.current = true;
        if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
        } else {
          setPhase('before');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
        return;
      }
    }

    // Phase: AFTER
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
          return;
        }
      }
      return;
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

  // Initial setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 10) {
      setPhase('animating');
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const showMainCopy = currentStep === totalSteps;

  // Grid classes - always show all 3 tiles
  const getGridClass = () => {
    if (isWide) {
      return 'grid-cols-3';
    } else {
      return 'grid-cols-1 grid-rows-3';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-64px)]"
    >
      <div className="sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
        {/* Background Grid - Always show all tiles */}
        <div className={`grid ${getGridClass()} h-full w-full`}>
          {FOODTRUCK_HERO_TILES.map((tile, index) => (
            <div
              key={tile.id}
              className="relative overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={IMAGE_MAP[tile.image] || tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: tile.objectPosition }}
                  priority={tile.id === 1}
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Tile Title - Show based on step (stays visible once appeared) */}
              <AnimatePresence>
                {currentStep >= index + 1 && !showMainCopy && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-white">
                      {tile.title}
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Main Copy - Final Step */}
        <AnimatePresence>
          {showMainCopy && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="text-center px-4">
                <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-white mb-4">
                  {FOODTRUCK_HERO_MAIN_COPY.title}
                </h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentStep === step ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
