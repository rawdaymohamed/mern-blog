export default function RecentPosts({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section className={`${className} `}>
      <h2>Recent Posts</h2>
    </section>
  );
}
