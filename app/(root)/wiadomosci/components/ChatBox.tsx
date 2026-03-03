"use client";
import React, { useEffect, useState } from "react";
import ChartIcon from "../../../../public/images/icons/chat_icon.svg";
import LockIcon from "../../../../public/images/icons/lock_icon.svg";
import { hubConnection, joinChat, startConnection } from "@/lib/signalrClient";
import ChatOfferHeader from "./ChatOfferHeader";
import Conversation from "./Conversation";
import MessageInput from "./MessageInput";
import { useRouter } from "next/navigation";
import ChatHeader from "./ChatHeader";
import sendMessageEmail from "../email/sendMessageEmail";
import LoadingSpinner from "../../blog/components/LoadingSpinner";

interface Props {
  openedChatId: number | null;
  user: any;
  chatHeaders: ChatHeaderType[];
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox = ({
  openedChatId,
  user,
  setIsConnected,
  chatHeaders,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(false);
  const router = useRouter();
  const updateReadedMessagesStatus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/changeReadedMessagesStatus`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ userId: user.userId, chatId: openedChatId }),
        }
      );
      if (res.ok) {
        router.refresh();
      }
    } catch (ex) {}
  };

  const sendSMStoUser = async (
    chatHeader: ChatHeaderType | undefined,
    user: any
  ) => {
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/userByUserId/${chatHeader?.otherUserId}`
    );
    const userData = await userResponse.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Sms/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: userData.phoneNumber,
        message: `Nowa wiadomość od sprzedającego na yourvehicle.pl! Sprawdź czat – odpowiedź do Twojego poszukiwanego pojazdu czeka.`,
      }),
    });
  };

  useEffect(() => {
    const isFirstMessageAsync = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/firstChatMessage/${openedChatId}`
      );
      const data = await res.json();
      console.log(data);

      setIsFirstMessage(data);
    };
    isFirstMessageAsync();
  }, [openedChatId]);

  // Fetch the initial conversation and messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/chats/${openedChatId}/messages`
        );
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        // Initialize the conversation state with the fetched messages
        await updateReadedMessagesStatus();
        const chatHeader = chatHeaders.find((ch) => ch.chatId == openedChatId);

        //CHECK IF USER IS BLOCKED
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/isBlocked/${chatHeader?.otherUserId}/${user.userId}`
        );
        setIsBlocked(await res.json());

        setCurrentConversation({
          offerHeader: {
            offerId: chatHeader?.offerCarHeaderDto.offerId!,
            isOwner: chatHeader?.offerCarHeaderDto.userId! == user.userId,
            mark: chatHeader?.offerCarHeaderDto.mark!,
            model: chatHeader?.offerCarHeaderDto.model!,
            ownerName: chatHeader?.offerCarHeaderDto.ownerName!,
          }, // Adjust as necessary
          messages: data || [],
          user1Id: user.userId,
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (openedChatId) {
      fetchMessages();
    }
  }, [openedChatId, user.userId]); // Include user.userId as a dependency

  // Setup SignalR connection and join the chat
  useEffect(() => {
    let previousChatId: number | null = null;
    const joinNewChat = async (chatId: number) => {
      if (previousChatId) {
        await hubConnection
          .invoke("LeaveChat", previousChatId.toString())
          .catch((err) => console.error("Error leaving chat:", err));
      }

      await joinChat(chatId).catch((err) =>
        console.error("Error joining chat:", err)
      );

      previousChatId = chatId; // Store the new chat ID
    };

    if (openedChatId) {
      joinNewChat(openedChatId);
    }

    hubConnection.on("ReceiveMessage", async (message: Message) => {
      await updateReadedMessagesStatus();
      setCurrentConversation((prevConversation) => {
        if (prevConversation) {
          return {
            ...prevConversation,
            messages: [...prevConversation.messages, message],
          };
        }
        return prevConversation;
      });
    });

    hubConnection.onclose(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Czekaj 2 sekundy
      await hubConnection.start();
      console.log("SignalR reconnected.");
    });

    return () => {
      hubConnection.off("ReceiveMessage");

      if (previousChatId) {
        hubConnection
          .invoke("LeaveChat", previousChatId.toString())
          .catch((err) => console.error("Error leaving chat on cleanup:", err));
      }
    };
  }, [openedChatId]);

  // Send a new message
  const sendMessage = async (message_arg: string, files: File[]) => {
    const message = {
      content: message_arg, // This is a hardcoded message, you can replace this with actual input
      senderId: user.userId,
      type: 0, // Text type message
      chatId: openedChatId,
    };

    const formData = new FormData();

    formData.append("ChatId", openedChatId!.toString());
    formData.append("SenderId", user.userId.toString());
    formData.append("Type", "0");
    formData.append("Content", message_arg.toString());
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Sending the message to the server (this should also trigger the SignalR broadcast)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/messages`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to send message");
      if (response.ok) {
        if (isFirstMessage) {
          const chatHeader = chatHeaders.find(
            (ch) => ch.chatId == openedChatId
          );
          if (chatHeader && message) {
            sendMessageEmail(
              chatHeader?.otherUserId,
              user,
              "Otrzymałeś nową wiadomość",
              message
            );
            sendSMStoUser(chatHeader, user);
          }
          setIsFirstMessage(false);
        }
        return { data: await response.json() };
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch the initial conversation and messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Resetujemy conversation przed pobraniem nowych danych
        setCurrentConversation(null);
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/chats/${openedChatId}/messages`
        );
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        // Initialize the conversation state with the fetched messages
        await updateReadedMessagesStatus();
        const chatHeader = chatHeaders.find((ch) => ch.chatId == openedChatId);

        //CHECK IF USER IS BLOCKED
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/isBlocked/${chatHeader?.otherUserId}/${user.userId}`
        );
        setIsBlocked(await res.json());

        // Logujemy do konsoli dla diagnostyki
        console.log("Received messages:", data ? data.length : 0);

        setCurrentConversation({
          offerHeader: {
            offerId: chatHeader?.offerCarHeaderDto.offerId!,
            isOwner: chatHeader?.offerCarHeaderDto.userId! == user.userId,
            mark: chatHeader?.offerCarHeaderDto.mark!,
            model: chatHeader?.offerCarHeaderDto.model!,
            ownerName: chatHeader?.offerCarHeaderDto.ownerName!,
          },
          messages: data || [],
          user1Id: user.userId,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    if (openedChatId) {
      fetchMessages();
    }
  }, [openedChatId, user.userId]); // Include user.userId as a dependency

  return (
    <article
      className={`w-full relative bg-white px-4 py-8 md:p-8 rounded-[24px] ${
        !currentConversation && "h-[300px]"
      }`}
    >
      {isBlocked && (
        <div className="absolute w-full h-full z-[80] left-0 top-0">
          <div className="absolute w-full max-w-[800px] h-20 bg-WHITE-300 shadow-xl rounded-2xl bottom-24 left-1/2 translate-x-[-50%] flex flex-col items-center py-2">
            <div className="flex gap-2 items-center">
              <h5 className="mobile-large-bold lg:large-bold text-AQUA-400">
                Zostałeś zablokowany przez tego użytkownika
              </h5>
              <LockIcon
                width={25}
                height={25}
                stroke="#0066FF"
                strokeWidth="2.3"
              />
            </div>
            <p className="mobile-normal lg:desktop-normal text-BLACK-100">
              Twoje wiadomości nie będą wysyłane do użytkownika do momentu aż
              cię odblokuje
            </p>
          </div>
        </div>
      )}
      {loading && (
        <h3 className="desktop-h3 absolute  w-full h-full top-0 left-0">
          <span className="top-1/2 left-1/2 absolute translate-x-[-50%] translate-y-[-50%] items-center flex flex-col">
            {loading && <LoadingSpinner />}
            {loading && (
              <span className="text-AQUA-400 mt-4 mobile-h5 lg:desktop-h5">
                Wczytywanie...
              </span>
            )}
          </span>
        </h3>
      )}
      {openedChatId && currentConversation ? (
        <div className="flex flex-col gap-3">
          <ChatOfferHeader offerHeader={currentConversation.offerHeader} />
          <Conversation
            conversation={currentConversation}
            openedChatId={openedChatId}
          />
          <MessageInput sendMessage={sendMessage} />
        </div>
      ) : (
        <>
          {!loading && (
            <div className="w-full h-full bg-WHITE-200 rounded-[12px] flex justify-center items-center">
              <div className="flex flex-col items-center">
                <ChartIcon width={40} height={40} fill="#0066FF" />
                <p className="text-[#272727] mobile-large-bold lg:desktop-large-bold mt-3 px-3 text-center">
                  Wybierz konwersację, którą chcesz przeczytać
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default ChatBox;
