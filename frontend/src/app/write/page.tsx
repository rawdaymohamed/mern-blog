"use client";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <p>Loading...</p>;
  if (isLoaded && !isSignedIn) return <p>Please Login to Access this Page</p>;
  return (
    <div className="flex flex-col gap-8 text-gray-700 mt-5">
      {/* Header */}
      <h1 className="font-light text-2xl lg:text-3xl text-gray-900">
        Create a New Post
      </h1>
      <form className="flex flex-col gap-4">
        {/* Add a cover image button */}
        <div>
          <button className="shadow-md  px-4 py-2 rounded-md bg-white">
            Add a cover image
          </button>
        </div>
        {/* Title */}
        <input
          placeholder="My Awesome Story"
          className="text-xl bg-transparent outline-none"
        />
        {/* Category */}
        <div className="flex gap-4 items-center">
          <label htmlFor="categories" className="text-blue-700">
            Choose a category:
          </label>
          <select name="categories" className="p-2">
            <option className="p-2" value="General">
              General
            </option>
            <option className="p-2" value="web-design">
              Web Design
            </option>
            <option className="p-2" value="development">
              Development
            </option>
            <option className="p-2" value="databases">
              Databases
            </option>
            <option className="p-2" value="seo">
              Search Engines
            </option>
            <option className="p-2" value="Marketing">
              Marketing
            </option>
          </select>
        </div>
        {/* Description */}
        <textarea
          rows={4}
          placeholder="A short description"
          className="rounded-lg p-4 focus:outline focus:outline-1 focus:outline-slate-700"
        />
        {/* Markdown */}
      </form>
    </div>
  );
};

export default Page;
