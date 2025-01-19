"use client";
import SavePost from "@/components/SavePost.jsx";
import DeletePost from "@/components/DeletePost.jsx";
import { useUser } from "@clerk/nextjs";
export const PostActions = ({ post }) => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="flex flex-col ">
      <h2 className="font-bold mb-4">Actions</h2>
      <div className="flex flex-col gap-3">
        <SavePost post={post} />
        <DeletePost post={post} />
      </div>
    </div>
  );
};
export default PostActions;
