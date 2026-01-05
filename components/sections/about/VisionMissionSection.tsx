'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ABOUT_VISION_MISSION } from '@/lib/constants';

export default function VisionMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [horizontalInset, setHorizontalInset] = useState('12%');
  const [topInset, setTopInset] = useState('62%');
  const visionTextRef = useRef<HTMLDivElement>(null);

  // container-ecotree 너비에 맞춰 좌우 inset 계산 + 텍스트 아래 200px 간격으로 상단 inset 계산
  useEffect(() => {
    const updateInsets = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 64; // Header 높이 제외
      const isMobile = viewportWidth < 768;

      // 좌우 inset 계산
      let containerWidth: number;
      if (viewportWidth >= 1190) {
        containerWidth = 1110;
      } else {
        containerWidth = viewportWidth - 80;
      }
      const sideMargin = (viewportWidth - containerWidth) / 2;
      const horizontalPercent = (sideMargin / viewportWidth) * 100;
      setHorizontalInset(`${horizontalPercent}%`);

      // 상단 inset 계산: padding-top + 텍스트 높이 + 200px 간격
      const paddingTop = isMobile ? 160 : 320;
      const textHeight = isMobile ? 120 : 150; // 대략적인 텍스트 높이
      const gap = isMobile ? 100 : 200;
      const imageTop = paddingTop + textHeight + gap;
      const topPercent = (imageTop / viewportHeight) * 100;
      setTopInset(`${Math.min(topPercent, 75)}%`); // 최대 75%로 제한
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    return () => window.removeEventListener('resize', updateInsets);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 64px', 'end end'],  // Header 높이(64px) 고려
  });

  // ========== Vision Section (0% - 45%) ==========
  // clip-path로 이미지 영역 제어
  // 초기: 하단에 작은 박스 (상단만 라운드, 하단은 화면에 붙음)
  // 최종: 전체 화면
  const visionClipPath = useTransform(
    scrollYProgress,
    [0, 0.15],
    [
      `inset(${topInset} ${horizontalInset} 0% ${horizontalInset} round 16px 16px 0px 0px)`,
      'inset(0% 0% 0% 0% round 0px 0px 0px 0px)'
    ]
  );
  // 이미지 내부 살짝 확대 (시네마틱 효과)
  const visionImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  // 오버레이
  const visionOverlayOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 0.5]);
  // 텍스트 색상
  const visionTextColor = useTransform(scrollYProgress, [0.05, 0.12], ['#111111', '#ffffff']);
  const visionLabelColor = useTransform(scrollYProgress, [0.05, 0.12], ['#1B67FF', '#ffffff']);
  // Vision 섹션 opacity
  const visionSectionOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);

  // ========== Mission Section (50% - 95%) ==========
  const missionClipPath = useTransform(
    scrollYProgress,
    [0.5, 0.65],
    [
      `inset(${topInset} ${horizontalInset} 0% ${horizontalInset} round 16px 16px 0px 0px)`,
      'inset(0% 0% 0% 0% round 0px 0px 0px 0px)'
    ]
  );
  const missionImageScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.1]);
  const missionOverlayOpacity = useTransform(scrollYProgress, [0.55, 0.62], [0, 0.5]);
  const missionTextColor = useTransform(scrollYProgress, [0.55, 0.62], ['#111111', '#ffffff']);
  const missionLabelColor = useTransform(scrollYProgress, [0.55, 0.62], ['#1B67FF', '#ffffff']);
  const missionSectionOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);

  const vision = ABOUT_VISION_MISSION[0];
  const mission = ABOUT_VISION_MISSION[1];

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
        {/* Vision Section */}
        <motion.div
          style={{ opacity: visionSectionOpacity }}
          className="absolute inset-0"
        >
          {/* Text Content - 상단 고정 (디자인 기준 상단에서 320px) */}
          <div className="relative z-10 container-ecotree pt-40 md:pt-[320px]">
            <motion.p
              style={{ color: visionLabelColor }}
              className="text-[16px] font-medium mb-2"
            >
              {vision.label}
            </motion.p>
            <motion.h2
              style={{ color: visionTextColor }}
              className="text-[40px] md:text-[48px] font-bold mb-6"
            >
              {vision.title}
            </motion.h2>
            <motion.p
              style={{ color: visionTextColor }}
              className="text-[16px] md:text-[18px] leading-relaxed whitespace-pre-line max-w-[600px]"
            >
              {vision.description}
            </motion.p>
          </div>

          {/* Image Container - clip-path로 영역 제어 */}
          <motion.div
            style={{ clipPath: visionClipPath }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              style={{ scale: visionImageScale }}
              className="absolute inset-0"
            >
              <Image
                src={vision.image}
                alt={vision.title}
                fill
                className="object-cover object-right"
                priority
              />
            </motion.div>
            {/* Overlay */}
            <motion.div
              style={{ opacity: visionOverlayOpacity }}
              className="absolute inset-0 bg-black"
            />
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          style={{ opacity: missionSectionOpacity }}
          className="absolute inset-0"
        >
          {/* Text Content - 상단 고정 (디자인 기준 상단에서 320px) */}
          <div className="relative z-10 container-ecotree pt-40 md:pt-[320px]">
            <motion.p
              style={{ color: missionLabelColor }}
              className="text-[16px] font-medium mb-2"
            >
              {mission.label}
            </motion.p>
            <motion.h2
              style={{ color: missionTextColor }}
              className="text-[40px] md:text-[48px] font-bold mb-6"
            >
              {mission.title}
            </motion.h2>
            <motion.p
              style={{ color: missionTextColor }}
              className="text-[16px] md:text-[18px] leading-relaxed whitespace-pre-line max-w-[600px]"
            >
              {mission.description}
            </motion.p>
          </div>

          {/* Image Container - clip-path로 영역 제어 */}
          <motion.div
            style={{ clipPath: missionClipPath }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              style={{ scale: missionImageScale }}
              className="absolute inset-0"
            >
              <Image
                src={mission.image}
                alt={mission.title}
                fill
                className="object-cover object-right"
                priority
              />
            </motion.div>
            {/* Overlay */}
            <motion.div
              style={{ opacity: missionOverlayOpacity }}
              className="absolute inset-0 bg-black"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
