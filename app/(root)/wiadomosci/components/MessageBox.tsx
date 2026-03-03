import ImageGallery from "react-image-gallery";
import React, { useState } from "react";
import Image from "next/image";
import "react-image-gallery/styles/css/image-gallery.css";
import MessageImage from "./MessageImage";
import MessageFile from "./MessageFile";

type Props = {
  message: Message;
  side: "seller" | "buyer";
};

const MessageBox = (props: Props) => {
  const { side, message } = props;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!message) return null;

  // Transform message files into gallery format
  const images =
    message.messageFiles?.map((item) => ({
      original: `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.filePath}`,
      thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.filePath}`,
    })) || [];

  return (
    <div
      className={`mobile-normal lg:desktop-normal max-w-[650px] rounded-xl py-5 px-5 ${
        side === "seller"
          ? "bg-WHITE-200 self-start text-BLACK-500"
          : "bg-AQUA-400 self-end text-WHITE-100"
      }`}
    >
      {message.content}

      {message.messageFiles && message.messageFiles.length > 0 && (
        <div>
          <div className="flex relative">
            {message.messageFiles.map((item, index) => {
              if (item.fileType == "Image") {
                return (
                  <MessageImage
                    key={index}
                    index={index}
                    setCurrentIndex={setCurrentIndex}
                    setIsGalleryOpen={setIsGalleryOpen}
                    filePath={item.filePath}
                  />
                );
              }
            })}
          </div>
          <div className="flex relative mt-3 flex-col gap-2">
            {message.messageFiles.map((item, index) => {
              if (item.fileType == "Document") {
                return <MessageFile key={index} messageFile={item} />;
              }
            })}
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[120] overflow-hidden">
          <div
            className="relative w-[90%] max-w-4xl "
            style={{
              maxHeight: "calc(100vh - 80px)", // Leaves 40px gap on top and bottom
              overflow: "hidden",
            }}
          >
            <button
              className="absolute top-2 right-2 w-12 h-12 bg-white p-2 rounded-full text-black z-50"
              onClick={() => {
                setIsGalleryOpen(false);
                document.body.style.overflow = "auto"; // Re-enable scrolling
              }}
            >
              ✕
            </button>
            <ImageGallery
              items={images}
              startIndex={currentIndex}
              showThumbnails={true}
              showFullscreenButton={false}
              showPlayButton={false}
              onSlide={(index) => setCurrentIndex(index)}
              additionalClass="custom-gallery"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
