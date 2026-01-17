'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ABOUT_VISION_MISSION } from '@/lib/constants';
import { R2_IMAGES } from '@/lib/images';

function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [horizontalInset, setHorizontalInset] = useState('12%');
  const [topInset, setTopInset] = useState('62%');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateInsets = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 64;
      const mobile = viewportWidth < 768;
      setIsMobile(mobile);

      if (mobile) return; // 모바일에서는 inset 계산 불필요

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

  const vision = ABOUT_VISION_MISSION[0];

  // 모바일: 애니메이션 없이 풀스크린
  if (isMobile) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
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
            <p className="text-[14px] leading-relaxed whitespace-pre-line text-white">
              {vision.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 데스크탑: 애니메이션 적용
  return (
    <div ref={containerRef} className="relative h-[200vh]">
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
              className="text-[16px] lg:text-[18px] leading-relaxed whitespace-pre-line max-w-[600px]"
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

  const mission = ABOUT_VISION_MISSION[1];

  // 모바일: 애니메이션 없이 풀스크린
  if (isMobile) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
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
            <p className="text-[14px] leading-relaxed whitespace-pre-line text-white">
              {mission.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 데스크탑: 애니메이션 적용
  return (
    <div ref={containerRef} className="relative h-[200vh]">
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
              className="text-[16px] lg:text-[18px] leading-relaxed whitespace-pre-line max-w-[600px]"
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
