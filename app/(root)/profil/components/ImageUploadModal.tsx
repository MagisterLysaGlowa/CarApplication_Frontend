"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  user: any;
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageUploadModal = (props: Props) => {
  const { user, modalActive, setModalActive } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  // Mutation to handle image upload
  const uploadMutation = useMutation({
    mutationFn: async (image: File) => {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Upload/uploadAvatar/${user.data.userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return await response.json(); // Assuming API returns { imageUrl: "uploaded_image_url" }
    },
    onSuccess: (data) => {
      setModalActive(false);
      toast.success("Pomyślnie zedytowano zdjęcie na profilu!");
      window.location.reload();
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      toast.warn("Wystąpił błąd podczas edycji profilu!");
    },
  });

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      const toastId = toast.loading("Wgrywanie zdjęcia...");
      uploadMutation.mutate(selectedImage, {
        onSettled: () => toast.dismiss(toastId),
      });
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black opacity-75 z-[100] ${
          modalActive ? "block" : "hidden"
        }`}
      ></div>

      {/* Modal Container */}
      <div
        className={`max-w-[800px] w-full p-6 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white z-[120] flex flex-col items-center rounded-lg shadow-lg ${
          modalActive ? "block" : "hidden"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Upload Profile Image</h2>

        {/* Image Preview */}
        <div className="w-[250px] h-[250px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
        </div>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          className="mt-4"
          onChange={handleFileChange}
        />

        {/* Upload Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleUpload}
          disabled={!selectedImage}
        >
          Ustaw zdjęcie
        </button>

        {/* Close Button */}
        <button
          className="mt-2 text-sm text-gray-600 hover:underline"
          onClick={() => {
            setModalActive(false);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ImageUploadModal;
