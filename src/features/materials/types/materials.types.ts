export interface MaterialItem {
  id?: string | number;
  material_id?: number;
  name?: string;
  color?: string;
  unit?: string;
  code?: string;
  last_price?: number;
  remind_start_amount?: number;
  remind_start_sum?: number;
  remind_income_amount?: number;
  remind_income_sum?: number;
  remind_outgo_amount?: number;
  remind_outgo_sum?: number;
  remind_end_amount?: number;
  remind_end_sum?: number;
  parent?: string;
  category?: string;
  [key: string]: unknown;
}
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface MaterialsFilters {
  startDate?: string;
  endDate?: string;
}
