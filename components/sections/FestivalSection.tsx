'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';
import { UNIVERSITY_LOGOS, REGIONAL_FESTIVALS, FESTIVAL_COUNTS } from '@/lib/constants';

export default function FestivalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const universityContentRef = useRef<HTMLDivElement>(null);
  const regionalContentRef = useRef<HTMLDivElement>(null);

  const [universityTrigger, setUniversityTrigger] = useState(0);
  const [regionalTrigger, setRegionalTrigger] = useState(0);
  const [universityScrollPercent, setUniversityScrollPercent] = useState(0);
  const [regionalScrollPercent, setRegionalScrollPercent] = useState(0);

  const prevViewRef = useRef<'university' | 'regional'>('university');
  const isInViewRef = useRef(false);
  const hasInitialized = useRef(false);

  // 컨텐츠 높이 계산하여 필요한 스크롤 퍼센트 결정
  useEffect(() => {
    const calculateScrollPercents = () => {
      const containerHeight = contentAreaRef.current?.clientHeight || 0;
      const universityHeight = universityContentRef.current?.scrollHeight || 0;
      const regionalHeight = regionalContentRef.current?.scrollHeight || 0;

      // 컨텐츠가 컨테이너보다 클 때만 스크롤 필요
      if (universityHeight > containerHeight && universityHeight > 0) {
        const overflow = universityHeight - containerHeight;
        const percent = (overflow / universityHeight) * 100;
        setUniversityScrollPercent(Math.min(percent, 100));
      } else {
        setUniversityScrollPercent(0);
      }

      if (regionalHeight > containerHeight && regionalHeight > 0) {
        const overflow = regionalHeight - containerHeight;
        const percent = (overflow / regionalHeight) * 100;
        setRegionalScrollPercent(Math.min(percent, 100));
      } else {
        setRegionalScrollPercent(0);
      }
    };

    // 이미지 로드 후 계산을 위해 약간의 지연
    const timeoutId = setTimeout(calculateScrollPercents, 100);

    // 이미지 로드 완료 시 재계산
    const images = universityContentRef.current?.querySelectorAll('img');
    images?.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', calculateScrollPercents);
      }
    });

    window.addEventListener('resize', calculateScrollPercents);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateScrollPercents);
      images?.forEach(img => {
        img.removeEventListener('load', calculateScrollPercents);
      });
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 대학교 로고 스크롤 (필요한 만큼만 스크롤)
  const universityY = useTransform(
    scrollYProgress,
    [0, 0.45],
    ['0%', `-${universityScrollPercent}%`]
  );
  const universityOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);

  // 지역 축제 스크롤 (필요한 만큼만 스크롤)
  const regionalY = useTransform(
    scrollYProgress,
    [0.55, 1],
    ['0%', `-${regionalScrollPercent}%`]
  );
  const regionalOpacity = useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 1, 1]);

  // 스크롤 진행에 따라 뷰 전환 + 해당 뷰의 트리거 증가
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const newView = value < 0.5 ? 'university' : 'regional';

      if (newView !== prevViewRef.current) {
        prevViewRef.current = newView;
        // 전환될 때 해당 뷰의 트리거 증가
        if (newView === 'university') {
          setUniversityTrigger(prev => prev + 1);
        } else {
          setRegionalTrigger(prev => prev + 1);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // 섹션 진입/이탈 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInViewRef.current;
        isInViewRef.current = entry.isIntersecting;

        // 첫 번째 콜백은 초기 상태 기록만 (초기 애니메이션과 중복 방지)
        if (!hasInitialized.current) {
          hasInitialized.current = true;
          return;
        }

        // 섹션에 새로 진입했을 때만 트리거 (이탈 후 재진입)
        if (!wasInView && entry.isIntersecting) {
          // 현재 스크롤 위치에 따라 적절한 트리거 증가
          const progress = scrollYProgress.get();
          if (progress < 0.5) {
            setUniversityTrigger(prev => prev + 1);
          } else {
            setRegionalTrigger(prev => prev + 1);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] w-full bg-[#FBFBFB] overflow-hidden">
        <div className="container-ecotree h-full flex flex-col py-8 md:py-12 lg:py-16">
          {/* Title */}
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-[#111111] text-center mb-4 md:mb-6 lg:mb-8 flex-shrink-0">
            에코트리와 함께 환경을 지켜온 축제
          </h2>

          {/* Subtitle & Count */}
          <div className="text-center mb-6 md:mb-8 flex-shrink-0 relative h-[100px] md:h-[120px]">
            {/* University */}
            <motion.div
              style={{ opacity: universityOpacity }}
              className="absolute inset-x-0 top-0"
            >
              <p className="text-[14px] text-[#727783] mb-2">대학교 축제</p>
              <p className="text-[48px] md:text-[64px] font-bold text-[#1B67FF]">
                <CountUp end={FESTIVAL_COUNTS.university} trigger={universityTrigger} />
                <span className="text-[20px] md:text-[24px] font-medium text-[#727783] ml-2">곳</span>
              </p>
            </motion.div>

            {/* Regional */}
            <motion.div
              style={{ opacity: regionalOpacity }}
              className="absolute inset-x-0 top-0"
            >
              <p className="text-[14px] text-[#727783] mb-2">지역 축제</p>
              <p className="text-[48px] md:text-[64px] font-bold text-[#1B67FF]">
                <CountUp end={FESTIVAL_COUNTS.regional} trigger={regionalTrigger} />
                <span className="text-[20px] md:text-[24px] font-medium text-[#727783] ml-2">곳</span>
              </p>
            </motion.div>
          </div>

          {/* Content Area */}
          <div ref={contentAreaRef} className="relative flex-1 overflow-hidden">
            {/* University Logos */}
            <motion.div
              ref={universityContentRef}
              style={{ y: universityY, opacity: universityOpacity }}
              className="absolute inset-x-0 top-0"
            >
              <div className="grid grid-cols-3 min-[824px]:grid-cols-4 min-[1022px]:grid-cols-5 gap-x-6 lg:gap-x-[48px] gap-y-4">
                {UNIVERSITY_LOGOS.map((uni, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Image
                      src={uni.logo}
                      alt={uni.name}
                      width={150}
                      height={36}
                      className="object-contain w-[150px] h-auto"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Regional Festival Names */}
            <motion.div
              ref={regionalContentRef}
              style={{ y: regionalY, opacity: regionalOpacity }}
              className="absolute inset-x-0 top-0"
            >
              <p className="text-[14px] md:text-[16px] text-[#111111] font-bold leading-loose text-center">
                {REGIONAL_FESTIVALS.map((festival, index) => (
                  <span
                    key={index}
                    className="inline-block whitespace-nowrap"
                    style={{ wordBreak: 'keep-all' }}
                  >
                    {festival}
                    {index < REGIONAL_FESTIVALS.length - 1 && <span className="mr-2">,</span>}
                  </span>
                ))}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
