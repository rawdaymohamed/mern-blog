"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function savedPost({ postId }) {
  const { getToken } = useAuth();

  const isSavedInfo = useQuery({
    queryKey: ["isSaved", postId],
    queryFn: async () => {
      const token = await getToken();

      return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/is-saved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });
  const queryClient = useQueryClient();
  // isSavedInfo.data.isSaved
  const savePostMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isSaved", postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleSaveUnsave = () => {
    console.log(savePostMutation);
    savePostMutation.mutate();
  };
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleSaveUnsave}
    >
      {isSavedInfo?.data?.data?.isSaved ? <FaBookmark /> : <FaRegBookmark />}
      <span className="text-sm">Save This Post</span>
    </div>
  );
}
