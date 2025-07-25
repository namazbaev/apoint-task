import { Calendar, X } from 'lucide-react';
import { formatDate } from '../utils';
import { INPUT_STYLES } from '../constants';
import type { DatePickerInputProps } from '../types';

export const DatePickerInput = ({
  value,
  placeholder,
  disabled,
  isOpen,
  onClick,
  onClear,
}: DatePickerInputProps) => {
  const inputClasses = [
    INPUT_STYLES.CONTAINER,
    disabled ? INPUT_STYLES.DISABLED : INPUT_STYLES.HOVER,
    isOpen ? INPUT_STYLES.FOCUSED : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div onClick={disabled ? undefined : onClick} className={inputClasses}>
      <span className={`!text-sm ${value ? 'text-gray-900' : 'text-gray-500'}`}>
        {value ? formatDate(value) : placeholder}
      </span>

      <div className={INPUT_STYLES.ACTIONS}>
        {value && !disabled ? (
          <button onClick={onClear} className={INPUT_STYLES.CLEAR_BUTTON}>
            <X className="size-3.5 text-gray-400" />
          </button>
        ) : (
          <button className={INPUT_STYLES.CLEAR_BUTTON}>
            <Calendar className="size-3.5 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};
