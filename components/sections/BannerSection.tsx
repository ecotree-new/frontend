'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, useInView } from 'framer-motion';
import { BANNER_CONTENT } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function BannerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [showSolution, setShowSolution] = useState(false);
  const [isInBannerSection, setIsInBannerSection] = useState(false);
  const isAnimating = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Track if we're in the banner section
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // We're in the banner section when progress is between 0 and ~0.67 (before leaving)
    const inSection = latest > 0 && latest < 0.67;
    setIsInBannerSection(inSection);

    // Sync state with scroll position (for manual scrolling or page load)
    if (latest > 0.33 && !showSolution) {
      setShowSolution(true);
    } else if (latest <= 0.33 && showSolution) {
      setShowSolution(false);
    }
  });

  // Handle wheel event for snap-like transition
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || !isInBannerSection || isAnimating.current) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Calculate snap positions
    const problemPosition = containerTop; // Start of banner (Problem)
    const solutionPosition = containerTop + containerHeight / 2; // Middle (Solution)
    const exitPosition = containerTop + containerHeight - viewportHeight; // End (exit)

    // Determine current state based on scroll position
    const middlePoint = containerTop + containerHeight / 4;
    const isAtProblem = scrollY < middlePoint;
    const isAtSolution = scrollY >= middlePoint && scrollY < exitPosition - 100;

    if (e.deltaY > 0) {
      // Scrolling down
      if (isAtProblem) {
        // Problem → Solution
        e.preventDefault();
        isAnimating.current = true;
        setShowSolution(true);
        window.scrollTo({
          top: solutionPosition,
          behavior: 'smooth'
        });
        setTimeout(() => { isAnimating.current = false; }, 800);
      } else if (isAtSolution) {
        // Solution → Exit (let scroll snap handle it)
        e.preventDefault();
        isAnimating.current = true;
        window.scrollTo({
          top: exitPosition + 100,
          behavior: 'smooth'
        });
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    } else if (e.deltaY < 0) {
      // Scrolling up
      if (isAtSolution) {
        // Solution → Problem
        e.preventDefault();
        isAnimating.current = true;
        setShowSolution(false);
        window.scrollTo({
          top: problemPosition,
          behavior: 'smooth'
        });
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    }
  }, [isInBannerSection, showSolution]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const renderBannerContent = (
    content: (typeof BANNER_CONTENT)[number],
    index: number
  ) => {
    const imageUrl = IMAGE_MAP[content.image] || content.image;

    return (
      <>
        {/* Desktop Layout (>1399px): 2-column */}
        <div className="hidden min-[1400px]:flex absolute inset-0">
          {/* Left: Image with dim overlay (62.5% = 1200/1920) */}
          <div className="relative w-[62.5%] h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {/* Dim overlay: right to left gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(270deg, rgba(30, 31, 35, 0.5) 0%, rgba(30, 31, 35, 0) 100%)',
              }}
            />
          </div>

          {/* Right: Text panel (37.5% = 720/1920) */}
          <div className="w-[37.5%] h-full flex items-center bg-white">
            <motion.div
              className="pl-16 xl:pl-24 pr-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Label */}
              <p className="text-[16px] font-medium text-[#1B67FF] mb-4">
                {content.label}
              </p>

              {/* Title + Highlight (2 lines) */}
              <div className="text-[40px] font-bold text-[#111111] leading-tight mb-6">
                <p>{content.title}</p>
                <p>{content.highlight}</p>
              </div>

              {/* Description */}
              <div className="text-[20px] font-medium text-[#111111] leading-relaxed">
                {content.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Responsive Layout (≤1399px): 1-column stacked */}
        <div className="flex min-[1400px]:hidden flex-col absolute inset-0">
          {/* Top: Image */}
          <div className="flex-1 relative min-h-0">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }
              }
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              {/* Dim overlay for mobile as well */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(30, 31, 35, 0.5) 0%, rgba(30, 31, 35, 0) 100%)',
                }}
              />
            </motion.div>
          </div>

          {/* Bottom: Text panel */}
          <div className="flex-shrink-0 bg-white flex items-center">
            <motion.div
              className="container-ecotree py-8 md:py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            >
              {/* Label */}
              <p className="text-[10px] md:text-[14px] font-medium text-[#1B67FF] mb-2 md:mb-3">
                {content.label}
              </p>

              {/* Title + Highlight (2 lines) */}
              <div className="text-[18px] md:text-[28px] font-bold text-[#111111] leading-tight mb-3 md:mb-4">
                <p>{content.title}</p>
                <p>{content.highlight}</p>
              </div>

              {/* Description */}
              <div className="text-[12px] md:text-[16px] font-medium text-[#111111] leading-relaxed">
                {content.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div ref={containerRef} className="snap-section relative h-[300vh]">
      {/* Sticky container - full screen, accounts for header height */}
      <div
        ref={sectionRef}
        className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden"
      >
        {/* Second Banner - Solution (always visible, behind) */}
        <div className="absolute inset-0">
          {renderBannerContent(BANNER_CONTENT[1], 1)}
        </div>

        {/* First Banner - Problem (fades out to reveal second) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showSolution ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {renderBannerContent(BANNER_CONTENT[0], 0)}
        </motion.div>
      </div>
    </div>
  );
}
