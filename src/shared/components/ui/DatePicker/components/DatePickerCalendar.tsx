import { DatePickerHeader } from './DatePickerHeader';
import { getDayClasses, getDaysInMonth } from '../utils';
import { CALENDAR_STYLES, DAY_NAMES } from '../constants';
import type { CalendarProps } from '../types';

export const DatePickerCalendar = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onNavigate,
}: CalendarProps) => {
  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div className={CALENDAR_STYLES.CONTAINER}>
      <DatePickerHeader currentDate={currentDate} onNavigate={onNavigate} />

      <div className={CALENDAR_STYLES.DAYS_HEADER}>
        {DAY_NAMES.map((day) => (
          <div key={day} className={CALENDAR_STYLES.DAY_NAME}>
            {day}
          </div>
        ))}
      </div>

      <div className={CALENDAR_STYLES.DAYS_GRID}>
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const dayClasses = getDayClasses(
            date,
            currentDate,
            selectedDate,
            today,
          );

          return (
            <button
              key={index}
              className={dayClasses}
              onClick={() => isCurrentMonth && onDateSelect(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
