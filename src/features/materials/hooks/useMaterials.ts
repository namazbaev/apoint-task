import type { MaterialItem } from '../types';
import { materialService } from '~/features/materials/services';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export const useMaterials = (
  params: Record<string, string | undefined> = {},
  options?: Omit<UseQueryOptions<MaterialItem[]>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['material-list', params],
    queryFn: () => materialService.list(params),
    ...options,
  });
};
