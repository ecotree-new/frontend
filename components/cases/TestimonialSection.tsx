'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

function TestimonialCard({ company, content }: { company: string; content: string }) {
  return (
    <div className="w-[260px] md:w-[340px] lg:w-[380px] flex-shrink-0 rounded-2xl overflow-hidden">
      <div className="h-[280px] md:h-[320px] lg:h-[360px] p-5 md:p-6 lg:p-8 bg-gradient-to-b from-[#2A2D35] to-[#1B67FF] flex flex-col">
        {/* Quote Icon */}
        <div className="mb-auto">
          <svg
            className="w-10 h-10 md:w-12 md:h-12 text-white/80"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Company Name */}
        <p className="text-[14px] md:text-[16px] text-white font-semibold mb-3">
          {company}
        </p>

        {/* Content */}
        <p className="text-[14px] md:text-[16px] text-white/90 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-24 lg:py-40 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="container-ecotree text-center mb-10 lg:mb-16"
      >
        <p className="text-[10px] md:text-[16px] text-[#1B67FF] font-medium mb-4">
          동시 운영 사례
        </p>
        <h2 className="text-[18px] md:text-[36px] lg:text-[40px] font-bold text-[#111111]">
          직접 겪어본 업체들의 솔직한 후기입니다.
        </h2>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
      >
        {/* Carousel Track */}
        <div className="flex gap-4 md:gap-6 animate-scroll">
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              company={testimonial.company}
              content={testimonial.content}
            />
          ))}
        </div>
      </motion.div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: fit-content;
          padding-left: 16px;
        }

        @media (min-width: 768px) {
          .animate-scroll {
            padding-left: 40px;
          }
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
