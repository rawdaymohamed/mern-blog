"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchSmall from "./SearchSmall";
import { Suspense } from "react";

export default function MainCategories({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("cat"); // Remove filter to show all posts
    } else {
      params.set("cat", category);
    }

    router.push(`/posts?${params.toString()}`);
  };

  const categories = [
    { name: "All Posts", value: "all" },
    { name: "Web Design", value: "web-design" },
    { name: "Development", value: "development" },
    { name: "Databases", value: "databases" },
    { name: "Search Engines", value: "seo" },
    { name: "Marketing", value: "marketing" },
  ];

  return (
    <section
      className={`${className} hidden md:flex bg-white px-10 py-5 rounded-3xl lg:rounded-full text-gray-600 shadow-lg`}
    >
      <div className="w-full flex gap-5 items-center md:justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full ${
                searchParams.get("cat") === cat.value ||
                (cat.value === "all" && !searchParams.get("cat"))
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <Suspense>
          <SearchSmall />
        </Suspense>
      </div>
    </section>
  );
}
