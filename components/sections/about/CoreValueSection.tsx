'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ABOUT_CORE_VALUES } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function CoreValueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  return (
    <section ref={sectionRef} data-section="core-value" className="snap-section h-[calc(100vh-64px)] py-12 md:py-16 lg:py-20 short-h:lg:py-12 bg-white flex items-center overflow-hidden">
      <div className="container-ecotree">
        {/* 2컬럼 레이아웃: W > 970px, 1컬럼: W ≤ 970px */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="lg:w-[280px] flex-shrink-0 mb-12 lg:mb-0"
          >
            <p className="text-[10px] md:text-[14px] lg:text-[16px] font-medium text-[#1B67FF] mb-2">
              Core Value
            </p>
            <h2 className="text-[18px] md:text-[40px] lg:text-[48px] font-bold text-[#111111]">
              핵심 가치
            </h2>
          </motion.div>

          {/* Right: Value List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex-1 space-y-12 md:space-y-16 short-h:md:space-y-8 lg:pt-[26px]"
          >
            {ABOUT_CORE_VALUES.map((value, index) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                className="flex gap-6 md:gap-8"
              >
                {/* Icon */}
                <div className="w-8 h-8 md:w-20 md:h-20 flex-shrink-0">
                  <Image
                    src={IMAGE_MAP[value.icon] || value.icon}
                    alt={value.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-[14px] md:text-[24px] lg:text-[24px] font-semibold text-[#111111] mb-2">
                    {index + 1}. {value.title} ({value.titleEn})
                  </h3>
                  <p className="text-[10px] md:text-[16px] lg:text-[16px] font-medium text-[#111111] leading-relaxed whitespace-pre-line">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
