"use client";
import { useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import SingleComment from "./SingleComment.jsx";
import { toast } from "react-toastify";
const fetchAllComments = async (postId) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`
  );
  return res.data;
};
export default function Comments({ className = "", postId }) {
  const [comment, setComment] = useState("");
  const { getToken } = useAuth();
  const { user } = useUser();

  const { data, error, isPending } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchAllComments(postId),
  });
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const { variables, mutate, isError } = addCommentMutation;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ post: postId, desc: comment, user: user?._id });
    setComment("");
  };
  return (
    <div className={`${className}`}>
      <h2 className="text-xl font-semibold underline">Comments</h2>
      {/* Add Comment Form */}
      {/* <CommentForm className="my-5" postId={postId} /> */}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form className={`${className}`} onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Write a Comment..."
          />
        </div>
        {isPending ? (
          "Loading Comments..."
        ) : (
          <>
            {isError ? <div>Something went wrong</div> : null}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Send
            </button>
          </>
        )}
      </form>

      {/* Comments */}
      <div className="mt-12">
        <div className="flex flex-col gap-5">
          {addCommentMutation.isPending && (
            <SingleComment
              comment={{
                user: { img: user.img, username: user.username },
                createdAt: new Date(),
                desc: `${addCommentMutation.variables.desc}(sending)`,
              }}
            />
          )}
          <>
            {data?.data?.map((comment) => (
              <SingleComment className="" key={comment._id} comment={comment} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
