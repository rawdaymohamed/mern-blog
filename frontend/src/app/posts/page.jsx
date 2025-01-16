"use client";
import React, { useEffect, useState } from "react";
import RecentPosts from "@/components/RecentPosts.jsx";
import SideMenu from "@/components/SideMenu";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <>
            <RecentPosts />
          </>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:block md:w-2/12`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default Page;