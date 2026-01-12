'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FOODTRUCK_MENU_SECTION, FOODTRUCK_MENU_IMAGES_ROW1, FOODTRUCK_MENU_IMAGES_ROW2, FOODTRUCK_MENU_BG } from '@/lib/constants';

export default function MenuSliderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Duplicate images for infinite loop
  const duplicatedRow1 = [...FOODTRUCK_MENU_IMAGES_ROW1, ...FOODTRUCK_MENU_IMAGES_ROW1];
  const duplicatedRow2 = [...FOODTRUCK_MENU_IMAGES_ROW2, ...FOODTRUCK_MENU_IMAGES_ROW2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#1E1F23] pt-40 overflow-hidden"
    >
      {/* Content */}
      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16 px-10"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-white mb-4">
            {FOODTRUCK_MENU_SECTION.title}
          </h2>
          <p className="text-[14px] md:text-[16px] text-white/70">
            {FOODTRUCK_MENU_SECTION.subtitle}
          </p>
        </motion.div>

        {/* Menu Slider Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-[1110px] mx-auto mb-24 overflow-hidden"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1E1F23] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1E1F23] to-transparent z-10 pointer-events-none" />

          {/* Row 1 */}
          <div className="flex gap-4 mb-4 animate-slide-row-1">
            {duplicatedRow1.map((img, index) => (
              <div
                key={`row1-${img.id}-${index}`}
                className="w-[160px] h-[120px] md:w-[180px] md:h-[135px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-700 relative"
              >
                <Image
                  src={img.image}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Offset 160px */}
          <div className="flex gap-4 animate-slide-row-2" style={{ marginLeft: '160px' }}>
            {duplicatedRow2.map((img, index) => (
              <div
                key={`row2-${img.id}-${index}`}
                className="w-[160px] h-[120px] md:w-[180px] md:h-[135px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-700 relative"
              >
                <Image
                  src={img.image}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Globe Image */}
        <div className="relative w-full max-w-[1110px] mx-auto">
          <Image
            src={FOODTRUCK_MENU_BG}
            alt="Globe"
            width={1110}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
