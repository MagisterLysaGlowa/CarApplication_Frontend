"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../css/body.css";

type Props = {};

const page = (props: Props) => {
  //   return (
  //     <section
  //       style={{
  //         display: "flex",
  //         width: "100%",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         marginTop: "20px",
  //       }}
  //     >
  //       <article
  //         style={{
  //           maxWidth: "500px",
  //           width: "100%",
  //           background: "white",
  //           paddingBottom: "80px",
  //           borderRadius: "32px",
  //         }}
  //       >
  //         <header>
  //           <Image
  //             src={"/email/header.png"}
  //             alt="header"
  //             width={400}
  //             height={200}
  //             className="w-full"
  //           />
  //         </header>
  //         <div style={{ padding: "0px 30px" }}>
  //           <div>
  //             <h3
  //               style={{
  //                 fontWeight: 700,
  //                 fontSize: "24px",
  //                 marginTop: "20px",
  //                 marginBottom: "10px",
  //               }}
  //             >
  //               Witaj Jan Kowalski
  //             </h3>
  //             <p
  //               style={{
  //                 fontWeight: 400,
  //                 fontSize: "14px",
  //                 color: "#1E1E1E",
  //                 fontFamily: "Inter",
  //                 marginBottom: "15px",
  //               }}
  //             >
  //               Dziękujemy za skorzystanie z naszych usług
  //             </p>
  //             <hr />
  //             <p
  //               style={{
  //                 fontWeight: 400,
  //                 fontSize: "14px",
  //                 color: "#0C0C0C",
  //                 fontFamily: "Inter",
  //                 marginBottom: "20px",
  //                 marginTop: "20px",
  //               }}
  //             >
  //               Rodzaj pakietu
  //             </p>
  //             <div
  //               style={{
  //                 display: "grid",
  //                 gridTemplateColumns: "1fr 1fr",
  //                 gap: "0px 1.25rem",
  //                 marginBottom: "40px",
  //               }}
  //             >
  //               <Image
  //                 src={`/payments/classic.webp`}
  //                 alt="classic"
  //                 width={300}
  //                 height={100}
  //                 style={{ flexGrow: 1, borderRadius: "24px" }}
  //               />
  //               <div className="flex flex-col justify-center">
  //                 <h6
  //                   style={{
  //                     fontWeight: 700,
  //                     fontSize: "16px",
  //                     color: "#0C0C0C",
  //                     fontFamily: "Red Hat Display",
  //                     marginBottom: "15px",
  //                   }}
  //                 >
  //                   Pakiet Klasyczny
  //                 </h6>
  //                 <p
  //                   style={{
  //                     backgroundColor: "#0066FF",
  //                     color: "white",
  //                     placeSelf: "start",
  //                     padding: "3px 10px",
  //                     borderRadius: "8px",
  //                   }}
  //                 >
  //                   5 tokenów
  //                 </p>
  //                 <p
  //                   style={{
  //                     marginTop: "10px",
  //                     fontFamily: "Inter",
  //                     fontWeight: 400,
  //                     color: "#2F2F2F",
  //                     fontSize: "16px",
  //                   }}
  //                 >
  //                   Cena{" "}
  //                   <span style={{ color: "#0066FF", fontWeight: 600 }}>
  //                     99,90zł
  //                   </span>
  //                 </p>
  //                 <p
  //                   style={{
  //                     color: "#747474",
  //                     marginTop: "2px",
  //                     fontSize: "14px",
  //                     fontFamily: "Inter",
  //                     fontWeight: 400,
  //                   }}
  //                 >
  //                   Cena za 1 token wynosi 19,98
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <hr />
  //           <p
  //             style={{
  //               fontWeight: 400,
  //               fontSize: "14px",
  //               color: "#0C0C0C",
  //               fontFamily: "Inter",
  //               marginBottom: "5px",
  //               marginTop: "20px",
  //             }}
  //           >
  //             Dane
  //           </p>
  //           <div
  //             style={{
  //               fontWeight: 600,
  //               fontFamily: "Inter",
  //               fontSize: "16px",
  //               color: "#0C0C0C",
  //               marginBottom: "25px",
  //             }}
  //           >
  //             <h6>Jan Kowalski</h6>
  //             <h6>00-000 Miejscowość</h6>

  //             <h6 style={{ margin: "10px 0px 0px 0px" }}>mail@wp.pl</h6>
  //             <h6>+48 000 000 000</h6>
  //           </div>
  //           <hr />
  //           <div style={{ margin: "30px 0px" }}>
  //             <div style={{ display: "flex" }}>
  //               <p
  //                 style={{
  //                   flexGrow: 1,
  //                   fontSize: "16px",
  //                   fontWeight: 400,
  //                   color: "#0C0C0C",
  //                   fontFamily: "Inter",
  //                 }}
  //               >
  //                 Cena
  //               </p>
  //               <p
  //                 style={{
  //                   fontSize: "16px",
  //                   fontWeight: 600,
  //                   color: "#0C0C0C",
  //                   fontFamily: "Inter",
  //                 }}
  //               >
  //                 69,90 zł
  //               </p>
  //             </div>

  //             <div style={{ display: "flex", margin: "10px 0px" }}>
  //               <p
  //                 style={{
  //                   flexGrow: 1,
  //                   fontSize: "14px",
  //                   fontWeight: 400,
  //                   color: "#747474",
  //                   fontFamily: "Inter",
  //                 }}
  //               >
  //                 Cena za 1 token
  //               </p>
  //               <p
  //                 style={{
  //                   fontSize: "14px",
  //                   fontWeight: 600,
  //                   color: "#747474",
  //                   fontFamily: "Inter",
  //                 }}
  //               >
  //                 23,90 zł
  //               </p>
  //             </div>
  //           </div>
  //           <hr />
  //           <div style={{ display: "flex", margin: "30px 0px" }}>
  //             <p
  //               style={{
  //                 flexGrow: 1,
  //                 fontSize: "16px",
  //                 fontWeight: 400,
  //                 color: "#0C0C0C",
  //                 fontFamily: "Inter",
  //               }}
  //             >
  //               Płatność
  //             </p>
  //             <p
  //               style={{
  //                 fontSize: "16px",
  //                 fontWeight: 600,
  //                 color: "#0C0C0C",
  //                 fontFamily: "Inter",
  //               }}
  //             >
  //               Przelewy24
  //             </p>
  //           </div>

  //           <a
  //             href="/"
  //             style={{
  //               background: "#0066FF",
  //               width: "100%",
  //               display: "flex",
  //               justifyContent: "center",
  //               borderRadius: "12px",
  //               fontSize: "16px",
  //               marginTop: "30px",
  //               alignItems: "center",
  //               color: "white",
  //               padding: "16px 0px",
  //             }}
  //           >
  //             Przejdź do mojego konta
  //           </a>
  //         </div>
  //       </article>

  //       <p
  //         style={{
  //           textAlign: "center",
  //           marginTop: "60px",
  //           maxWidth: "530px",
  //           fontSize: "16px",
  //           fontWeight: 400,
  //           color: "#000000",
  //           fontFamily: "Inter",
  //         }}
  //       >
  //         Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ , lub śmiało
  //         skontaktuj się z nami
  //       </p>

  //       <p
  //         style={{
  //           textAlign: "center",
  //           marginTop: "35px",
  //           maxWidth: "530px",
  //           fontSize: "16px",
  //           fontWeight: 400,
  //           color: "#000000",
  //           fontFamily: "Inter",
  //         }}
  //       >
  //         Polityka prywatności | Regulamin | FAQ
  //       </p>

  //       <p
  //         style={{
  //           textAlign: "center",
  //           marginTop: "35px",
  //           marginBottom: "80px",
  //           maxWidth: "530px",
  //           fontSize: "16px",
  //           fontWeight: 400,
  //           color: "#A5A5A5",
  //           fontFamily: "Inter",
  //         }}
  //       >
  //         YourVechicle będzie przetwarzać dane użytkownika w celu sformalizowania,
  //         zarządzania i realizacji naszego stosunku umownego z użytkownikiem jako
  //         zarejestrowanym użytkownikiem. Użytkownik może skorzystać ze swoich praw
  //         dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania,
  //         przenoszenia, przejrzystości i niepodlegania zautomatyzowanym decyzjom
  //         pod adresem (...)
  //       </p>
  //     </section>
  //   );
  const htmlEmail = `<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8" /><title>Email</title><style>body{margin:0;padding:0;background-color:#f5f5f5;font-family:Inter,sans-serif;}.container{max-width:500px;margin:20px auto;background-color:#ffffff;border-radius:32px;padding-bottom:80px;overflow:hidden;}.inner{padding:0 30px;}h3{font-weight:700;font-size:24px;margin:20px 0 10px;}p{font-weight:400;font-size:14px;color:#1e1e1e;margin:0 0 15px;}.section-title{font-size:14px;color:#0c0c0c;margin:20px 0 5px;font-weight:400;}.tag{background-color:#0066ff;color:white;padding:3px 10px;border-radius:8px;display:inline-block;font-size:14px;margin-bottom:5px;}.price{margin-top:10px;font-size:16px;font-weight:400;color:#2f2f2f;}.price span{color:#0066ff;font-weight:600;}.subprice{color:#747474;font-size:14px;margin-top:2px;}.data-section h6{margin:5px 0;font-size:16px;font-weight:600;color:#0c0c0c;}.divider{border-top:1px solid #ccc;margin:20px 0;}.flex-row{display:flex;justify-content:space-between;font-size:16px;}.sub-row{font-size:14px;color:#747474;margin:10px 0;}.button{display:block;width:100%;background-color:#0066ff;color:white;text-align:center;padding:16px 0;font-size:16px;font-weight:500;border-radius:12px;text-decoration:none;margin-top:30px;}.footer-text{text-align:center;max-width:530px;font-size:16px;font-weight:400;margin:35px auto 0;color:#000;}.footer-small{text-align:center;max-width:530px;font-size:16px;font-weight:400;color: #000000;margin:35px auto 80px;}</style></head><body><div class="container"><img src="https://yourvehicle.pl/email/header.webp" alt="header" style="width:100%;display:block"/><div class="inner" style="color: #000000"><h3>Witaj Jan Kowalski</h3><p>Dziękujemy za skorzystanie z naszych usług</p><div class="divider"></div><p class="section-title">Rodzaj pakietu</p><table style="width:100%"><tr><td style="width:50%"><img src="https://yourvehicle.pl/payments/classic.webp" alt="classic" style="border-radius:24px;width:100%"/></td><td style="padding-left:10px"><table><tr><td><h6 style="margin-bottom:15px; color: #000000">Pakiet Klasyczny</h6></td></tr><tr><td><span class="tag" style="max-width:65px">5 tokenów</span></td></tr><tr><td><p class="price">Cena <span>99,90zł</span></p></td></tr><tr><td><p class="subprice">Cena za 1 token wynosi 19,98</p></td></tr></table></td></tr></table><div class="divider"></div><p class="section-title">Dane</p><div class="data-section"><h6>Jan Kowalski</h6><h6>00-000 Miejscowość</h6><h6 style="margin-top:10px">mail@wp.pl</h6><h6>+48 000 000 000</h6></div><div class="divider"></div><div style="margin:30px 0"><table style="width:100%"><tr><td><p>Cena</p></td><td style="text-align:end"><p style="font-size:16px"><strong>69,90 zł</strong></p></td></tr></table><table style="width:100%"><tr><td><p>Cena za 1 token</p></td><td style="text-align:end"><p><strong>23,90 zł</strong></p></td></tr></table></div><div class="divider"></div><table style="margin:30px 0;width:100%"><tr><td><p>Płatność</p></td><td style="text-align:end"><p><strong>Przelewy24</strong></p></td></tr></table><a href="https://yourdomain.com" class="button">Przejdź do mojego konta</a></div></div><p class="footer-text">Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ, lub śmiało skontaktuj się z nami</p><p class="footer-text">Polityka prywatności | Regulamin | FAQ</p><p class="footer-small">YourVechicle będzie przetwarzać dane użytkownika w celu sformalizowania, zarządzania i realizacji naszego stosunku umownego z użytkownikiem jako zarejestrowanym użytkownikiem. Użytkownik może skorzystać ze swoich praw dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania, przenoszenia, przejrzystości i niepodlegania zautomatyzowanym decyzjom pod adresem (...)</p></body></html>
`;
  const sendEmail = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "kacperpiaskowy937@gmail.com",
        subject: "temat",
        message: htmlEmail,
      }),
    });
  };

  return (
    <div>
      <button onClick={sendEmail}>Wyślij email</button>
    </div>
  );
};

export default page;
