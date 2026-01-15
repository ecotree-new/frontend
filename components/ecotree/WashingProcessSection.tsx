'use client';

import { useRef, useEffect, useState } from 'react';
import { ECOTREE_WASHING_PROCESS } from '@/lib/constants';

export default function WashingProcessSection() {
  const steps = ECOTREE_WASHING_PROCESS.steps;
  const duplicatedSteps = [...steps, ...steps];
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardColors, setCardColors] = useState<string[]>([]);

  useEffect(() => {
    const updateColors = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const cards = container.querySelectorAll('.washing-card');

      const newColors: string[] = [];

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const containerLeft = containerRect.left;
        const containerWidth = containerRect.width;

        // Calculate position ratio (0 = left, 1 = right)
        const position = Math.max(0, Math.min(1, (cardCenter - containerLeft) / containerWidth));

        // Interpolate between #1B67FF (blue) and #1E1F23 (dark)
        const blueR = 27, blueG = 103, blueB = 255;
        const darkR = 30, darkG = 31, darkB = 35;

        const r = Math.round(blueR + (darkR - blueR) * position);
        const g = Math.round(blueG + (darkG - blueG) * position);
        const b = Math.round(blueB + (darkB - blueB) * position);

        newColors.push(`rgb(${r}, ${g}, ${b})`);
      });

      setCardColors(newColors);
    };

    updateColors();
    const interval = setInterval(updateColors, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#FBFBFB]">
      {/* Header */}
      <div className="container-ecotree mb-10 md:mb-14 lg:mb-16">
        <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111] mb-2">
          {ECOTREE_WASHING_PROCESS.title}
        </h2>
        <p className="text-[12px] md:text-[20px] font-medium text-[#111111]">
          {ECOTREE_WASHING_PROCESS.subtitle}
        </p>
      </div>

      {/* Slider Container - constrained to content area */}
      <div className="container-ecotree overflow-hidden" ref={containerRef}>
        <div className="relative">
          {/* Circle Cards Slider */}
          <div className="animate-slide-washing flex gap-4 md:gap-6 lg:gap-8 py-4">
            {duplicatedSteps.map((step, index) => (
              <div
                key={`${step.id}-${index}`}
                className="washing-card flex-shrink-0 w-[140px] md:w-[280px] lg:w-[320px] aspect-square rounded-full flex flex-col items-center justify-center text-center p-4 md:p-8 transition-colors duration-100"
                style={{ backgroundColor: cardColors[index] || '#1B67FF' }}
              >
                <h3 className="text-white text-[15px] md:text-[32px] font-semibold mb-2 whitespace-pre-line">
                  {step.title}
                </h3>
                <div className="w-8 border-t border-white/40 my-2" />
                <p className="text-white text-[9px] md:text-[20px] font-medium leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideWashing {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide-washing {
          animation: slideWashing 30s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  );
}
