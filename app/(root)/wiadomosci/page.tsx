import React from "react";
import "../../css/body.css";
import ChatContainer from "./components/ChatContainer";
import { getAuth } from "@/app/actions/getAuth";
import { getChatHeaders } from "@/app/actions/getChatHeaders";
import { ToastContainer } from "react-toastify";

// Define types
interface ChatHeader {
  id: string;
  name: string;
  lastMessage: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Page = async () => {
  try {
    // Fetch chat headers and user data
    const chatHeaders: any = await getChatHeaders();
    const user = await getAuth();
    // Handle edge cases where data might be undefined
    if (!chatHeaders || !chatHeaders.data) {
      console.error("Error: Invalid chatHeaders data");
      return <div>Error loading chat headers.</div>;
    }

    if (!user || !user.data) {
      console.error("Error: Invalid user data");
      return <div>Error loading user data.</div>;
    }

    // Render component with valid data
    return (
      <main className="flex justify-center w-full mb-24 ">
        <ToastContainer />
        <section className="w-full max-w-[1400px] flex flex-col mt-12">
          <header>
            <p className="mobile-small lg:desktop-small text-GOLD-400 text-center">
              Oferty od sprzedających
            </p>
            <h2 className="mobile-h2 lg:desktop-h2 text-[#272727] text-center mt-2 md:mt-5">
              Wiadomości
            </h2>
            <p className="text-[#363636] text-center mobile-normal lg:desktop-normal mt-2 md:mt-5">
              To właśnie tutaj pojawią się oferty od potencjalnych sprzedawców w
              odpowiedzi na Twoje zlecenie.
            </p>
          </header>

          <ChatContainer
            chatHeadersResponse={chatHeaders.data}
            user={user.data}
          />
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error during data fetching:", error);
    return <div>Error occurred while fetching data.</div>;
  }
};

export default Page;
