export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8 space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>

        <div className="h-12 bg-gray-200 rounded-lg" />

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-10 bg-gray-100" />

          <div className="p-4 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
