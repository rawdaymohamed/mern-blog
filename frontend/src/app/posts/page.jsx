"use client";
import React, { useEffect, useState } from "react";
import RecentPosts from "@/components/RecentPosts.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import SideMenu from "@/components/SideMenu";

const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  return res.json();
};
const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
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
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                <RecentPosts posts={group} />
              </React.Fragment>
            ))}
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
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
