'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ABOUT_VISION_MISSION } from '@/lib/constants';
import { R2_IMAGES } from '@/lib/images';

// Custom smooth scroll
function smoothScrollTo(target: number, duration: number = 1200) {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

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
    }
  };

  requestAnimationFrame(animate);
}

function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [horizontalInset, setHorizontalInset] = useState('12%');
  const [topInset, setTopInset] = useState('62%');
  const [isMobile, setIsMobile] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const updateInsets = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 64;
      const mobile = viewportWidth < 768;
      setIsMobile(mobile);

      if (mobile) return;

      let containerWidth: number;
      if (viewportWidth >= 1190) {
        containerWidth = 1110;
      } else {
        containerWidth = viewportWidth - 80;
      }
      const sideMargin = (viewportWidth - containerWidth) / 2;
      const horizontalPercent = (sideMargin / viewportWidth) * 100;
      setHorizontalInset(`${horizontalPercent}%`);

      const paddingTop = 320;
      const textHeight = 150;
      const gap = 200;
      const imageTop = paddingTop + textHeight + gap;
      const topPercent = (imageTop / viewportHeight) * 100;
      setTopInset(`${Math.max(40, Math.min(topPercent, 75))}%`);
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    return () => window.removeEventListener('resize', updateInsets);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const inSection = latest > 0 && latest < 0.95;
    setIsInSection(inSection);
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      `inset(${topInset} ${horizontalInset} 0% ${horizontalInset} round 16px 16px 0px 0px)`,
      'inset(0% 0% 0% 0% round 0px 0px 0px 0px)'
    ]
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 0.5]);
  const textColor = useTransform(scrollYProgress, [0.2, 0.4], ['#111111', '#ffffff']);
  const labelColor = useTransform(scrollYProgress, [0.2, 0.4], ['#1B67FF', '#ffffff']);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || !isInSection || isAnimating.current || isMobile) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;

    const startPosition = containerTop;
    const middlePosition = containerTop + containerHeight / 2;

    const progress = scrollYProgress.get();
    const isAtStart = progress < 0.25;
    const isAtMiddle = progress >= 0.25 && progress < 0.75;

    const animationDuration = 1200;

    if (e.deltaY > 0) {
      if (isAtStart) {
        e.preventDefault();
        isAnimating.current = true;
        smoothScrollTo(middlePosition, animationDuration);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (isAtMiddle) {
        e.preventDefault();
        isAnimating.current = true;
        const missionSection = document.getElementById('mission-section');
        if (missionSection) {
          smoothScrollTo(missionSection.offsetTop, animationDuration);
        }
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      }
    } else if (e.deltaY < 0) {
      if (isAtMiddle) {
        e.preventDefault();
        isAnimating.current = true;
        smoothScrollTo(startPosition, animationDuration);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (isAtStart) {
        e.preventDefault();
        isAnimating.current = true;
        smoothScrollTo(0, animationDuration);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      }
    }
  }, [isInSection, isMobile, scrollYProgress]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isMobile]);

  const vision = ABOUT_VISION_MISSION[0];

  if (isMobile) {
    return (
      <section className="snap-section relative h-[calc(100vh-64px)] w-full overflow-hidden">
        <Image
          src={R2_IMAGES.visionImage}
          alt={vision.title}
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container-ecotree">
            <p className="text-[14px] font-medium mb-2 text-white">
              {vision.label}
            </p>
            <h2 className="text-[24px] font-bold mb-4 text-white">
              {vision.title}
            </h2>
            <p className="text-[12px] font-medium leading-relaxed whitespace-pre-line text-white">
              {vision.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} id="vision-section" className="snap-section relative h-[200vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container-ecotree">
            <motion.p
              style={{ color: labelColor }}
              className="text-[16px] font-medium mb-2"
            >
              {vision.label}
            </motion.p>
            <motion.h2
              style={{ color: textColor }}
              className="text-[40px] lg:text-[48px] font-bold mb-6"
            >
              {vision.title}
            </motion.h2>
            <motion.p
              style={{ color: textColor }}
              className="text-[20px] font-medium leading-relaxed whitespace-pre-line max-w-[650px]"
            >
              {vision.description}
            </motion.p>
          </div>
        </div>

        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0"
          >
            <Image
              src={R2_IMAGES.visionImage}
              alt={vision.title}
              fill
              className="object-cover object-right"
              priority
            />
          </motion.div>
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>
      </div>
    </div>
  );
}

