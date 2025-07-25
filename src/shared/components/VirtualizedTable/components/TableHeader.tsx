import { useMemo } from 'react';
import type { Alignment, SafeColumn } from '../types';

interface TableHeaderProps<T extends Record<string, unknown>> {
  columns: SafeColumn<T>[];
}

interface ColumnStyle {
  key: string;
  width: string;
  alignClass: string;
  title: string;
}

const ALIGN_CLASS_MAP: Record<Alignment, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const;

export const TableHeader = <T extends Record<string, unknown>>({
  columns,
}: TableHeaderProps<T>) => {
  const columnStyles = useMemo(
    () =>
      columns.map(
        (column): ColumnStyle => ({
          title: column.title,
          key: String(column.key),
          width: column.width ?? '150px',
          alignClass: ALIGN_CLASS_MAP[column.align ?? 'left'],
        }),
      ),
    [columns],
  );

  return (
    <div className="bg-gray-100 border-b-2 border-gray-300 sticky top-0 z-10">
      <div className="flex">
        {columnStyles.map(({ key, width, alignClass, title }, index) => {
          const isLast = index === columnStyles.length - 1;

          return (
            <div
              key={key}
              style={{ width, minWidth: '100px' }}
              className={[
                'flex items-center px-3 py-1',
                'text-xs font-bold text-gray-800 uppercase tracking-wider',
                isLast ? '' : 'border-r border-gray-300',
                alignClass,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="whitespace-pre-line leading-tight">{title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
