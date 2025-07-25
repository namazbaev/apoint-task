import type { TableRow } from '~/shared/components/VirtualizedTable';

export interface TableDimensions {
  headerHeight: number;
  statsHeight: number;
  contentHeight: number;
}

export const generateRowId = <T extends Record<string, unknown>>(
  item: T,
  index: number,
): string => {
  const possibleIds = [item.id, item.material_id, item.colors_id, item.name];

  for (const id of possibleIds) {
    if (id != null && id !== '') {
      return String(id as string);
    }
  }
  return String(index);
};

export const createFlatTableRows = <T extends Record<string, unknown>>(
  data: T[],
): TableRow<T>[] => {
  return data.map((item, index) => ({
    id: `flat-item-${generateRowId(item, index)}-${index}`,
    type: 'item' as const,
    level: 0,
    data: item,
    className: 'bg-white hover:bg-gray-50',
    isExpanded: false,
    hasChildren: false,
  }));
};

export const calculateTableDimensions = (
  totalHeight: number,
  showStats: boolean,
): TableDimensions => {
  const headerHeight = 40;
  const statsHeight = showStats ? 40 : 0;
  const contentHeight = totalHeight - headerHeight - statsHeight;

  return {
    headerHeight,
    statsHeight,
    contentHeight,
  };
};

export const getVisibleRowsRange = (
  start: number,
  end: number,
  total: number,
): string => {
  const displayStart = start + 1;
  const displayEnd = Math.min(end + 1, total);
  return `${displayStart}-${displayEnd}`;
};

export const sanitizeTableData = <T extends Record<string, unknown>>(
  data: T[],
): T[] => {
  return data.filter((item) => item != null && typeof item === 'object');
};

export const getStatsText = (total: number, start: number, end: number) => ({
  total: `Всего записей: ${total}`,
  range: `Отображено: ${getVisibleRowsRange(start, end, total)} из ${total}`,
});
