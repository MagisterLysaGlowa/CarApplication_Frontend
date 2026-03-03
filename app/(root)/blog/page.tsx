// app/blog/page.tsx
"use client";

import { useState } from "react";
import BlogHeader from "./components/BlogHeader";
import BlogsList from "./components/BlogList";
import { Pagination } from "@heroui/pagination";
import BlogContainer from "./components/BlogContainer";
import { Metadata } from "next";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(30);

  return (
    <div className="mx-auto">
      <header className="w-full flex justify-center bg-[#F2F7FF]">
        <BlogHeader />
      </header>
      <div className="border-t border-blue-500 my-4"></div>
      <section className="flex justify-center mb-24">
        <BlogContainer />
      </section>
    </div>
  );
}

// Sample data
