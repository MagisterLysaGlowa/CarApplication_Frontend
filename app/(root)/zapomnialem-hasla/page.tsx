import React from "react";
import ConfirmationBox from "./components/ConfirmationBox";
import "../../css/body.css";

type Props = {};

const ForgetPasswordPage = (props: Props) => {
  return (
    <section className="flex w-full flex-col items-center mt-12">
      <h1 className="mobile-h1 lg:desktop-h1">
        Przypominanie hasła do serwisu YourVehicle.pl
      </h1>
      <p className="mobile-large lg:desktop-large mt-5">
        Na twój adres e-mail został wysłany link resetowania hasła.
      </p>
      <ConfirmationBox />
    </section>
  );
};

export default ForgetPasswordPage;
