import Link from "next/link";

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
        <div className="flex flex-grow gap-3 border border-gray-300 rounded-full bg-slate-100 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="w-6 h-6 text-gray-600"
            viewBox="0 0 30 30"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-transparent flex-grow"
          />
        </div>
      </div>
    </section>
  );
}
