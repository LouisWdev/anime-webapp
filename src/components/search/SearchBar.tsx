import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { useFilterStore } from '../../store/useFilterStore';

export function SearchBar() {
  const { search, setSearch } = useFilterStore();

  return (
    <div className="relative">
      <Input
        icon={<Search className="w-4 h-4" />}
        placeholder="Search anime, manga, tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pr-10"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
