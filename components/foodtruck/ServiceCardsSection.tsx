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
      className="bg-[#F8F9FA] py-40"
    >
      <div className="container-ecotree">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-18.5"
        >
          <h2 className="text-[40px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] mb-4">
            행사 목적에 맞는 운영 방식을 제안
          </h2>
          <p className="text-[20px] md:text-[20px] font-medium text-[#111111]">
            행사 성격과 운영 환경에 따라 적절한 운영 방식을 선택할 수 있습니다.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-7.5"
        >
          {FOODTRUCK_SERVICE_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="bg-white rounded-3xl overflow-hidden shadow-sm"
            >
              {/* Card Header */}
              <div className="bg-[#1B67FF] px-14 py-12">
                <h3 className="text-[32px] md:text-[32px] font-semibold text-white">
                  {card.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="px-14 py-12">
                {/* Subtitle */}
                <p className="text-[20px] md:text-[20px] font-semibold text-[#1B67FF] mb-10">
                  {card.subtitle}
                </p>

                {/* Items List */}
                <ul className="space-y-4 mb-10">
                  {card.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#1B67FF]/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#1B67FF]" />
                      </span>
                      <span className="text-[20px] md:text-[20px] font-medium text-[#111111]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tag */}
                <div className="inline-block px-6 py-2 bg-[#E0EBFF] rounded-full">
                  <span className="text-[20px] md:text-[20px] font-semibold text-[#1B67FF]">
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
