import Link from "next/link";
import SearchSmall from "./SearchSmall";

export default function MainCategories({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`${className} hidden md:flex bg-white px-10 py-5 rounded-3xl lg:rounded-full text-gray-600 shadow-lg`}
    >
      {/* Categories */}
      <div className="w-full flex  gap-5 items-center md:justify-between">
        <div className="flex  flex-wrap gap-2">
          <Link
            href="/posts"
            className="bg-blue-800 text-white px-4 py-2 rounded-full"
          >
            All Posts
          </Link>
          <Link
            href="/posts"
            className="hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            Web Design
          </Link>
          <Link
            href="/posts"
            className="hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            Development
          </Link>
          <Link
            href="/posts"
            className="hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            Databases
          </Link>
          <Link
            href="/posts"
            className="hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            Search Engines
          </Link>
          <Link
            href="/posts"
            className="hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            Marketing
          </Link>
        </div>
        {/* Search */}
        <SearchSmall />
      </div>
    </section>
  );
}
