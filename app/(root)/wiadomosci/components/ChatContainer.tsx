"use client";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import CartIcon from "../../../../public/images/icons/cart_icon.svg";
import WavyDolarIcon from "../../../../public/images/icons/wavy_dolar_icon.svg";
import "../../../css/scrollbar.css";
import ChatBox from "./ChatBox";
import { hubConnection, startConnection } from "@/lib/signalrClient";
import { useRouter } from "next/navigation";
import ChatSidebar from "./ChatSidebar";
import SettingsModal from "./SettingsModal";

interface Props {
  chatHeadersResponse: ChatHeaderResponse;
  user: any;
}

const ChatContainer = (props: Props) => {
  const { chatHeadersResponse, user } = props;
  const [currentChats, setCurrentChats] = useState<string>("buyer");
  const [openedChatId, setOpenedChatId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const router = useRouter();
  const [chatSidebarActive, setChatSidebarActive] = useState<boolean>(false);
  const [chatHeaders, setChatHeaders] = useState<ChatHeaderType[]>([]);
  const [header, setHeader] = useState<ChatHeaderType>();
  const [settingsModalVisible, setSettingsModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setChatHeaders(chatHeadersResponse.sellers);

    if (props.user) {
      const setupConnection = async () => {
        if (hubConnection.state === "Disconnected") {
          const con = await startConnection();
          if (con) {
            setIsConnected(true);
          }
        } else if (hubConnection.state !== "Connected") {
          await hubConnection.stop();
          const con = await startConnection();
          if (con) {
            setIsConnected(true);
          }
        } else if (hubConnection.state === "Connected") {
          setIsConnected(true);
        }
      };
      setupConnection();

      if (!hubConnection) return;

      hubConnection.on(
        "NewMessageNotification",
        (chatId: string, messageId: string) => {
          router.refresh();
        }
      );

      return () => {
        hubConnection.off("NewMessageNotification");
      };
    }
  }, []);

  useEffect(() => {
    //!REVERT LOGIC
    if (currentChats == "seller") setChatHeaders(chatHeadersResponse.buyers);
    else if (currentChats == "buyer")
      setChatHeaders(chatHeadersResponse.sellers);
  }, [currentChats, chatHeadersResponse]);

  return (
    <article
      className="flex flex-col lg:grid gap-10 mt-12 lg:px-0 px-3"
      style={{ gridTemplateColumns: "3fr 7fr" }}
    >
      <SettingsModal
        user={user}
        settingsModalVisible={settingsModalVisible}
        setSettingsModalVisible={setSettingsModalVisible}
      />
      <button
        className="aqua-btn max-w-[200px] !py-2 font-bold lg:hidden block"
        onClick={() => {
          setChatSidebarActive((prevState) => !prevState);
        }}
      >
        Czaty
      </button>
      {isConnected ? (
        <ChatSidebar
          openedChatId={openedChatId}
          setOpenedChatId={setOpenedChatId}
          chatHeaders={chatHeaders}
          chatSidebarActive={chatSidebarActive}
          setChatSidebarActive={setChatSidebarActive}
          setCurrentChats={setCurrentChats}
          currentChats={currentChats}
          setChatHeaders={setChatHeaders}
          setSettingsModalVisible={setSettingsModalVisible}
        />
      ) : (
        <div className="rounded-[24px] w-full h-full lg:!h-[500px]  bg-WHITE-400 animate-pulse"></div>
      )}

      {isConnected ? (
        <ChatBox
          chatHeaders={chatHeaders}
          openedChatId={openedChatId}
          user={user}
          setIsConnected={setIsConnected}
        />
      ) : (
        <div className="rounded-[24px] w-full h-[300px] bg-WHITE-400 animate-pulse"></div>
      )}
    </article>
  );
};

export default ChatContainer;
