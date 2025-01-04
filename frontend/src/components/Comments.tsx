import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Comments({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <h2 className="text-xl font-semibold underline">Comments</h2>
      {/* Add Comment Form */}
      <CommentForm className="my-5" />
      {/* Comments */}
      <CommentList className="mt-10" />
    </div>
  );
}
