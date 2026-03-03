"use client";
import { setCookieToken } from "@/app/actions/setCookieToken";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSpinner from "../../blog/components/LoadingSpinner";
import Link from "next/link";
import { getPolishTokenWord } from "../../pakiety/components/TokenCounter";

export default function PaymentStatus({ user }: { user: any }) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const router = useRouter();
  const [status, setStatus] = useState<string>("Weryfikacja płatności...");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentInfo, setPaymentInfo] = useState<Payment>();

  const sendEmail = async () => {
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
      color: #000000;
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
      color: #000000;
    }
    h3 {
      font-weight: 700;
      font-size: 24px;
      margin: 20px 0 10px;
      color: #000000;
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
      color: #000000;
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
      color: #000000;
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
    <img src="https://yourvehicle.pl/email/header.webp" alt="header" style="width:100%;display:block"/>
    <div class="inner">
      <h3>Witaj ${paymentInfo?.firstName} ${paymentInfo?.lastName}</h3>
      <p>Dziękujemy za skorzystanie z naszych usług</p>
      <div class="divider"></div>
      <p class="section-title">Rodzaj pakietu</p>
      <table style="width:100%">
        ${paymentInfo?.order.orderItems.map((item, index) => {
          // Correct price per token calculation
          const pricePerToken = (
            item.tokenPackage.price / item.tokenPackage.tokenCount
          ).toFixed(2);

          return `<tr>
            <td style="width:50%">
              <img src="https://yourvehicle.pl/payments/${
                item.tokenPackage.image
              }" alt="classic" style="border-radius:24px;width:100%"/>
            </td>
            <td style="padding-left:10px">
              <table>
                <tr>
                  <td>
                    <h6 style="margin-bottom:15px;color:#000000">${
                      item.tokenPackage.title
                    }</h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="tag" style="max-width:65px">${
                      item.tokenPackage.tokenCount
                    } ${getPolishTokenWord(item.tokenPackage.tokenCount)}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="price">Cena <span>${
                      item.tokenPackage.price
                    } zł</span></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="subprice" style="color:#747474">Cena za 1 token wynosi ${pricePerToken} zł</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
        })}
      </table>
      <div class="divider"></div>
      <p class="section-title">Dane</p>
      <div class="data-section">
        <h6>${paymentInfo?.firstName} ${paymentInfo?.lastName}</h6>
        <h6>${paymentInfo?.order.zipCode} ${paymentInfo?.order.city}</h6>
        <h6 style="margin-top:10px">${paymentInfo?.email}</h6>
        <h6>+${paymentInfo?.phoneNumber}</h6>
      </div>
      <div class="divider"></div>
      <div style="margin:30px 0">
        <table style="width:100%">
          <tr>
            <td><p style="color:#000000">Cena</p></td>
            <td style="text-align:end"><p style="font-size:16px;color:#000000"><strong>${
              paymentInfo?.order.fullPrice
            } zł</strong></p></td>
          </tr>
        </table>
        <table style="width:100%">
          <tr>
            <td><p style="color:#000000">Cena za 1 token</p></td>
            <td style="text-align:end">
              <p style="color:#000000">
                <strong>
                  ${
                    paymentInfo &&
                    (
                      paymentInfo.order.fullPrice /
                      paymentInfo.order.orderItems.reduce(
                        (total, item) =>
                          total + item.tokenPackage.tokenCount * item.amount,
                        0
                      )
                    ).toFixed(2)
                  } zł
                </strong>
              </p>
            </td>
          </tr>
        </table>
      </div>
      <div class="divider"></div>
      <table style="margin:30px 0;width:100%">
        <tr>
          <td><p style="color:#000000">Płatność</p></td>
          <td style="text-align:end"><p style="color:#000000"><strong>Przelewy24</strong></p></td>
        </tr>
      </table>
      <a href="https://yourdomain.com" class="button" style="color: white;">Przejdź do mojego konta</a>
    </div>
  </div>
  <p class="footer-text">Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ, lub śmiało skontaktuj się z nami</p>
  <p class="footer-text"><a href="https://yourvehicle.pl/polityka" style="text-decoration: none; color: #0066FF;">Polityka prywatności</a> | <a href="https://yourvehicle.pl/regulamin" style="text-decoration: none; color: #0066FF;">Regulamin</a> | <a href="https://yourvehicle.pl/chce-kupic#contact" style="text-decoration: none; color: #0066FF;">FAQ</a></p>
  <p class="footer-small">YourVechicle będzie przetwarzać dane użytkownika w celu sformalizowania, zarządzania i realizacji naszego stosunku umownego z użytkownikiem jako zarejestrowanym użytkownikiem. Użytkownik może skorzystać ze swoich praw dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania, przenoszenia, przejrzystości i niepodlegania zautomatyzowanym decyzjom pod adresem (...)</p>
</body>
</html>`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user.email,
        subject: "Dziękujemy za Twój zakup! - YourVehicle.pl",
        message: htmlEmail,
      }),
    });
  };

  useEffect(() => {
    const status = searchParams.get("status");
    const token = searchParams.get("token");

    if (token) {
      if (paymentId) {
        const fetchPaymentInfo = async () => {
          setIsLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Payment/paymentInfo/${paymentId}`
          );
          const data = await res.json();
          setPaymentInfo(data);
          setIsLoading(false);
        };
        fetchPaymentInfo();
      }
      // Set the token in the cookie
      setCookieToken(token);
      // Notify user
      setStatus("Płatność zakończona pomyślnie!");
    } else {
      setStatus("Brak informacji o płatności");
      setIsLoading(false);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (paymentInfo != null) {
      const sendEmailAsync = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Payment/emailIsSend/${paymentId}`
        );
        const data = await res.json();
        if (data == false) {
          await sendEmail();
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Payment/sendEmail/${paymentId}`,
            { method: "POST" }
          );
        }
      };
      sendEmailAsync();
    }
  }, [paymentInfo]);

  return (
    <section className="max-w-[1000px] w-full flex flex-col mt-12 mb-20 px-3">
      <header className="self-center text-center">
        <h2 className="mobile-h2 lg:desktop-h2">Dziękujemy za Twój zakup!</h2>
        <p className="mobile-large lg:desktop-large mt-5">
          Twoje zamówienie zostało potwierdzone.
        </p>
        <p className="mobile-large lg:desktop-large">
          Wysłaliśmy również potwierdzenie na Twój adres e-mail.
        </p>
      </header>

      <div className="flex flex-col items-center bg-WHITE-100 rounded-[48px] shadow-md mt-10 px-5 md:px-0 py-10 gap-5">
        <h4 className="mobile-h4 lg:desktop-h4 mb-5">Szczegóły zamówienia: </h4>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          paymentInfo?.order.orderItems.map((item, index) => {
            return (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-10 place-items-center border-1 shadow-md px-5 rounded-xl"
                key={index}
              >
                <div>
                  <Image
                    src={`/payments/${item.tokenPackage.image}`}
                    alt={`${item.tokenPackage.image}`}
                    width={300}
                    height={100}
                    className="rounded-[32px]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2>
                    Pakiet:{" "}
                    <span className="text-AQUA-400 font-bold">
                      {item.tokenPackage.title}
                    </span>
                  </h2>
                  <p>
                    Liczba pakietów:{" "}
                    <span className="text-AQUA-400 font-bold">
                      {item.amount}
                    </span>
                  </p>
                  <span className="bg-AQUA-400 text-WHITE-100 rounded-xl px-3 py-1 flex justify-center items-center self-start">
                    Tokeny {item.tokenPackage.tokenCount}
                  </span>
                  <p>
                    Cena pakietu:{" "}
                    <span className="text-AQUA-400 font-bold">
                      {item.tokenPackage.price.toFixed(2)} zł
                    </span>{" "}
                  </p>
                  <p>
                    Cena całkowita:{" "}
                    <span className="text-AQUA-400 font-bold">
                      {(item.tokenPackage.price * item.amount).toFixed(2)} zł
                    </span>
                  </p>
                  <p>
                    Cena za 1 token:{" "}
                    <span className="text-AQUA-400 font-bold">
                      {(
                        item.tokenPackage.price / item.tokenPackage.tokenCount
                      ).toFixed(2)}{" "}
                      zł
                    </span>
                  </p>
                  <p className="font-bold">{item.tokenPackage.savings}</p>
                </div>
              </div>
            );
          })}

        <div className="flex items-center gap-2">
          <p className="mobile-large lg:desktop-large">
            Całkowita cena zamówienia:
          </p>
          <p className="text-AQUA-400 mobile-large lg:desktop-large !font-bold min-w-[100px] text-end">
            {paymentInfo && (paymentInfo?.price).toFixed(2)} zł
          </p>
        </div>

        <Link href={"/zlecenia"} className="aqua-btn sm:!px-12">
          Sprzedaje pojazd
        </Link>

        <p className="mobile-large lg:desktop-large text-BLACK-600 mt-10 text-center">
          Masz pytania lub potrzebujesz pomocy?
        </p>
        <p className="mobile-large lg:desktop-large text-BLACK-600 text-center">
          {" "}
          Napisz do nas lub Zgłoś problem — jesteśmy tutaj, aby Ci pomóc!
        </p>
      </div>
    </section>
  );
}
