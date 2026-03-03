import React, { useEffect } from "react";
import { useState } from "react";
import BlogHeader from "../components/BlogHeader";
import BlogsList from "../components/BlogList";
import { Pagination } from "@heroui/pagination";
import LoadingSpinner from "./LoadingSpinner";
type Props = {};

const BlogContainer = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.substring(
    0,
    process.env.NEXT_PUBLIC_BACKEND_URL.length - 4
  );

  // Mock function to fetch blog posts
  const fetchBlogPosts = async () => {
    setLoading(true);
    const res = await fetch(
      `${API_URL}/Post?pageNumber=${currentPage}&pageSize=${postsPerPage}`
    );
    const data = await res.json();
    setTotalPages(data.totalPages);
    setBlogs(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    fetchBlogPosts();
  }, [currentPage]);

  return (
    <div className="max-w-[1600px] w-full flex flex-col items-center">
      {loading && (
        <div className="w-full flex justify-center mt-12 mb-32">
          <LoadingSpinner />
        </div>
      )}
      {!loading && blogs.length > 0 ? (
        <React.Fragment>
          <BlogsList blog={blogs} />
          <div className="w-full flex justify-center mt-5">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={setCurrentPage}
              className="mt-6 flex gap-x-3"
              showControls={true}
              loop
              classNames={{
                item: "bg-white text-black rounded-xl hover:bg-gray-100",
                wrapper: "gap-x-3",
                next: "bg-white text-black rounded-xl hover:bg-gray-100",
                prev: "bg-white text-black rounded-xl hover:bg-gray-100",
              }}
            />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {!loading && (
            <h3 className="mobile-h3 lg:desktop-h3 mt-8 w-full flex justify-center pb-5">
              Nie znaleziono blogów
            </h3>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default BlogContainer;
