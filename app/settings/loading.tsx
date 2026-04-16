export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8 space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>

        <div className="max-w-4xl bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
