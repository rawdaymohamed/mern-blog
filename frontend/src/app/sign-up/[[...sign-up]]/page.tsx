import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] items-center justify-center">
      <SignUp />
    </div>
  );
}
