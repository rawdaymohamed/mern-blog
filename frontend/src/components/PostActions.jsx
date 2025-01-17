"use client";
import SavePost from "@/components/SavePost.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
export const PostActions = ({ postId }) => {
  const { user } = useUser();
  return (
    <div className="flex flex-col ">
      <h2 className="font-bold mb-4">Actions</h2>
      <div className="flex flex-col gap-3">
        <SavePost postId={postId} />

        <div className="flex items-center gap-2 text-red-500 cursor-pointer">
          <FaTrashAlt />
          <span className="text-sm">Delete This Post</span>
        </div>
      </div>
    </div>
  );
};
export default PostActions;
