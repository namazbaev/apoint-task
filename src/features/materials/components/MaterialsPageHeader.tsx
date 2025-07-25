import { memo } from 'react';
import { DateRangeFilter } from './DateRangeFilter';
import type { DateRange } from '../types';

interface MaterialsPageHeaderProps {
  title?: string;
  dateRange: DateRange;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  isValidRange: boolean;
}

export const MaterialsPageHeader = memo<MaterialsPageHeaderProps>(
  ({
    title = 'Товары',
    dateRange,
    onStartDateChange,
    onEndDateChange,
    isValidRange,
  }) => {
    return (
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

        <div className="flex items-center gap-4">
          <DateRangeFilter
            dateRange={dateRange}
            isValidRange={isValidRange}
            onEndDateChange={onEndDateChange}
            onStartDateChange={onStartDateChange}
          />
        </div>
      </div>
    );
  },
);

MaterialsPageHeader.displayName = 'MaterialsPageHeader';
