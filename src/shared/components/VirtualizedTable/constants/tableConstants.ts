export const TABLE_CONSTANTS = {
  DEFAULT_HEIGHT: 1000,
  DEFAULT_ROW_HEIGHT: 34,
  HEADER_HEIGHT: 40,
  STATS_HEIGHT: 40,
  MIN_HEIGHT: 200,
  MAX_HEIGHT: 2000,
} as const;

export const TABLE_CLASSES = {
  CONTAINER: 'border border-gray-300 overflow-hidden shadow-sm bg-white',
  SCROLL_CONTENT: 'overflow-auto h-[calc(100vh-150px)]',
  ROW_ITEM: 'bg-white hover:bg-gray-50',
  STATS_FOOTER:
    'bg-gray-100 border-t border-gray-300 px-4 flex items-center justify-between text-xs text-gray-600',
} as const;
