import { Component, type ErrorInfo, type PropsWithChildren } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  public state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Произошла ошибка
              </h2>
              <p className="text-gray-600">
                Что-то пошло не так. Попробуйте еще раз.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Попробовать снова
              </button>

              <div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Обновить страницу
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };
}
