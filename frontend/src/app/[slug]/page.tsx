import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookSquare,
  FaInstagram,
  FaRegBookmark,
  FaTrashAlt,
} from "react-icons/fa";
import Search from "@/components/Search";
import Comments from "@/components/Comments";
const Page = () => {
  return (
    <div className="mt-5 flex flex-col gap-8 text-gray-600">
      <div className="flex gap-8 items-center mb-5">
        {/* Post Details */}
        <div className="flex flex-col gap-5 lg:w-8/12">
          <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl text-gray-700">
            AI in Web Design: Revolutionizing the User Experience
          </h1>
          <div className="flex gap-3 text-xs text-gray-500">
            <span>Written By</span>
            <Link href="/" className="text-blue-600">
              Rawda Yasser
            </Link>
            <span>on</span>
            <Link href="/" className="text-blue-600">
              Web Design
            </Link>
            <span>2 days ago</span>
          </div>
          <p className="text-base lg:text-xl xl:text-2xl font-medium leading-relaxed">
            Artificial intelligence is no longer a futuristic concept—it's
            actively reshaping the landscape of web design. By automating tasks,
            personalizing content, and enhancing accessibility, AI is creating
            more engaging and user-friendly online experiences. This article
            explores the key ways AI is revolutionizing the web.
          </p>
        </div>
        {/* Image */}
        <div className="hidden lg:block lg:w-4/12">
          <Image
            src="/post-3.jpg"
            height={200}
            width={300}
            className="rounded-2xl w-full object-cover aspect-video"
            alt=""
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10 relative">
        {/* Text */}
        <div className="lg:w-9/12 flex flex-col gap-10 text-base lg:text-lg leading-7 text-justify">
          <p>
            The intersection of artificial intelligence and web design is
            ushering in a new era of user experience. AI is not just automating
            tedious tasks; it's empowering designers to create truly
            personalized and dynamic websites. This article explores the
            multifaceted impact of AI on web design, from intelligent design
            assistants that generate layouts and color palettes to personalized
            content delivery systems that cater to individual user preferences.
            We'll examine real-world examples and discuss the implications of
            this technological revolution for businesses and users alike.
          </p>

          <p>
            For years, web designers have strived to create seamless and
            engaging user experiences. Now, with the advent of sophisticated AI
            technologies, this goal is becoming more attainable than ever. AI is
            revolutionizing the web by enabling personalized content,
            intelligent chatbots, predictive navigation, and much more. This
            article dives deep into the ways AI is transforming the user
            experience, exploring the benefits, challenges, and future
            possibilities of this exciting field.
          </p>
          <p>
            The future of the web is intelligent, adaptive, and personalized. AI
            is the driving force behind this transformation, empowering web
            designers to create websites that anticipate user needs and provide
            truly tailored experiences. This comprehensive guide explores the
            various applications of AI in web design, including automated design
            tools, personalized content delivery, AI-powered chatbots, and
            enhanced accessibility features. Join us as we explore the
            revolutionary impact of AI on the user experience and the future of
            the web.
          </p>
          <p>
            For years, web designers have strived to create seamless and
            engaging user experiences. Now, with the advent of sophisticated AI
            technologies, this goal is becoming more attainable than ever. AI is
            revolutionizing the web by enabling personalized content,
            intelligent chatbots, predictive navigation, and much more. This
            article dives deep into the ways AI is transforming the user
            experience, exploring the benefits, challenges, and future
            possibilities of this exciting field.
          </p>
          <p>
            The future of the web is intelligent, adaptive, and personalized. AI
            is the driving force behind this transformation, empowering web
            designers to create websites that anticipate user needs and provide
            truly tailored experiences. This comprehensive guide explores the
            various applications of AI in web design, including automated design
            tools, personalized content delivery, AI-powered chatbots, and
            enhanced accessibility features. Join us as we explore the
            revolutionary impact of AI on the user experience and the future of
            the web.
          </p>
          <p>
            For years, web designers have strived to create seamless and
            engaging user experiences. Now, with the advent of sophisticated AI
            technologies, this goal is becoming more attainable than ever. AI is
            revolutionizing the web by enabling personalized content,
            intelligent chatbots, predictive navigation, and much more. This
            article dives deep into the ways AI is transforming the user
            experience, exploring the benefits, challenges, and future
            possibilities of this exciting field.
          </p>
          <p>
            The future of the web is intelligent, adaptive, and personalized. AI
            is the driving force behind this transformation, empowering web
            designers to create websites that anticipate user needs and provide
            truly tailored experiences. This comprehensive guide explores the
            various applications of AI in web design, including automated design
            tools, personalized content delivery, AI-powered chatbots, and
            enhanced accessibility features. Join us as we explore the
            revolutionary impact of AI on the user experience and the future of
            the web.
          </p>
          <p>
            The future of the web is intelligent, adaptive, and personalized. AI
            is the driving force behind this transformation, empowering web
            designers to create websites that anticipate user needs and provide
            truly tailored experiences. This comprehensive guide explores the
            various applications of AI in web design, including automated design
            tools, personalized content delivery, AI-powered chatbots, and
            enhanced accessibility features. Join us as we explore the
            revolutionary impact of AI on the user experience and the future of
            the web.
          </p>
          <p>
            The future of the web is intelligent, adaptive, and personalized. AI
            is the driving force behind this transformation, empowering web
            designers to create websites that anticipate user needs and provide
            truly tailored experiences. This comprehensive guide explores the
            various applications of AI in web design, including automated design
            tools, personalized content delivery, AI-powered chatbots, and
            enhanced accessibility features. Join us as we explore the
            revolutionary impact of AI on the user experience and the future of
            the web.
          </p>
        </div>
        {/* Menu */}
        <div className="lg:w-3/12 h-max sticky top-8 right-8 flex flex-col gap-5">
          {/* Author */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold mb-2">Author</h2>
            <div className="flex gap-4 items-center">
              {/* Image */}
              <Image
                src="/trending-post1.jpg"
                height={50}
                width={50}
                className="rounded-full aspect-square"
                alt="Author"
              />
              {/* Name */}
              <p className="text-blue-600">Rawda Yasser</p>
            </div>
          </div>
          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-600">
            Software developer passionate about building efficient and
            user-friendly applications. Sharing practical tips and insights to
            help developers improve their skills.
          </p>

          {/* Social Media */}
          <div className="flex gap-4">
            <FaFacebookSquare className="text-2xl  cursor-pointer" />
            <FaInstagram className="text-2xl  cursor-pointer" />
          </div>
          {/* Actions */}
          <div className="flex flex-col ">
            <h2 className="font-bold mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 cursor-pointer">
                <FaRegBookmark />
                <span className="text-sm">Save This Post</span>
              </div>
              <div className="flex items-center gap-2 text-red-500 cursor-pointer">
                <FaTrashAlt />
                <span className="text-sm">Delete This Post</span>
              </div>
            </div>
          </div>
          {/* Categories */}
          <div>
            <h2 className="font-bold mb-4">Categories</h2>
            <div className="flex flex-col gap-2 text-sm text-blue-700">
              <span className="underline">All</span>
              <span className="underline">Web Design</span>
              <span className="underline">Development</span>
              <span className="underline">Databases</span>
              <span className="underline">Search Engines</span>
              <span className="underline">Marketing</span>
            </div>
          </div>
          {/* Search */}
          <Search />
        </div>
      </div>
      {/* Comments */}
      <Comments className="w-full lg:w-8/12" />
    </div>
  );
};

export default Page;
