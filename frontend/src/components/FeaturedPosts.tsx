import MostTrendingPost from "./MostTrendingPost";
import OtherPosts from "./OtherPosts";

export default function FeaturedPosts({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section className={`${className} flex flex-col md:flex-row gap-10`}>
      {/* Most Trending Post */}
      <MostTrendingPost className="md:w-1/2" />
      {/* Other Posts */}
      <OtherPosts className="md:w-1/2 " />
    </section>
  );
}
