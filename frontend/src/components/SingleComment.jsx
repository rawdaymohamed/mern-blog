"use client";
import Image from "next/image";
import { format } from "timeago.js";
import DeleteComment from "./DeleteComment.jsx";
import { useUser } from "@clerk/nextjs";
export default function SingleComment({ className, comment }) {
  const { user } = useUser();
  return (
    <div className={`${className} flex flex-col gap-2 mb-5 p-4 rounded-xl`}>
      {/* Comment Author */}
      <div className="flex gap-4 items-center">
        {comment?.user?.img && (
          <Image
            src={comment?.user?.img}
            height={50}
            width={50}
            className="rounded-full aspect-square object-center"
            alt="Author"
          />
        )}
        <p className="font-bold text-base text-gray-700">
          {comment?.user?.username}
        </p>
        <span className="text-xs text-gray-500">
          {format(comment.createdAt)}
        </span>
      </div>
      {/* Comment Body */}
      <p className="text-gray-600 text-sm">{comment.desc}</p>
      {user && <DeleteComment comment={comment} />}
    </div>
  );
}
