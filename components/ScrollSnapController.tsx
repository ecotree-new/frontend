'use client';

import { useEffect, useRef } from 'react';

interface ScrollSnapControllerProps {
  /** Ref to the element where snap should stop */
  snapEndRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollSnapController({ snapEndRef }: ScrollSnapControllerProps) {
  const isSnapEnabled = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!snapEndRef.current) return;

      const snapEndTop = snapEndRef.current.offsetTop;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Snap should be disabled when we reach the snapEnd element
      // Add some buffer (64px for header)
      const shouldEnableSnap = scrollY < snapEndTop - viewportHeight + 64;

      if (shouldEnableSnap && !isSnapEnabled.current) {
        document.documentElement.style.scrollSnapType = 'y mandatory';
        document.documentElement.style.scrollPaddingTop = '64px';
        isSnapEnabled.current = true;
      } else if (!shouldEnableSnap && isSnapEnabled.current) {
        document.documentElement.style.scrollSnapType = 'none';
        isSnapEnabled.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset on unmount
      document.documentElement.style.scrollSnapType = 'y mandatory';
    };
  }, [snapEndRef]);

  return null;
}
