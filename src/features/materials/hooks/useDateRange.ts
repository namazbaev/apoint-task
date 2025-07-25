import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DateRange } from '../types';
import {
  formatDate,
  getCurrentMonthRange,
  isValidDateRange,
  parseDate,
} from '../utils';

interface UseDateRangeReturn {
  dateRange: DateRange;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  formattedDates: {
    start: string;
    end: string;
  };
  isValidRange: boolean;
  resetDates: () => void;
}

export const useDateRange = (): UseDateRangeReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialRange = (): DateRange => {
    const startParam = searchParams.get('startDate');
    const endParam = searchParams.get('endDate');

    const start = parseDate(startParam || '');
    const end = parseDate(endParam || '');

    if (start && end) {
      return { start, end };
    }

    return getCurrentMonthRange();
  };

  const [dateRange, setDateRange] = useState<DateRange>(getInitialRange);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (dateRange.start) {
      params.set('startDate', formatDate(dateRange.start));
    } else {
      params.delete('startDate');
    }

    if (dateRange.end) {
      params.set('endDate', formatDate(dateRange.end));
    } else {
      params.delete('endDate');
    }

    setSearchParams(params, { replace: true });
  }, [dateRange.start, dateRange.end, setSearchParams, searchParams]);

  const setStartDate = useCallback((date: Date | null) => {
    setDateRange((prev) => ({ ...prev, start: date }));
  }, []);

  const setEndDate = useCallback((date: Date | null) => {
    setDateRange((prev) => ({ ...prev, end: date }));
  }, []);

  const resetDates = useCallback(() => {
    setDateRange({ start: null, end: null });
  }, []);

  const formattedDates = useMemo(
    () => ({
      start: formatDate(dateRange.start),
      end: formatDate(dateRange.end),
    }),
    [dateRange],
  );

  const isValidRange = useMemo(
    () => isValidDateRange(dateRange.start, dateRange.end),
    [dateRange.start, dateRange.end],
  );

  return {
    dateRange,
    setStartDate,
    setEndDate,
    formattedDates,
    isValidRange,
    resetDates,
  };
};
