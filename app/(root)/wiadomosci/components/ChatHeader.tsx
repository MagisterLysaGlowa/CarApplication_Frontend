"use client";
import VolumeIcon from "../../../../public/images/icons/volume_icon.svg";
import { getAuth } from "@/app/actions/getAuth";
import { joinChat } from "@/lib/signalrClient";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ChatMenu from "./ChatMenu";

type Props = {
  chatHeader: ChatHeaderType;
  newMessages: boolean;
  setOpenedChatId: React.Dispatch<React.SetStateAction<number | null>>;
  openedChatId: number | null;
  setChatSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatHeader = (props: Props) => {
  const {
    chatHeader,
    newMessages,
    setOpenedChatId,
    openedChatId,
    setChatSidebarActive,
    user,
    setTrigger,
    trigger,
  } = props;

  return (
    <div
      className="group grid relative hover:bg-[#F0F0F0] px-3 py-3 hover:cursor-pointer rounded-l"
      style={{ gridTemplateColumns: "50px 1fr" }}
    >
      {/* PRZYCISK MENU */}
      <div
        className="w-full h-full absolute z-[80]"
        onClick={async () => {
          setChatSidebarActive(false);
          setOpenedChatId(chatHeader.chatId);
          await joinChat(chatHeader.chatId);
        }}
      ></div>
      <div className="absolute h-full w-full ">
        <ChatMenu
          user={user}
          chatHeader={chatHeader}
          trigger={trigger}
          setTrigger={setTrigger}
          setOpenedChatId={setOpenedChatId}
          openedChatId={openedChatId}
        />
      </div>

      <div className="flex w-[50px] h-[50px] justify-center items-center bg-black rounded-full">
        {chatHeader.isMuted && (
          <div className="absolute right-5 top-3">
            <VolumeIcon
              className={`stroke-red-700  transition-all duration-200`}
              width={15}
              height={15}
              strokeWidth="1.5"
            />
          </div>
        )}
        {chatHeader.avatarUrl ? (
          <Image
            src={
              chatHeader.avatarUrl
                ? chatHeader.avatarUrl.includes("http")
                  ? `${chatHeader.avatarUrl}`
                  : `${process.env.NEXT_PUBLIC_IMAGE_URL}${chatHeader.avatarUrl}`
                : "/deafult-avatar.png"
            }
            alt="avatar"
            width={180}
            height={180}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-full bg-WHITE-400">
            <span className="text-2xl font-extrabold text-BLACK-300 translate-y-[-1px]">
              {chatHeader.otherUserName[0].toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col ml-3 max-w-[400px]">
        <p className="mobile-small-bold lg:desktop-small-bold flex items-center">
          <span className="flex-grow">{chatHeader.otherUserName}</span>
          {newMessages && (
            <span className="w-2 h-2 rounded-full bg-AQUA-400"></span>
          )}
        </p>
        <div className="flex w-full">
          <div className="flex-grow">
            <p
              className={`w-[140px] text-ellipsis overflow-hidden whitespace-nowrap ${
                newMessages
                  ? "mobile-small-bold lg:desktop-small-bold"
                  : "mobile-small lg:desktop-small"
              }`}
            >
              {chatHeader.senderId == user.userId ? "Ty: " : ""}
              {chatHeader.lastMessage
                ? chatHeader.lastMessage
                : chatHeader.updatedAt == "0001-01-01T00:00:00"
                ? "Napisz pierwszą wiadomość!"
                : "załącznik"}
            </p>
          </div>
          <span className="mobile-small lg:desktop-small text-BLACK-100">
            {chatHeader.updatedAt !== "0001-01-01T00:00:00" &&
              timeAgo(chatHeader.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
