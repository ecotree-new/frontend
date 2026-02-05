'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        Marker: new (options: object) => object;
      };
    };
  }
}

export default function DirectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [mapLoaded, setMapLoaded] = useState(false);

  // 경기도 안성시 대덕면 소현리 10 좌표
  const LOCATION = {
    lat: 37.03516,
    lng: 127.2496,
  };

  const CONTACT_INFO = {
    address: '경기도 안성시 대덕면 소현리 10',
    phone: '1688-8695',
    email: 'donfoorock@naver.com',
  };

  useEffect(() => {
    const kakaoMapApiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    if (!kakaoMapApiKey) {
      console.warn('Kakao Map API key is not set');
      return;
    }

    // 이미 로드된 경우 스킵
    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
      level: 3, // 더 줌인
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);

    // 마커 추가
    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
    });

    setMapLoaded(true);
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      data-section="directions"
      className="snap-section h-[calc(100vh-64px)] py-12 md:py-16 lg:py-20 bg-white flex items-center overflow-hidden"
    >
      <div className="container-ecotree">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-[10px] md:text-[14px] lg:text-[16px] font-medium text-[#1B67FF] mb-2">
            Directions
          </p>
          <h2 className="text-[18px] md:text-[24px] lg:text-[40px] font-bold text-[#111111]">
            오시는 길
          </h2>
        </motion.div>

        {/* Content: Map + Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:gap-16"
        >
          {/* Left: Map */}
          <div className="flex-1 rounded-[16px] md:rounded-[24px] overflow-hidden mb-8 lg:mb-0">
            <div
              ref={mapRef}
              className="w-full h-[250px] md:h-[300px] lg:h-[400px] bg-[#E5E7EB]"
            >
              {!mapLoaded && (
                <div className="w-full h-full flex items-center justify-center text-[#727783]">
                  지도를 불러오는 중...
                </div>
              )}
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:w-[320px] flex-shrink-0 flex flex-col justify-center">
            {/* Company Logo */}
            <div className="mb-8">
              <Image
                src="/company_logo.svg"
                alt="ECOTREE"
                width={140}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </div>

            {/* Contact Items */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 pb-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 flex-shrink-0 w-16">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#1B67FF"/>
                  </svg>
                  <span className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-[#111111]">주소</span>
                </div>
                <span className="text-[14px] md:text-[14px] lg:text-[16px] text-[#111111]">{CONTACT_INFO.address}</span>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 pb-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 flex-shrink-0 w-16">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#1B67FF"/>
                  </svg>
                  <span className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-[#111111]">전화</span>
                </div>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-[14px] md:text-[14px] lg:text-[16px] text-[#111111] hover:text-[#1B67FF] transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 flex-shrink-0 w-16">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#1B67FF"/>
                  </svg>
                  <span className="text-[14px] md:text-[14px] lg:text-[16px] font-medium text-[#111111]">메일</span>
                </div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-[14px] md:text-[14px] lg:text-[16px] text-[#111111] hover:text-[#1B67FF] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
