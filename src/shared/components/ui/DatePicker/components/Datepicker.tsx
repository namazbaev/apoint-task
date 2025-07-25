import { DatePickerInput } from './DatePickerInput';
import { DatePickerCalendar } from './DatePickerCalendar';
import { useDatePicker, useOutsideClick } from '../hooks';
import type { DatePickerProps } from '../types';

export const DatePicker = ({
  value = null,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  className = 'w-48',
}: DatePickerProps) => {
  const {
    isOpen,
    currentDate,
    handleDateSelect,
    handleClear,
    navigateMonth,
    toggleCalendar,
    closeCalendar,
  } = useDatePicker(value, onChange);

  const containerRef = useOutsideClick(closeCalendar);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <DatePickerInput
        value={value}
        isOpen={isOpen}
        disabled={disabled}
        onClear={handleClear}
        placeholder={placeholder}
        onClick={toggleCalendar}
      />

      {isOpen && (
        <DatePickerCalendar
          selectedDate={value}
          currentDate={currentDate}
          onNavigate={navigateMonth}
          onDateSelect={handleDateSelect}
        />
      )}
    </div>
  );
};
