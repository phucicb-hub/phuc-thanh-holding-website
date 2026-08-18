interface AdminEmptyStateProps {
  icon: string;
  description: string;
}

export default function AdminEmptyState({ icon, description }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
        <i className={`${icon} w-7 h-7 flex items-center justify-center`} />
      </div>
      <p className="text-sm text-foreground-600">{description}</p>
    </div>
  );
}