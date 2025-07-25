import { memo } from 'react';
import { DatePicker } from '~/shared/components/ui/DatePicker';
import type { DateRange } from '../types';

interface DateRangeFilterProps {
  dateRange: DateRange;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  isValidRange: boolean;
}

export const DateRangeFilter = memo<DateRangeFilterProps>(
  ({ dateRange, onStartDateChange, onEndDateChange, isValidRange }) => {
    return (
      <div className="flex items-center gap-2">
        <DatePicker
          value={dateRange.start}
          onChange={onStartDateChange}
          placeholder="Дата начала"
          className={`w-40 ${!isValidRange ? 'border-red-300' : ''}`}
        />
        <span className="text-gray-400">—</span>
        <DatePicker
          value={dateRange.end}
          onChange={onEndDateChange}
          placeholder="Дата окончания"
          className={`w-40 ${!isValidRange ? 'border-red-300' : ''}`}
        />
      </div>
    );
  },
);

DateRangeFilter.displayName = 'DateRangeFilter';
