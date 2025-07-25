import {
  type Column,
  type GroupConfig,
  VirtualizedTable,
} from '~/shared/components/VirtualizedTable';
import type { MaterialItem } from '../types';

interface MaterialsTableProps {
  loading?: boolean;
  data: MaterialItem[];
  onRowClick?: (record: MaterialItem | undefined) => void;
}

export const MaterialsTable = ({
  data = [],
  loading = false,
  onRowClick,
}: MaterialsTableProps) => {
  const columns: Column<MaterialItem>[] = [
    { key: 'parent', title: 'Наименование', width: '400px', align: 'left' },
    {
      key: 'color',
      title: 'Цвет',
      width: '80px',
      align: 'left',
      render: (value) => (value as string) || '-',
    },
    {
      key: 'unit',
      title: 'Ед.изм',
      width: '80px',
      align: 'left',
      render: (value) => (value as string) || '-',
    },
    {
      key: 'code',
      title: 'Артикул',
      width: '200px',
      align: 'left',
      render: (value) => (value as string) || '-',
    },
    {
      key: 'last_price',
      title: 'Цена учетная',
      width: '200px',
      align: 'left',
    },
    {
      key: 'remind_start_amount',
      title: 'Сальдо начало\nКол-во',
      width: '200px',
      align: 'left',
    },
    { key: 'remind_start_sum', title: 'Сумма', width: '120px', align: 'right' },
  ];

  const groupConfig: GroupConfig<MaterialItem> = {
    parentKey: 'parent',
    categoryKey: 'category',
    summaryKeys: [
      'remind_start_amount',
      'remind_start_sum',
      'remind_income_amount',
      'remind_income_sum',
      'remind_outgo_amount',
      'remind_outgo_sum',
      'remind_end_amount',
      'remind_end_sum',
    ],
  };

  return (
    <VirtualizedTable
      data={data}
      height={800}
      columns={columns}
      loading={loading}
      onRowClick={onRowClick}
      groupConfig={groupConfig}
    />
  );
};
