"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const Page = () => {
  const [value, setValue] = useState("");
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <p>Loading...</p>;
  if (isLoaded && !isSignedIn) return <p>Please Login to Access this Page</p>;
  return (
    <div className="flex flex-col gap-8 text-gray-700 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
      {/* Header */}
      <h1 className="font-light text-2xl lg:text-3xl text-gray-900">
        Create a New Post
      </h1>
      <form className="flex flex-col gap-8 flex-grow ">
        {/* Add a cover image button */}
        <div>
          <button className="shadow-md  px-4 py-2 rounded-md bg-white">
            Add a cover image
          </button>
        </div>
        {/* Title */}
        <input
          placeholder="My Awesome Story"
          className="text-xl font-bold bg-transparent outline-none"
        />
        {/* Category */}
        <div className="flex gap-4 items-center">
          <label htmlFor="categories" className="text-sm text-blue-700">
            Choose a category:
          </label>
          <select name="categories" className="p-2 rounded-md shadow-sm">
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
          className="p-4 bg-white shadow-sm rounded-md outline-none "
        />
        {/* Markdown */}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="flex-1 bg-white shadow-sm rounded-md outline-none"
        />
        <div>
          <button
            type="button"
            className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-700 hover:bg-blue-900 text-white font-normal py-2 px-4 rounded mt-8"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
