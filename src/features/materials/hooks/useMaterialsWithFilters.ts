import { useMemo } from 'react';
import type { MaterialsFilters } from '../types';
import { useMaterials } from './useMaterials';

interface UseMaterialsWithFiltersProps {
  filters: MaterialsFilters;
  enabled?: boolean;
}

export const useMaterialsWithFilters = ({
  filters,
  enabled = true,
}: UseMaterialsWithFiltersProps) => {
  const params = useMemo(
    () => ({
      start: filters.startDate,
      end: filters.endDate,
    }),
    [filters.startDate, filters.endDate],
  );

  const shouldFetch = enabled && !!(filters.startDate && filters.endDate);

  const query = useMaterials(params, {
    enabled: shouldFetch,
  });

  return {
    ...query,
    data: query.data || [],
    hasFilters: !!(filters.startDate && filters.endDate),
  };
};
