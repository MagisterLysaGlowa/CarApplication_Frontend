import React, { FormEvent, useEffect, useRef, useState } from "react";
import AttachmentIcon from "../../../../public/images/icons/attachment_icon.svg";
import ImageIcon from "../../../../public/images/icons/image_icon.svg";
import ArrowSendIcon from "../../../../public/images/icons/arrow_send_icon.svg";
import XIcon from "../../../../public/images/icons/x_icon.svg";
import { useRouter } from "next/navigation";
import { hubConnection } from "@/lib/signalrClient";
import { toast } from "react-toastify";
import FileIcon from "../../../../public/images/icons/file_icon.svg";
interface Props {
  sendMessage: (
    message_arg: string,
    files: File[]
  ) => Promise<
    | {
        data: any;
      }
    | undefined
  >;
}

const MessageInput = (props: Props) => {
  const router = useRouter();
  const { sendMessage } = props;
  const [messageInput, setMessageInput] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<boolean>(false);
  const imagesFormInputRef = useRef<HTMLInputElement>(null);
  const filesFormInputRef = useRef<HTMLInputElement>(null);

  // Accepted image MIME types
  const acceptedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  // Maximum number of images allowed
  const MAX_IMAGES = 5;

  // Cooldown time in milliseconds
  const COOLDOWN_TIME = 1500; // 3 seconds

  // Trigger file input on ImageIcon click
  const handleImageClick = () => {
    imagesFormInputRef.current?.click();
  };

  const handleAttachmentClick = () => {
    filesFormInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validImageFiles: File[] = [];
      const invalidFormatFiles: File[] = [];
      const nonImageFiles: File[] = [];

      // Check current image count
      if (selectedImages.length >= MAX_IMAGES) {
        toast.warning(
          `Możesz dodać maksymalnie ${MAX_IMAGES} zdjęć do jednej wiadomości.`
        );
        return;
      }

      // Process files
      filesArray.forEach((file) => {
        if (file.type.startsWith("image/")) {
          if (acceptedImageTypes.includes(file.type)) {
            // Don't exceed the max images limit
            if (selectedImages.length + validImageFiles.length < MAX_IMAGES) {
              validImageFiles.push(file);
            }
          } else {
            invalidFormatFiles.push(file);
          }
        } else {
          nonImageFiles.push(file);
        }
      });

      // Show warnings if needed
      if (nonImageFiles.length > 0) {
        toast.warning(
          `Wykryto pliki nie będące zdjęciami. Zignorowano: ${nonImageFiles.length} plików`
        );
      }

      if (invalidFormatFiles.length > 0) {
        toast.warning(
          `Dozwolone formaty zdjęć to: JPG, PNG, WebP. Zignorowano: ${invalidFormatFiles.length} plików`
        );
      }

      if (selectedImages.length + validImageFiles.length > MAX_IMAGES) {
        toast.warning(
          `Wybrano zbyt wiele zdjęć. Limit to ${MAX_IMAGES} zdjęć na wiadomość.`
        );
      }

      if (validImageFiles.length > 0) {
        setSelectedImages((prev) =>
          [...prev, ...validImageFiles].slice(0, MAX_IMAGES)
        );
      }
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const documentFiles: any = [];
      const nonDocumentFiles: any = [];

      filesArray.forEach((file) => {
        const fileType = file.type;

        // Check if file is of accepted document types
        if (
          fileType === "application/pdf" ||
          fileType === "application/msword" ||
          fileType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          fileType === "application/vnd.ms-excel" ||
          fileType ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          fileType === "application/vnd.ms-powerpoint" ||
          fileType ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
          documentFiles.push(file);
        } else {
          nonDocumentFiles.push(file);
        }
      });

      if (nonDocumentFiles.length > 0) {
        // Display warning toast for non-document files
        toast.warning(
          `Wykryto pliki, które nie są dokumentami. Zignorowano: ${nonDocumentFiles.length} plików`
        );
      }

      if (documentFiles.length > 0) {
        setSelectedDocuments((prev) => [...prev, ...documentFiles]);
      }
    }
  };

  // Remove a single image from preview
  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAttachment = (index: number) => {
    setSelectedDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit message with images
  const submitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent submission if in cooldown
    if (cooldown || isLoading) {
      return;
    }

    let canSend: boolean = false;
    if (messageInput) {
      canSend = true;
    } else if (messageInput == "") {
      if (selectedDocuments.length > 0 || selectedImages.length > 0) {
        canSend = true;
      } else {
        canSend = false;
      }
    }

    if (canSend) {
      setIsLoading(true);
      setCooldown(true);

      try {
        const data: any = await sendMessage(
          messageInput ? messageInput : "",
          selectedImages.concat(selectedDocuments)
        );

        // Clear form
        setMessageInput("");
        setSelectedImages([]);
        setSelectedDocuments([]);
      } catch (error) {
        toast.error("Wystąpił błąd podczas wysyłania wiadomości.");
        console.error("Send message error:", error);
      } finally {
        setIsLoading(false);

        // Set cooldown timer
        setTimeout(() => {
          setCooldown(false);
        }, COOLDOWN_TIME);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex gap-3 self-end translate-y-[-10px]">
          <button
            type="button"
            onClick={handleImageClick}
            disabled={
              selectedImages.length >= MAX_IMAGES || cooldown || isLoading
            }
            className={
              selectedImages.length >= MAX_IMAGES
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          >
            <ImageIcon width={22} height={22} fill="black" />
          </button>
          <input
            type="file"
            ref={imagesFormInputRef}
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={handleAttachmentClick}
            disabled={cooldown || isLoading}
          >
            <AttachmentIcon width={22} height={22} fill="black" />
          </button>
          <input
            type="file"
            ref={filesFormInputRef}
            multiple
            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
            className="hidden"
            onChange={handleAttachmentChange}
          />
        </div>
        <form className="flex-grow flex items-end" onSubmit={submitMessage}>
          <div className="border-[0.12em] border-gray-500 rounded-2xl flex-grow pl-5 mx-5 self-end">
            {/* Image Preview */}
            {selectedImages.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative w-16 h-16">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      <XIcon width={12} height={12} fill="white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedDocuments.length > 0 && (
              <div className="flex gap-5 mt-2 flex-wrap">
                {selectedDocuments.map((file, index) => (
                  <div key={index} className=" text-WHITE-100 relative">
                    <div className="bg-AQUA-400 flex gap-2 px-3 py-2 rounded-xl">
                      <FileIcon width={25} height={25} stroke="white" />
                      <span>{file.name}</span>
                    </div>
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      <XIcon width={12} height={12} fill="white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="h-10 rounded-full border-none text-black flex-grow outline-none w-full p-2"
              placeholder="Aa"
              disabled={cooldown && isLoading}
            />
          </div>
          <button
            type="submit"
            className={`md:aqua-btn !rounded-lg h-10 ${
              cooldown || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cooldown || isLoading}
          >
            {isLoading ? (
              <span>
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin dark:text-WHITE-100 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </span>
            ) : cooldown ? (
              <>
                <ArrowSendIcon
                  width={18}
                  height={18}
                  fill="white"
                  className="ml-2 sm:block hidden"
                />
                <ArrowSendIcon
                  width={20}
                  height={20}
                  fill="#0066FF"
                  className="ml-2 md:hidden block sm:translate-y-[-10px]"
                />
              </>
            ) : (
              <>
                <span className="md:block hidden">Wyślij</span>
                <ArrowSendIcon
                  width={18}
                  height={18}
                  fill="white"
                  className="ml-2 sm:block hidden"
                />
                <ArrowSendIcon
                  width={20}
                  height={20}
                  fill="#0066FF"
                  className="ml-2 md:hidden block sm:translate-y-[-10px]"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
