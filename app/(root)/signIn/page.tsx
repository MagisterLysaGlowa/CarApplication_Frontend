import AdvertisementCard from "@/app/components/AdvertisementCard";
import React, { Suspense } from "react";
import CredentialsForm from "./components/CredentialsForm";
import "../../css/body.css";
import Link from "next/link";
import GoogleIcon from "../../../public/images/icons/google_icon.svg";
import { ToastContainer } from "react-toastify";
import GoogleLoginButton from "./components/GoogleLoginButton";

const SignInPage = () => {
  return (
    <main className="flex justify-center mb-24">
      <ToastContainer />
      <section className="w-full max-w-[1400px] mt-24 px-5 lg:px-0">
        <p className="text-GOLD-400 mobile-small lg:desktop-small text-center">
          Zaloguj się
        </p>
        <h2 className="mobile-h2 lg:desktop-h2 text-center my-5">
          Zaloguj sie do YourVehicle
        </h2>
        <p className="mobile-normal lg:desktop-normal text-center">
          Zaloguj się lub zarejestruj, abyśmy mogli poinformować Cię, gdy
          pojawią się oferty na Twój wymarzony samochód
        </p>

        <article
          className="flex flex-col lg:grid gap-10 mt-5 lg:mt-16 place-items-center"
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          <div>
            <div className="w-full max-h-[200px]">
              <AdvertisementCard />
            </div>
          </div>

          <div className="bg-white px-5 md:px-12 py-14 rounded-[25px] shadow-md flex flex-col max-w-[800px] w-full">
            <GoogleLoginButton className="w-full" />
            <div
              className="grid place-items-center mt-8"
              style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
              <hr className="w-full h-[0.12em] bg-WHITE-500" />
              <p className="text-BLACK-100 mobile-normal lg:desktop-normal px-6">
                Lub zaloguj się przez e-mail
              </p>
              <hr className="w-full h-[0.12em] bg-WHITE-500" />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <CredentialsForm />
            </Suspense>
            <p className="mobile-normal lg:desktop-normal text-center text-BLACK-300 my-3">
              Nie masz jeszcze konta?
            </p>
            <Link href={"/register"} className="light-btn !py-5">
              Zarejestruj się
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SignInPage;
