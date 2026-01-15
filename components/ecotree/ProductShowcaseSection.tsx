'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_PRODUCT_SHOWCASE } from '@/lib/constants';

const HEADER_HEIGHT = 64;

export default function ProductShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phase, setPhase] = useState<'before' | 'animating' | 'after'>('before');
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const slides = ECOTREE_PRODUCT_SHOWCASE;
  const totalSlides = slides.length;

  // Handle touch
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (phase === 'animating') {
      e.preventDefault();
    }
  }, [phase]);

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
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 5 && rect.top >= HEADER_HEIGHT - 5;

    if (phase === 'before' && swipingDown && sectionAtHeader) {
      isTransitioning.current = true;
      setPhase('animating');
      setCurrentSlide(0);
      document.body.style.overflow = 'hidden';
      const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
      window.scrollTo({ top: scrollTarget, behavior: 'instant' });
      setTimeout(() => { isTransitioning.current = false; }, 100);
      touchStartY.current = null;
      return;
    }

    if (phase === 'animating') {
      isTransitioning.current = true;
      if (swipingDown) {
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setPhase('after');
          document.body.style.overflow = '';
        }
      } else if (swipingUp) {
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        } else {
          setPhase('before');
          document.body.style.overflow = '';
        }
      }
      setTimeout(() => { isTransitioning.current = false; }, 600);
      touchStartY.current = null;
      return;
    }

    if (phase === 'after' && swipingUp && sectionInView && rect.top >= HEADER_HEIGHT - 100) {
      isTransitioning.current = true;
      setPhase('animating');
      setCurrentSlide(totalSlides - 1);
      document.body.style.overflow = 'hidden';
      const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      setTimeout(() => { isTransitioning.current = false; }, 800);
    }
    touchStartY.current = null;
  }, [currentSlide, phase, totalSlides]);

  // Handle wheel
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning.current) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    const sectionInView = rect.top < window.innerHeight && rect.bottom > HEADER_HEIGHT;
    const sectionAboveViewport = rect.bottom <= HEADER_HEIGHT;
    const sectionAtHeader = rect.top <= HEADER_HEIGHT + 5 && rect.top >= HEADER_HEIGHT - 5;

    if (phase === 'before' && scrollingDown && sectionAtHeader) {
      e.preventDefault();
      isTransitioning.current = true;
      setPhase('animating');
      setCurrentSlide(0);
      document.body.style.overflow = 'hidden';
      // Ensure section is exactly at header position
      const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
      window.scrollTo({ top: scrollTarget, behavior: 'instant' });
      setTimeout(() => { isTransitioning.current = false; }, 100);
      return;
    }

    if (phase === 'animating') {
      e.preventDefault();
      isTransitioning.current = true;
      if (scrollingDown) {
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setPhase('after');
          document.body.style.overflow = '';
        }
      } else if (scrollingUp) {
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        } else {
          setPhase('before');
          document.body.style.overflow = '';
        }
      }
      setTimeout(() => { isTransitioning.current = false; }, 600);
      return;
    }

    if (phase === 'after' && scrollingUp && sectionInView && !sectionAboveViewport) {
      if (rect.top >= HEADER_HEIGHT - 100) {
        e.preventDefault();
        isTransitioning.current = true;
        setPhase('animating');
        setCurrentSlide(totalSlides - 1);
        document.body.style.overflow = 'hidden';
        const scrollTarget = window.scrollY + rect.top - HEADER_HEIGHT;
        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        setTimeout(() => { isTransitioning.current = false; }, 800);
      }
    }
  }, [currentSlide, phase, totalSlides]);

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

  const currentData = slides[currentSlide];

  // English title style
  const englishTitleStyle = {
    fontFamily: 'Alexandria, sans-serif',
    fontWeight: 200,
    lineHeight: '0.8',
  };

  return (
    <section ref={containerRef} className="relative bg-[#FBFBFB] min-h-[calc(100vh-64px)] z-20">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden bg-[#FBFBFB] z-10">
        <div className="container-ecotree h-full relative">
          <AnimatePresence mode="wait">
            {/* Slide 1: EVERY WHERE */}
            {currentSlide === 0 && (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center"
              >
                {/* Left half - Image area */}
                <div className="relative w-[50%] aspect-[5/5.5]">
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute inset-0 overflow-hidden z-0"
                  >
                    <Image
                      src={currentData.image}
                      alt={currentData.koreanTitle}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </motion.div>

                  {/* EVERY - top left (half overlaps image) */}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute -top-[8%] left-[2%] text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10"
                    style={englishTitleStyle}
                  >
                    EVERY
                  </motion.span>
                </div>

                {/* Right half - Korean text at top, WHERE at bottom */}
                <div className="relative w-1/2 aspect-[3/4] flex flex-col justify-between">
                  {/* Korean text - top */}
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[24px] md:text-[48px] text-[#111111] font-bold pl-8 mt-[15%]"
                  >
                    {currentData.koreanTitle}
                  </motion.p>

                  {/* WHERE - overlaps image right side */}
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10 -ml-[15%] -translate-y-[75%]"
                    style={englishTitleStyle}
                  >
                    WHERE
                  </motion.span>
                </div>
              </motion.div>
            )}

            {/* Slide 2: VARIOUS */}
            {currentSlide === 1 && (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* VARIOUS - top left, overlaps image */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute top-[8%] left-0 text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10"
                  style={englishTitleStyle}
                >
                  VARIOUS
                </motion.span>

                {/* Image - wide landscape, centered */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative w-[75%] aspect-[2/1] overflow-hidden z-0 -mt-[10%]"
                >
                  <Image
                    src={currentData.image}
                    alt={currentData.koreanTitle}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>

                {/* Korean text - bottom left */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute bottom-[15%] left-0 text-[24px] md:text-[48px] text-[#111111] font-bold z-10"
                >
                  {currentData.koreanTitle}
                </motion.p>
              </motion.div>
            )}

            {/* Slide 3: EASY */}
            {currentSlide === 2 && (
              <motion.div
                key="slide-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Image - left (z-0) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute left-0 w-[784px] aspect-[784/500] overflow-hidden z-0"
                >
                  <Image
                    src={currentData.image}
                    alt={currentData.koreanTitle}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>

                {/* EASY - top right corner, E half overlaps image */}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute right-[2%] top-[12.5%] text-[75px] md:text-[100px] lg:text-[140px] text-[#1B67FF] z-10"
                  style={englishTitleStyle}
                >
                  EASY
                </motion.span>

                {/* Korean text - right side, left-aligned */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute bottom-[20%] right-0 text-left text-[24px] md:text-[48px] text-[#111111] font-bold whitespace-pre-line z-10"
                >
                  {currentData.koreanTitle}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
