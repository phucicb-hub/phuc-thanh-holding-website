interface AdminErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function AdminErrorState({ message, onRetry }: AdminErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600">
        <i className="ri-error-warning-line w-7 h-7 flex items-center justify-center" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground-900">Không thể tải dữ liệu</p>
        <p className="text-sm text-foreground-600 mt-1 max-w-md">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
      >
        <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
        Thử lại
      </button>
    </div>
  );
}