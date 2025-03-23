import SinglePost from "./SinglePost";

export default function OtherPosts({ className = "" }: { className?: string }) {
  return (
    <section className={`${className} flex flex-col gap-10`}>
      {/* First Post */}
      <SinglePost
        className="h-1/3"
        category="web-design"
        postNumber="02"
        time="1 day ago"
        title="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        imageURL="/post-1.jpg"
      />

      {/* Second Post */}
      <SinglePost
        className="h-1/3"
        category="web-development"
        postNumber="03"
        time="2 days ago"
        title="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        imageURL="/post-1.jpg"
      />
      {/* Third Post */}
      <SinglePost
        className="h-1/3"
        category="web-design"
        postNumber="04"
        time="3 days ago"
        title="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        imageURL="/post-1.jpg"
      />
    </section>
  );
}
