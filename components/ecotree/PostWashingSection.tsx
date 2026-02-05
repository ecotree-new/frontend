'use client';

import Image from 'next/image';
import { ECOTREE_POST_WASHING } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

export default function PostWashingSection() {
  const cards = ECOTREE_POST_WASHING.cards;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#FBFBFB]">
      <div className="container-ecotree">
        {/* Header */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111] mb-2">
            {ECOTREE_POST_WASHING.title}
          </h2>
          <p className="text-[12px] md:text-[20px] font-medium text-[#111111]">
            {ECOTREE_POST_WASHING.subtitle}
          </p>
        </div>

        {/* Cards - 2 columns */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
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
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute top-8 left-6 md:top-10 md:left-8 lg:top-14 lg:left-12">
                <h3 className="text-white text-[16px] md:text-[32px] lg:text-[32px] font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-white text-[12px] md:text-[20px]">
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
