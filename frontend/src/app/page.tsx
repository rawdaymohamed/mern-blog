import Link from "next/link";
import WriteButton from "@/components/WriteButton";
import MainCategories from "@/components/MainCategories";
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-5">
        {/* titles */}
        <div className="flex flex-col gap-5 md:w-4/5">
          <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Share your story with the world.
          </h1>
          <p className="text-md md:text-xl lg:text-2xl leading-normal text-gray-600">
            Start writing today and connect with a community of readers. Publish
            your thoughts, spark discussions, and build meaningful connections
            through the power of blogging.
          </p>
        </div>
        <WriteButton className="self-start md:self-auto" />
      </div>
      {/* Main Categories */}
      <MainCategories />
      {/* Featured Posts */}
      {/* Post List */}
    </div>
  );
}
