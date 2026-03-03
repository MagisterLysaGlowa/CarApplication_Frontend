"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const ConfirmationBox = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const forgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Wprowadź poprawny adres email");
      return;
    }

    setIsLoading(true);
    try {
      const emailExistResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/userWithEmailExistAndWantReset/${email}`
      );

      if (!emailExistResponse.ok) {
        toast.error("Wystąpił błąd podczas weryfikacji adresu email");
        return;
      }

      const data = await emailExistResponse.json();

      if (data) {
        const htmlEmail = `<!DOCTYPE html>
        <html lang="pl">
          <head>
            <meta charset="UTF-8" />
            <title>Email</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
                font-family: Inter, sans-serif;
              }
              .container {
                max-width: 500px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 32px;
                padding-bottom: 80px;
                overflow: hidden;
              }
              .inner {
                padding: 0 30px;
              }
              h3 {
                font-weight: 700;
                font-size: 24px;
                margin: 20px 0 10px;
              }
              p {
                font-weight: 400;
                font-size: 14px;
                color: #1e1e1e;
                margin: 0 0 15px;
              }
              .section-title {
                font-size: 14px;
                color: #0c0c0c;
                margin: 20px 0 5px;
                font-weight: 400;
              }
              .tag {
                background-color: #0066ff;
                color: white;
                padding: 3px 10px;
                border-radius: 8px;
                display: inline-block;
                font-size: 14px;
                margin-bottom: 5px;
              }
              .price {
                margin-top: 10px;
                font-size: 16px;
                font-weight: 400;
                color: #2f2f2f;
              }
              .price span {
                color: #0066ff;
                font-weight: 600;
              }
              .subprice {
                color: #747474;
                font-size: 14px;
                margin-top: 2px;
              }
              .data-section h6 {
                margin: 5px 0;
                font-size: 16px;
                font-weight: 600;
                color: #0c0c0c;
              }
              .divider {
                border-top: 1px solid #ccc;
                margin: 20px 0;
              }
              .flex-row {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
              }
              .sub-row {
                font-size: 14px;
                color: #747474;
                margin: 10px 0;
              }
              .button {
                display: block;
                width: 100%;
                background-color: #0066ff;
                color: white;
                text-align: center;
                padding: 16px 0;
                font-size: 16px;
                font-weight: 500;
                border-radius: 12px;
                text-decoration: none;
                margin-top: 30px;
              }
              .footer-text {
                text-align: center;
                max-width: 530px;
                font-size: 16px;
                font-weight: 400;
                margin: 35px auto 0;
                color: #000;
              }
              .footer-small {
                text-align: center;
                max-width: 530px;
                font-size: 16px;
                font-weight: 400;
                color: #000000;
                margin: 35px auto 80px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img
                src="https://yourvehicle.pl/email/header.webp"
                alt="header"
                style="width: 100%; display: block"
              />
              <div class="inner" style="color: #000000">
                <h3>Resetowanie hasła dla ${email}</h3>
                <a href="https://yourvehicle.pl/resetowanie-hasla/${data.passwordResetId}" class="button">Przejdź do resetowania hasła</a>
              </div>
            </div>
            <p class="footer-text">
              Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ, lub śmiało
              skontaktuj się z nami
            </p>
            <p class="footer-text"><a href="https://yourvehicle.pl/polityka" style="text-decoration: none; color: #0066FF;">Polityka prywatności</a> | <a href="https://yourvehicle.pl/regulamin" style="text-decoration: none; color: #0066FF;">Regulamin</a> | <a href="https://yourvehicle.pl/chce-kupic#contact" style="text-decoration: none; color: #0066FF;">FAQ</a></p>
            <p class="footer-small">
              YourVechicle będzie przetwarzać dane użytkownika w celu sformalizowania,
              zarządzania i realizacji naszego stosunku umownego z użytkownikiem jako
              zarejestrowanym użytkownikiem. Użytkownik może skorzystać ze swoich praw
              dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania,
              przenoszenia, przejrzystości i niepodlegania zautomatyzowanym decyzjom pod
              adresem (...)
            </p>
          </body>
        </html>
        `;

        const sendEmailResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Mail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: email,
              subject: "Reset hasła - YourVehicle.pl",
              message: htmlEmail,
            }),
          }
        );

        if (!sendEmailResponse.ok) {
          toast.error("Nie udało się wysłać emaila z linkiem resetującym");
        } else {
          toast.success(
            "Link do resetowania hasła został wysłany na podany adres email"
          );
          // Czyszczenie pola email po wysłaniu wiadomości
          setEmail("");
        }
      } else {
        toast.warning("Nie znaleziono użytkownika z podanym adresem email");
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas wysyłania linku resetującego");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <form
        className="bg-WHITE-100 max-w-[600px] w-full rounded-[24px] mt-8 px-10 py-12 mb-24 shadow-md"
        onSubmit={forgetPassword}
      >
        <label htmlFor="emailInput" className="mobile-h5 lg:desktop-h5">
          Wpisz adres email:
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="h-14 mt-8 border-[0.12em] border-WHITE-500 shadow-md w-full rounded-xl pl-3 mobile-large lg:desktop-large outline-none"
        />
        <button className="aqua-btn w-full !py-4 mt-8" disabled={isLoading}>
          {isLoading ? "Wysyłanie..." : "Wyślij link na adres email"}
        </button>
      </form>
    </>
  );
};

export default ConfirmationBox;
