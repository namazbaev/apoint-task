import React, { useCallback, useMemo, useState } from 'react';

interface UseVirtualizationProps {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
}

interface VisibleRange {
  start: number;
  end: number;
}

interface VirtualizationResult {
  visibleRange: VisibleRange;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  totalHeight: number;
  offsetY: number;
}

export const useVirtualization = ({
  itemCount,
  itemHeight,
  containerHeight,
}: UseVirtualizationProps): VirtualizationResult => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo((): VisibleRange => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + 5, itemCount - 1);

    return { start: Math.max(0, start - 5), end };
  }, [scrollTop, itemHeight, containerHeight, itemCount]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleRange,
    handleScroll,
    totalHeight: itemCount * itemHeight,
    offsetY: visibleRange.start * itemHeight,
  };
};
