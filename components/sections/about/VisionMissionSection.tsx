'use client';

import Image from 'next/image';
import { ABOUT_VISION_MISSION } from '@/lib/constants';
import { R2_IMAGES } from '@/lib/images';

function FullScreenSection({
  id,
  image,
  label,
  title,
  description,
}: {
  id: string;
  image: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section
      id={id}
      className="snap-section relative h-[calc(100vh-64px)] w-full overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-right"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container-ecotree">
          <p className="text-[14px] md:text-[16px] font-medium mb-2 text-white">
            {label}
          </p>
          <h2 className="text-[24px] md:text-[40px] lg:text-[48px] font-bold mb-4 md:mb-6 text-white">
            {title}
          </h2>
          <p className="text-[12px] md:text-[20px] font-medium leading-relaxed whitespace-pre-line text-white max-w-[650px]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function VisionMissionSection() {
  const vision = ABOUT_VISION_MISSION[0];
  const mission = ABOUT_VISION_MISSION[1];

  return (
    <>
      <FullScreenSection
        id="vision-section"
        image={R2_IMAGES.visionImage}
        label={vision.label}
        title={vision.title}
        description={vision.description}
      />
      <FullScreenSection
        id="mission-section"
        image={R2_IMAGES.missionImage}
        label={mission.label}
        title={mission.title}
        description={mission.description}
      />
    </>
  );
}
