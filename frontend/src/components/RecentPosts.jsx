import React from "react";
import RecentSinglePost from "./RecentSinglePost";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    params: { page: pageParam },
  });
  return res.data;
};
export default function RecentPosts({ className = "" }) {
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
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
  });
  const allPosts = data?.pages?.flatMap((page) => page.data);
  if (isFetching) return "Loading...";
  if (error) return "Something went wrong!";
  return (
    <section className={`${className} `}>
      <div className="flex flex-col gap-8">
        <InfiniteScroll
          dataLength={allPosts.length} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h4>Loading more posts...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>All posts loaded</b>
            </p>
          }
        >
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((post) => (
                <RecentSinglePost
                  className="mb-5"
                  key={post._id}
                  title={post.title}
                  author="Rawda Yasser"
                  time="2 days ago"
                  category={post.category}
                  imageURL="/post-1.jpg"
                  body={post.content}
                />
              ))}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </div>
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
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </section>
  );
}
