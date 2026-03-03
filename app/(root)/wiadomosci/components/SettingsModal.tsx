import React, { SetStateAction, useEffect, useState } from "react";
import XIcon from "../../../../public/images/icons/x_icon.svg";
import ChevronIcon from "../../../../public/images/icons/chevron_icon.svg";
import UnlockIcon from "../../../../public/images/icons/unlock_icon.svg";
import RestoreIcon from "../../../../public/images/icons/chevron_icon.svg"; // Załóżmy, że masz taką ikonę, jeśli nie, możesz użyć innej
import Image from "next/image";
import "../../../css/scrollbar.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  settingsModalVisible: boolean;
  setSettingsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
};

const SettingsModal = (props: Props) => {
  const { settingsModalVisible, setSettingsModalVisible, user } = props;
  const [blockedChats, setBlockedChats] = useState<BlockedChatHeaderType[]>([]);
  const [removedChats, setRemovedChats] = useState<RemovedChatHeaderType[]>([]);
  const [modalState, setModalState] = useState<"main" | "blocked" | "removed">(
    "main"
  );
  const router = useRouter();

  const fetchBlockedChats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/blockedChats/${user.userId}`
      );

      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setBlockedChats(data);
    } catch (ex) {}
  };

  const fetchRemovedChats = async () => {
    console.log(user.userId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/RemovedChat/user/${user.userId}`
      );
      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();

      setRemovedChats(data);
    } catch (ex) {}
  };

  useEffect(() => {
    fetchBlockedChats();
    fetchRemovedChats();
  }, [settingsModalVisible]);

  const unblockUserClick = async (
    userId: number,
    blockedUserId: number,
    blockedUserName: string
  ) => {
    // Show loading toast and get its ID
    const toastId = toast.loading(
      `Odblokowywanie użytkownika ${blockedUserName}...`
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/unblockUser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({
            blockingUserId: userId,
            blockedUserId: blockedUserId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to unblock user");

      // On success: dismiss loading toast and show success toast
      toast.dismiss(toastId);
      toast.success(`Użytkownik ${blockedUserName} został odblokowany`);

      router.refresh();
      await fetchBlockedChats();
    } catch (ex) {
      // On error: dismiss loading toast and show error toast
      toast.dismiss(toastId);
      toast.error(`Nie udało się odblokować użytkownika ${blockedUserName}`);
    }
  };

  const restoreChatClick = async (chatId: number) => {
    // Show loading toast and get its ID
    const toastId = toast.loading(
      `Przywracanie czatu z użytkownikiem ${user.username}...`
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/RemovedChat/restore`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            userId: user.userId,
            chatId: chatId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to restore chat");

      // On success: dismiss loading toast and show success toast
      toast.dismiss(toastId);
      toast.success(`Czat z użytkownikiem ${user.username} został przywrócony`);

      router.refresh();
      await fetchRemovedChats();
    } catch (ex) {
      // On error: dismiss loading toast and show error toast
      toast.dismiss(toastId);
      toast.error(
        `Nie udało się przywrócić czatu z użytkownikiem ${user.username}`
      );
    }
  };

  return (
    <>
      {settingsModalVisible && (
        <div
          className="bg-black w-full h-full fixed top-0 left-0 z-[100] opacity-70 overscroll-auto"
          onClick={() => {
            setModalState("main");
            setSettingsModalVisible((prevState) => !prevState);
          }}
        ></div>
      )}
      {settingsModalVisible && (
        <div className="px-24 py-8 bg-white w-full max-w-[800px] h-[500px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[100] rounded-[48px]">
          <button
            className="absolute right-8 top-5 transition-all duration-500 rotate-0 hover:rotate-90"
            onClick={() => {
              setModalState("main");
              setSettingsModalVisible((prevState) => !prevState);
            }}
          >
            <XIcon width={32} height={32} fill="black" />
          </button>

          {modalState != "main" && (
            <button
              className="absolute left-8 top-8 transition-all duration-500 rotate-90"
              onClick={() => {
                setModalState("main");
              }}
            >
              <ChevronIcon width={32} height={32} fill="black" />
            </button>
          )}
          {modalState === "main" && (
            <div className="w-full">
              <h3 className="mobile-h3 desktop-h3 text-center">
                Ustawienia wiadomości
              </h3>
              <div className="flex flex-col gap-y-3 w-full items-start mt-5">
                <button
                  className="aqua-btn w-full"
                  onClick={() => {
                    setModalState("blocked");
                  }}
                >
                  Zablokowani użytkownicy
                </button>
                <button
                  className="aqua-border-btn w-full"
                  onClick={() => {
                    setModalState("removed");
                  }}
                >
                  Archiwum czatów
                </button>
              </div>
            </div>
          )}

          {modalState === "blocked" && (
            <div>
              <h3 className="mobile-h3 desktop-h3">Zablokowani użytkownicy</h3>
              {blockedChats.length < 1 && (
                <p className="text-BLACK-100">
                  Brak zablokowanych użytkowników
                </p>
              )}
              <ul className="mt-5 flex flex-col gap-5 !h-[350px] scrollContainer pr-3">
                {blockedChats.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex w-[50px] h-[50px] justify-center items-center bg-black rounded-full">
                        <Image
                          src={
                            item.avatarUrl
                              ? item.avatarUrl.includes("http")
                                ? `${item.avatarUrl}`
                                : `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.avatarUrl}`
                              : "/deafult-avatar.png"
                          }
                          alt="logo"
                          className="object-cover w-full h-full rounded-full"
                          width={40}
                          height={40}
                        />
                      </div>
                      <h5 className="mobile-h5 desktop-h5 flex-grow">
                        {item.blockedUserName}
                      </h5>
                      <button
                        className="ml-10 bg-green-400 px-5 py-2 rounded-lg flex text-WHITE-100 mobile-small-bold lg:desktop-small-bold gap-2"
                        onClick={() => {
                          unblockUserClick(
                            user.userId,
                            item.blockedUserId,
                            item.blockedUserName
                          );
                        }}
                      >
                        <UnlockIcon width={20} height={20} fill="white" />
                        <span>Odblokuj</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {modalState === "removed" && (
            <div>
              <h3 className="mobile-h3 desktop-h3">Archiwum czatów</h3>
              {removedChats.length < 1 && (
                <p className="text-BLACK-100">Brak zarchiwizowanych czatów</p>
              )}
              <ul className="mt-5 flex flex-col gap-5 !h-[350px] scrollContainer pr-3">
                {removedChats.map((item, index) => {
                  var userData;
                  if (item.chat.user1Id == user.userId) {
                    userData = item.chat.user2;
                  } else {
                    userData = item.chat.user1;
                  }
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-3 flex-wrap"
                    >
                      <div className="flex w-[50px] h-[50px] justify-center items-center bg-WHITE-300 rounded-full">
                        {userData.avatarUrl ? (
                          <Image
                            src={
                              userData.avatarUrl.includes("http")
                                ? `${userData.avatarUrl}`
                                : `${process.env.NEXT_PUBLIC_IMAGE_URL}${userData.avatarUrl}`
                            }
                            alt="avatar"
                            width={180}
                            height={180}
                            className="object-cover w-full h-full rounded-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-14 h-14 rounded-full">
                            <span className="text-3xl font-extrabold text-BLACK-300">
                              {userData.username &&
                                userData.username[0].toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h5 className="mobile-h5 desktop-h5">
                          {userData.username}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          {item.chat.offer.mark} {item.chat.offer.model}
                        </p>
                      </div>
                      <button
                        className="ml-10 bg-green-400 px-5 py-2 rounded-lg flex text-WHITE-100 mobile-small-bold lg:desktop-small-bold gap-2"
                        onClick={() => {
                          restoreChatClick(item.chatId);
                          router.refresh();
                        }}
                      >
                        <span>Przywróć</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SettingsModal;
