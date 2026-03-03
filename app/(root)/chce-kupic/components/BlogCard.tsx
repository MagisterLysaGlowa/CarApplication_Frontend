import React from "react";
import Image from "next/image";
import CalendarIcon from "../../../../public/images/icons/calendar_icon.svg";
import ClockIcon from "../../../../public/images/icons/clock_icon.svg";
import FlameIcon from "../../../../public/images/icons/flame_icon.svg";

type Props = {
  blog: BlogData;
};

const BlogCard = (props: Props) => {
  const { blog } = props;
  return (
    <div className="bg-[#FAF9F6] md:pb-2 lg:max-w-auto max-w-[500px] place-self-center">
      <div className="h-[200px]">
        <Image
          src={blog.image}
          alt="blog"
          width={300}
          height={150}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-x-4 flex-wrap pt-3 pb-2">
        {blog.recommended && (
          <span className="text-GOLD-400 flex items-center">
            <FlameIcon width={14} height={14} fill="rgb(255 113 36)" />
            <span className="ml-1 mobile-small lg:desktop-small">Polecane</span>
          </span>
        )}
        <span className="text-BLACK-100 flex items-center">
          <ClockIcon width={14} height={14} fill="rgb(116 116 116)" />
          <span className="ml-1 mobile-small lg:desktop-small">
            {blog.time}
          </span>
        </span>
        <span className="text-BLACK-100 flex items-center">
          <CalendarIcon width={14} height={14} fill="rgb(116 116 116)" />
          <span className="ml-1 mobile-small lg:desktop-small">
            {blog.date}
          </span>
        </span>
      </div>
      <div>
        <h6 className="mobile-h6 lg:desktop-h6 text-BLACK-600">{blog.title}</h6>
        <p className="mobile-small lg:desktop-small text-BLACK-300 h-[100px] line-clamp-5">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
