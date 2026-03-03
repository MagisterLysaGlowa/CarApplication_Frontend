import React from "react";
import DonwloadIcon from "../../../../public/images/icons/donwload_icon.svg";
import FileIcon from "../../../../public/images/icons/file_icon.svg";

type Props = {
  messageFile: MessageFile;
};

const handleDownload = async (filePath: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_IMAGE_URL}${filePath}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch file.");
    }
    const fileType = response.headers.get("Content-Type");
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Dynamically set file extension based on file type
    let fileExtension = "pdf"; // Default to pdf if not matched

    switch (fileType) {
      case "application/pdf":
        fileExtension = "pdf";
        break;
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        fileExtension = "docx";
        break;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        fileExtension = "xlsx";
        break;
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        fileExtension = "pptx";
        break;
      default:
        fileExtension = "txt"; // default case for unknown file types
        break;
    }

    const fileName = `document.${fileExtension}`; // Custom file name with dynamic extension

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

const MessageFile = ({ messageFile }: Props) => {
  return (
    <button
      className="bg-white text-black px-3 py-4 rounded-xl flex gap-3 items-center"
      onClick={() => {
        handleDownload(messageFile.filePath);
      }}
    >
      <FileIcon width={35} height={35} stroke="gray" />
      <span>{messageFile.fileAlt}</span>
      <DonwloadIcon width={20} height={20} fill="gray" stroke="gray" />
    </button>
  );
};

export default MessageFile;
