'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FOODTRUCK_HERO_TILES, FOODTRUCK_HERO_MAIN_COPY } from '@/lib/constants';

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
    const swipingDown = deltaY > 0; // finger moved up = scrolling down
    const swipingUp = deltaY < 0;   // finger moved down = scrolling up

    // Section position checks
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
        if (currentStep < 4) {
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
          setCurrentStep(4);
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
  }, [currentStep, phase]);

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning.current) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // Section position checks (accounting for header)
    const sectionInView = rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT;
    const sectionAboveViewport = rect.bottom <= HEADER_HEIGHT;
    // Section top is at or below header (ready to animate)
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 100;

    // Phase: BEFORE (user is above hero, hasn't started animation yet)
    if (phase === 'before') {
      // Scrolling down and section is at header level - start animation
      if (scrollingDown && sectionAtHeader) {
        e.preventDefault();
        isTransitioning.current = true;
        setPhase('animating');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { isTransitioning.current = false; }, 100);
        return;
      }
      // Otherwise allow normal scroll
      return;
    }

    // Phase: ANIMATING (step 1-4 animation)
    if (phase === 'animating') {
      e.preventDefault();

      if (scrollingDown) {
        isTransitioning.current = true;
        if (currentStep < 4) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Exit to next section
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
          // Exit to above
          setPhase('before');
          document.body.style.overflow = '';
        }
        setTimeout(() => { isTransitioning.current = false; }, 600);
        return;
      }
    }

    // Phase: AFTER (user has scrolled past hero)
    if (phase === 'after') {
      // Scrolling up and section is coming back into view
      if (scrollingUp && sectionInView && !sectionAboveViewport) {
        // If section top is near header level, re-enter animation
        if (rect.top >= HEADER_HEIGHT - 100) {
          e.preventDefault();
          isTransitioning.current = true;
          setPhase('animating');
          setCurrentStep(4); // Re-enter at step 4
          document.body.style.overflow = 'hidden';
          // Scroll to position section right below header
          const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
          setTimeout(() => { isTransitioning.current = false; }, 800);
          return;
        }
      }
      // Otherwise allow normal scroll
      return;
    }
  }, [currentStep, phase]);

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

  // Initial setup - check if section is at header level on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // If section starts right below header, go directly to animating phase
    if (rect.top <= HEADER_HEIGHT + 10 && rect.top >= HEADER_HEIGHT - 10) {
      setPhase('animating');
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Get visible tiles based on current step
  const getVisibleTiles = () => {
    if (currentStep === 1) return FOODTRUCK_HERO_TILES.slice(0, 1);
    if (currentStep === 2) return FOODTRUCK_HERO_TILES.slice(0, 2);
    return FOODTRUCK_HERO_TILES;
  };

  const visibleTiles = getVisibleTiles();
  const showMainCopy = currentStep === 4;

  // Grid classes based on step and viewport
  const getGridClass = () => {
    if (isWide) {
      if (currentStep === 1) return 'grid-cols-1';
      if (currentStep === 2) return 'grid-cols-2';
      return 'grid-cols-3';
    } else {
      if (currentStep === 1) return 'grid-cols-1';
      if (currentStep === 2) return 'grid-cols-1 grid-rows-2';
      return 'grid-cols-1 grid-rows-3';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-64px)]"
    >
      <div className="sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
        <div className={`grid ${getGridClass()} h-full w-full`}>
          {visibleTiles.map((tile) => (
            <div
              key={tile.id}
              className="relative overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: tile.objectPosition }}
                  priority={tile.id === 1}
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Tile Title - Hidden on step 4 */}
              <AnimatePresence>
                {!showMainCopy && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
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

        {/* Main Copy - Step 4 */}
        <AnimatePresence>
          {showMainCopy && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
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
          {[1, 2, 3, 4].map((step) => (
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
