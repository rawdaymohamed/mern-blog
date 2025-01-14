"use client";
import RecentPosts from "@/components/RecentPosts";
import SideMenu from "@/components/SideMenu";

import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/`
      );
      setPosts(response.data.data);
    };

    fetchPosts();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <div className="text-gray-800">
      <h1 className="mt-3 mb-8 text-2xl">Development Blog</h1>
      <button
        className="md:hidden bg-blue-800 text-white text-sm px-4 py-2 rounded-2xl mb-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        {/* Post List */}
        <div className="md:w-10/12">
          <RecentPosts />
        </div>
        {/* Side Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:block md:w-2/12`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default Page;
