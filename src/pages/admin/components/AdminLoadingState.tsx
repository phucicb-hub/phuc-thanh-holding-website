export default function AdminLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <i className="ri-loader-4-line w-8 h-8 flex items-center justify-center text-primary-500 animate-spin" />
      <span className="text-sm text-foreground-600">Đang tải...</span>
    </div>
  );
}