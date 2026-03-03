"use client";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  /** Tytuł (nazwa) pakietu, np. "Pakiet Klasyczny" */
  title: string;
  /** Liczba tokenów, np. 5 */
  tokens: number;
  /** Tekst informujący o oszczędnościach, np. "Oszczędzasz ponad 15%" */
  savings?: string;
  /** Łączna cena, np. 99.90 */
  totalPrice: number;
  /** Cena za jeden token, np. 19.98 */
  pricePerToken: number;
  /** Waluta, np. "zł" */
  imageUrl: string;
  /** Zdjęcie, np. "start.webp" */
  currency: string;
  /** Funkcja wywoływana po kliknięciu ikony kosza (usunięcie) */
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  tokens,
  savings,
  totalPrice,
  pricePerToken,
  currency,
  imageUrl,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:gap-24 justify-between w-full py-4 border border-x-0 border-t-0 border-gray-200 bg-white">
      {/* Lewa część (obrazek + opis + przycisk) */}
      <div className="flex items-center w-full sm:w-auto">
        {/* Obrazek (placeholder) */}
        <div className="w-24 h-14 bg-gray-100 rounded-md mr-4 flex-shrink-0">
          <Image
            src={`/payments/${imageUrl}`}
            alt={imageUrl}
            width={200}
            height={100}
            className="object-contain w-full h-full rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-start gap-2 mb-1">
            <h2 className="font-semibold text-gray-800 mr-2">{title}</h2>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
              type="button"
            >
              {tokens} kluczyków
            </button>
          </div>
          {savings && (
            <div className="flex items-center gap-2 text-sm my-2 text-orange-500 font-medium">
              {/* Ikona "gwiazdki" (przykładowa) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 12 12"
              >
                <g clipPath="url(#clip0_6971_3324)">
                  <path
                    fill="#FF7124"
                    d="M5.99 0c.337-.011.518.186.646.47.465 1.023.926 2.048 1.412 3.059.084.173.26.345.436.43.989.473 1.992.923 2.99 1.378.29.13.521.3.526.65.005.369-.235.545-.534.68-1.01.458-2.024.916-3.025 1.392a.88.88 0 0 0-.386.39c-.474.994-.924 1.996-1.379 2.997-.133.293-.286.55-.663.554-.394.005-.553-.256-.692-.563-.454-1.002-.904-2.006-1.38-2.998a.9.9 0 0 0-.392-.385c-1-.476-2.013-.934-3.024-1.391-.288-.13-.52-.3-.525-.65-.005-.366.234-.544.535-.68 1.01-.458 2.023-.915 3.024-1.391a.88.88 0 0 0 .386-.39c.483-1.013.945-2.038 1.41-3.061.126-.28.295-.493.634-.49"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6971_3324">
                    <path fill="#fff" d="M0 0h12v12H0z"></path>
                  </clipPath>
                </defs>
              </svg>
              {savings}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start">
        {/* Prawa część (cena, info o cenie za token) */}
        <div className="flex flex-col items-end mt-4 sm:mt-0">
          <span className="text-xl font-semibold text-blue-700">
            {totalPrice.toFixed(2)} {currency}
          </span>
          <span className="text-sm text-gray-500">
            Cena za 1 token wynosi {pricePerToken.toFixed(2)} {currency}
          </span>
        </div>

        <button
          className="ml-4 mt-4 sm:mt-0 text-gray-400 hover:text-gray-600"
          onClick={onRemove}
          aria-label="Usuń"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 4.48486C13.2525 4.23736 10.74 4.10986 8.235 4.10986C6.75 4.10986 5.265 4.18486 3.78 4.33486L2.25 4.48486"
              stroke="#A8A8A8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
              stroke="#A8A8A8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1383 6.85498L13.6508 14.4075C13.5683 15.585 13.5008 16.5 11.4083 16.5H6.59328C4.50078 16.5 4.43328 15.585 4.35078 14.4075L3.86328 6.85498"
              stroke="#A8A8A8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.74609 12.375H10.2436"
              stroke="#A8A8A8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.125 9.375H10.875"
              stroke="#A8A8A8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
