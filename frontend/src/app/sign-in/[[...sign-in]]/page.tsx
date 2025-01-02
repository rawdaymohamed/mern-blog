import { SignIn } from "@clerk/nextjs";
const Page = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] items-center justify-center">
      <SignIn />
    </div>
  );
};

export default Page;
