import Image from "next/image";
import Link from "next/link";

export default function MostTrendingPost({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section className={`${className} flex flex-col gap-3`}>
      {/* Post Image */}
      <Image
        src="/trending-post.jpg"
        alt="web design post"
        width={200}
        height={200}
        className="object-cover w-full aspect-video rounded-3xl "
      />
      {/* Post details */}
      <div className="flex gap-4 items-center">
        <span className="font-bold bg-yellow-100 px-1">01.</span>
        <Link href="/" className="text-blue-600 text-sm">
          Web Design
        </Link>
        <span className="text-gray-500 text-sm">2 days ago</span>
      </div>
      {/* Post Title */}
      <Link href="/" className="font-extrabold text-2xl text-gray-700">
        Top Web Design Trends Shaping the Future of the Web
      </Link>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, vel.
        Saepe officia laudantium aliquam omnis facilis obcaecati. Natus earum
        facilis ipsam facere necessitatibus...
      </p>
    </section>
  );
}
