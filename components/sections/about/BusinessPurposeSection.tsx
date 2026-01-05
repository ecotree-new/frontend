'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ABOUT_BUSINESS_PURPOSE } from '@/lib/constants';

export default function BusinessPurposeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#EDF3FF]">
      <div className="container-ecotree">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[16px] font-medium text-[#1B67FF] mb-2">
            Business Purpose
          </p>
          <h2 className="text-[40px] md:text-[48px] font-bold text-[#111111]">
            사업 목적
          </h2>
        </motion.div>

        {/* Cards Grid */}
        {/* W > 1024px: 3열, W ≤ 1024px: 2열 + 1 span */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {ABOUT_BUSINESS_PURPOSE.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className={`
                relative overflow-hidden rounded-[24px]
                h-[238px] lg:h-[500px]
                ${index === 2 ? 'col-span-2 lg:col-span-1' : ''}
              `}
            >
              {/* Background Image */}
              <div
                className={`
                  absolute inset-0 bg-cover bg-no-repeat
                  ${index === 2 ? 'bg-right lg:bg-center' : 'bg-center'}
                `}
                style={{ backgroundImage: `url(${card.image})` }}
              />

              {/* Overlay - 전체적으로 반투명 */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content - 중앙 정렬 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center">
                <h3 className="text-[20px] md:text-[24px] font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-[14px] md:text-[16px] text-white/90">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
