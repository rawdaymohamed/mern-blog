"use client";

import RecentSinglePost from "./RecentSinglePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useCallback } from "react";

const fetchPosts = async ({ pageParam, searchParamsObj }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      params: { page: pageParam, limit: 10, ...searchParamsObj },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

const PostList = () => {
  const searchParams = useSearchParams();

  const searchParamsObj = useMemo(
    () => Object.fromEntries([...searchParams.entries()]),
    [searchParams]
  );

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts", searchParams.toString()],
      queryFn: ({ pageParam = 1 }) =>
        fetchPosts({ pageParam, searchParamsObj }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage?.hasMore ? lastPage.nextPage : undefined,
    });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">Something went wrong!</p>;

  const allPosts = data?.pages?.flatMap((page) => page?.posts || []) || [];

  return (
    <Suspense>
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={
          <p className="text-center text-gray-600 my-5">All posts loaded!</p>
        }
      >
        <div className="space-y-10">
          {allPosts.map(
            (post) =>
              post && (
                <RecentSinglePost
                  className="mb-5"
                  key={post._id}
                  title={post.title}
                  author={post.user.username}
                  time={post.updatedAt}
                  category={post.category}
                  imageURL={post.img}
                  body={post.content}
                  slug={post.slug}
                />
              )
          )}
        </div>
      </InfiniteScroll>
    </Suspense>
  );
};

export default PostList;
