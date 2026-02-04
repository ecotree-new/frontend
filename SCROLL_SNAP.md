# Scroll Snap 적용 가이드

다른 페이지에서 Scroll Snap을 적용할 때 참고하는 문서입니다.

## 빠른 시작

### 1. 페이지를 클라이언트 컴포넌트로 변경

```tsx
'use client';

import { useRef } from 'react';
import ScrollSnapController from '@/components/ScrollSnapController';
```

### 2. 스냅을 끝낼 섹션에 ref 연결

```tsx
export default function MyPage() {
  const snapEndRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <ScrollSnapController snapEndRef={snapEndRef} />
      <main className="pt-16">
        {/* 스냅 적용할 섹션들 */}
        <Section1 />  {/* snap-section 클래스 필요 */}
        <Section2 />  {/* snap-section 클래스 필요 */}

        {/* 스냅 끝나는 지점 */}
        <div ref={snapEndRef}>
          <Section3 />  {/* 여기서부터 자유 스크롤 */}
        </div>

        <Section4 />
      </main>
      <Footer />
    </>
  );
}
```

### 3. 스냅 적용할 섹션에 클래스 추가

```tsx
// 뷰포트 높이만큼 차지하는 섹션
<section className="snap-section h-[calc(100vh-64px)]">
  {/* 콘텐츠 */}
</section>

// 스크롤 애니메이션이 있는 섹션 (sticky 사용)
<div className="snap-section h-[300vh]">
  <div className="sticky top-16 h-[calc(100vh-64px)]">
    {/* 콘텐츠 */}
  </div>
</div>
```

## 전역 CSS (이미 설정됨)

`/app/globals.css`에 다음 설정이 이미 적용되어 있습니다:

```css
html {
  scroll-snap-type: y mandatory;    /* 세로 방향 강제 스냅 */
  scroll-padding-top: 64px;         /* 헤더 높이 (스냅 위치 보정) */
  overscroll-behavior: none;        /* bounce 효과 방지 */
}

.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

## 섹션 유형별 적용 방법

### 유형 1: 단순 풀스크린 섹션

헤더 아래에서 뷰포트를 꽉 채우는 섹션:

```tsx
<section className="snap-section h-[calc(100vh-64px)]">
  <div className="container-ecotree h-full flex items-center">
    {/* 콘텐츠 */}
  </div>
</section>
```

### 유형 2: 스크롤 애니메이션 섹션 (기본)

스크롤하면서 내부 콘텐츠가 전환되는 섹션:

```tsx
<div className="snap-section h-[300vh]">
  {/* 300vh = 스크롤 거리, 숫자 조절로 애니메이션 속도 조절 */}
  <div className="sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
    {/* 화면에 고정되는 콘텐츠 */}
    {/* useScroll + useTransform으로 애니메이션 구현 */}
  </div>
