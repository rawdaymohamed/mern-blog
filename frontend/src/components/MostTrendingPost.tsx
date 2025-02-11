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
      <div cla ssName="flex gap-4 items-center">
        <span className="font-bold bg-yellow-100 px-1">01.</span>
        <Link href="/" className="text-blue-600 text-sm">
          Web Design
        </Link>
        <span className="text-gray-500 text-sm">2 days ago</span>
      </div>
      {/* Post Title */}
      <Link
        href="/top-web-design-trends-shaping-the-future-of-the-web"
        className="font-extrabold text-2xl text-gray-700"
      >
        Top Web Design Trends Shaping the Future of the Web
      </Link>
      <p className="text-gray-500">
        Discover how strategically using white space (negative space) can
        elevate your web designs, improve readability, and create a more
        impactful user experience. Learn practical tips and examples.
      </p>
    </section>
  );
}
