"use client";

import React, { useState } from "react";

interface OrderSummaryProps {
  /** Aktualna wartość koszyka (np. 145.00) */
  cartValue: number;
  /** Czas wysyłki (np. "Natychmiast") */
  shippingTime: string;
  /** Łączna wartość zamówienia (np. 168.00) */
  totalValue: number;
  /** Waluta (np. "zł") */
  currency: string;
  /** Callback wywoływany po kliknięciu przycisku "Przejdź do zamawiania" */
  onCheckout: () => void;
}

/**
 * Komponent wyświetla:
 * - Nagłówek "Podsumowanie"
 * - Wartość koszyka
 * - Czas wysyłki
 * - Łączną wartość zamówienia (brutto)
 * - Sekcję "Dodaj kod rabatowy"
 * - Przycisk przekierowujący do dalszego zamawiania
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartValue,
  shippingTime,
  totalValue,
  currency,
  onCheckout,
}) => {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const handleToggleDiscount = () => {
    setIsDiscountOpen((prev) => !prev);
  };

  const handleApplyDiscount = () => {
    // Tu możesz zaimplementować logikę obsługi kodu rabatowego
    console.log("Zastosowano kod rabatowy:", discountCode);
  };

  return (
    <div className="w-full  bg-[#F8F8F8] rounded-xl p-4 ">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Podsumowanie</h2>
      {/* Separator */}
      <hr className="my-2" />

      {/* Wartość koszyka */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-600">Wartość koszyka</span>
        <span className="text-sm font-semibold text-gray-800">
          {cartValue.toFixed(2)} {currency}
        </span>
      </div>

      {/* Czas wysyłki */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-600">Czas wysyłki</span>
        <span className="text-sm font-semibold text-gray-800">
          {shippingTime}
        </span>
      </div>

      {/* Łączna wartość zamówienia */}
      <div className="flex items-center gap-8 justify-between py-2">
        <span className="text-sm text-gray-600">Łączna wartość zamówienia</span>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-800">
            {totalValue.toFixed(2)} {currency}
          </span>
          <span className="text-xs text-gray-500">brutto</span>
        </div>
      </div>

      {/* Separator */}
      <hr className="my-2" />

      {/* Sekcja "Dodaj kod rabatowy" */}
      <div className="py-2">
        <button
          type="button"
          onClick={handleToggleDiscount}
          className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900"
        >
          <span>Dodaj kod rabatowy</span>
          {/* Ikona strzałki */}
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform ${
              isDiscountOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M5.23 7.21a.75.75 0 
                 011.06.02L10 11.01l3.71-3.78a.75.75 0 
                 111.08 1.04l-4.25 4.34a.75.75 0 
                 01-1.08 0L5.23 8.27a.75.75 0 
                 01.02-1.06z"
            />
          </svg>
        </button>
        {isDiscountOpen && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Wpisz kod rabatowy"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl"
              onClick={handleApplyDiscount}
            >
              Zastosuj
            </button>
          </div>
        )}
      </div>

      {/* Przycisk "Przejdź do zamawiania" */}
      <button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        onClick={onCheckout}
      >
        Przejdź do zamawiania
      </button>
    </div>
  );
};

export default OrderSummary;
