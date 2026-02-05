'use client';

import Image from 'next/image';
import { ECOTREE_BUSINESS_RANGE } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function BusinessRangeSection() {
  const cards = ECOTREE_BUSINESS_RANGE.cards;
  // Duplicate cards for seamless infinite scroll
  const duplicatedCards = [...cards, ...cards];

  return (
    <section className="snap-section h-[calc(100vh-64px)] bg-white flex items-center">
      <div className="container-ecotree w-full overflow-hidden">
        {/* Header - left aligned */}
        <div className="mb-8 lg:mb-[125px] short-h:lg:mb-12">
          <p className="text-[10px] md:text-[16px] text-[#1B67FF] font-medium mb-2">
            {ECOTREE_BUSINESS_RANGE.label}
          </p>
          <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
            {ECOTREE_BUSINESS_RANGE.title}
          </h2>
        </div>

        {/* Infinite Slider - contained within container */}
        <div className="relative overflow-hidden">
          <div className="animate-slide-business flex gap-4 md:gap-6">
            {duplicatedCards.map((card, index) => {
              const importedImage = IMAGE_MAP[card.image];
              return (
              <div
                key={`${card.id}-${index}`}
                className="flex-shrink-0 w-[240px] md:w-[280px] lg:w-[400px]"
              >
                <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-gray-200">
                  <Image
                    src={importedImage || card.image}
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
                  <div className="absolute bottom-8 left-10 right-10">
                    <h3 className="text-white text-[10px] md:text-[24px] font-semibold">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
            })}
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
