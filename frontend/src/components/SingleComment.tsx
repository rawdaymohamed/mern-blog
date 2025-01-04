import Image from "next/image";

export default function SingleComment({ className }: { className?: string }) {
  return (
    <div className={`${className} flex flex-col gap-2 mb-5 p-4 rounded-xl`}>
      {/* Comment Author */}
      <div className="flex gap-4 items-center">
        <Image
          src="/profile.png"
          height={50}
          width={50}
          className="rounded-full aspect-square object-center"
          alt="Author"
        />
        <p className="font-bold text-base text-gray-700">Rawda Yasser</p>
        <span className="text-xs text-gray-500">1 day ago</span>
      </div>
      {/* Comment Body */}
      <p className="text-gray-600 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure modi quasi
        architecto quia autem! Beatae itaque optio corporis quas labore?
        Repudiandae soluta iusto officia iste vel delectus in possimus hic.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
}
