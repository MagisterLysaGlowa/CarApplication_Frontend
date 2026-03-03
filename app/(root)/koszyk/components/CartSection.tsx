"use client";

import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import Link from "next/link";
import ChevronIcon from "../../../../public/images/icons/chevron_icon.svg";

interface CartProduct {
  id: string;
  title: string;
  tokens: number;
  savings?: string;
  totalPrice: number;
  pricePerToken: number;
  imageUrl: string;
  currency: string;
}

const CartSection: React.FC = () => {
  // Lista produktów w koszyku
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  // Domyślny (lub wczytany) czas wysyłki
  const [shippingTime, setShippingTime] = useState("Natychmiast");

  // Ładujemy koszyk z localStorage przy pierwszym renderze
  useEffect(() => {
    const storedData = localStorage.getItem("cartItems");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData) as CartProduct[];
        setCartItems(parsed);
      } catch (error) {
        console.error("Błąd parsowania zawartości localStorage:", error);
      }
    }

    // Ewentualnie wczytaj shippingTime, jeśli też go tam przechowujesz
    const storedShippingTime = localStorage.getItem("shippingTime");
    if (storedShippingTime) {
      setShippingTime(storedShippingTime);
    }
  }, []);

  // Pomocnicza funkcja zapisu do localStorage
  const saveCartToLocalStorage = (items: CartProduct[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // Funkcja obliczająca sumę koszyka
  const computeCartValue = (): number => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  // Funkcja obliczająca ostateczną wartość zamówienia (np. brutto)
  const computeTotalValue = (cartValue: number): number => {
    return cartValue;
  };

  // Usuwanie pozycji z koszyka
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    saveCartToLocalStorage(updatedItems);
  };

  // Obsługa przejścia do zamawiania/płatności
  const handleCheckout = () => {
    cartItems.length > 0
      ? (window.location.href = "/platnosci")
      : alert("Twój koszyk jest pusty.");
    // window.location.href = "/platnosci";
  };

  // Wylicz bieżące wartości
  const cartValue = computeCartValue();
  const totalValue = computeTotalValue(cartValue);

  return (
    <>
      <div className="w-full max-w-7xl cart-flex-box bg-white my-24 rounded-3xl flex md:items-start justify-between mx-auto p-4 ">
        {/* Sekcja z CartItem (lewa strona) */}
        <Link
          href={"/pakiety"}
          className="px-4 flex gap-1 items-center absolute"
        >
          <ChevronIcon
            width={20}
            height={20}
            fill="rgb(255,113,36)"
            className="rotate-[90deg]"
          />
          <span className="translate-y-[-2px] text-GOLD-400">
            Wróć do wyboru pakietów
          </span>
        </Link>
        <div className="p-4 mb-4 lg:max-w-4xl cart-summary-flex-box">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="mb-6">
                <CartItem
                  title={item.title}
                  tokens={item.tokens}
                  savings={item.savings}
                  totalPrice={item.totalPrice}
                  pricePerToken={item.pricePerToken}
                  imageUrl={item.imageUrl}
                  currency={item.currency}
                  // Ważne: przekazujemy funkcję usuwania
                  onRemove={() => handleRemoveItem(item.id)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Twój koszyk jest pusty.</p>
          )}
        </div>

        {/* Sekcja podsumowania (prawa strona) */}
        <div className="flex justify-end cart-summary-flex-box">
          <OrderSummary
            cartValue={cartValue}
            shippingTime={shippingTime}
            totalValue={totalValue}
            currency="zł"
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </>
  );
};

export default CartSection;
