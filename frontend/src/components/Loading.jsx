export default function Loading() {
  return (
    <div className="py-20 text-center">

      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

      <p className="mt-4 text-gray-600">
        Loading medicines...
      </p>

    </div>
  );
}