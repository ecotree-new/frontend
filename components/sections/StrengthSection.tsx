'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STRENGTH_CARDS } from '@/lib/constants';

export default function StrengthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#EDF3FF]"
    >
      <div className="container-ecotree">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] mb-2">
            에코트리는
          </h2>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111]">
            그래서 다릅니다.
          </h2>
        </motion.div>

        {/* Title Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1B67FF] text-white text-center py-3 rounded-t-xl mb-0"
        >
          <p className="text-[14px] md:text-[16px] font-medium">
            에코트리만의 차별화된 경쟁력
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STRENGTH_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`
                bg-white rounded-b-xl p-6 shadow-sm
                ${index === 2 ? 'col-span-2 lg:col-span-1' : ''}
              `}
            >
              {/* Label */}
              <div className="flex justify-end mb-4">
                <span className="inline-block px-3 py-1 bg-[#E0EBFF] text-[#1B67FF] text-[12px] font-medium rounded-full">
                  {card.label}
                </span>
              </div>

              {/* Value */}
              <div className="text-right mb-4">
                <span className="text-[40px] md:text-[48px] font-bold text-[#1B67FF]">
                  {card.value}
                </span>
                <span className="text-[16px] md:text-[20px] text-[#727783] ml-2">
                  {card.unit}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#111111] text-right mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-[#727783] text-right leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
