interface LoadingStateProps {
  height: number;
}

export const LoadingState = ({ height }: LoadingStateProps) => {
  return (
    <div
      className="flex items-center justify-center bg-white border rounded-lg"
      style={{ height }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full size-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
};
