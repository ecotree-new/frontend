'use client';

import Image from 'next/image';
import { ECOTREE_POST_WASHING } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function PostWashingSection() {
  const cards = ECOTREE_POST_WASHING.cards;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#1B67FF]">
      <div className="container-ecotree">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-white mb-2">
            {ECOTREE_POST_WASHING.title}
          </h2>
          <p className="text-[14px] md:text-[16px] text-white">
            {ECOTREE_POST_WASHING.subtitle}
          </p>
        </div>

        {/* Cards - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {cards.map((card) => {
            const importedImage = IMAGE_MAP[card.image];
            return (
            <div
              key={card.id}
              className="relative h-[200px] md:h-[240px] lg:h-[280px] rounded-2xl overflow-hidden bg-gray-200"
            >
              {/* Background Image - left aligned */}
              <Image
                src={importedImage || card.image}
                alt={card.title}
                fill
                className="object-cover object-left"
                placeholder={importedImage ? "blur" : undefined}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute top-[56px] left-[48px]">
                <h3 className="text-white text-[18px] md:text-[20px] lg:text-[24px] font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-white/80 text-[13px] md:text-[14px]">
                  {card.description}
                </p>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
