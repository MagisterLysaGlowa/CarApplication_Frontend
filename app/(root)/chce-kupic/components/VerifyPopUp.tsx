"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface VerifyPopUpProps {
  onClose?: () => void;
}

const VerifyPopUp: React.FC<VerifyPopUpProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    switch (randomNumber) {
      case 1:
        setTitle("Bezpieczny zakup zaczyna się od weryfikacji!");
        setParagraph("Sprawdź sprzedawcę, zanim wyruszysz w drogę.");
        break;
      case 2:
        setTitle("Zweryfikuj sprzedawcę przed zakupem");
        setParagraph(
          "Sprawdź dane i profil, zanim zdecydujesz się na samochód"
        );
        break;
      case 3:
        setTitle("Uwaga! Sprawdź sprzedawcę i jego dane zanim kupisz auto.");
        setParagraph("Chroń siebie i swoje pieniądze!");
        break;
    }
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 z-[100]">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row items-center p-6 md:p-10">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Left side: Text */}
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {title}
            <br className="hidden md:block" />
          </h2>
          <p className="text-gray-600 mb-4">{paragraph}</p>
          <button
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Rozumiem
          </button>
        </div>

        {/* Right side: Car image with lock */}
        <div className="relative md:w-1/2 flex justify-center">
          <Image
            src="/images/verifypopup.webp"
            alt="Zweryfikuj sprzedawcę"
            width={300}
            height={200}
            quality={90}
            priority={true}
            className="z-10"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c.942 0 1.705.763 1.705 1.705v1.59a1.705 1.705 0 11-3.41 0v-1.59C10.295 11.763 11.058 11 12 11z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 10V7a5 5 0 00-10 0v3M5 10h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPopUp;
