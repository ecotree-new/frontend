'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';
import { UNIVERSITY_LOGOS, REGIONAL_FESTIVALS, FESTIVAL_COUNTS } from '@/lib/constants';

export default function FestivalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#FBFBFB]"
    >
      <div className="container-ecotree">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111]">
            에코트리와 함께 환경을 지켜온 축제
          </h2>
        </motion.div>

        {/* University Festivals */}
        <div className="mb-20">
          {/* University Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <p className="text-[14px] text-[#727783] mb-2">대학교 축제</p>
            <p className="text-[48px] md:text-[64px] font-bold text-[#1B67FF]">
              <CountUp end={FESTIVAL_COUNTS.university} isInView={isInView} />
              <span className="text-[20px] md:text-[24px] font-medium text-[#727783] ml-2">곳</span>
            </p>
          </motion.div>

          {/* University Logos Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {UNIVERSITY_LOGOS.map((uni, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm"
              >
                <Image
                  src={uni.logo}
                  alt={uni.name}
                  width={100}
                  height={40}
                  className="object-contain max-h-[40px]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Regional Festivals */}
        <div>
          {/* Regional Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-[14px] text-[#727783] mb-2">지역 축제</p>
            <p className="text-[48px] md:text-[64px] font-bold text-[#1B67FF]">
              <CountUp end={FESTIVAL_COUNTS.regional} isInView={isInView} />
              <span className="text-[20px] md:text-[24px] font-medium text-[#727783] ml-2">곳</span>
            </p>
          </motion.div>

          {/* Regional Festival Names */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-[14px] md:text-[16px] text-[#727783] leading-loose">
              {REGIONAL_FESTIVALS.map((festival, index) => (
                <span
                  key={index}
                  className="inline-block whitespace-nowrap"
                >
                  {festival}
                  {index < REGIONAL_FESTIVALS.length - 1 && (
                    <span className="mx-2">,</span>
                  )}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
