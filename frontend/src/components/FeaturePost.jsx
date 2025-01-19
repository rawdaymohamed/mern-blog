"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
export default function FeaturePost({ post }) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const featurePostMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}/feature`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = () => {
    featurePostMutation.mutate();
  };

  const is_featured = featurePostMutation?.data?.data?.data.isFeatured;
  if (!isAdmin) return null;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleDelete}
    >
      {is_featured && <FaStar className="w-5 h-5" />}
      {!is_featured && <FaRegStar className="w-5 h-5" />}
      <span className="text-sm">Feature This Post</span>
      {featurePostMutation.isPending && (
        <span className="text-xs">(in progress)</span>
      )}
    </div>
  );
}
