"use client";

import { FaBookOpen } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between text-[#14213D]">
      {/* Logo */}
      <Link href="/" className="flex items-center g-4">
        <FaBookOpen className="w-9 h-9 mr-4" />
        <span className="text-xl font-bold">MERN Blog</span>
      </Link>
      {/* Mobile Menu */}
      <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        {/* Mobile Button */}
        {open ? (
          <span className="text-4xl font-bold">✕</span> // Close Icon
        ) : (
          <span className="text-4xl font-bold">☰</span> // Hamburger Icon
        )}
        {/* Mobile Link List */}
        <div
          className={`w-full flex flex-col justify-center items-center gap-8  absolute top-16 font-medium text-lg h-screen duration-150 transition-all ease-in-out ${
            open ? "left-0" : "left-[100%]"
          }`}
        >
          <Link href="/">Home</Link>
          <Link href="/">Trending</Link>
          <Link href="/">Most Popular</Link>
          <Link href="/">About</Link>
          <Link href="/">
            <button className="px-4 py-2 rounded-2xl bg-[#14213D] text-gray-50 ">
              Login 👋
            </button>
          </Link>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 xl:gap-8  font-medium items-center">
        <Link href="/">Home</Link>
        <Link href="/">Trending</Link>
        <Link href="/">Most Popular</Link>
        <Link href="/">About</Link>
        <Link href="/">
          <button className="px-4 py-2 rounded-2xl bg-[#14213D] text-gray-50 ">
            Login 👋
          </button>
        </Link>
      </div>
    </nav>
  );
}
