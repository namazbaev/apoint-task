import { apiClient, ENDPOINTS } from '~/api';
import type {
  MaterialItem,
  MaterialsFilters,
} from '~/features/materials/types';

export const materialService = {
  list: async (params: MaterialsFilters) => {
    return await apiClient.get<MaterialItem[]>(ENDPOINTS.MATERIALS.LIST, {
      params,
    });
  },
};
