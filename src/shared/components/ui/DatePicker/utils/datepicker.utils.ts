export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('ru-RU');
};

export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
};

export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startDay = (firstDay.getDay() + 6) % 7;
  const days: Date[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(new Date(year, month, -startDay + i + 1));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

export const getMonthTitle = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });
};

export const getDayClasses = (
  date: Date,
  currentDate: Date,
  selectedDate: Date | null,
  today: Date,
): string => {
  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
  const isSelected = isSameDay(date, selectedDate);
  const isToday = isSameDay(date, today);

  const baseClasses = 'p-2 text-sm rounded transition-colors';

  if (!isCurrentMonth) {
    return `${baseClasses} text-gray-300 cursor-default`;
  }

  if (isSelected) {
    return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600 cursor-pointer`;
  }

  if (isToday) {
    return `${baseClasses} bg-blue-100 text-blue-600 hover:bg-gray-100 cursor-pointer`;
  }

  return `${baseClasses} hover:bg-gray-100 cursor-pointer`;
};
