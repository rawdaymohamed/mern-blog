import Link from "next/link";
interface PostProps {
  className?: string;
  postNumber: string;
  title: string;
  category: string;
  time: string;
  imageURL: string;
}
export default function SinglePost({
  className = "",
  postNumber,
  title,
  category,
  time,
  imageURL,
}: PostProps) {
  return (
    <section className={`${className} flex flex-row gap-4`}>
      {/* Post Image */}
      <div className="w-1/3">
        <img
          src={imageURL}
          alt="web design post"
          className="rounded-3xl aspect-video"
        />
      </div>
      {/* Post details */}
      <div className="w-2/3 flex flex-col gap-2 justify-start">
        <div className="flex items-center gap-4">
          <span className="font-bold  text-xs">{postNumber}</span>
          <Link
            href={`/posts?cat=${category}`}
            className="text-blue-600 text-xs"
          >
            {category
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </Link>
          <span className="text-gray-500 text-xs">{time}</span>
        </div>
        {/* Post Title */}
        <Link
          href="/beyond-the-code-why-soft-skills-are-your-superpower"
          className="font-extrabold text-lg text-gray-600"
        >
          {title}
        </Link>
      </div>
    </section>
  );
}
