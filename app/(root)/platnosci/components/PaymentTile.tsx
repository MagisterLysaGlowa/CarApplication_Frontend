import Image from "next/image";
import React from "react";

export interface PaymentTileProps {
  imageUrl: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const PaymentTile: React.FC<PaymentTileProps> = ({
  imageUrl,
  title,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        onClick={onClick}
        className={`border rounded-2xl p-6 text-center w-80 text-black cursor-pointer transition-all duration-200
          hover:bg-blue-100 hover:border-[#0066FF] hover:opacity-75
          ${isSelected ? "bg-blue-100 border-[#0066FF] opacity-75" : ""}`}
      >
        <div className="flex justify-center mb-4">
          <div className="flex justify-center items-center px-4 py-2">
            <Image src={imageUrl} alt={title} width={80} height={30} className="mx-auto" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-[#2F2F2F] text-[16px] font-[400]">{description}</p>
      </div>
    </div>
  );
};
