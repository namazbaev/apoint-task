export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface CalendarProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export interface DatePickerInputProps {
  value: Date | null;
  placeholder: string;
  disabled: boolean;
  isOpen: boolean;
  onClick: () => void;
  onClear: (e: React.MouseEvent) => void;
}
