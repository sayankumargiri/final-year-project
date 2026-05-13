export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="input input-bordered w-full"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}