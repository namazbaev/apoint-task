import React, { memo, useCallback } from 'react';
import type { Column, TableRow } from '../types';
import { safeRender } from '../utils';
import { ExpandIcon } from './ExpandIcon';

interface TableRowDataProps<T extends Record<string, unknown>> {
  row: TableRow<T>;
  columns: Column<T>[];
  rowHeight: number;
  onExpand?: (id: string) => void;
  onRowClick?: (record: T | undefined) => void;
}

export const TableRowData = memo(
  <T extends Record<string, unknown>>(props: TableRowDataProps<T>) => {
    const { row, columns, rowHeight, onExpand, onRowClick } = props;

    const rowClasses = `flex border-b border-gray-200 transition-colors duration-150 ${row.className || ''} ${row.hasChildren ? 'cursor-pointer' : ''}`;

    const rowStyles = { height: rowHeight, minHeight: rowHeight };

    const indentStyles = { paddingLeft: `${row.level * 20}px` };

    const handleClick = useCallback(() => {
      if (row.hasChildren && onExpand) {
        onExpand(row.id);
      } else if (row.type === 'item' && onRowClick && row.data) {
        onRowClick(row.data);
      }
    }, [row.hasChildren, row.id, row.type, row.data, onExpand, onRowClick]);

    const formatValue = useCallback(
      (value: T[keyof T], column: Column<T>) => {
        return safeRender(() => {
          if (column.render && value != null) {
            return column.render(value, row.data);
          }

          if (typeof value === 'number') {
            return value === 0
              ? '0'
              : new Intl.NumberFormat('ru-RU').format(value);
          }

          if (value == null) return '';
          if (typeof value === 'object') return JSON.stringify(value);
          return String(value);
        });
      },
      [row.data],
    );

    const getCellClasses = (column: Column<T>) => {
      const alignClass =
        column.align === 'center'
          ? 'justify-center'
          : column.align === 'right'
            ? 'justify-end'
            : 'justify-start';

      return `px-3 py-2 text-sm border-r border-gray-200 last:border-r-0 flex items-center ${alignClass} ${column.isNumeric ? 'font-mono' : ''}`;
    };

    const getCellStyles = (column: Column<T>) => ({
      minWidth: '100px',
      overflow: 'hidden',
      width: column.width || '150px',
    });

    const renderCellContent = (
      value: T[keyof T],
      column: Column<T>,
      isFirst: boolean,
    ) => {
      const formattedValue = formatValue(value, column);

      if (isFirst) {
        return (
          <div className="flex items-center" style={indentStyles}>
            <ExpandIcon
              isExpanded={row.isExpanded || false}
              hasChildren={row.hasChildren || false}
            />
            <span className="ml-2">{formattedValue}</span>
          </div>
        );
      }

      return formattedValue;
    };

    const rowData = row.data || ({} as T);

    return (
      <div onClick={handleClick} style={rowStyles} className={rowClasses}>
        {columns.map((column, index) => (
          <div
            key={String(column.key)}
            className={getCellClasses(column)}
            style={getCellStyles(column)}
          >
            <div className="truncate w-full">
              {renderCellContent(rowData[column.key], column, index === 0)}
            </div>
          </div>
        ))}
      </div>
    );
  },
) as <T extends Record<string, unknown>>(
  props: TableRowDataProps<T>,
) => React.ReactElement;
