"use server";

import { getServerSession } from "next-auth";
import { offerFormSchema } from "../schema/schema";
import { getAuth } from "./getAuth";
import { redirect } from "next/navigation";

export const createOffer = async (
  formData: any,
  selectedColors: Color[],
  selectedBodyTypes: number[],
  selectedCountryOfOrigins: number[],
  selectedDriveTypes: number[],
  selectedDoorsCounts: number[],
  selectedFuelTypes: number[],
  selectedGearboxes: number[],
  selectedCarStates: number[]
): Promise<any> => {
  const offer = formData;

  try {
    const response = await getAuth();
    const user = response?.data;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mark: offer.mark,
        model: offer.model,
        price: offer.price,
        offerType: offer.offerType,
        generation: offer.generation,
        bodyTypesId: selectedBodyTypes.length > 0 ? selectedBodyTypes : [],
        comment: offer.comment,
        countryOfOriginsId:
          selectedCountryOfOrigins.length > 0 ? selectedCountryOfOrigins : [],
        doorsCountId: selectedDoorsCounts.length > 0 ? selectedDoorsCounts : [],
        gearboxesId: selectedGearboxes.length > 0 ? selectedGearboxes : [],
        driveTypesId: selectedDriveTypes.length > 0 ? selectedDriveTypes : [],
        carStatesId: selectedCarStates.length > 0 ? selectedCarStates : [],
        yearOfProductionFrom: offer.yearOfProductionFrom,
        yearOfProductionTo: offer.yearOfProductionTo,
        horsePowerFrom: offer.horsePowerFrom,
        horsePowerTo: offer.horsePowerTo,
        mileageFrom: offer.mileageFrom,
        mileageTo: offer.mileageTo,
        fuelTypesId: selectedFuelTypes.length > 0 ? selectedFuelTypes : [],
        userId: user.userId,
        colorsId: [...selectedColors.map((item) => item.colorId)],
      }),
    });
    const data = await res.json();

    if (data && user) {
      sendEmail(
        user.email,
        "Potwierdź swoje zlecenie na YourVehicle.pl!",
        data.confirmHash
      );
    }

    if (!res.ok) {
      throw new Error("Creating offer failed");
    }
    return { success: true, message: "logged successfuly!" };
  } catch (error) {
    return { error: `Failed to create!. Please try again. ${error}` };
  }
};

const sendEmail = async (to: string, subject: string, hash: string) => {
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
    <div style="width: 100%; background-color: #f3f3f3; padding-top: 50px; padding-bottom: 50px;">
      <div class="container">
        <img
          src="https://yourvehicle.pl/email/header.webp"
          alt="header"
          style="width: 100%; display: block"
        />
        <div class="inner" style="color: #000000">
          <h3>Potwierdź swoje zlecenie!</h3>
          <p style="font-size: 16px">
            Po kliknięciu w link twoje zlecenie stanie się publiczne dla
            wszystkich użytkowników portalu.
          </p>
          <a class="button" style="color: white" href="https://yourvehicle.pl/potwierdz-zlecenie/${hash}">Potwierdź zlecenie</a>
        </div>
      </div>
      <p class="footer-text">
        Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ, lub śmiało
        skontaktuj się z nami
      </p>
      <p class="footer-text"><a href="https://yourvehicle.pl/polityka" style="text-decoration: none; color: #0066FF;">Polityka prywatności</a> | <a href="https://yourvehicle.pl/regulamin" style="text-decoration: none; color: #0066FF;">Regulamin</a> | <a href="https://yourvehicle.pl/chce-kupic#contact" style="text-decoration: none; color: #0066FF;">FAQ</a></p>
      <p
        class="footer-small"
        style="color: #a5a5a5; font-size: 18px; line-height: 25px"
      >
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: to,
      subject: subject,
      message: htmlEmail,
    }),
  });
};
