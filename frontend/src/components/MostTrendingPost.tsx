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
        src="/team.jpg"
        alt="web design post"
        width={200}
        height={200}
        className="object-cover w-full aspect-video rounded-3xl "
      />
      {/* Post details */}
      <div className="flex gap-4 items-center">
        <span className="font-bold bg-yellow-100 px-1">01.</span>
        <Link href={`/posts?cat=web-design`} className="text-blue-600 text-sm">
          Web Design
        </Link>
        <span className="text-gray-500 text-sm">2 days ago</span>
      </div>
      {/* Post Title */}
      <Link
        href="/beyond-the-code-why-soft-skills-are-your-superpower"
        className="font-extrabold text-2xl text-gray-700"
      >
        Beyond the Code: Why Soft Skills Are Your Superpower
      </Link>
      <p className="text-gray-500">
        In a world increasingly driven by technology and hard skills, it's easy
        to overlook the importance of something a little less tangible: soft
        skills. But here's the truth – in the professional landscape, soft
        skills aren't just "nice to have," they're your superpower.
      </p>
    </section>
  );
}
