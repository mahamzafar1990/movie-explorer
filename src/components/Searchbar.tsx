import { Search } from "lucide-react";

type SearchbarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function Searchbar({ search, setSearch }: SearchbarProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;
    setSearch(value);
  }
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={handleChange}
        value={search}
        className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
