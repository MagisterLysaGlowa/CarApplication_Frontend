"use client";
import React from "react";
import "../../css/body.css";
import Header from "./components/Header";
import OfertForm from "./components/OfertForm";
import { ToastContainer } from "react-toastify";

const OfertPage = () => {
  return (
    <main className="w-full flex justify-center mb-32 px-3 sm:px-0">
      <ToastContainer />
      <section className="w-full max-w-[650px] ">
        <Header />
        <div className="bg-WHITE-100 rounded-[48px] px-5 sm:px-10 py-10 mt-12">
          <OfertForm />
        </div>
      </section>
    </main>
  );
};

export default OfertPage;
