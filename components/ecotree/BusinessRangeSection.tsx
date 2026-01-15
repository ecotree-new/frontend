'use client';

import Image from 'next/image';
import { ECOTREE_BUSINESS_RANGE } from '@/lib/constants';

export default function BusinessRangeSection() {
  const cards = ECOTREE_BUSINESS_RANGE.cards;
  // Duplicate cards for seamless infinite scroll
  const duplicatedCards = [...cards, ...cards];

  return (
    <section className="h-[calc(100vh-64px)] bg-white flex items-center">
      <div className="container-ecotree w-full overflow-hidden">
        {/* Header - centered */}
        <div className="mb-10 md:mb-14 flex flex-col items-center">
          <div className="text-left">
            <p className="text-[10px] md:text-[16px] text-[#1B67FF] font-medium mb-2">
              {ECOTREE_BUSINESS_RANGE.label}
            </p>
            <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
              {ECOTREE_BUSINESS_RANGE.title}
            </h2>
          </div>
        </div>

        {/* Infinite Slider - contained within container */}
        <div className="relative overflow-hidden">
          <div className="animate-slide-business flex gap-4 md:gap-6">
            {duplicatedCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px]"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-center"
                  />
                  {/* Blue Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(27, 103, 255, 0.85) 0%, rgba(27, 103, 255, 0.4) 40%, transparent 70%)'
                    }}
                  />
                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-[16px] md:text-[18px] font-semibold">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideBusinessRange {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide-business {
          animation: slideBusinessRange 25s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  );
}
