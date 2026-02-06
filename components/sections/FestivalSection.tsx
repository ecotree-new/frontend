'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';
import { UNIVERSITY_LOGOS, REGIONAL_FESTIVALS, FESTIVAL_COUNTS } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function FestivalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [universityTrigger, setUniversityTrigger] = useState(0);
  const [regionalTrigger, setRegionalTrigger] = useState(0);

  // 대학교 섹션 진입/이탈 감지 (CountUp 트리거용)
  useEffect(() => {
    const universitySection = document.getElementById('university-festival-section');
    if (!universitySection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUniversityTrigger(prev => prev + 1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(universitySection);
    return () => observer.disconnect();
  }, []);

  // 지역 축제 섹션 진입/이탈 감지 (CountUp 트리거용)
  useEffect(() => {
    const regionalSection = document.getElementById('regional-festival-section');
    if (!regionalSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRegionalTrigger(prev => prev + 1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(regionalSection);
    return () => observer.disconnect();
  }, []);

  // 등장 애니메이션
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section ref={containerRef} className="bg-[#FBFBFB] pt-16 pb-12 md:py-16 lg:py-20">
      <div className="container-ecotree">
        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-[18px] md:text-[32px] lg:text-[40px] font-bold text-[#000000] text-center mb-12 md:mb-16"
        >
          에코트리와 함께 환경을 지켜온 축제
        </motion.h2>

        {/* University Section */}
        <motion.div
          id="university-festival-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 md:mb-20"
        >
          {/* University Subtitle & Count */}
          <div className="text-center mb-8">
            <p className="text-[12px] md:text-[24px] lg:text-[24px] font-medium md:font-semibold lg:font-semibold text-[#111111] mb-2">대학교 축제</p>
            <p className="text-[30px] md:text-[64px] lg:text-[64px] font-bold text-[#1B67FF]">
              <CountUp end={FESTIVAL_COUNTS.university} trigger={universityTrigger} />
              <span className="text-[12px] md:text-[20px] lg:text-[20px] font-medium text-[#111111] ml-2">곳</span>
            </p>
          </div>

          {/* University Logos */}
          <div className="grid grid-cols-3 min-[824px]:grid-cols-4 min-[1022px]:grid-cols-5 gap-x-6 lg:gap-x-[48px] gap-y-4">
            {UNIVERSITY_LOGOS.map((uni, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={IMAGE_MAP[uni.logo] || uni.logo}
                  alt={uni.name}
                  width={150}
                  height={36}
                  className="object-contain w-[150px] h-auto"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regional Section - Title & Count */}
        <motion.div
          id="regional-festival-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {/* Regional Subtitle & Count */}
          <div className="text-center mb-8">
            <p className="text-[12px] md:text-[24px] lg:text-[24px] font-medium md:font-semibold lg:font-semibold text-[#111111] mb-2">지역 축제</p>
            <p className="text-[30px] md:text-[64px] lg:text-[64px] font-bold text-[#1B67FF]">
              <CountUp end={FESTIVAL_COUNTS.regional} trigger={regionalTrigger} />
              <span className="text-[12px] md:text-[20px] lg:text-[20px] font-medium text-[#111111] ml-2">곳</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Regional Festival Names - Wider container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[1400px] mx-auto px-4 md:px-8"
      >
        <p className="text-[14px] md:text-[16px] text-[#111111] font-bold leading-loose text-center">
          {REGIONAL_FESTIVALS.map((festival, index) => (
            <span
              key={index}
              className="inline-block whitespace-nowrap"
              style={{ wordBreak: 'keep-all' }}
            >
              {festival}
              {index < REGIONAL_FESTIVALS.length - 1 && <span className="mr-1">,</span>}
            </span>
          ))}
        </p>
      </motion.div>
    </section>
  );
}
