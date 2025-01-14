"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface NewPost {
  title: string;
  category: string;
  desc: string;
  content: string;
}

const Page = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [value, setValue] = useState(""); // For ReactQuill content
  const [title, setTitle] = useState(""); // For the title
  const [category, setCategory] = useState("General"); // For the category
  const [description, setDescription] = useState(""); // For the description
  const [loading, setLoading] = useState<boolean>(false); // To track loading state

  if (!isLoaded) return <p>Loading...</p>;
  if (isLoaded && !isSignedIn) return <p>Please Login to Access this Page</p>;

  const createPost = async (newPost: NewPost) => {
    const token = await getToken();
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      newPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data: NewPost = {
      title,
      category,
      desc: description,
      content: value,
    };

    try {
      const response = await createPost(data);
      toast.success("Post has been created");
      router.push(response.data.slug);
    } catch (error) {
      console.error("Error creating post:", error);
      // alert("Failed to create post.");
    } finally {
      setLoading(false); // End loading
    }
  };
  return (
    <div className="flex flex-col gap-8 text-gray-700 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
      <h1 className="font-light text-2xl lg:text-3xl text-gray-900">
        Create a New Post
      </h1>
      <form className="flex flex-col gap-8 flex-grow " onSubmit={handleSubmit}>
        <div>
          <button
            type="button"
            className="shadow-md px-4 py-2 rounded-md bg-white"
          >
            Add a cover image
          </button>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Story"
          className="text-xl font-bold bg-transparent outline-none"
        />
        <div className="flex gap-4 items-center">
          <label htmlFor="categories" className="text-sm text-blue-700">
            Choose a category:
          </label>
          <select
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-md shadow-sm"
          >
            <option value="General">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="A short description"
          className="p-4 bg-white shadow-sm rounded-md outline-none"
        />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="flex-1 bg-white shadow-sm rounded-md outline-none"
        />
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-700 hover:bg-blue-900 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-normal py-2 px-4 rounded mt-8"
          >
            {loading ? "Loading" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
