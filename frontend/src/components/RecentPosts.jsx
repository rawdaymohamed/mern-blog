import RecentSinglePost from "./RecentSinglePost";

export default function RecentPosts({ className = "", posts }) {
  return (
    <section className={`${className} `}>
      <div className="flex flex-col gap-8">
        {posts.data.map((post) => (
          <RecentSinglePost
            key={post._id}
            title={post.title}
            author="Rawda Yasser"
            time="2 days ago"
            category={post.category}
            imageURL="/post-1.jpg"
            body={post.content}
          />
        ))}
      </div>
    </section>
  );
}
