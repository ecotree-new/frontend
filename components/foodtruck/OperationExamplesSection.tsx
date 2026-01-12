'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FOODTRUCK_OPERATION_SECTION, FOODTRUCK_OPERATION_ROW1, FOODTRUCK_OPERATION_ROW2 } from '@/lib/constants';

export default function OperationExamplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Duplicate for infinite loop
  const duplicatedRow1 = [...FOODTRUCK_OPERATION_ROW1, ...FOODTRUCK_OPERATION_ROW1];
  const duplicatedRow2 = [...FOODTRUCK_OPERATION_ROW2, ...FOODTRUCK_OPERATION_ROW2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F8F9FA] py-40 lg:py-40 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-23.5 px-10"
      >
        <h2 className="text-[40px] md:text-[40px] lg:text-[40px] font-bold text-[#111111] mb-3.5">
          {FOODTRUCK_OPERATION_SECTION.title}
        </h2>
        <p className="text-[20px] md:text-[20px] font-medium text-[#111111]">
          {FOODTRUCK_OPERATION_SECTION.subtitle}
        </p>
      </motion.div>

      {/* Slider Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative max-w-[1110px] mx-auto overflow-hidden"
      >
        {/* Row 1 - Foodtruck */}
        <div className="flex gap-6 mb-6 animate-slide-operation-1">
          {duplicatedRow1.map((card, index) => (
            <div
              key={`row1-${card.id}-${index}`}
              className="w-[400px] h-[290px] flex-shrink-0 overflow-hidden bg-white shadow-sm flex flex-col"
            >
              {/* Card Image */}
              <div className="relative w-full flex-1 bg-gray-200">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Card Title */}
              <div className="bg-[#111111] px-4 py-3">
                <p className="text-[14px] text-white text-center">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Catering (Offset 200px) */}
        <div className="flex gap-6 animate-slide-operation-2" style={{ marginLeft: '200px' }}>
          {duplicatedRow2.map((card, index) => (
            <div
              key={`row2-${card.id}-${index}`}
              className="w-[400px] h-[290px] flex-shrink-0 overflow-hidden bg-white shadow-sm flex flex-col"
            >
              {/* Card Image */}
              <div className="relative w-full flex-1 bg-gray-200">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Card Title */}
              <div className="bg-[#111111] px-4 py-3">
                <p className="text-[14px] text-white text-center">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
