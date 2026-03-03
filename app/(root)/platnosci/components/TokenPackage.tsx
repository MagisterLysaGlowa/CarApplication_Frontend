import TagIcon from "@/public/images/icons/TagIcon";
import React from "react";
import PakietBg from "@/public/images/pakietbg.png";
import { getPolishTokenWord } from "../../pakiety/components/TokenCounter";

export interface TokenPackageProps {
  title: string;
  tokenCount: number;
  price: number;
  pricePerToken: number;
  savings?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const TokenPackage: React.FC<TokenPackageProps> = ({
  title,
  tokenCount,
  price,
  pricePerToken,
  savings = "Brak oszczędności",
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-[26px] p-0 text-center w-80 text-black cursor-pointer transition-all duration-200 
        hover:bg-blue-100 hover:border-[#0066FF] hover:opacity-75 
        ${isSelected ? "bg-blue-100 border-[#0066FF] opacity-75" : ""}`}
    >
      <div>
        <img src={PakietBg.src} alt="Token image" />
      </div>
      <div className="p-6">
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <div className="bg-[#0066FF] text-white py-1 px-4 rounded-[8px] inline-block text-[16px] font-[400]">
          {tokenCount} {getPolishTokenWord(tokenCount)}
        </div>
        <p className="mt-3 text-[#272727] text-[16px]">{savings}</p>
        <div className="flex items-center justify-center mt-2 text-lg">
          <span className="mr-1">
            <TagIcon />
          </span>
          <span className="text-[#2F2F2F]">Cena:</span>
          <span className="text-[#0066FF] font-semibold text-[18px] ml-1">
            {price.toFixed(2)} zł
          </span>
        </div>
        <p className="text-[#747474] mt-1 text-sm">
          Cena za 1 token wynosi {pricePerToken.toFixed(2)} zł
        </p>
      </div>
    </div>
  );
};
