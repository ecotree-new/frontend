'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FOODTRUCK_SERVICE_CARDS } from '@/lib/constants';

export default function ServiceCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
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
      className="bg-[#F8F9FA] h-[calc(100vh-64px)] flex flex-col justify-center snap-start snap-always overflow-hidden"
    >
      <div className="container-ecotree">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 lg:mb-18.5 short-h:lg:mb-6"
        >
          <h2 className="text-[18px] md:text-[32px] lg:text-[40px] short-h:lg:text-[32px] font-bold text-[#111111] mb-3 md:mb-4 short-h:lg:mb-2">
            행사 목적에 맞는 운영 방식을 제안
          </h2>
          <p className="text-[10px] md:text-[16px] lg:text-[20px] short-h:lg:text-[16px] font-medium text-[#111111]">
            행사 성격과 운영 환경에 따라 적절한 운영 방식을 선택할 수 있습니다.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-7.5"
        >
          {FOODTRUCK_SERVICE_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm"
            >
              {/* Card Header */}
              <div className="bg-[#1E1F23] px-4 py-6 md:px-10 md:py-8 lg:px-14 lg:py-12 short-h:lg:px-10 short-h:lg:py-8">
                <h3 className="text-[16px] md:text-[24px] lg:text-[32px] short-h:lg:text-[24px] font-semibold text-white">
                  {card.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="pl-4 pr-1 py-4 md:px-10 md:py-8 lg:px-14 lg:py-12 short-h:lg:px-10 short-h:lg:py-4">
                {/* Subtitle */}
                <p className="text-[10px] md:text-[16px] lg:text-[24px] short-h:lg:text-[18px] font-semibold text-[#1B67FF] mb-4 md:mb-8 lg:mb-10 short-h:lg:mb-4">
                  {card.subtitle}
                </p>

                {/* Items List */}
                <ul className="space-y-2 md:space-y-4 short-h:lg:space-y-2 mb-4 md:mb-8 lg:mb-10 short-h:lg:mb-4">
                  {card.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3">
                      <span className="w-2.5 h-2.5 md:w-5 md:h-5 short-h:lg:w-4 short-h:lg:h-4 rounded-full bg-[#1B67FF]/20 flex items-center justify-center mt-0.5 md:mt-1 short-h:lg:mt-0.5 flex-shrink-0">
                        <span className="w-[4.8px] h-[4.8px] md:w-2 md:h-2 rounded-full bg-[#1B67FF]" />
                      </span>
                      <span className="text-[10px] md:text-[16px] lg:text-[20px] short-h:lg:text-[16px] font-medium text-[#111111]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tag */}
                <div className="inline-flex items-center justify-center px-3 py-2 md:px-6 md:py-2 lg:px-6 lg:py-2 short-h:lg:px-4 short-h:lg:py-1.5 bg-[#E0EBFF] rounded-3xl md:rounded-full lg:rounded-full">
                  <span className="text-[9px] md:text-[16px] lg:text-[16px] short-h:lg:text-[14px] font-medium text-[#1B67FF]">
                    {card.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
