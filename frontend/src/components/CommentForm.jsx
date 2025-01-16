"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, FormEvent } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

const CommentForm = ({ className = "", postId }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { isPending, submittedAt, variables, mutate, isError, isSuccess } =
    useMutation({
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
      onSettled: async () => {
        return await queryClient.invalidateQueries({
          queryKey: ["comments", postId],
        });
      },
    });

  
  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      {error && <div className="mb-4 text-red-500">{error}</div>}

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
        "Adding Comment..."
      ) : (
        <>
          {isError ? <div>Something went wrong</div> : null}
          {isSuccess ? <div>Comment added</div> : null}
          <button
            onClick={() => {
              mutate({ post: postId, desc: comment, user: user?._id });
            }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </>
      )}
    </form>
  );
};

export default CommentForm;
