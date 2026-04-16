export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8 space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-44 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded" />
        </div>

        <div className="max-w-2xl bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
