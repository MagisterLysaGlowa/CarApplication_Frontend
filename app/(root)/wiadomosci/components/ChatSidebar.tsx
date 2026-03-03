"use client";
import React, { useEffect } from "react";
import ChatList from "./ChatList";
import CartIcon from "../../../../public/images/icons/cart_icon.svg";
import WavyDolarIcon from "../../../../public/images/icons/wavy_dolar_icon.svg";
import SettingsIcon from "../../../../public/images/icons/settings_icon.svg";
import "../../../css/scrollbar.css";
import { hubConnection } from "@/lib/signalrClient";
import { useRouter } from "next/navigation";
type Props = {
  chatSidebarActive: boolean;
  setChatSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentChats: React.Dispatch<React.SetStateAction<string>>;
  currentChats: string;
  setOpenedChatId: React.Dispatch<React.SetStateAction<number | null>>;
  openedChatId: number | null;
  chatHeaders: ChatHeaderType[];
  setChatHeaders: React.Dispatch<React.SetStateAction<ChatHeaderType[]>>;
  setSettingsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSidebar = (props: Props) => {
  const {
    chatSidebarActive,
    setChatSidebarActive,
    setCurrentChats,
    currentChats,
    setOpenedChatId,
    openedChatId,
    chatHeaders,
    setChatHeaders,
    setSettingsModalVisible,
  } = props;
  const router = useRouter();

  return (
    <aside
      className={`bg-WHITE-100 px-3 sm:px-8 pt-6 rounded-[24px] h-full w-full lg:!max-h-[600px] pb-16 lg:relative transition-all duration-500 absolute left-0 lg:top-0 z-[90] top-[260px] ${
        chatSidebarActive
          ? "translate-x-[0px]"
          : "translate-x-[-1000px] lg:translate-x-[0px]"
      }`}
    >
      <button
        className="flex lg:hidden absolute top-[0px] right-[3px] !py-0 !px-0 w-10 h-10 !p-2 hover:bg-AQUA-400 hover:text-WHITE-100 transition-all duration-300 items-center justify-center !rounded-full font-extrabold text-AQUA-400 text-xl"
        onClick={() => {
          setChatSidebarActive((prevState) => !prevState);
        }}
      >
        ✕
      </button>
      <div className="grid grid-cols-2 place-items-center gap-3 mt-5 sm:mt-0">
        <button
          className="flex"
          onClick={() => {
            setCurrentChats("buyer");
          }}
        >
          <WavyDolarIcon
            width={25}
            height={25}
            fill={currentChats === "buyer" ? "#0066FF" : "#B8B8B8"}
          />
          <span
            className={`ml-2 mobile-normal lg:desktop-normal ${
              currentChats === "buyer" ? "text-BLACK-700" : "text-BLACK-100"
            }`}
          >
            Chcę sprzedać
          </span>
        </button>

        <button
          className="flex"
          onClick={() => {
            setCurrentChats("seller");
          }}
        >
          <CartIcon
            width={25}
            height={25}
            fill={currentChats === "seller" ? "#0066FF" : "#B8B8B8"}
          />
          <span
            className={`ml-2 mobile-normal lg:desktop-normal ${
              currentChats === "seller" ? "text-BLACK-700" : "text-BLACK-100"
            }`}
          >
            Chcę kupić
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-8 mt-5 w-full overflow-y-scroll !min-h-[400px] scrollContainer ">
        <ChatList
          chatHeaders={chatHeaders.filter((ch) => ch.hasUnreadMessages == true)}
          newMessages={true}
          setOpenedChatId={setOpenedChatId}
          openedChatId={openedChatId}
          setChatSidebarActive={setChatSidebarActive}
        />
        <ChatList
          chatHeaders={chatHeaders.filter(
            (ch) => ch.hasUnreadMessages == false
          )}
          newMessages={false}
          setOpenedChatId={setOpenedChatId}
          openedChatId={openedChatId}
          setChatSidebarActive={setChatSidebarActive}
        />
      </div>
      <button
        onClick={() => {
          setSettingsModalVisible((prevState) => !prevState);
        }}
        className="flex items-center px-6 py-2 bg-WHITE-300 rounded-xl absolute right-10 mt-3"
      >
        <SettingsIcon width={22} heigt={22} fill="gray" />
        <span className="text-BLACK-100 translate-y-[-2px]">Inne</span>
      </button>
    </aside>
  );
};

export default ChatSidebar;
