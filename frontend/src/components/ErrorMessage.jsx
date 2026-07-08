export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-100 p-4 text-red-700">
      {message}
    </div>
  );
}