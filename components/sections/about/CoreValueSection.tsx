'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ABOUT_CORE_VALUES } from '@/lib/constants';

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
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="container-ecotree">
        {/* 2컬럼 레이아웃: W > 970px, 1컬럼: W ≤ 970px */}
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="lg:w-[280px] flex-shrink-0 mb-12 lg:mb-0"
          >
            <p className="text-[16px] font-medium text-[#1B67FF] mb-2">
              Core Value
            </p>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#111111]">
              핵심 가치
            </h2>
          </motion.div>

          {/* Right: Value List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex-1 space-y-12 md:space-y-16"
          >
            {ABOUT_CORE_VALUES.map((value, index) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                className="flex gap-6 md:gap-8"
              >
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image
                    src={value.icon}
                    alt={value.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-[24px] md:text-[28px] font-bold text-[#111111] mb-2">
                    {index + 1}. {value.title} ({value.titleEn})
                  </h3>
                  <p className="text-[14px] md:text-[16px] text-[#727783] leading-relaxed whitespace-pre-line">
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
