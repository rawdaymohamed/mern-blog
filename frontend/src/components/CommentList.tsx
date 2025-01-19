"use client";
import { useQuery } from "@tanstack/react-query";
import SingleComment from "./SingleComment.jsx";
import axios from "axios";
interface Comment {
  _id: string;
  user: string;
  desc: string;
  post: string;
}
const fetchAllComments = async (postId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`
  );
  return res.data;
};
export default function CommentList({
  className = "",
  postId,
}: {
  className?: string;
  postId: string;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchAllComments(postId),
  });
  if (error) return <p>Something went wrong</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={`${className} `}>
      <div className="flex flex-col gap-5">
        {data.data.map((comment: Comment) => (
          <SingleComment className="" key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
