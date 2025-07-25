import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthTitle } from '../utils';
import { CALENDAR_STYLES } from '../constants';

interface DatePickerHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const DatePickerHeader = ({
  currentDate,
  onNavigate,
}: DatePickerHeaderProps) => {
  return (
    <div className={CALENDAR_STYLES.HEADER}>
      <button
        onClick={() => onNavigate('prev')}
        className={CALENDAR_STYLES.NAV_BUTTON}
      >
        <ChevronLeft className="size-4" />
      </button>

      <h3 className={CALENDAR_STYLES.TITLE}>{getMonthTitle(currentDate)}</h3>

      <button
        onClick={() => onNavigate('next')}
        className={CALENDAR_STYLES.NAV_BUTTON}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};
