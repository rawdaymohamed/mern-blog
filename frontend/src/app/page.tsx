import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Breadcrump  */}
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        <span>•</span>
        <span className="text-[#14213D]">Blogs and Articles</span>
      </div>
      {/* Introduction */}
      <div className="flex justify-between items-center mt-5">
        {/* titles */}
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Share your story with the world.
          </h1>
          <p className="text-md md:text-xl lg:text-2xl leading-normal text-gray-600">
            Start writing today and connect with a community of readers. Publish
            your thoughts, spark discussions, and build meaningful connections
            through the power of blogging.
          </p>
        </div>
        {/* animated button */}
        <Link href="/write"></Link>
      </div>
      {/* Featured Posts */}
      {/* Post List */}
    </div>
  );
}
