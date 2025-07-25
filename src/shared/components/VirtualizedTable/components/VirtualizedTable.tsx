import { EmptyState, LoadingState, TableHeader, TableRowData } from '.';
import { useCallback, useMemo, useState } from 'react';
import { useVirtualization } from '../hooks';
import {
  type Column,
  type GroupConfig,
  groupData,
  validateTableData,
} from '~/shared/components/VirtualizedTable';
import {
  calculateTableDimensions,
  createFlatTableRows,
  getStatsText,
} from '../utils/tableUtils';
import { TABLE_CLASSES, TABLE_CONSTANTS } from '../constants/tableConstants';

interface VirtualizedTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  groupConfig?: GroupConfig<T>;
  height?: number;
  loading?: boolean;
  className?: string;
  rowHeight?: number;
  showStats?: boolean;
  onRowClick?: (record: T | undefined) => void;
}

export const VirtualizedTable = <T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  groupConfig,
  className = '',
  loading = false,
  showStats = true,
  height = TABLE_CONSTANTS.DEFAULT_HEIGHT,
  rowHeight = TABLE_CONSTANTS.DEFAULT_ROW_HEIGHT,
}: VirtualizedTableProps<T>) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const cleanData = useMemo(() => validateTableData(data), [data]);

  const tableData = useMemo(() => {
    if (!groupConfig) {
      return createFlatTableRows(cleanData);
    }
    return groupData(cleanData, groupConfig, expandedKeys);
  }, [cleanData, groupConfig, expandedKeys]);

  const dimensions = useMemo(
    () => calculateTableDimensions(height, showStats),
    [height, showStats],
  );

  const { visibleRange, handleScroll, totalHeight, offsetY } =
    useVirtualization({
      itemHeight: rowHeight,
      itemCount: tableData.length,
      containerHeight: dimensions.contentHeight,
    });

  const visibleRows = useMemo(
    () => tableData.slice(visibleRange.start, visibleRange.end + 1),
    [tableData, visibleRange.start, visibleRange.end],
  );

  const statsText = useMemo(() => {
    if (!showStats) return null;
    return getStatsText(tableData.length, visibleRange.start, visibleRange.end);
  }, [showStats, tableData.length, visibleRange.start, visibleRange.end]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  if (loading) {
    return <LoadingState height={height} />;
  }

  const isEmpty = cleanData.length === 0;

  return (
    <div className={`${TABLE_CLASSES.CONTAINER} ${className}`}>
      <div style={{ height: dimensions.headerHeight }}>
        <TableHeader columns={columns} />
      </div>

      <div onScroll={handleScroll} className={TABLE_CLASSES.SCROLL_CONTENT}>
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleRows.map((row) => (
                <TableRowData
                  row={row}
                  key={row.id}
                  columns={columns}
                  rowHeight={rowHeight}
                  onExpand={toggleExpand}
                  onRowClick={onRowClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showStats && statsText && !isEmpty && (
        <div
          style={{ height: dimensions.statsHeight }}
          className={TABLE_CLASSES.STATS_FOOTER}
        >
          <span>{statsText.total}</span>
          <span>{statsText.range}</span>
        </div>
      )}
    </div>
  );
};
