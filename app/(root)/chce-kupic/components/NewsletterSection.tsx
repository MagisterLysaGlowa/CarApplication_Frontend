"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Email validation regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Adres email jest wymagany");
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Wprowadź poprawny adres email");
      return false;
    }

    setEmailError("");
    return true;
  };

  const sendNewsletterHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (!validateEmail(email)) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      if (res.ok) {
        setEmail("");
        toast.success("Pomyślnie zapisano do newslettera!");
      } else {
        toast.error("Nie udało się zapisać do newslettera!");
      }
    } catch (error) {
      console.log("Nie udało się zapisać do newslettera");
      toast.error("Wystąpił błąd podczas próby zapisu do newslettera");
    }
  };

  return (
    <section
      className="bg-opacity-90 text-white py-16 px-4 text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/newsletter.webp')" }}
    >
      <div className="py-12 px-6 rounded-xl mx-auto max-w-[600px]">
        <h4 className="text-2xl sm:desktop-h2 md:desktop-h2 font-bold mb-4 leading-tight">
          Sprzedajesz auto? Bądź na bieżąco z rynkowymi trendami!
        </h4>
        <p className="text-sm md:text-base mb-8">
          Zapisz się na nasz newsletter, a co miesiąc otrzymasz zestawienie
          najnowszych ofert, analizę cen oraz wskazówki, jak wyróżnić swoją
          ofertę
        </p>
        <form
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
          onSubmit={sendNewsletterHandler}
        >
          <div className="w-full sm:w-2/3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              placeholder="Podaj swój adres e-mail"
              className={`w-full px-4 py-3 rounded-lg text-black focus:outline-none ${
                emailError ? "border-2 border-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-400 text-sm text-left mt-1 sm:hidden block">
                {emailError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Zapisz mnie
          </button>
        </form>
        {emailError && (
          <p className="text-red-400 text-sm text-left mt-1 ml-5 sm:block hidden">
            {emailError}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
