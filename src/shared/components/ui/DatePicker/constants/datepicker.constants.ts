export const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

export const CALENDAR_STYLES = {
  CONTAINER:
    'absolute right-0 z-50 mt-1 w-72 text-sm bg-white border border-gray-300 rounded shadow-lg p-4',
  HEADER: 'flex items-center justify-between mb-4',
  NAV_BUTTON: 'p-1 hover:bg-gray-100 rounded',
  TITLE: 'font-medium',
  DAYS_HEADER: 'grid grid-cols-7 gap-1 mb-2',
  DAY_NAME: 'text-center text-xs font-medium text-gray-500 p-2',
  DAYS_GRID: 'w-full grid grid-cols-7 gap-1',
} as const;

export const INPUT_STYLES = {
  CONTAINER:
    'flex items-center justify-between w-full px-3 py-1.5 text-sm border border-gray-300 rounded cursor-pointer',
  DISABLED: 'bg-gray-100 cursor-not-allowed',
  HOVER: 'hover:border-gray-400',
  FOCUSED: 'border-blue-500 ring-2 ring-blue-200',
  ACTIONS: 'flex items-center gap-1',
  CLEAR_BUTTON: 'p-1 hover:bg-gray-100 rounded',
} as const;
