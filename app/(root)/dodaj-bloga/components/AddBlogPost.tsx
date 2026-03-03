"use client";
import { getToken } from "@/app/actions/getToken";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../../css/body.css";
import Image from "next/image";

interface ContentBlock {
  type: "header" | "paragraph" | "list" | "image";
  value?: string;
  items?: string[];
  file?: File | null;
  src?: string;
}

interface PostCreatorProps {
  sSlug?: string | null | undefined; // Opcjonalny parametr ID posta do edycji
  clear?: boolean;
}

const PostCreator: React.FC<PostCreatorProps> = ({ sSlug, clear = false }) => {
  const [postId, setPostId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (clear) {
      sSlug = null;
      setIsEditing(false);
      localStorage.removeItem("postId");
    }
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      if (sSlug != null || sSlug != undefined) {
        setIsEditing(true);
        try {
          const response = await fetch(
            `https://api.yourvehicle.pl/Post/${sSlug}`
          );
          const data = await response.json();
          const { id, title, content, slug, mainImageUrl } = data;

          setPostId(id);
          setTitle(title);
          setContent(JSON.parse(content));
          setSlug(slug);

          if (mainImageUrl) {
            setMainImagePreview(mainImageUrl);
          }

          localStorage.removeItem("postId");
        } catch (error) {
          console.error("Błąd podczas pobierania danych posta:", error);
          //toast.error("Nie udało się pobrać danych posta.");
        }
      }
    };

    fetchPostData();
  }, [sSlug]);

  const addBlock = (type: ContentBlock["type"]) => {
    if (type === "image") {
      const imageIndex = content.filter(
        (block) => block.type === "image"
      ).length;
      setContent([
        ...content,
        { type, file: null, src: `{image${imageIndex}}` },
      ]);
    } else if (type === "list") {
      setContent([...content, { type, items: [] }]);
    } else {
      setContent([...content, { type, value: "" }]);
    }
  };

  const updateBlock = (index: number, updatedBlock: ContentBlock) => {
    const newContent = [...content];
    newContent[index] = updatedBlock;
    setContent(newContent);
  };

  const removeBlock = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const imageIndex =
        content.filter((block, i) => block.type === "image" && i <= index)
          .length - 1;

      const updatedContent = [...content];
      updatedContent[index].file = file;
      updatedContent[index].src = `{image${imageIndex}}`;
      setContent(updatedContent);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (slug) {
      formData.append("slug", slug);
    }

    let imageIndex = 0;
    const contentWithPlaceholders = content.map((block) => {
      if (block.type === "image" && block.file) {
        formData.append("images", block.file);
        return { type: "image", src: `{image${imageIndex++}}` };
      }
      return block;
    });

    formData.append("content", JSON.stringify(contentWithPlaceholders));

    const token = await getToken();
    try {
      if (isEditing) {
        await fetch(`https://api.yourvehicle.pl/Post/${postId}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Nie udało się zaktualizować posta.");
            }
            return response.json();
          })
          .then((data) => {
            setPostId(data.id);
          })
          .catch((error) => {
            toast.error("Nie udało się zaktualizować posta.");
          });
        toast.success("Post został zaktualizowany!");
      } else {
        await fetch(`https://api.yourvehicle.pl/Post`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Nie udało się zaktualizować posta.");
            }
            return response.json();
          })
          .then((data) => {
            setPostId(data.id);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Nie udało się zaktualizować posta.");
          });
        toast.success("Post został utworzony!");
      }

      setTitle("");
      setContent([]);
      setMainImage(null);
      setMainImagePreview(null);
      setSlug("");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.error ||
          "Wystąpił błąd podczas zapisywania posta."
      );
    }
  };

  return (
    <div className="w-full max-w-[1400px] text-base-100 bg-WHITE-100 rounded-[24px] shadow-md px-5 md:px-12 lg:px-24 py-12 mt-8 mb-20">
      <div className="mb-6">
        <h2 className="block text-lg font-semibold mb-4">Tytuł posta:</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Wpisz tytuł posta"
          className="w-full p-3 border rounded-lg box-border focus:outline-none focus:ring-2 focus:ring-accent h-16 mobile-normal lg:desktop-normal"
        />
      </div>
      <div className="mb-6">
        <h2 className="block text-lg font-semibold mb-4">
          Odnośnik do artykułu:
        </h2>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Wpisz odnośnik artykułu np. testowy-post-o-stronie"
          className="block w-full box-border p-3 border rounded-lg h-16 mobile-normal lg:desktop-normal"
        />
      </div>

      <div className="mb-6">
        <h2 className="block text-lg font-semibold mb-4">Główne zdjęcie:</h2>
        <input
          type="file"
          onChange={handleMainImageChange}
          className="block w-full p-3 border rounded-lg h-16"
        />
        {mainImage && (
          <Image
            src={URL.createObjectURL(mainImage)}
            alt="Podgląd głównego zdjęcia (nowy)"
            width={800}
            height={500}
            className="mt-4 w-full max-h-64 object-contain"
          />
        )}

        {!mainImage && mainImagePreview && !clear && (
          <Image
            src={`https://api.yourvehicle.pl/${mainImagePreview}`}
            alt="Podgląd głównego zdjęcia (oryginalny)"
            width={800}
            height={500}
            className="mt-4 w-full max-h-64 object-contain"
          />
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Dodaj treść:</h2>
      {content.map((block, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
          <select
            value={block.type}
            onChange={(e) =>
              updateBlock(index, { ...block, type: e.target.value as any })
            }
            className="block w-full mb-2 p-2 border box-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="header">Nagłówek</option>
            <option value="paragraph">Paragraf</option>
            <option value="list">Lista</option>
            <option value="image">Obraz</option>
          </select>

          {block.type === "header" || block.type === "paragraph" ? (
            <textarea
              value={block.value || ""}
              onChange={(e) =>
                updateBlock(index, { ...block, value: e.target.value })
              }
              placeholder={
                block.type === "header"
                  ? "Wpisz tekst nagłówka"
                  : "Wpisz tekst paragrafu"
              }
              className={`w-full box-border p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                block.type === "paragraph"
                  ? "h-[400px] resize-y"
                  : "resize-none"
              }`}
            />
          ) : null}

          {block.type === "list" ? (
            <textarea
              value={block.items?.join("\n") || ""}
              onChange={(e) =>
                updateBlock(index, {
                  ...block,
                  items: e.target.value.split("\n"),
                })
              }
              placeholder="Wpisz elementy listy, każdy w nowej linii"
              className="w-full resize-y p-2 border rounded-lg box-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          ) : null}

          {block.type === "image" ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e)}
                className="block w-full p-2 border rounded-lg"
              />
              {block.file && (
                <>
                  <p className="text-sm text-gray-500 mt-2">
                    Wybrano plik: {block.file.name}
                  </p>
                  <Image
                    src={URL.createObjectURL(block.file)}
                    alt="Podgląd obrazu"
                    width={600}
                    height={400}
                    className="mt-4 w-full max-h-64 object-contain"
                  />
                </>
              )}
            </div>
          ) : null}

          <button
            onClick={() => removeBlock(index)}
            className="mt-4 text-red-600 border-0 bg-transparent text-[14px] cursor-pointer hover:text-red-800"
          >
            Usuń blok
          </button>
        </div>
      ))}

      <div className="flex gap-5 mb-6">
        <button
          onClick={() => addBlock("header")}
          className="px-4 py-2 bg-blue-500 text-white aqua-border-btn"
        >
          Dodaj Nagłówek
        </button>
        <button
          onClick={() => addBlock("paragraph")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg aqua-border-btn"
        >
          Dodaj Paragraf
        </button>
        <button
          onClick={() => addBlock("list")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg aqua-border-btn"
        >
          Dodaj Listę
        </button>
        <button
          onClick={() => addBlock("image")}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg  aqua-border-btn"
        >
          Dodaj Obraz
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Podgląd JSON:</h2>
      <pre className="p-8 bg-WHITE-600 text-blue-800 border rounded-[24px] mb-6 overflow-x-auto">
        {JSON.stringify(
          content.map((block) =>
            block.type === "image"
              ? { type: block.type, src: block.src }
              : block
          ),
          null,
          2
        )}
      </pre>

      <button
        onClick={handleSubmit}
        className="px-6 !py-6 w-full aqua-btn text-[#131313] mt-8 border-0 rounded-[56px] text-[16px] leading-[21px] font-[700] hover:bg-yellow-400 focus:outline-none cursor-pointer"
      >
        {isEditing ? "Zaktualizuj Post" : "Zapisz Post"}
      </button>
    </div>
  );
};

export default PostCreator;