function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [horizontalInset, setHorizontalInset] = useState('12%');
  const [topInset, setTopInset] = useState('62%');
  const [isMobile, setIsMobile] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const updateInsets = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 64;
      const mobile = viewportWidth < 768;
      setIsMobile(mobile);

      if (mobile) return;

      let containerWidth: number;
      if (viewportWidth >= 1190) {
        containerWidth = 1110;
      } else {
        containerWidth = viewportWidth - 80;
      }
      const sideMargin = (viewportWidth - containerWidth) / 2;
      const horizontalPercent = (sideMargin / viewportWidth) * 100;
      setHorizontalInset(`${horizontalPercent}%`);

      const paddingTop = 320;
      const textHeight = 150;
      const gap = 200;
      const imageTop = paddingTop + textHeight + gap;
      const topPercent = (imageTop / viewportHeight) * 100;
      setTopInset(`${Math.max(40, Math.min(topPercent, 75))}%`);
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    return () => window.removeEventListener('resize', updateInsets);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const inSection = latest > 0 && latest < 0.95;
    setIsInSection(inSection);
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      `inset(${topInset} ${horizontalInset} 0% ${horizontalInset} round 16px 16px 0px 0px)`,
      'inset(0% 0% 0% 0% round 0px 0px 0px 0px)'
    ]
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 0.5]);
  const textColor = useTransform(scrollYProgress, [0.2, 0.4], ['#111111', '#ffffff']);
  const labelColor = useTransform(scrollYProgress, [0.2, 0.4], ['#1B67FF', '#ffffff']);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || !isInSection || isAnimating.current || isMobile) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;

    const startPosition = containerTop;
    const middlePosition = containerTop + containerHeight / 2;

    const progress = scrollYProgress.get();
    const isAtStart = progress < 0.25;
    const isAtMiddle = progress >= 0.25 && progress < 0.75;

    const animationDuration = 1200;

    if (e.deltaY > 0) {
      if (isAtStart) {
        e.preventDefault();
        isAnimating.current = true;
        smoothScrollTo(middlePosition, animationDuration);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (isAtMiddle) {
        e.preventDefault();
        isAnimating.current = true;
        const coreValueSection = document.querySelector('[data-section="core-value"]');
        if (coreValueSection) {
          smoothScrollTo((coreValueSection as HTMLElement).offsetTop - 64, animationDuration);
        }
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      }
    } else if (e.deltaY < 0) {
      if (isAtMiddle) {
        e.preventDefault();
        isAnimating.current = true;
        smoothScrollTo(startPosition, animationDuration);
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      } else if (isAtStart) {
        e.preventDefault();
        isAnimating.current = true;
        const visionSection = document.getElementById('vision-section');
        if (visionSection) {
          const visionHeight = visionSection.offsetHeight;
          smoothScrollTo(visionSection.offsetTop + visionHeight / 2, animationDuration);
        }
        setTimeout(() => { isAnimating.current = false; }, animationDuration);
      }
    }
  }, [isInSection, isMobile, scrollYProgress]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isMobile]);

  const mission = ABOUT_VISION_MISSION[1];

  if (isMobile) {
    return (
      <section className="snap-section relative h-[calc(100vh-64px)] w-full overflow-hidden">
        <Image
          src={R2_IMAGES.missionImage}
          alt={mission.title}
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container-ecotree">
            <p className="text-[14px] font-medium mb-2 text-white">
              {mission.label}
            </p>
            <h2 className="text-[24px] font-bold mb-4 text-white">
              {mission.title}
            </h2>
            <p className="text-[12px] font-medium leading-relaxed whitespace-pre-line text-white">
              {mission.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} id="mission-section" className="snap-section relative h-[200vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container-ecotree">
            <motion.p
              style={{ color: labelColor }}
              className="text-[16px] font-medium mb-2"
            >
              {mission.label}
            </motion.p>
            <motion.h2
              style={{ color: textColor }}
              className="text-[40px] lg:text-[48px] font-bold mb-6"
            >
              {mission.title}
            </motion.h2>
            <motion.p
              style={{ color: textColor }}
              className="text-[20px] lg:text-[20px] font-medium leading-relaxed whitespace-pre-line max-w-[600px]"
            >
              {mission.description}
            </motion.p>
          </div>
        </div>

        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0"
          >
            <Image
              src={R2_IMAGES.missionImage}
              alt={mission.title}
              fill
              className="object-cover object-right"
              priority
            />
          </motion.div>
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function VisionMissionSection() {
  return (
    <>
      <VisionSection />
      <MissionSection />
    </>
  );
}
