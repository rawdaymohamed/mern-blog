import Link from "next/link";
import SearchSmall from "./SearchSmall";
import { Suspense } from "react";

export default function SideMenu({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} flex flex-col gap-8 h-max sticky top-8`}>
      <div>
        <h1 className="mb-4 text-sm font-semibold">Search</h1>
        <Suspense>
          <SearchSmall />
        </Suspense>
      </div>
      <div>
        <h1 className="mb-4 text-sm font-semibold">Filter</h1>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="sort-newest"
            className="cursor-pointer flex gap-2 items-center"
          >
            <input
              type="radio"
              name="sort"
              id="sort-newest"
              value="newest"
              className="appearance-none cursor-pointer w-4 h-4 border-[1.5px] rounded-sm border-blue-800 bg-white checked:bg-blue-800"
            />
            Newest
          </label>
          <label
            htmlFor="sort-popular"
            className="cursor-pointer flex gap-2 items-center"
          >
            <input
              type="radio"
              name="sort"
              id="sort-popular"
              value="popular"
              className="appearance-none cursor-pointer w-4 h-4 border-[1.5px] rounded-sm border-blue-800 bg-white checked:bg-blue-800"
            />
            Most Popular
          </label>
          <label
            htmlFor="sort-trending"
            className="cursor-pointer flex gap-2 items-center"
          >
            <input
              type="radio"
              name="sort"
              id="sort-trending"
              value="trending"
              className="appearance-none cursor-pointer w-4 h-4 border-[1.5px] rounded-sm border-blue-800 bg-white checked:bg-blue-800"
            />
            Trending
          </label>
          <label
            htmlFor="sort-oldest"
            className="cursor-pointer flex gap-2 items-center"
          >
            <input
              type="radio"
              name="sort"
              id="sort-oldest"
              value="oldest"
              className="appearance-none  w-4 h-4 border-[1.5px] rounded-sm border-blue-800 bg-white checked:bg-blue-800"
            />
            Oldest
          </label>
        </div>
      </div>
      <div>
        <h1 className="mb-4 text-sm font-semibold">Categories</h1>
        <div className="flex flex-col gap-3">
          <Link href="/posts?cat=" className="underline">
            All
          </Link>
          <Link href="/posts?cat=" className="underline">
            Web Design
          </Link>
          <Link href="/posts?cat=" className="underline">
            Development
          </Link>
          <Link href="/posts?cat=" className="underline">
            Databases
          </Link>
          <Link href="/posts?cat=" className="underline">
            Search Engines
          </Link>
          <Link href="/posts?cat=" className="underline">
            Marketing
          </Link>
        </div>
      </div>
    </div>
  );
}
