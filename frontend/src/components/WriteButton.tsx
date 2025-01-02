import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  return (
    <Link
      href="/write"
      className={`${className} button button--nina px-5 py-0 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden`}
      data-text="Write"
    >
      <span className="align-middle">W</span>
      <span className="align-middle">r</span>
      <span className="align-middle">i</span>
      <span className="align-middle">t</span>
      <span className="align-middle">e</span>
    </Link>
  );
}
