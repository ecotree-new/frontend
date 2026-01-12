'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FOODTRUCK_CTA } from '@/lib/constants';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-40 lg:py-40"
    >
      <div className="container-ecotree">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1B67FF] rounded-3xl px-8 md:px-12 lg:px-16 py-10 md:py-14 lg:py-16"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
            {/* Text Content */}
            <div>
              <p className="text-[32px] md:text-[32px] font-light text-white">
                {FOODTRUCK_CTA.title}
              </p>
              <h3 className="text-[32px] md:text-[32px] lg:text-[32px] font-semibold text-white">
                {FOODTRUCK_CTA.subtitle}
              </h3>
            </div>

            {/* CTA Button */}
            <a
              href={FOODTRUCK_CTA.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2 bg-white rounded text-[16px] md:text-[16px] font-medium text-[#1B67FF] hover:font-bold transition-all"
            >
              {FOODTRUCK_CTA.buttonText}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
