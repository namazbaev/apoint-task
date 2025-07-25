import { useNavigate } from 'react-router-dom';
import { Button } from '~/shared/components/ui';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h2 className="text-xl font-semibold text-gray-900">
            Страница не найдена
          </h2>
          <p className="text-gray-600">
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        <div className="space-x-2">
          <Button size="sm" onClick={handleNavigateBack}>
            Назад
          </Button>

          <Button variant="secondary" size="sm" onClick={handleNavigateHome}>
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};
