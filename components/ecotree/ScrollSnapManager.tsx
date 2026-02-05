'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

// Section configuration
interface SectionConfig {
  id: string;
  internalSteps?: number;
}

const SNAP_SECTIONS: SectionConfig[] = [
  { id: 'hero' },
  { id: 'rental', internalSteps: 4 },
  { id: 'business' },
  { id: 'brand', internalSteps: 2 },
];

// Context type
interface ScrollContextType {
  currentSection: number;
  internalStep: number;
  isInSnapZone: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
  currentSection: 0,
  internalStep: 0,
  isInSnapZone: true,
});

export const useScrollContext = () => useContext(ScrollContext);

// Helper to get scroll container
const getScrollContainer = () => {
  return document.querySelector('.snap-y') as HTMLElement | null;
};

interface ScrollSnapManagerProps {
  children: ReactNode;
}

export default function ScrollSnapManager({ children }: ScrollSnapManagerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [internalStep, setInternalStep] = useState(0);
  const [isInSnapZone, setIsInSnapZone] = useState(true);

  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const accumulatedDelta = useRef(0);
  const deltaResetTimer = useRef<NodeJS.Timeout | null>(null);

  const DELTA_THRESHOLD = 30;
  const TRANSITION_DURATION = 800;

  // Register section elements
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    // Get all snap sections
    const sections = container.querySelectorAll('[data-snap-section]');
    sectionRefs.current = Array.from(sections) as HTMLElement[];
  }, []);

  // Scroll to specific section
  const scrollToSection = useCallback((sectionIndex: number) => {
    const container = getScrollContainer();
    if (!container || !sectionRefs.current[sectionIndex]) return;

    const section = sectionRefs.current[sectionIndex];

    // Disable CSS snap temporarily
    container.style.scrollSnapType = 'none';

    container.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });

    // Re-enable after transition
    setTimeout(() => {
      container.style.scrollSnapType = '';
    }, TRANSITION_DURATION);
  }, []);

  // Handle navigation logic
  const handleNavigation = useCallback((direction: 'up' | 'down') => {
    if (isTransitioning.current) return;

    const section = SNAP_SECTIONS[currentSection];

    // Internal step handling
    if (section?.internalSteps) {
      if (direction === 'down' && internalStep < section.internalSteps - 1) {
        setInternalStep(prev => prev + 1);
        return;
      }
      if (direction === 'up' && internalStep > 0) {
        setInternalStep(prev => prev - 1);
        return;
      }
    }

    // Section navigation
    isTransitioning.current = true;

    if (direction === 'down') {
      if (currentSection < SNAP_SECTIONS.length - 1) {
        // Move to next snap section
        const nextSection = currentSection + 1;
        setCurrentSection(nextSection);
        setInternalStep(0);
        scrollToSection(nextSection);
      } else {
        // Exit snap zone - go to free scroll area
        setIsInSnapZone(false);
        const container = getScrollContainer();
        const freeScrollSection = container?.querySelector('[data-free-scroll]') as HTMLElement;
        if (container && freeScrollSection) {
          container.style.scrollSnapType = 'none';
          container.scrollTo({
            top: freeScrollSection.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    } else if (direction === 'up' && currentSection > 0) {
      const prevSectionIndex = currentSection - 1;
      const prevSection = SNAP_SECTIONS[prevSectionIndex];
      setCurrentSection(prevSectionIndex);
      // Set to last internal step of previous section
      setInternalStep(prevSection?.internalSteps ? prevSection.internalSteps - 1 : 0);
      scrollToSection(prevSectionIndex);
    }

    setTimeout(() => {
      isTransitioning.current = false;
    }, TRANSITION_DURATION);
  }, [currentSection, internalStep, scrollToSection]);

  // Wheel event handler
  const handleWheel = useCallback((e: WheelEvent) => {
    const container = getScrollContainer();
    if (!container) return;

    // Check if in free scroll zone
    if (!isInSnapZone) {
      // Check if scrolling back up to snap zone
      const firstFreeScrollElement = container.querySelector('[data-free-scroll]') as HTMLElement;
      if (firstFreeScrollElement) {
        const rect = firstFreeScrollElement.getBoundingClientRect();
        // If scrolling up and near the top of free scroll area
        if (e.deltaY < 0 && rect.top >= 0 && rect.top < 100) {
          e.preventDefault();
          setIsInSnapZone(true);
          setCurrentSection(SNAP_SECTIONS.length - 1);
          const lastSection = SNAP_SECTIONS[SNAP_SECTIONS.length - 1];
          setInternalStep(lastSection?.internalSteps ? lastSection.internalSteps - 1 : 0);

          container.style.scrollSnapType = '';
          scrollToSection(SNAP_SECTIONS.length - 1);
          return;
        }
      }
      return; // Let normal scroll happen in free zone
    }

    e.preventDefault();

    if (isTransitioning.current) return;

    // Accumulate delta for smooth trackpad handling
    accumulatedDelta.current += e.deltaY;

    if (deltaResetTimer.current) {
      clearTimeout(deltaResetTimer.current);
    }
    deltaResetTimer.current = setTimeout(() => {
      accumulatedDelta.current = 0;
    }, 150);

    if (Math.abs(accumulatedDelta.current) < DELTA_THRESHOLD) return;

    const direction = accumulatedDelta.current > 0 ? 'down' : 'up';
    accumulatedDelta.current = 0;

    handleNavigation(direction);
  }, [isInSnapZone, handleNavigation, scrollToSection]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartY.current === null) return;

    const container = getScrollContainer();
    if (!container) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    touchStartY.current = null;

    if (Math.abs(deltaY) < 50) return; // Minimum swipe distance

    // Check if in free scroll zone
    if (!isInSnapZone) {
      const firstFreeScrollElement = container.querySelector('[data-free-scroll]') as HTMLElement;
      if (firstFreeScrollElement && deltaY < 0) {
        const rect = firstFreeScrollElement.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < 100) {
          setIsInSnapZone(true);
          setCurrentSection(SNAP_SECTIONS.length - 1);
          const lastSection = SNAP_SECTIONS[SNAP_SECTIONS.length - 1];
          setInternalStep(lastSection?.internalSteps ? lastSection.internalSteps - 1 : 0);

          container.style.scrollSnapType = '';
          scrollToSection(SNAP_SECTIONS.length - 1);
          return;
        }
      }
      return;
    }

    const direction = deltaY > 0 ? 'down' : 'up';
    handleNavigation(direction);
  }, [isInSnapZone, handleNavigation, scrollToSection]);

  // Prevent default touch scroll in snap zone
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isInSnapZone) {
      e.preventDefault();
    }
  }, [isInSnapZone]);

  // Event listeners
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    // Use capture phase for wheel to intercept before CSS snap
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (deltaResetTimer.current) {
        clearTimeout(deltaResetTimer.current);
      }
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Sync section refs on mount and when children change
  useEffect(() => {
    const updateRefs = () => {
      const container = getScrollContainer();
      if (!container) return;

      const sections = container.querySelectorAll('[data-snap-section]');
      sectionRefs.current = Array.from(sections) as HTMLElement[];
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateRefs, 100);
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <ScrollContext.Provider value={{ currentSection, internalStep, isInSnapZone }}>
      {children}
    </ScrollContext.Provider>
  );
}
