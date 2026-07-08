export default function Filters({
  manufacturer,
  setManufacturer,
  route,
  setRoute,
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

      <input
        type="text"
        placeholder="Manufacturer"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        className="rounded-lg border bg-white p-3 shadow-sm focus:border-blue-500 focus:outline-none"
      />

      <select
        value={route}
        onChange={(e) => setRoute(e.target.value)}
        className="rounded-lg border bg-white p-3 shadow-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="">All Routes</option>
        <option value="Oral">Oral</option>
        <option value="Injection">Injection</option>
        <option value="Topical">Topical</option>
        <option value="Inhalation">Inhalation</option>
      </select>

    </div>
  );
}