"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Calendar2 from "../../../../../public/images/icons/calendar2_icon.svg";

type Props = {
  data: any;
  content: string;
};

type Block =
  | { type: "header"; value: string }
  | { type: "paragraph"; value: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string };

const BlogPost = ({ data, content }: Props) => {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  useEffect(() => {
    try {
      setBlocks(JSON.parse(content));
    } catch (err) {
      console.error("Invalid content JSON", err);
    }
  }, [content]);

  return (
    <div className="w-full">
      <h2 className="mobile-h2 lg:desktop-h2">{data.title}</h2>
      <div className="my-4">
        <span className="flex gap-2 items-center mobile-normal lg:desktop-normal">
          <Calendar2 width={18} height={18} />
          {data.createdDate.substring(8, 10)}.{data.createdDate.substring(7, 5)}
          .{data.createdDate.substring(0, 4)} r
        </span>
      </div>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.mainImageUrl}`}
        alt="mainImage"
        className="w-full"
        width={800}
        height={500}
      />
      <div className="w-full mx-auto space-y-6">
        {blocks.map((block, index) => {
          switch (block.type) {
            case "header":
              return (
                <h4
                  key={index}
                  className="mobile-h4 lg:desktop-h4 text-3xl font-bold text-gray-800 mt-8"
                >
                  {block.value}
                </h4>
              );
            case "paragraph":
              return (
                <p
                  key={index}
                  className="mobile-large lg:desktop-large text-base text-gray-700 mt-8 !leading-[30px]"
                >
                  {block.value}
                </p>
              );
            case "list":
              return (
                <ul key={index} className="list-disc list-inside text-gray-700">
                  {block.items.map((item: any, idx: any) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );
            case "image":
              return (
                <Image
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${block.src}`}
                  alt="mainImage"
                  className="w-full mt-8"
                  width={800}
                  height={500}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BlogPost;
