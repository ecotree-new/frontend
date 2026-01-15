'use client';

import Image from 'next/image';
import { ECOTREE_WASHING_FACILITY } from '@/lib/constants';

export default function WashingFacilitySection() {
  const cards = ECOTREE_WASHING_FACILITY.cards;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container-ecotree">
        {/* Header */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111] mb-2">
            {ECOTREE_WASHING_FACILITY.title}
          </h2>
          <p className="text-[12px] md:text-[20px] font-medium text-[#727783]">
            {ECOTREE_WASHING_FACILITY.subtitle}
          </p>
        </div>

        {/* Cards Grid - Custom Layout */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {/* Card 01 - Left, spans 2 rows */}
          <div className="relative row-span-2 rounded-2xl overflow-hidden">
            <Image
              src={cards[0].image}
              alt={cards[0].title}
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '200px',
                background: 'linear-gradient(to bottom, rgba(27, 103, 255, 0.9) 0%, rgba(27, 103, 255, 0.7) 50%, transparent 100%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-[12px] md:text-[20px] font-bold mb-1">
                    {cards[0].title}
                  </h3>
                  <p className="text-white/80 text-[10px] md:text-[16px] font-medium">
                    {cards[0].description}
                  </p>
                </div>
                <span className="text-white/60 text-[24px] md:text-[48px] leading-none" style={{ fontFamily: 'SlowGothic' }}>
                  {cards[0].number}
                </span>
              </div>
            </div>
          </div>

          {/* Card 02 - Top right */}
          <div className="relative h-[120px] md:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src={cards[1].image}
              alt={cards[1].title}
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '150px',
                background: 'linear-gradient(to bottom, rgba(27, 103, 255, 0.9) 0%, rgba(27, 103, 255, 0.7) 50%, transparent 100%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-[12px] md:text-[20px] font-bold mb-1">
                    {cards[1].title}
                  </h3>
                  <p className="text-white/80 text-[10px] md:text-[16px] font-medium">
                    {cards[1].description}
                  </p>
                </div>
                <span className="text-white/60 text-[24px] md:text-[48px] leading-none" style={{ fontFamily: 'SlowGothic' }}>
                  {cards[1].number}
                </span>
              </div>
            </div>
          </div>

          {/* Card 03 - Middle right */}
          <div className="relative h-[120px] md:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src={cards[2].image}
              alt={cards[2].title}
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '150px',
                background: 'linear-gradient(to bottom, rgba(27, 103, 255, 0.9) 0%, rgba(27, 103, 255, 0.7) 50%, transparent 100%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-[12px] md:text-[20px] font-bold mb-1">
                    {cards[2].title}
                  </h3>
                  <p className="text-white/80 text-[10px] md:text-[16px] font-medium">
                    {cards[2].description}
                  </p>
                </div>
                <span className="text-white/60 text-[24px] md:text-[48px] leading-none" style={{ fontFamily: 'SlowGothic' }}>
                  {cards[2].number}
                </span>
              </div>
            </div>
          </div>

          {/* Card 04 - Bottom, full width */}
          <div className="relative h-[120px] md:h-[240px] col-span-2 rounded-2xl overflow-hidden">
            <Image
              src={cards[3].image}
              alt={cards[3].title}
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '150px',
                background: 'linear-gradient(to bottom, rgba(27, 103, 255, 0.9) 0%, rgba(27, 103, 255, 0.7) 50%, transparent 100%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-[12px] md:text-[20px] font-bold mb-1">
                    {cards[3].title}
                  </h3>
                  <p className="text-white/80 text-[10px] md:text-[16px] font-medium">
                    {cards[3].description}
                  </p>
                </div>
                <span className="text-white/60 text-[24px] md:text-[48px] leading-none" style={{ fontFamily: 'SlowGothic' }}>
                  {cards[3].number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
