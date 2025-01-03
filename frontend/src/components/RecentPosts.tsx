import RecentSinglePost from "./RecentSinglePost";

export default function RecentPosts({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section className={`${className} `}>
      <h2 className="mb-5 text-2xl text-gray-700 ">Recent Posts</h2>
      <div className="flex flex-col gap-8">
        <RecentSinglePost
          title="AI in Web Design: Revolutionizing the User Experience"
          author="Rawda Yasser"
          time="2 days ago"
          category="Web Design"
          imageURL="/post-1.jpg"
          body="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33"
        />
        <RecentSinglePost
          title="AI in Web Design: Revolutionizing the User Experience"
          author="Rawda Yasser"
          time="2 days ago"
          category="Web Design"
          imageURL="/post-1.jpg"
          body="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33"
        />
        <RecentSinglePost
          title="AI in Web Design: Revolutionizing the User Experience"
          author="Rawda Yasser"
          time="2 days ago"
          category="Web Design"
          imageURL="/post-1.jpg"
          body="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33"
        />
        <RecentSinglePost
          title="AI in Web Design: Revolutionizing the User Experience"
          author="Rawda Yasser"
          time="2 days ago"
          category="Web Design"
          imageURL="/post-1.jpg"
          body="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33"
        />
        <RecentSinglePost
          title="AI in Web Design: Revolutionizing the User Experience"
          author="Rawda Yasser"
          time="2 days ago"
          category="Web Design"
          imageURL="/post-1.jpg"
          body="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33"
        />
      </div>
    </section>
  );
}
