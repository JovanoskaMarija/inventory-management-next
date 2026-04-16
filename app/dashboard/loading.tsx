export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8 space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-white border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-6 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="h-64 bg-white border border-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
