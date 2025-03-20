import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { format } from "timeago.js";

interface PostProps {
  className?: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  time: string;
  imageURL?: string;
  body: string;
}
export default function RecentSinglePost({
  className,
  title,
  author,
  time,
  category,
  imageURL,
  body,
  slug,
}: PostProps) {
  const cleanedContent = DOMPurify.sanitize(body);
  return (
    <section
      className={`${className} flex flex-col xl:flex-row gap-2 xl:gap-8`}
    >
      {/* Post Image */}
      <div className="flex-shrink-0 w-full xl:w-2/3 max-w-[300px] h-[160px] overflow-hidden ">
        {imageURL && (
          <Image
            src={imageURL}
            alt="web design post"
            width={200}
            height={200}
            className="w-full h-auto object-cover rounded-xl mb-1"
          />
        )}
      </div>
      <div className="flex flex-col">
        {/* Title */}
        <h2 className="font-extrabold text-2xl md:text-3xl text-gray-700 mb-3">
          {title}
        </h2>
        {/* Post details */}
        <div className="flex gap-2 items-center text-sm mb-2">
          <span className="text-gray-500">By</span>
          <Link href="/" className="text-blue-600">
            {author}
          </Link>
          <span className="text-gray-500">On</span>
          <Link href={`/posts?cat=${category}`} className="text-blue-600">
            {category
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </Link>
          <span className="text-gray-500">{format(time)}</span>
        </div>
        {/* Body */}
        <div className="text-sm xl:text-lg text-gray-500 mb-2">
          <div
            dangerouslySetInnerHTML={{
              __html: cleanedContent.substring(0, 40),
            }}
          />
        </div>

        {/* Read more */}
        <Link
          href={`${slug}`}
          className="text-blue-600 underline underline-offset-4 text-sm"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}
