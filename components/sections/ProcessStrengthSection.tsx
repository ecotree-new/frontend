'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS_CARDS, STRENGTH_CARDS } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const titleBarVariants = {
  hidden: { opacity: 0, y: -30, scaleX: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="container-ecotree">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Title */}
        <motion.div
          variants={titleVariants}
          className="text-center mb-4 md:mb-6 lg:mb-12"
        >
          <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] mb-1 md:mb-2">
            에코트리는
          </h2>
          <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111]">
            이렇게 운영합니다.
          </h2>
        </motion.div>

        {/* Title Bar */}
        <motion.div
          variants={titleBarVariants}
          className="bg-[#1B67FF] text-white text-center py-2 md:py-2 lg:py-3 origin-center"
        >
          <p className="text-[12px] md:text-[20px] lg:text-[20px] font-medium">
            체계적인 4단계 순환 시스템
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={cardContainerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 mt-3 md:mt-4 lg:mt-6"
        >
          {PROCESS_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className={`bg-white rounded-[12px] md:rounded-[16px] lg:rounded-[24px] p-3 md:p-4 lg:p-[35px] ${
                index === 3 ? 'md:col-span-3 lg:col-span-1' : ''
              }`}
            >
              {/* Icon & Number Row */}
              <div className="flex justify-between items-start mb-3 md:mb-4 lg:mb-[46px]">
                <div className="w-[32px] h-[32px] md:w-[56px] md:h-[56px] flex items-center justify-center">
                  <Image
                    src={IMAGE_MAP[card.icon] || card.icon}
                    alt={card.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className="text-[30px] md:text-[48px] lg:text-[64px] leading-none text-[#DDE7FF]"
                  style={{ fontFamily: 'SlowGothic, sans-serif' }}
                >
                  {String(card.id).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[16px] md:text-[24px] lg:text-[32px] font-semibold text-[#111111] mb-2 md:mb-3 lg:mb-[46px]">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#727783] font-medium leading-relaxed whitespace-pre-line">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 자세히 보러가기 Button */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 1 },
            },
          }}
          className="flex justify-center mt-[32px] md:mt-[64px]"
        >
          <a
            href="/ecotree"
            className="flex items-center justify-center w-[96px] h-[24px] md:w-[200px] md:h-[56px] bg-[#1E1F23] text-white text-[10px] md:text-[20px] font-medium rounded"
          >
            자세히 보러가기
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StrengthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="container-ecotree">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Title */}
        <motion.div
          variants={titleVariants}
          className="text-center mb-4 md:mb-6 lg:mb-12"
        >
          <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] mb-1 md:mb-2">
            에코트리는
          </h2>
          <h2 className="text-[18px] md:text-[40px] lg:text-[40px] font-bold text-[#111111]">
            그래서 다릅니다.
          </h2>
        </motion.div>

        {/* Title Bar */}
        <motion.div
          variants={titleBarVariants}
          className="bg-[#1B67FF] text-white text-center py-2 md:py-2 lg:py-3 origin-center"
        >
          <p className="text-[12px] md:text-[20px] lg:text-[20px] font-medium">
            에코트리만의 차별화된 경쟁력
          </p>
        </motion.div>

        {/* Cards - full width, stacked */}
        <motion.div
          variants={cardContainerVariants}
          className="flex flex-col gap-3 md:gap-5 mt-3 md:mt-4 lg:mt-6"
        >
          {STRENGTH_CARDS.map((card) => {
            const iconUrl = IMAGE_MAP[card.icon] || card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                className="bg-white rounded-[12px] md:rounded-[16px] lg:rounded-[24px] py-[18.75px] md:py-[48px] px-[30px] md:px-[80px] flex items-center justify-between"
              >
                {/* Text */}
                <div>
                  {/* Label */}
                  <div className="mb-2 md:mb-3 lg:mb-4">
                    <span className="inline-block px-2 md:px-3 lg:px-4 py-0.5 bg-[#E0EBFF] text-[#1B67FF] text-[10px] md:text-[14px] font-medium rounded-full">
                      {card.label}
                    </span>
                  </div>

                  {/* Value + Unit + Title */}
                  <h3 className="text-[14px] md:text-[24px] lg:text-[28px] font-bold text-[#111111] mb-2 md:mb-3 lg:mb-4">
                    {card.value} {card.unit} {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] md:text-[14px] lg:text-[16px] font-medium text-[#727783] leading-relaxed whitespace-pre-line">
                    {card.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 ml-4 md:ml-8">
                  <Image
                    src={iconUrl}
                    alt={card.title}
                    width={100}
                    height={100}
                    className="w-[56px] h-[56px] md:w-[100px] md:h-[100px] object-contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProcessStrengthSection() {
  return (
    <section className="bg-[#F4F5F7] py-16 md:py-24 flex flex-col gap-16 md:gap-24">
      <ProcessSection />
      <StrengthSection />
    </section>
  );
}
