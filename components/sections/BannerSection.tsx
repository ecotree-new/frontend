'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BANNER_CONTENT } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

function BannerCard({
  content,
}: {
  content: (typeof BANNER_CONTENT)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const imageUrl = IMAGE_MAP[content.image] || content.image;

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden h-[180px] md:h-[480px]"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, #1E1F23 0%, rgba(27, 103, 255, 0.35) 50%, rgba(27, 103, 255, 0) 100%)',
        }}
      />

      {/* Text content */}
      <motion.div
        className="relative h-full flex flex-col justify-center px-6 md:px-10 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Label */}
        <p className="text-[10px] md:text-[16px] font-medium text-white mb-2 md:mb-3 lg:mb-4">
          {content.label}
        </p>

        {/* Title + Highlight */}
        <div className="text-[14px] md:text-[32px] font-semibold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
          <p>{content.title}</p>
          <p>{content.highlight}</p>
        </div>

        {/* Description */}
        <div className="text-[10px] md:text-[20px] font-medium text-white leading-relaxed">
          {content.description.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function BannerSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-ecotree flex flex-col gap-[30px] md:gap-[80px]">
        {BANNER_CONTENT.map((content) => (
          <BannerCard key={content.id} content={content} />
        ))}
      </div>
    </section>
  );
}
