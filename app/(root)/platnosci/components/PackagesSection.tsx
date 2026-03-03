"use client";

import React, { useState } from "react";
import { TokenPackage, TokenPackageProps } from "./TokenPackage";

interface CartProduct {
  id: string;
  title: string;
  tokens: number;
  savings?: string;
  totalPrice: number;
  pricePerToken: number;
  currency: string;
}

/**
 * Dodaje nowy przedmiot do koszyka w localStorage.
 * Jeśli w localStorage nie ma jeszcze klucza 'cartItems', tworzy nową tablicę.
 * Jeśli jest, wczytuje obecną tablicę, dodaje nowy przedmiot i ponownie zapisuje w localStorage.
 *
 * @param newItem - obiekt zawierający informacje o przedmiocie (CartProduct).
 * @returns Nowa tablica koszyka po dodaniu przedmiotu.
 */
function addCartItem(newItem: CartProduct): CartProduct[] {
  const cartKey = "cartItems";
  const storedData = localStorage.getItem(cartKey);
  let cart: CartProduct[] = [];
  if (storedData) {
    try {
      cart = JSON.parse(storedData) as CartProduct[];
    } catch (error) {
      console.error("Błąd parsowania zawartości localStorage:", error);
    }
  }
  cart.push(newItem);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  return cart;
}

const PackagesSection: React.FC = () => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<
    number | null
  >(null);

  const packages: TokenPackageProps[] = [
    {
      title: "Pakiet Startowy",
      tokenCount: 3,
      price: 69.9,
      pricePerToken: 23.9,
    },
    {
      title: "Pakiet Klasyczny",
      tokenCount: 5,
      price: 99.9,
      pricePerToken: 19.98,
      savings: "Oszczędzasz ponad 15%",
    },
    {
      title: "Pakiet Premium",
      tokenCount: 10,
      price: 169.9,
      pricePerToken: 16.99,
      savings: "Oszczędzasz prawie 30%",
    },
    {
      title: "Pakiet Vehicle",
      tokenCount: 20,
      price: 249.0,
      pricePerToken: 12.45,
      savings: "Oszczędzasz prawie 50%",
    },
  ];

  const handleSelectPackage = (index: number) => {
    setSelectedPackageIndex(index);
  };

  const handleAddToCart = () => {
    if (selectedPackageIndex === null) return;
    const pkg = packages[selectedPackageIndex];
    const newCartItem: CartProduct = {
      id: Date.now().toString(), // generujemy unikalny identyfikator na podstawie timestampu
      title: pkg.title,
      tokens: pkg.tokenCount,
      savings: pkg.savings,
      totalPrice: pkg.price,
      pricePerToken: pkg.pricePerToken,
      currency: "zł",
    };

    const updatedCart = addCartItem(newCartItem);
  };

  return (
    <div className="text-center py-12">
      <h2 className="text-[36px] font-bold mb-3">Wybierz pakiet kluczyków</h2>
      <p className="mb-8 px-2">
        Kliknij na interesujący Cię pakiet, aby go zaznaczyć, a następnie
        potwierdź wybór przyciskiem poniżej.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {packages.map((pkg, index) => (
          <TokenPackage
            key={index}
            title={pkg.title}
            tokenCount={pkg.tokenCount}
            price={pkg.price}
            pricePerToken={pkg.pricePerToken}
            savings={pkg.savings}
            isSelected={selectedPackageIndex === index}
            onClick={() => handleSelectPackage(index)}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAddToCart}
          disabled={selectedPackageIndex === null}
          className="aqua-btn"
        >
          Przejdź do zamawiania
        </button>
      </div>
    </div>
  );
};

export default PackagesSection;
