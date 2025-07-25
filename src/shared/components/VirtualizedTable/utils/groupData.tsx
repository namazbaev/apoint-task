import React from 'react';
import type { GroupConfig, TableRow } from '../types';

export const validateTableData = <T extends Record<string, unknown>>(
  data: T[],
): T[] => {
  if (!Array.isArray(data)) {
    console.warn('Invalid data: not an array', data);
    return [];
  }

  return data
    .filter((item, index) => {
      if (!item || typeof item !== 'object') {
        console.warn(`Invalid item at index ${index}:`, item);
        return false;
      }

      const hasValidValue = Object.values(item).some(
        (value) => value !== null && value !== undefined && value !== '',
      );

      if (!hasValidValue) {
        console.warn(`Empty row at index ${index}:`, item);
        return false;
      }

      return true;
    })
    .map((item, index) => {
      const cleaned = { ...item };

      Object.keys(cleaned).forEach((key) => {
        const value = cleaned[key];
        if (typeof value === 'string') {
          const trimmed = value.trim();
          const numericValue = trimmed.replace(/[^\d.-]/g, '');
          if (/^\d+\.?\d*$/.test(numericValue) && numericValue !== '') {
            cleaned[key as keyof T] = parseFloat(numericValue) as T[keyof T];
          }
        }
      });

      // Ensure ID exists
      if (
        !(cleaned as any).id &&
        !(cleaned as any).material_id &&
        !(cleaned as any).colors_id
      ) {
        (cleaned as any).fallback_id = `fallback-${index}`;
      }

      return cleaned;
    });
};

export const safeRender = (
  renderFn: () => React.ReactNode,
): React.ReactNode => {
  try {
    return renderFn();
  } catch (error) {
    console.warn('Table render error:', error);
    return <span className="text-red-500 text-xs">Error</span>;
  }
};

const safeToString = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value as string);
};

const calculateTotals = <T extends Record<string, unknown>>(
  items: T[],
  summaryKeys: (keyof T)[],
): Partial<T> => {
  const totals = {} as Partial<T>;

  summaryKeys.forEach((key) => {
    const sum = items.reduce((acc, item) => {
      const value = item[key];
      return acc + (typeof value === 'number' ? value : 0);
    }, 0);
    totals[key] = sum as T[keyof T];
  });

  return totals;
};

export const groupData = <T extends Record<string, unknown>>(
  data: T[],
  config: GroupConfig<T>,
  expandedKeys: Set<string>,
): TableRow<T>[] => {
  const result: TableRow<T>[] = [];

  const grandTotal = calculateTotals(data, config.summaryKeys);

  result.push({
    level: 0,
    id: 'total',
    type: 'total',
    isExpanded: false,
    hasChildren: false,
    data: {
      [config.parentKey]: 'ИТОГ' as T[keyof T],
      ...grandTotal,
    } as T,
    className: 'bg-neutral-100 font-semibold text-xs text-gray-900',
  });

  const grouped = new Map<string, Map<string, T[]>>();

  data.forEach((item) => {
    const parentValue = item[config.parentKey];
    const categoryValue = item[config.categoryKey];

    const parent = safeToString(parentValue) || 'Other';
    const category = safeToString(categoryValue) || 'Default';

    if (!grouped.has(parent)) {
      grouped.set(parent, new Map());
    }
    if (!grouped.get(parent)!.has(category)) {
      grouped.get(parent)!.set(category, []);
    }
    grouped.get(parent)!.get(category)!.push(item);
  });

  grouped.forEach((categories, parent) => {
    const parentItems = Array.from(categories.values()).flat();
    const parentTotal = calculateTotals(parentItems, config.summaryKeys);
    const parentId = `parent-${parent}`;
    const isParentExpanded = expandedKeys.has(parentId);
    const hasCategories = categories.size > 0;

    result.push({
      id: parentId,
      type: 'parent',
      level: 1,
      data: {
        [config.parentKey]: parent as T[keyof T],
        ...parentTotal,
      } as T,
      className:
        'bg-blue-50 font-semibold text-gray-800 cursor-pointer hover:bg-blue-100',
      isExpanded: isParentExpanded,
      hasChildren: hasCategories,
    });

    if (isParentExpanded) {
      categories.forEach((items, category) => {
        const categoryTotal = calculateTotals(items, config.summaryKeys);
        const categoryId = `category-${parent}-${category}`;
        const isCategoryExpanded = expandedKeys.has(categoryId);
        const hasItems = items.length > 0;

        result.push({
          id: categoryId,
          type: 'category',
          level: 2,
          data: {
            [config.parentKey]: category as T[keyof T],
            ...categoryTotal,
          } as T,
          className:
            'bg-gray-50 font-medium text-gray-700 cursor-pointer hover:bg-gray-100',
          isExpanded: isCategoryExpanded,
          hasChildren: hasItems,
        });

        if (isCategoryExpanded) {
          items.forEach((item, index) => {
            const getId = (): string => {
              const possibleIds = [
                (item as any).id,
                (item as any).material_id,
                (item as any).colors_id,
                (item as any).name,
                index,
              ];

              for (const id of possibleIds) {
                if (id !== undefined && id !== null && id !== '') {
                  return String(id);
                }
              }
              return String(index);
            };

            const uniqueId = `item-${parent}-${category}-${getId()}-${index}`;

            result.push({
              id: uniqueId,
              type: 'item',
              level: 3,
              data: item,
              className: 'bg-white hover:bg-gray-50',
              isExpanded: false,
              hasChildren: false,
            });
          });
        }
      });
    }
  });

  return result;
};
