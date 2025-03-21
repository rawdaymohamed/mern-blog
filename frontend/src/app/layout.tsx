// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
// export const metadata: Metadata = {
//   title: "MERN Blog",
//   description: "MERN Blog App",
// };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Providers>
          <body className={`${inter.className} antialiased`}>
            <div className="px-4 md:px-8 xl:px-16 2xl:px-64">
              <Navbar />
              {children}
              <ToastContainer position="bottom-right" />
            </div>
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
