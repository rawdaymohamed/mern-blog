"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchSmall from "./SearchSmall";

const SideMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get("sort") !== e.target.value) {
      params.set("sort", e.target.value);
      router.push(`?${params.toString()}`);
    }
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get("cat") !== category) {
      params.set("cat", category);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <SearchSmall />

      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        {["newest", "popular", "trending", "oldest"].map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              value={option}
              checked={searchParams.get("sort") === option}
              onChange={handleFilterChange}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>

      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        {[
          { name: "All", value: "" },
          { name: "General", value: "General" },
          { name: "Web Design", value: "web-design" },
          { name: "Development", value: "development" },
          { name: "Databases", value: "databases" },
          { name: "Search Engines", value: "seo" },
          { name: "Marketing", value: "marketing" },
        ].map((cat) => (
          <span
            key={cat.value}
            className={`underline cursor-pointer ${
              searchParams.get("cat") === cat.value ? "font-bold" : ""
            }`}
            onClick={() => handleCategoryChange(cat.value)}
          >
            {cat.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
