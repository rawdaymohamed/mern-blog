"use client";

import RecentSinglePost from "./RecentSinglePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams.entries()]);

  console.log(searchParamsObj);

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  console.log(res.data.data);
  return res.data;
};

const PostList = () => {
  const searchParams = useSearchParams();

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", searchParams.toString()],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.hasMore ? pages.length + 1 : undefined,
    });

  if (isFetching) return "Loading...";
  if (error) return "Something went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page?.data || []) || [];
  console.log("data", allPosts); // debug

  return (
    <Suspense>
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={
          <p>
            <b>All posts loaded!</b>
          </p>
        }
      >
        {allPosts.map((post) =>
          post ? (
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
          ) : null
        )}
      </InfiniteScroll>
    </Suspense>
  );
};

export default PostList;
