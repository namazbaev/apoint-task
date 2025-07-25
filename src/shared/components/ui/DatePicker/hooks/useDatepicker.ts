import { useCallback, useEffect, useRef, useState } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
};

export const useDatePicker = (
  value: Date | null,
  onChange?: (date: Date | null) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const handleDateSelect = useCallback(
    (date: Date) => {
      onChange?.(date);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
    },
    [onChange],
  );

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  }, []);

  const toggleCalendar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeCalendar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    currentDate,
    handleDateSelect,
    handleClear,
    navigateMonth,
    toggleCalendar,
    closeCalendar,
  };
};
