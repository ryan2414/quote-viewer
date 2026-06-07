export default function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 h-full flex flex-col"
    >
      {/* 인용마크 자리 */}
      <div className="mb-3">
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* 명언 텍스트 3줄 */}
      <div className="flex-grow mb-4 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>

      {/* 구분선 */}
      <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mb-4" />

      {/* 저자 자리 */}
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />

      {/* 카테고리 뱃지 자리 */}
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 mb-3" />

      {/* 버튼 자리 */}
      <div className="mt-auto h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-full" />
    </div>
  )
}
