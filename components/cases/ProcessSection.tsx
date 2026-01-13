'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CASES_PROCESS_STEPS } from '@/lib/constants';

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#F8F9FA] py-12 md:py-20 lg:py-30"
    >
      <div className="container-ecotree">
        {/* Title Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1F23] text-white text-center h-[40px] md:h-[48px] flex items-center justify-center mb-4 md:mb-6"
        >
          <p className="text-[16px] md:text-[20px] font-semibold">
            서비스 도입 프로세스
          </p>
        </motion.div>

        {/* Cards Grid - 4 columns on lg+, 3 columns on md, 2 columns on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
        >
          {CASES_PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`bg-white py-6 px-4 md:py-8 md:px-6 lg:py-12 lg:px-8 rounded-2xl md:rounded-3xl ${index === 3 ? 'md:col-span-3 lg:col-span-1' : ''}`}
                style={{ boxShadow: '0px 0px 10px 0px #0000001A' }}
              >
              {/* Number */}
              <span
                className="text-[#1B67FF] text-[24px] md:text-[28px] lg:text-[32px]"
                style={{
                  fontFamily: 'SlowGothic',
                  fontWeight: 400,
                  lineHeight: '1.25',
                }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold text-[#1B67FF] mt-3 md:mt-4 mb-3 md:mb-4.5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] md:text-[13px] lg:text-[14px] font-bold text-[#111111] mb-3 md:mb-5">
                {step.description}
              </p>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
