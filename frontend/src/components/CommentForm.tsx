"use client";

import { useState, FormEvent } from "react";

// interface CommentData {
//   comment: string;
// }

// interface CommentFormProps {
//   onSubmit: (commentData: CommentData) => Promise<void>;
// }

const CommentForm = ({ className = "" }: { className?: string }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);

    try {
      //   await onSubmit({ comment });

      setComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("An error occurred while submitting your comment.");
    }
  };

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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
      >
        Send
      </button>
    </form>
  );
};

export default CommentForm;
