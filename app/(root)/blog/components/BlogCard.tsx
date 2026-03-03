// components/BlogCard.tsx
import React, { useEffect } from "react";
import { Clock, MessageSquare } from "lucide-react";
import Image from "next/image";
import CalendarIcon from "../../../../public/images/icons/calendar_icon.svg";
import ClockIcon from "../../../../public/images/icons/clock_icon.svg";
import FlameIcon from "../../../../public/images/icons/flame_icon.svg";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

interface Props {
  blog: any;
}

const BlogCard = (props: Props) => {
  const { blog } = props;

  const formatDate = (dateString: string) => {
    const isoString = "2025-04-25T00:00:00";
    const date = new Date(isoString);

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <Link
      className="bg-[#FAF9F6] md:pb-2 lg:max-w-auto max-w-[500px] place-self-center w-full"
      href={`/blog/${blog.slug}`}
    >
      <div className="h-[200px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.mainImageUrl}`}
          alt="blog"
          width={1200}
          height={400}
          className="w-full h-full"
        />
      </div>
      <div className="flex gap-x-4 flex-wrap pt-3 pb-2">
        {blog.isRecommended && (
          <span className="text-GOLD-400 flex items-center">
            <FlameIcon width={14} height={14} fill="rgb(255 113 36)" />
            <span className="ml-1 mobile-small lg:desktop-small">Polecane</span>
          </span>
        )}
        <span className="text-BLACK-100 flex items-center">
          <ClockIcon width={14} height={14} fill="rgb(116 116 116)" />
          <span className="ml-1 mobile-small lg:desktop-small">
            {timeAgo(blog.createdDate)}
          </span>
        </span>
        <span className="text-BLACK-100 flex items-center">
          <CalendarIcon width={14} height={14} fill="rgb(116 116 116)" />
          <span className="ml-1 mobile-small lg:desktop-small">
            {formatDate(blog.createdDate)} r.
          </span>
        </span>
      </div>
      <div>
        <h6 className="mobile-h6 lg:desktop-h6 text-BLACK-600">{blog.slug}</h6>
        <p className="mobile-small lg:desktop-small text-BLACK-300 h-[100px] line-clamp-5">
          {blog.content}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
