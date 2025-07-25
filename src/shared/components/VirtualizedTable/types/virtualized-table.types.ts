import React from 'react';

export interface Column<T> {
  key: keyof T;
  title: string;
  width?: string;
  isNumeric?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, record?: T) => React.ReactNode;
}

export interface GroupConfig<T extends Record<string, unknown>> {
  parentKey: keyof T;
  categoryKey: keyof T;
  summaryKeys: (keyof T)[];
}

export interface TableRow<T> {
  id: string;
  type: 'total' | 'parent' | 'category' | 'item';
  data: T;
  level: number;
  className?: string;
  isExpanded?: boolean;
  hasChildren?: boolean;
}

export type Alignment = 'left' | 'center' | 'right';

export type SafeColumn<T extends Record<string, unknown>> = Column<T> & {
  align?: Alignment;
  width?: string;
  title: string;
};
