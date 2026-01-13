'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FOODTRUCK_TRUCK_SECTION, FOODTRUCK_TRUCK_CARDS, FOODTRUCK_BANNER_FEATURES } from '@/lib/constants';

export default function TruckSelectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const [linePositions, setLinePositions] = useState({
    width: 656,
    leftX: 1,
    centerX: 328,
    rightX: 655,
  });

  useEffect(() => {
    const calculatePositions = () => {
      if (!cardsContainerRef.current) return;

      const container = cardsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const gap = 24; // gap-6 = 24px
      const cardWidth = (containerWidth - 2 * gap) / 3;

      setLinePositions({
        width: containerWidth,
        leftX: cardWidth / 2,
        centerX: containerWidth / 2,
        rightX: containerWidth - cardWidth / 2,
      });
    };

    calculatePositions();

    const resizeObserver = new ResizeObserver(calculatePositions);
    if (cardsContainerRef.current) {
      resizeObserver.observe(cardsContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
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
      className="bg-white py-12 md:py-20"
    >
      <div className="container-ecotree">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-[#000000] mb-2 md:mb-4">
            {FOODTRUCK_TRUCK_SECTION.title}
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] font-medium text-[#000000]">
            {FOODTRUCK_TRUCK_SECTION.subtitle}
          </p>
        </motion.div>

        {/* Truck Cards */}
        <motion.div
          ref={cardsContainerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {FOODTRUCK_TRUCK_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="bg-white rounded-2xl md:rounded-3xl overflow-hidden"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Card Content */}
              <div className="py-4 px-4 md:py-6 md:px-10">
                <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-[#000000] mb-1">
                  {card.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#000000] mb-2 md:mb-3">
                  {card.description}
                </p>
                <div className="flex gap-2">
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 h-5 flex items-center bg-[#1B67FF] text-[#FFFFFF] text-[12px] md:text-[14px] font-semibold rounded-[40px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connection Line SVG - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative h-[96px] mb-0 hidden md:block"
        >
          <svg
            width={linePositions.width}
            height="96"
            viewBox={`0 0 ${linePositions.width} 96`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            {/* Center vertical line */}
            <path
              d={`M${linePositions.centerX} 96L${linePositions.centerX} 0`}
              stroke="url(#paint0_linear_truck)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeDasharray="4 4"
            />
            {/* U-shape connecting left and right card centers */}
            <path
              d={`M${linePositions.leftX} 0V34H${linePositions.rightX}V0`}
              stroke="url(#paint1_linear_truck)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeDasharray="4 4"
            />
            {/* Outer circle */}
            <circle cx={linePositions.centerX} cy="88" r="8" fill="#E0EBFF" />
            {/* Inner circle */}
            <circle cx={linePositions.centerX} cy="88" r="4" fill="#1B67FF" />
            <defs>
              <linearGradient
                id="paint0_linear_truck"
                x1={linePositions.centerX}
                y1="0"
                x2={linePositions.centerX}
                y2="96"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E4ECFF" />
                <stop offset="1" stopColor="#1B67FF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_truck"
                x1={linePositions.centerX}
                y1="0"
                x2={linePositions.centerX}
                y2="94.86"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E4ECFF" />
                <stop offset="1" stopColor="#1B67FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Feature Banner - Desktop: horizontal, Mobile: vertical cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 md:mt-0"
        >
          {/* Desktop Layout */}
          <div
            className="hidden md:block rounded-2xl"
            style={{ background: 'linear-gradient(90deg, #1E1F23 0%, #1B67FF 100%)' }}
          >
            <div className="flex items-center justify-center gap-[40px] lg:gap-[80px] px-6 py-8">
              {FOODTRUCK_BANNER_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center gap-4"
                >
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={56}
                    height={56}
                    className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-[16px] font-semibold text-white mb-0.5">
                      {feature.title}
                    </h4>
                    <p className="text-[14px] font-medium text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout - Vertical stacked cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {FOODTRUCK_BANNER_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center gap-3 px-6 py-4 rounded-lg"
                style={{ background: 'linear-gradient(90deg, #1E1F23 0%, #1B67FF 100%)' }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 flex-shrink-0"
                />
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-semibold text-white whitespace-nowrap">
                    {feature.title}
                  </h4>
                  <span className="text-white/60">|</span>
                  <p className="text-[13px] font-medium text-white/90">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
