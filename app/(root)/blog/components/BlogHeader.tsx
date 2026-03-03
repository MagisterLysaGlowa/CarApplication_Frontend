// components/BlogHeader.tsx
import Link from "next/link";
import React from "react";

const BlogHeader: React.FC = () => {
  return (
    <div className="max-w-[1600px] w-full py-14">
      <header className="flex">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 mobile-h1 lg:desktop-h1 flex-grow">
          Blog
        </h1>
        {/* <Link className="aqua-border-btn !py-5 !px-8" href={"/dodaj-bloga"}>
          Dodaj nowy wpis
        </Link> */}
      </header>
      <p className="text-gray-600 mobile-normal lg:desktop-normal max-w-[600px] mt-5">
        Wypełnij proste zlecenie, dzięki czemu znajdziesz swój wymarzony
        samochód w najlepszej wersji.
      </p>
    </div>
  );
};

export default BlogHeader;
