import React from "react";
import OpenedBlogPost from "./components/OpenedBlogPost";
import BlogCard from "../components/BlogCard";
import { Metadata } from "next";
type Props = {};

const BlogPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.substring(
    0,
    process.env.NEXT_PUBLIC_BACKEND_URL.length - 4
  );
  const slug = (await params).slug;
  const res = await fetch(`${API_URL}/Post/${slug}`);
  const data = await res.json();

  const res2 = await fetch(`${API_URL}/Post?pageNumber=${1}&pageSize=${4}`);
  const data2 = await res2.json();

  return (
    <section className="w-full flex justify-center items-center flex-col pt-20 pb-24 2xl:px-0 px-5">
      <div className="blog-grid-box max-w-[1500px] w-full gap-x-20">
        <article className="w-full">
          <OpenedBlogPost data={data.data} content={data.data.content} />
        </article>
        <aside className="w-[350px] flex-col xl:flex hidden gap-y-10 h-full mt-[136px]">
          {data2.data.map((item: any) => {
            return <BlogCard key={item.id} blog={item} />;
          })}
        </aside>
      </div>
    </section>
  );
};

export default BlogPost;
