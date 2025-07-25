import { useDateRange, useMaterialsWithFilters } from '../hooks';
import {
  MaterialsPageHeader,
  MaterialsTable,
} from '~/features/materials/components';

const MaterialsPage = () => {
  const { dateRange, setStartDate, setEndDate, formattedDates, isValidRange } =
    useDateRange();

  const {
    data: materials,
    isLoading,
    error,
  } = useMaterialsWithFilters({
    filters: {
      endDate: formattedDates.end,
      startDate: formattedDates.start,
    },
    enabled: isValidRange,
  });

  const handleReload = () => window.location.reload();

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="text-red-600 mb-4 text-lg">
            Ошибка загрузки данных
          </div>
          <button
            onClick={handleReload}
            className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    if (!isValidRange) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
          <p className="text-lg mb-2">Некорректный период</p>
          <p className="text-sm">
            Дата начала должна быть раньше даты окончания
          </p>
        </div>
      );
    }

    return <MaterialsTable data={materials} loading={isLoading} />;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <MaterialsPageHeader
        dateRange={dateRange}
        isValidRange={isValidRange}
        onEndDateChange={setEndDate}
        onStartDateChange={setStartDate}
      />

      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  );
};

export default MaterialsPage;
