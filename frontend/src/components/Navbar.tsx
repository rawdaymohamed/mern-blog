"use client";

import { FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => {
      console.log(token);
    });
  }, []);
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
        {open && (
          <div
            className={`w-full flex flex-col justify-center items-center gap-8 absolute top-16 z-10 bg-[#e5e5e5] font-medium text-lg h-screen duration-150 transition-all ease-in-out ${
              open ? "left-0" : "left-[100%]"
            }`}
          >
            <Link href="/">Home</Link>
            <Link href="/">Trending</Link>
            <Link href="/">Most Popular</Link>
            <Link href="/">About</Link>
            <SignedOut>
              <Link href="/sign-in">
                <button className="px-4 py-2 rounded-2xl bg-[#14213D] text-gray-50 ">
                  Login 👋
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Link href="/"></Link>
          </div>
        )}
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 xl:gap-8  font-medium items-center">
        <Link href="/">Home</Link>
        <Link href="/">Trending</Link>
        <Link href="/">Most Popular</Link>
        <Link href="/">About</Link>
        <Link href="/"></Link>
        <SignedOut>
          <Link href="/sign-in">
            <button className="px-4 py-2 rounded-2xl bg-[#14213D] text-gray-50 -ml-8">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
