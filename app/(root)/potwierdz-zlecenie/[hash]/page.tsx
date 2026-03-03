import React from "react";
import "../../../css/body.css";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ hash: string }> }) => {
  const hash = (await params).hash;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/confirm-offer/${hash}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (
    <section className="flex justify-center min-h-[500px] md:min-h-[480px] lg:min-h-[455px] items-center sm:px-0 px-5">
      <div className="bg-WHITE-100 px-2 sm:px-12 py-16 rounded-[32px] max-w-[800px] flex flex-col">
        <h2 className="mobile-h3 sm:mobile-h2 lg:desktop-h2 text-center">
          Potwierdzono zlecenie
        </h2>
        <p className="mobile-large lg:desktop-large mt-5 text-center">
          Potwierdzono zlecenie. Czekaj na informację od sprzedawcy i znajdź
          swój wymarzony samochód już dziś!
        </p>
        <Link
          href={"/moje-zlecenia"}
          className="aqua-btn !py-5 !px-5 min-w-[200px] self-center mt-10"
        >
          Moje zlecenia
        </Link>
      </div>
    </section>
  );
};

export default page;
