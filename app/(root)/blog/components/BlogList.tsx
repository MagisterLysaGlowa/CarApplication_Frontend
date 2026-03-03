// components/BlogsList.tsx
import React from "react";
import Image from "next/image";
import BlogCard from "./BlogCard";

interface BlogsListProps {
  blog: any[];
}

const BlogsList: React.FC<BlogsListProps> = ({ blog }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blog.map((item, index) => {
        return <BlogCard blog={item} key={index} />;
      })}
    </div>
  );
};

export default BlogsList;
