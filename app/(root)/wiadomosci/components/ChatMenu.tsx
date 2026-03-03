import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import MenuIcon from "../../../../public/images/icons/menu_icon.svg";
import LockIcon from "../../../../public/images/icons/lock_icon.svg";
import Trash2Icon from "../../../../public/images/icons/trash2_icon.svg";
import MessageIcon from "../../../../public/images/icons/message_icon.svg";
import VolumeIcon from "../../../../public/images/icons/volume_icon.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { set } from "zod";

type Props = {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  chatHeader: ChatHeaderType;
  setOpenedChatId: React.Dispatch<React.SetStateAction<number | null>>;
  openedChatId: number | null;
};

const ChatMenu = (props: Props) => {
  const {
    trigger,
    setTrigger,
    chatHeader,
    user,
    setOpenedChatId,
    openedChatId,
  } = props;
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const ulRefElement = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const router = useRouter();

  // Obsługa zamykania menu po kliknięciu na zewnątrz
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuActive &&
        ulRefElement.current &&
        !ulRefElement.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActive]);

  // Obsługa zamykania menu podczas przewijania
  useEffect(() => {
    const handleScroll = () => {
      if (menuActive) {
        setMenuActive(false);
      }
    };

    // Dodaj nasłuchiwanie na zdarzenie przewijania
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Dodaj nasłuchiwanie na zdarzenie przewijania wewnątrz kontenerów z przewijaniem
    const scrollableContainers = document.querySelectorAll(
      ".overflow-auto, .overflow-y-auto, .overflow-scroll, .overflow-y-scroll"
    );
    scrollableContainers.forEach((container) => {
      container.addEventListener("scroll", handleScroll, { passive: true });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollableContainers.forEach((container) => {
        container.removeEventListener("scroll", handleScroll);
      });
    };
  }, [menuActive]);

  useEffect(() => {
    setMenuActive(false);
  }, [trigger]);

  // Ustalenie pozycji menu
  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.bottom + 10; // 10px pod przyciskiem
      const left = rect.left - 200 + rect.width / 2; // wycentrowane menu na przycisku, z przesunięciem
      setMenuPosition({ top, left });
    }
  };

  const toggleMenu = () => {
    setTrigger((prevState) => !prevState);
    if (!menuActive) {
      updateMenuPosition();
      setTimeout(() => {
        setMenuActive(true);
      }, 50);
    } else {
      setMenuActive(false);
    }
  };

  // Block user mutation with toast notifications
  const blockUserMutation = useMutation({
    mutationFn: async ({
      userId,
      blockedUserId,
    }: {
      userId: number;
      blockedUserId: number;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/blockUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blockingUserId: userId,
            blockedUserId: blockedUserId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to block user");
      }
      return response.json();
    },
    onMutate: () => {
      return toast.loading("Blokowanie użytkownika...");
    },
    onSuccess: (data, variables, toastId) => {
      toast.dismiss(toastId);
      toast.success("Użytkownik został zablokowany");
      router.refresh();
    },
    onError: (error, variables, toastId) => {
      toast.dismiss(toastId);
      toast.error("Nie udało się zablokować użytkownika");
    },
  });

  // Mute user mutation with toast notifications
  const muteUserMutation = useMutation({
    mutationFn: async ({
      userId,
      mutedUserId,
    }: {
      userId: number;
      mutedUserId: number;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/muteUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mutingUserId: userId,
            mutedUserId: mutedUserId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mute user");
      }
      return response.json();
    },
    onMutate: () => {
      return toast.loading("Wyciszanie powiadomień...");
    },
    onSuccess: (data, variables, toastId) => {
      toast.dismiss(toastId);
      toast.success("Powiadomienia zostały wyciszone");
      router.refresh();
    },
    onError: (error, variables, toastId) => {
      toast.dismiss(toastId);
      toast.error("Nie udało się wyciszyć powiadomień");
    },
  });

  // Unmute user mutation with toast notifications
  const unmuteUserMutation = useMutation({
    mutationFn: async ({
      userId,
      mutedUserId,
    }: {
      userId: number;
      mutedUserId: number;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/unmuteUser`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mutingUserId: userId,
            mutedUserId: mutedUserId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unmute user");
      }
      return response.json();
    },
    onMutate: () => {
      return toast.loading("Włączanie powiadomień...");
    },
    onSuccess: (data, variables, toastId) => {
      toast.dismiss(toastId);
      toast.success("Powiadomienia zostały włączone");
      router.refresh();
    },
    onError: (error, variables, toastId) => {
      toast.dismiss(toastId);
      toast.error("Nie udało się włączyć powiadomień");
    },
  });

  useEffect(() => {
    if (ulRefElement.current) {
      ulRefElement.current.classList.add("opacity-0");
      ulRefElement.current.classList.remove("opacity-100");
    }
    setTimeout(() => {
      if (ulRefElement.current) {
        ulRefElement.current.classList.remove("opacity-0");
        ulRefElement.current.classList.add("opacity-100");
      }
    }, 50);
  }, [menuActive]);

  // Block user mutation with toast notifications
  const removeChatMutation = useMutation({
    mutationFn: async ({
      userId,
      chatId,
    }: {
      userId: number;
      chatId: number;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/RemovedChat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            chatId: chatId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove chat");
      }

      if (chatId === openedChatId) {
        setOpenedChatId(null);
      }
      setMenuActive(false);
      return response.json();
    },
    onMutate: () => {
      return toast.loading("Archiwizowanie czatu...");
    },
    onSuccess: (data, variables, toastId) => {
      toast.dismiss(toastId);
      toast.success("Czat został zaarchiwizowany");
      router.refresh();
    },
    onError: (error, variables, toastId) => {
      toast.dismiss(toastId);
      toast.error("Nie udało się zaarchiwizować czatu");
    },
  });

  // Tworzenie portalu dla menu
  const renderMenu = () => {
    if (!menuActive) return null;

    return ReactDOM.createPortal(
      <ul
        ref={ulRefElement}
        style={{
          position: "fixed",
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
          zIndex: 9999,
        }}
        className="flex flex-col gap-5 pl-8 py-8 w-[260px] rounded-xl bg-WHITE-100 border-[0.12em] border-WHITE-400 shadow-lg transition-all duration-200 opacity-0"
      >
        <li
          className="flex gap-3 group/li1 cursor-pointer"
          onClick={() => {
            if (chatHeader.isMuted) {
              unmuteUserMutation.mutate({
                userId: user.userId,
                mutedUserId: chatHeader.otherUserId,
              });
            } else {
              muteUserMutation.mutate({
                userId: user.userId,
                mutedUserId: chatHeader.otherUserId,
              });
            }
          }}
        >
          <VolumeIcon
            className={`group-hover/li1:stroke-AQUA-400 stroke-black transition-all duration-200`}
            width={24}
            height={24}
            strokeWidth="1.5"
          />
          <span className="group-hover/li1:text-AQUA-400 transition-all duration-200">
            {chatHeader.isMuted
              ? "Odcisz powiadomienia"
              : "Wycisz powiadomienia"}
          </span>
        </li>

        {/* <li className="flex gap-3 group/li2 cursor-pointer">
          <MessageIcon
            className={`group-hover/li2:stroke-AQUA-400 stroke-black transition-all duration-200`}
            width={24}
            height={24}
            strokeWidth="1.5"
          />
          <span className="group-hover/li2:text-AQUA-400 transition-all duration-200">
            Zgłoś wiadomość
          </span>
        </li> */}

        <li
          className="flex gap-3 group/li3 cursor-pointer"
          onClick={() => {
            removeChatMutation.mutate({
              userId: user.userId,
              chatId: chatHeader.chatId,
            });
          }}
        >
          <Trash2Icon
            className={`group-hover/li3:stroke-AQUA-400 stroke-black transition-all duration-200`}
            width={24}
            height={24}
            strokeWidth="1.5"
          />
          <span className="group-hover/li3:text-AQUA-400 transition-all duration-200">
            Usuń czat
          </span>
        </li>

        <li
          className="flex gap-3 group/li4 cursor-pointer"
          onClick={() => {
            blockUserMutation.mutate({
              userId: user.userId,
              blockedUserId: chatHeader.otherUserId,
            });
          }}
        >
          <LockIcon
            className={`group-hover/li4:stroke-AQUA-400 transition-all duration-200 stroke-black`}
            width={24}
            height={24}
            strokeWidth="1.5"
          />
          <span className="group-hover/li4:text-AQUA-400 transition-all duration-200">
            Zablokuj
          </span>
        </li>
      </ul>,
      document.body
    );
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`absolute z-[80] ${
          menuActive ? "opacity-100" : "opacity-0"
        } right-16 w-10 h-10 top-1/2 translate-y-[-50%] flex items-center justify-center transition-all duration-200 bg-white rounded-full border-[.12em] border-gray-300 shadow-xl group-hover:opacity-100`}
      >
        <MenuIcon stroke="black" />
      </button>
      {renderMenu()}
    </>
  );
};

export default ChatMenu;
