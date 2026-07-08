export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-6">

      <button
        onClick={onPrevious}
        disabled={page <= 1}
        className="rounded-lg bg-blue-700 px-5 py-2 text-white disabled:bg-gray-300"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded-lg bg-blue-700 px-5 py-2 text-white disabled:bg-gray-300"
      >
        Next
      </button>

    </div>
  );
}