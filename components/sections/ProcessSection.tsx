'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { PROCESS_CARDS } from '@/lib/constants';

export default function ProcessSection() {
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
            이렇게 운영합니다.
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
            체계적인 4단계 순환 시스템
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          {PROCESS_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`
                bg-white rounded-b-xl p-6 
                ${index === 3 ? 'col-span-3 lg:col-span-1' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-6">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#E0EBFF] rounded-lg flex items-center justify-center">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={24}
                    height={24}
                    className="text-[#1B67FF]"
                  />
                </div>

                {/* Number */}
                <span className="text-[32px] font-bold text-[#97BAFF]">
                  {String(card.id).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[20px] md:text-[24px] font-bold text-[#111111] mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[16px] text-[#727783] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
