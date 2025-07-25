interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = 'Данные отсутствуют',
  description = 'Попробуйте изменить фильтры или добавить новые записи',
}: EmptyStateProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-500 overflow-hidden">
      <div className="text-lg font-medium mb-2">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  );
};
