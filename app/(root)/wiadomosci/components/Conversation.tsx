import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import "../../../css/scrollbar.css";
import VerifyPopUp from "../../chce-kupic/components/VerifyPopUp";

type Props = {
  conversation: Conversation;
  openedChatId: number;
};

const Conversation = ({ conversation, openedChatId }: Props) => {
  const { messages, user1Id } = conversation;
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resetuj stan popupu przy zmianie konwersacji
  useEffect(() => {
    // Sprawdź czy messages istnieje i czy ma długość 0
    const hasNoMessages = messages && messages.length === 0;

    // Ustaw stan popup na podstawie liczby wiadomości
    setPopUpVisible(hasNoMessages);
  }, [openedChatId, messages]);

  // Osobny efekt do scrollowania, aby nie mieszać logiki
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Funkcja do zamykania popupu
  const handleClosePopUp = () => {
    setPopUpVisible(false);
  };

  return (
    <>
      {popUpVisible && <VerifyPopUp onClose={handleClosePopUp} />}
      <div
        ref={containerRef}
        className="!h-[500px] overflow-y-scroll scrollContainer px-5"
      >
        <div className="flex flex-col gap-5">
          {messages && messages.length > 0 ? (
            messages.map((item, index) => (
              <MessageBox
                key={index}
                message={item}
                side={item.senderId === user1Id ? "buyer" : "seller"}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                Brak wiadomości. Rozpocznij konwersację!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Conversation;
