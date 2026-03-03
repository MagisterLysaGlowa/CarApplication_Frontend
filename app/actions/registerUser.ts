"use server";

import { registerFormSchema } from "@/app/schema/schema";
import { z } from "zod";

export async function registerUser(prevState: any, formData: FormData) {
  // Create a new object from FormData entries
  const dataObject: { [key: string]: string } = {};

  for (const [key, value] of formData.entries()) {
    // Ensure we only add string values
    if (typeof value === "string") {
      dataObject[key] = value;
    } else if (value instanceof File) {
      // Skip file inputs if any
      continue;
    }
  }

  try {
    // Manually parse the data with explicit type conversion
    const parsedData = registerFormSchema.parse({
      ...dataObject,
      checkbox: dataObject.checkbox === "true",
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: parsedData.username,
          phoneNumber: parsedData.phone,
          email: parsedData.email,
          password: parsedData.password,
          city: parsedData.city,
          zipCode: parsedData.zipCode,
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json();

      throw new Error("Registration failed");
    }

    const htmlEmail = `<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <title>Rejestracja konta</title>
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
    <div
      style="
        width: 100%;
        background-color: #f5f5f5;
        min-height: 1000px;
        padding-bottom: 80px;
        padding-top: 80px;
      "
    >
      <div class="container">
        <img
          src="https://yourvehicle.pl/email/header.webp"
          alt="header"
          style="width: 100%; display: block"
        />
        <div class="inner container" style="color: #000000">
          <h3>Witaj ${parsedData.username}</h3>

          <div
            style="
              background-color: #fafafa;
              border: 1px #e9e9e9 solid;
              color: #2f2f2f;
              border-radius: 14px;
            "
          >
            <table style="padding: 0px 20px; margin-top: 15px">
              <tr>
                <td>
                  <img
                    src="https://yourvehicle.pl/email/yourvehicle.webp"
                    style="border-radius: 100%"
                  />
                </td>
                <td>
                  <h2 style="padding-left: 10px">YourVehicle</h2>
                </td>
              </tr>
            </table>

            <hr style="margin: 20px; border: 0.01em #cacaca solid" />
            <div style="padding: 0px 20px; font-size: 20px">
              <h5>Witamy na serwisie YourVehicle 🚗</h5>
            </div>
            <div
              style="
                padding: 0px 20px;
                font-family: Arial, Helvetica, sans-serif;
                line-height: 30px;
              "
            >
              <p style="color: #2f2f2f; font-weight: 400; font-size: 16px">
                Cześć Sebastian! Dziękujemy za zaufanie i wybranie naszego
                serwisu 😁
              </p>
              <p style="color: #2f2f2f; font-weight: 400; font-size: 16px">
                Niedługo znajdziesz Tutaj oferty od sprzedawców, którzy wyślą Ci
                oferty w odpowiedzi na Twoje zlecenie. Powiadomimy cię mailowo o
                otrzymaniu wiadomości z ofertą.
              </p>
              <p style="color: #2f2f2f; font-weight: 400; font-size: 16px">
                Możesz tutaj dyskutować z sprzedającymi, licytować się a także
                rozmawiać o szczegółach.
              </p>
              <p style="color: #2f2f2f; font-weight: 400; font-size: 16px">
                Kiedy już znajdziesz idealną ofertę i zakupisz pojazd kliknij
                “zakończ zlecenie” w zakładce Moje zlecenia.
              </p>
              <p style="color: #2f2f2f; font-weight: 400; font-size: 16px">
                Życzymy znalezienia idealnego samochodu 😍 Zespół YourVehicle
              </p>
            </div>
          </div>

          <a
            href="https://yourvehicle.pl/wiadomosci"
            class="button"
            style="width: 100%; color: white"
            >Zobacz całą wiadomość</a
          >

          <hr
            style="margin: 20px; border: 0.01em #cacaca solid; margin: 40px 0px"
          />

          <p style="color: #1e1e1e; font-size: 14px; font-weight: 400">
            Jeśli wiadomość została otrzymana pomyłkowo, prosimy ją zignorować.
            Jeśli podejrzewasz, że ktoś korzysta z Twojego konta bez Twojej
            zgody, <span style="color: #01559d"
              >prosimy się z nami skontaktować.</span
            >
          </p>
        </div>
      </div>
      <p class="footer-text">
        Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ, lub śmiało
        skontaktuj się z nami
      </p>
      <p class="footer-text">
        <a
          href="https://yourvehicle.pl/polityka"
          style="text-decoration: none; color: #0066ff"
          >Polityka prywatności</a
        >
        |
        <a
          href="https://yourvehicle.pl/regulamin"
          style="text-decoration: none; color: #0066ff"
          >Regulamin</a
        >
        |
        <a
          href="https://yourvehicle.pl/chce-kupic#contact"
          style="text-decoration: none; color: #0066ff"
          >FAQ</a
        >
      </p>
      <p class="footer-small">
        YourVechicle będzie przetwarzać dane użytkownika w celu sformalizowania,
        zarządzania i realizacji naszego stosunku umownego z użytkownikiem jako
        zarejestrowanym użytkownikiem. Użytkownik może skorzystać ze swoich praw
        dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania,
        przenoszenia, przejrzystości i niepodlegania zautomatyzowanym decyzjom
        pod adresem (...)
      </p>
    </div>
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
          to: parsedData.email,
          subject: "Dziękujemy za rejestracje konta! - YourVehicle.pl",
          message: htmlEmail,
        }),
      }
    );

    if (!sendEmailResponse.ok) {
      throw new Error("Registration failed");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { errors: error.format() };
    }
    return { error: "Failed to register. Please try again." };
  }
}
