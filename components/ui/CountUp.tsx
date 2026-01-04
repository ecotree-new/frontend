'use client';

import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  isInView: boolean;
}

export default function CountUp({
  end,
  duration = 2000,
  suffix = '',
  isInView,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) {
      // Reset when out of view
      hasAnimated.current = false;
      setCount(0);
      return;
    }

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut);

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span className="count-up">
      {count}
      {suffix}
    </span>
  );
}
