'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ECOTREE_BRAND_TRANSITION } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';
import { useScrollContext } from './ScrollSnapManager';

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(4500);
  const [isMobile, setIsMobile] = useState(false);

  // Get current position from ScrollSnapManager context
  const { currentSection, internalStep, setAnimating } = useScrollContext();

  // This section is at index 3 in SNAP_SECTIONS
  const isActiveSection = currentSection === 3;

  // Only use context's internalStep when this section is active
  // internalStep: 0 = title position, 1 = logo position
  const isAtLogo = isActiveSection ? internalStep === 1 : currentSection > 3;

  // Use motion value for animated scroll progress
  const scrollProgress = useMotionValue(0);

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

  // Animate scroll progress based on internalStep
  useEffect(() => {
    if (!isActiveSection) {
      // Reset when not active
      animate(scrollProgress, 0, { duration: 0.3 });
      return;
    }

    // Animate to target progress based on position
    const targetProgress = isAtLogo ? 1 : 0;

    // Notify ScrollSnapManager that animation is starting
    setAnimating(true);

    animate(scrollProgress, targetProgress, {
      duration: 4,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
      onComplete: () => {
        // Notify ScrollSnapManager that animation is complete
        setAnimating(false);
      },
    });
  }, [isActiveSection, isAtLogo, scrollProgress, setAnimating]);

  // Transform values based on animated progress
  const titleOpacity = useTransform(scrollProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const contentY = useTransform(scrollProgress, [0, 1], [0, -scrollDistance]);
  const bgColor = useTransform(
    scrollProgress,
    [0, 0.3, 0.6, 1],
    ['#FBFBFB', '#FBFBFB', '#1E1F23', '#1E1F23']
  );
  const logoOpacity = useTransform(scrollProgress, [0.7, 0.9], [0, 1]);
  const logoY = useTransform(scrollProgress, [0.7, 0.9], [30, 0]);

  return (
    <section ref={containerRef} className="relative h-[calc(100vh-64px)] bg-[#FBFBFB] snap-start snap-always">
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="h-full w-full overflow-hidden"
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
