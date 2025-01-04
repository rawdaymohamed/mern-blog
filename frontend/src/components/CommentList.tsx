import Image from "next/image";
import SingleComment from "./SingleComment";

export default function CommentList({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`${className} `}>
      <div className="flex flex-col gap-5">
        <SingleComment />
        <SingleComment />
        <SingleComment />
      </div>
    </div>
  );
}
