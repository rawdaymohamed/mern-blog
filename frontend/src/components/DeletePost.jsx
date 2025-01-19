"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DeletePost({ post }) {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
  const isAdmin = user.publicMetadata?.role === "admin";
  const isPostOwner = user.username === post.user.username;
  console.log("USER", user);
  const deletePostMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = () => {
    deletePostMutation.mutate();
  };
  if (!isAdmin && !isPostOwner) return null;
  return (
    <div
      className="flex items-center gap-2 text-red-500 cursor-pointer"
      onClick={handleDelete}
    >
      <FaTrashAlt />
      <span className="text-sm">Delete This Post</span>
    </div>
  );
}
