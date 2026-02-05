'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ECOTREE_RENTAL_FLOW } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';
import { useScrollContext } from './ScrollSnapManager';

export default function RentalFlowSection() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const firstIndicatorRef = useRef<HTMLDivElement>(null);
  const lastIndicatorRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState({ top: 7, height: 200 });

  const steps = ECOTREE_RENTAL_FLOW.steps;

  // Get current step from ScrollSnapManager context
  const { currentSection, internalStep } = useScrollContext();

  // This section is at index 1 in SNAP_SECTIONS
  const isActiveSection = currentSection === 1;

  // Only use context's internalStep when this section is active
  // Otherwise, show first step (before) or last step (after)
  let displayStep = 1;
  if (isActiveSection) {
    displayStep = internalStep + 1;
  } else if (currentSection > 1) {
    // We've passed this section, show the last step
    displayStep = steps.length;
  }
  const currentStep = Math.min(Math.max(displayStep, 1), steps.length);

  // 점선 위치 계산
  useEffect(() => {
    const updateLinePosition = () => {
      if (!firstIndicatorRef.current || !lastIndicatorRef.current || !stepsContainerRef.current) return;

      const containerRect = stepsContainerRef.current.getBoundingClientRect();
      const firstRect = firstIndicatorRef.current.getBoundingClientRect();
      const lastRect = lastIndicatorRef.current.getBoundingClientRect();

      const top = firstRect.top - containerRect.top + firstRect.height / 2;
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
      const height = bottom - top;

      setLineStyle({ top, height });
    };

    updateLinePosition();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateLinePosition);
    });

    if (stepsContainerRef.current) {
      resizeObserver.observe(stepsContainerRef.current);
    }

    window.addEventListener('resize', updateLinePosition);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateLinePosition);
    };
  }, [currentStep]);

  const currentStepData = steps[currentStep - 1];
  const currentImage = IMAGE_MAP[currentStepData.image];

  return (
    <div className="relative h-[calc(100vh-64px)] snap-start snap-always bg-white">
      <div className="h-full w-full overflow-hidden">
        <div className="container-ecotree h-full flex flex-col justify-center">
          {/* Header - left aligned */}
          <div className="mb-8 md:mb-12 short-h:md:mb-6">
            <p className="text-[10px] md:text-[16px] text-[#1B67FF] font-medium mb-2">
              {ECOTREE_RENTAL_FLOW.label}
            </p>
            <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
              {ECOTREE_RENTAL_FLOW.title}
            </h2>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col">
            <div className="mb-2">
              <span
                className="text-[20px] md:text-[32px] text-[#1B67FF] font-normal"
                style={{ fontFamily: 'SlowGothic, sans-serif' }}
              >
                {currentStepData.number}
              </span>
              <span className="text-[18px] font-semibold text-[#000000] ml-2">
                {currentStepData.title}
              </span>
            </div>

            <p className="text-[10px] font-medium text-[#000000] mb-6">
              {currentStepData.description}
            </p>

            <div className="w-full h-[200px] relative rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src={currentImage || currentStepData.image}
                alt={currentStepData.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative w-[14px] h-[14px] flex items-center justify-center"
                >
                  <div
                    className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#97BAFF]' : 'bg-[#E0EBFF]'
                    }`}
                  />
                  <div
                    className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                      currentStep === step.id ? 'bg-[#1B67FF]' : 'bg-[#97BAFF]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-row gap-12 lg:gap-16 short-h:gap-8 items-center">
            <div ref={stepsContainerRef} className="w-[320px] lg:w-[400px] flex-shrink-0 relative">
              <div
                className="absolute left-[7px] w-[2px] -translate-x-1/2"
                style={{
                  top: `${lineStyle.top}px`,
                  height: `${lineStyle.height}px`,
                  backgroundImage: 'repeating-linear-gradient(to bottom, #1B67FF 0px, #1B67FF 6px, transparent 6px, transparent 12px)'
                }}
              />

              <div className="space-y-6 short-h:space-y-3">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isFirst = index === 0;
                  const isLast = index === steps.length - 1;
                  return (
                    <div
                      key={step.id}
                      className="flex items-start gap-4"
                    >
                      <div
                        ref={isFirst ? firstIndicatorRef : isLast ? lastIndicatorRef : null}
                        className="flex-shrink-0 relative z-10 w-[14px] h-[14px] flex items-center justify-center mt-[9px]"
                      >
                        <div className="absolute w-[16px] h-[16px] rounded-full bg-white" />
                        <div className={`absolute w-[14px] h-[14px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#97BAFF]' : 'bg-[#E0EBFF]'
                        }`} />
                        <div className={`absolute w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#1B67FF]' : 'bg-[#97BAFF]'
                        }`} />
                      </div>

                      <div className={`flex-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`text-[32px] leading-none transition-colors duration-300 ${
                              isActive ? 'text-[#1B67FF]' : 'text-[#C4C4C4]'
                            }`}
                            style={{ fontFamily: 'SlowGothic, sans-serif' }}
                          >
                            {step.number}
                          </span>
                          <h3 className="text-[20px] font-semibold text-[#000000]">
                            {step.title}
                          </h3>
                        </div>
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-[16px] font-medium text-[#000000] leading-relaxed mt-2 pl-[44px]"
                            >
                              {step.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-[400px] aspect-[16/10] relative rounded-2xl overflow-hidden bg-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage || currentStepData.image}
                    alt={currentStepData.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
