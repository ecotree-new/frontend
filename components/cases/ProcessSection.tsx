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
      className="bg-[#F8F9FA] py-30 lg:py-30"
    >
      <div className="container-ecotree">
        {/* Title Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1F23] text-white text-center h-[48px] flex items-center justify-center mb-6"
        >
          <p className="text-[20px] md:text-[20px] font-semibold">
            서비스 도입 프로세스
          </p>
        </motion.div>

        {/* Cards Grid - 4 columns on lg+, 3 columns on md, 2 columns on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {CASES_PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`bg-white py-12 px-8 rounded-3xl ${index === 3 ? 'md:col-span-3 lg:col-span-1' : ''}`}
                style={{ boxShadow: '0px 0px 10px 0px #0000001A' }}
              >
              {/* Number */}
              <span
                className="text-[#1B67FF]"
                style={{
                  fontFamily: 'SlowGothic',
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '40px',
                }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-[20px] md:text-[20px] font-bold text-[#1B67FF] mt-4 mb-4.5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[14px] font-bold text-[#111111] mb-5">
                {step.description}
              </p>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
