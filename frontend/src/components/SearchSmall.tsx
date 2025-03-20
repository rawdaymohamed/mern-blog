"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { FaSearch } from "react-icons/fa";

const SearchSmall: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract search query from URL
  const searchQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState<string>(searchQuery);

  useEffect(() => {
    if (query !== searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", query);
      router.push(`/posts?${params.toString()}`);
    }
  };
  return (
    <Suspense>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={handleKeyPress}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Search"
        >
          <FaSearch
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
            aria-hidden="true"
          />
        </button>
      </div>
    </Suspense>
  );
};

export default SearchSmall;
