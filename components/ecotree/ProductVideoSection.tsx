'use client';

import { useRef, useEffect } from 'react';
import { ECOTREE_PRODUCT_VIDEO } from '@/lib/constants';
import { R2_IMAGES } from '@/lib/images';

export default function ProductVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-play when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-[#F5F5F5] overflow-hidden"
    >
      {/* Video container - centered, fixed size, overflow hidden for crop */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={R2_IMAGES.productVideoPoster}
          preload="metadata"
          className="min-w-full min-h-full object-cover"
          style={{ width: '1200px', height: 'auto' }}
        >
          <source src={ECOTREE_PRODUCT_VIDEO.video} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
