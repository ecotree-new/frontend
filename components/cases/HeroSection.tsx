'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#1B67FF] py-16 md:py-20 lg:py-30"
    >
      <div className="container-ecotree">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-left"
        >
          <h1 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold text-white leading-tight mb-6 md:mb-8 lg:mb-12">
            현장에서 확인된
            <br />
            운영의 결과들입니다.
          </h1>
          <p className="text-[14px] md:text-[18px] lg:text-[24px] font-semibold text-white">
            운영 사례부터 업체 후기까지, 현장에서 나온 이야기들을 담았습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
