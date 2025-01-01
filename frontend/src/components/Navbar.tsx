"use client";
import { IKImage } from "imagekitio-next";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between text-[#14213D]">
      {/* Logo */}
      <div className="flex items-center g-4">
        <IKImage
          path="/logo-v2.png"
          width={70}
          height={70}
          alt="mern blog logo"
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        />
        <span className="text-xl font-bold">MERN Blog</span>
      </div>
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
          <a href="#">Home</a>
          <a href="#">Trending</a>
          <a href="#">Most Popular</a>
          <a href="#">About</a>
          <a href="#">
            <button className="px-4 py-2 rounded-2xl bg-[#14213D] text-gray-50 ">
              Login 👋
            </button>
          </a>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 xl:gap-8  font-medium items-center">
        <a href="#">Home</a>
        <a href="#">Trending</a>
        <a href="#">Most Popular</a>
        <a href="#">About</a>
        <a href="#">
          <button className="px-4 py-2 rounded-2xl bg-[#14213D] text-gray-50 ">
            Login 👋
          </button>
        </a>
      </div>
    </nav>
  );
}
