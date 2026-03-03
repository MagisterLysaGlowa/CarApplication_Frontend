import React from "react";
import "../../css/body.css";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="flex justify-center min-h-[500px] md:min-h-[480px] lg:min-h-[455px] items-center sm:px-0 px-5">
      <div className="bg-WHITE-100 px-2 sm:px-12 py-16 rounded-[32px]">
        <h2 className="mobile-h3 sm:mobile-h2 lg:desktop-h2 text-center">
          Potwierdź zlecenie
        </h2>
        <p className="mobile-large lg:desktop-large mt-5 text-center">
          Na twój adres e-mail wysłaliśmy link do potwierdzenia i aktywacji
          zlecenia
        </p>
      </div>
    </section>
  );
};

export default page;