</div>
```

### 유형 2-1: 내부 스냅 전환 섹션 (한 번 스크롤로 전환)

스크롤 한 번에 내부 콘텐츠가 바로 전환되는 섹션 (예: Problem → Solution, Process → Strength):

wheel 이벤트를 감지해서 programmatic하게 스크롤 위치를 이동시킵니다.

```tsx
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function MySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSecond, setShowSecond] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const isAnimating = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 섹션 내 위치 추적
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const inSection = value > 0 && value < 0.67;
    setIsInSection(inSection);

    // 스크롤 위치와 상태 동기화
    if (value > 0.33 && !showSecond) {
      setShowSecond(true);
    } else if (value <= 0.33 && showSecond) {
      setShowSecond(false);
    }
  });

  // wheel 이벤트로 스냅 전환
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || !isInSection || isAnimating.current) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // 스냅 위치 계산
    const firstPosition = containerTop;
    const secondPosition = containerTop + containerHeight / 2;
    const exitPosition = containerTop + containerHeight - viewportHeight;

    // 현재 위치 판단
    const middlePoint = containerTop + containerHeight / 4;
    const isAtFirst = scrollY < middlePoint;
    const isAtSecond = scrollY >= middlePoint && scrollY < exitPosition - 100;

    if (e.deltaY > 0) {
      // 스크롤 다운
      if (isAtFirst) {
        e.preventDefault();
        isAnimating.current = true;
        setShowSecond(true);
        window.scrollTo({ top: secondPosition, behavior: 'smooth' });
        setTimeout(() => { isAnimating.current = false; }, 800);
      } else if (isAtSecond) {
        e.preventDefault();
        isAnimating.current = true;
        window.scrollTo({ top: exitPosition + 100, behavior: 'smooth' });
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    } else if (e.deltaY < 0) {
      // 스크롤 업
      if (isAtSecond) {
        e.preventDefault();
        isAnimating.current = true;
        setShowSecond(false);
        window.scrollTo({ top: firstPosition, behavior: 'smooth' });
        setTimeout(() => { isAnimating.current = false; }, 800);
      }
    }
  }, [isInSection, showSecond]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <div ref={containerRef} className="snap-section h-[300vh]">
      <div className="sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
        {/* 두 번째 콘텐츠 (뒤에 깔림) */}
        <div className="absolute inset-0">...</div>

        {/* 첫 번째 콘텐츠 (페이드 아웃) */}
        <motion.div
          animate={{ opacity: showSecond ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          ...
        </motion.div>
      </div>
    </div>
  );
}
```

**동작 원리:**
- 섹션 내에서 wheel 이벤트 감지
- 스크롤 다운 → 첫 번째에서 두 번째로 스냅 전환
- 스크롤 업 → 두 번째에서 첫 번째로 스냅 전환
- 두 번째에서 스크롤 다운 → 다음 섹션으로 이동

**참고 컴포넌트:**
- `/components/sections/BannerSection.tsx` (Problem → Solution)
- `/components/sections/ProcessStrengthSection.tsx` (Process → Strength)

### 유형 3: 첫 번째 히어로 섹션

헤더 뒤로 배경이 들어가는 풀스크린 히어로:

```tsx
// main에 pt-16이 있으므로 높이에서 64px 빼기
<section className="snap-section h-[calc(100vh-64px)]">
  {/* 배경 이미지/비디오 */}
  <div className="absolute inset-0">...</div>

  {/* 콘텐츠 */}
  <div className="relative z-10 h-full flex items-center">
    {/* 텍스트 등 */}
  </div>
</section>
```

## ScrollSnapController 동작 원리

```tsx
// 스크롤 위치가 snapEndRef 요소에 도달하면 스냅 해제
// 다시 위로 올라가면 스냅 재활성화

const shouldEnableSnap = scrollY < snapEndTop - viewportHeight + 64;

if (shouldEnableSnap) {
  // 스냅 활성화
  document.documentElement.style.scrollSnapType = 'y mandatory';
} else {
  // 스냅 해제 (자유 스크롤)
  document.documentElement.style.scrollSnapType = 'none';
}
```

## 주의사항

1. **헤더 높이**: 현재 64px (h-16, top-16). 변경 시 관련 값 모두 수정 필요

2. **main padding**: `pt-16` 필수 (헤더가 fixed이므로)

3. **sticky 섹션의 top**: `top-16` 사용 (헤더 아래에 붙도록)

4. **높이 계산**: `h-[calc(100vh-64px)]` = 뷰포트 - 헤더 높이

5. **스냅 없이 사용**: `snap-section` 클래스만 빼면 해당 섹션은 스냅 안 됨

## 관련 파일

| 파일 | 설명 |
|------|------|
| `/app/globals.css` | 전역 스냅 CSS |
| `/components/ScrollSnapController.tsx` | 동적 스냅 제어 컴포넌트 |

## 메인 페이지 참고

`/app/page.tsx`에서 실제 적용 예시 확인 가능:
- HeroSection, BannerSection, ProcessStrengthSection에 스냅 적용
- FestivalSection부터 스냅 해제
