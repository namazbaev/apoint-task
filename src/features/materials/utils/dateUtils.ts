import type { DateRange } from '~/features/materials/types';

export const isValidDateRange = (
  start: Date | null,
  end: Date | null,
): boolean => {
  if (!start || !end) return true;
  return start <= end;
};

export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const parseDate = (value: string): Date | null => {
  if (!value) return null;
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  if (
    date.getDate() !== parseInt(day) ||
    date.getMonth() !== parseInt(month) - 1 ||
    date.getFullYear() !== parseInt(year)
  ) {
    return null;
  }

  return date;
};

export const getCurrentMonthRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};
