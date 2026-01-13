'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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
      level: 5,
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
    <section ref={sectionRef} id="location" className="py-20 md:py-32 bg-white">
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
          <h2 className="text-[18px] md:text-[40px] lg:text-[48px] font-bold text-[#111111]">
            오시는 길
          </h2>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[24px] overflow-hidden"
        >
          <div
            ref={mapRef}
            className="w-full h-[400px] md:h-[500px] bg-[#727783]"
          >
            {!mapLoaded && (
              <div className="w-full h-full flex items-center justify-center text-white">
                지도를 불러오는 중...
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
