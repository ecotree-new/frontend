'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { JOINT_CASES } from '@/lib/constants';

export default function JointCaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#EDF3FF] py-40 lg:py-40"
    >
      <div className="container-ecotree">
        {/* Section Header - Line break at 839px */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[14px] md:text-[16px] text-[#1B67FF] font-medium mb-2">
            동시 운영 사례
          </p>
          <h2 className="text-[40px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] leading-tight">
            <span className="hidden min-[840px]:inline">함께 운영했을 때 결과는 더 분명해졌습니다.</span>
            <span className="min-[840px]:hidden">
              함께 운영했을 때 결과는
              <br />
              더 분명해졌습니다.
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid - Fixed gap (24px), card width changes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {JOINT_CASES.map((caseItem) => (
            <motion.div key={caseItem.id} variants={itemVariants}>
              {/* Card Image - Fixed height 400px, width responsive */}
              <div className="relative w-full h-[400px] bg-gray-200 overflow-hidden mb-4">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover object-center"
                />

                {/* Label Badge (Inside Image) - Left aligned */}
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-1.5 bg-[#1B67FF] text-white text-[14px] md:text-[14px] font-bold rounded-full">
                    {caseItem.label}
                  </span>
                </div>
              </div>

              {/* Card Content - Left aligned */}
              <h3 className="text-[24px] md:text-[24px] lg:text-[24px] font-semibold text-[#111111] leading-tight mb-4 whitespace-pre-line text-left">
                {caseItem.title}
              </h3>

              {/* View More Button */}
              <Link
                href={caseItem.link}
                className="inline-flex items-center gap-1 text-[14px] text-[#1B67FF] font-semibold hover:font-bold transition-all cursor-pointer group"
              >
                view more
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
