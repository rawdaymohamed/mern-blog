"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export default function DeleteComment({ comment, slug }) {
  const { user } = useUser();
  const { getToken } = useAuth();

  const isAdmin = user?.publicMetadata?.role === "admin";
  const isCommentOwner = user?.username === comment?.user?.username;

  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.post],
      });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = () => {
    deleteCommentMutation.mutate();
  };
  if (!isAdmin && !isCommentOwner) return null;
  return (
    <div
      className="flex items-center gap-2 text-red-500 cursor-pointer"
      onClick={handleDelete}
    >
      <FaTrashAlt />
    </div>
  );
}
