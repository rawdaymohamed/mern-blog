"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookSquare,
  FaInstagram,
  FaRegBookmark,
  FaTrashAlt,
} from "react-icons/fa";

import Search from "@/components/Search";
import PostActions from "@/components/PostActions.jsx";
import Comments from "@/components/Comments.jsx";
import axios from "axios";
import { format } from "timeago.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const Page = () => {
  const { slug } = useParams();
  const fetchPost = async (slug) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`
    );
    return res.data.data;
  };

  const {
    isPending,
    error,
    data: post,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!post) return "Post not found!";

  return (
    <div className="mt-5 flex flex-col gap-8 text-gray-600">
      <div className="flex gap-8 items-center mb-5">
        {/* Post Details */}
        <div className="flex flex-col gap-5 lg:w-8/12">
          <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl text-gray-700">
            {post.title}
          </h1>
          <div className="flex gap-3 text-xs text-gray-500">
            <span>Written By</span>
            <Link href="/" className="text-blue-600">
              {post?.user?.username}
            </Link>
            <span>on</span>
            <Link href="/" className="text-blue-600">
              {post.category}
            </Link>
            <span>{format(post.createdAt)}</span>
          </div>
          <p className="text-base lg:text-xl xl:text-2xl font-medium leading-relaxed">
            {post.desc}
          </p>
        </div>
        {/* Image */}
        <div className="hidden lg:block lg:w-4/12">
          {post?.img && (
            <Image
              src={post?.img}
              height={200}
              width={300}
              className="rounded-2xl w-full object-cover aspect-video"
              alt=""
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10 relative">
        {/* Text */}
        <div className="lg:w-9/12 flex flex-col gap-10 text-base lg:text-lg leading-7 text-justify">
          {post.content}
        </div>
        {/* Menu */}
        <div className="lg:w-3/12 h-max sticky top-8 right-8 flex flex-col gap-5">
          {/* Author */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold mb-2">Author</h2>
            <div className="flex gap-4 items-center">
              {/* Image */}
              <Image
                src={post?.user?.img}
                height={50}
                width={50}
                className="rounded-full aspect-square"
                alt="Author"
              />
              {/* Name */}
              <p className="text-blue-600">{post?.user?.username}</p>
            </div>
          </div>
          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-600">
            Software developer passionate about building efficient and
            user-friendly applications. Sharing practical tips and insights to
            help developers improve their skills.
          </p>

          {/* Social Media */}
          <div className="flex gap-4">
            <FaFacebookSquare className="text-2xl  cursor-pointer" />
            <FaInstagram className="text-2xl  cursor-pointer" />
          </div>
          {/* Actions */}
          <PostActions post={post} />
          {/* Categories */}
          <div>
            <h2 className="font-bold mb-4">Categories</h2>
            <div className="flex flex-col gap-2 text-sm text-blue-700">
              <span className="underline">All</span>
              <span className="underline">Web Design</span>
              <span className="underline">Development</span>
              <span className="underline">Databases</span>
              <span className="underline">Search Engines</span>
              <span className="underline">Marketing</span>
            </div>
          </div>
          {/* Search */}
          <Search />
        </div>
      </div>
      {/* Comments */}
      <Comments className="w-full lg:w-8/12" postId={post._id} />
    </div>
  );
};

export default Page;
