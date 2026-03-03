import React from "react";
import Hero from "./components/Hero";
import Description from "./components/Description";
import ClientOpinions from "./components/ClientOpinions";
import Questions from "./components/Questions";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import { loginUser } from "@/app/actions/loginUser";
import { getAuth } from "@/app/actions/getAuth";
import NewsletterSection from "./components/NewsletterSection";
import VerifyPopUp from "./components/VerifyPopUp";
import { ToastContainer } from "react-toastify";

const LandingPage = async () => {
  const user = await getAuth();

  return (
    <>
      <main>
        <ToastContainer />
        <Hero />
        <Description />
        {/* <ClientOpinions /> */}
        <div className="mt-14"></div>
        <Questions />
        <Blog />
        <Contact user={user.data} />
        <NewsletterSection />
      </main>
    </>
  );
};

export default LandingPage;
