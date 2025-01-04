import Image from "next/image";
import Link from "next/link";
interface PostProps {
  className?: string;
  title: string;
  author: string;
  category: string;
  time: string;
  imageURL: string;
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
}: PostProps) {
  return (
    <section
      className={`${className} flex flex-col xl:flex-row gap-2 xl:gap-8`}
    >
      {/* Post Image */}
      <Image
        src={imageURL}
        alt="web design post"
        width={200}
        height={200}
        className=" md:hidden xl:block w-full xl:w-2/3 aspect-video rounded-xl mb-1"
      />
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
          <Link href="/" className="text-blue-600">
            {category}
          </Link>
          <span className="text-gray-500">{time}</span>
        </div>
        {/* Body */}
        <p className="text-sm xl:text-lg text-gray-500 mb-2">
          {body.substring(0, 250)}...
        </p>

        {/* Read more */}
        <Link
          href="/test"
          className="text-blue-600 underline underline-offset-4 text-sm"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}
