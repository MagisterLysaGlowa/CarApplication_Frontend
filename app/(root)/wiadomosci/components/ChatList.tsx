import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import HourGlassIcon from "../../../../public/images/icons/hour_glass_icon.svg";
import StarChristmasIcon from "../../../../public/images/icons/star_christmas_icon.svg";
import { getAuth } from "@/app/actions/getAuth";

type Props = {
  newMessages: boolean;
  chatHeaders: ChatHeaderType[];
  setOpenedChatId: React.Dispatch<React.SetStateAction<number | null>>;
  openedChatId: number | null;
  setChatSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatList = (props: Props) => {
  const {
    newMessages,
    chatHeaders,
    setOpenedChatId,
    openedChatId,
    setChatSidebarActive,
  } = props;
  const [user, setUser] = useState<any>({});
  const [trigger, setTrigger] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const user = await getAuth();
      setUser(user?.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* {trigger && (
        <div
          onClick={() => {
            setTrigger((prevState) => !prevState);
          }}
          className="w-full h-[1450px] bg-transparent fixed z-[100] left-[-500px] top-[-400px]"
        ></div>
      )} */}
      <h6 className="mobile-h6 lg:desktop-h6 text-[#272727]">
        <span className="relative">
          {newMessages ? "Nieprzeczytane" : "Przeczytane"}
          {newMessages && chatHeaders.length > 0 && (
            <span className="mobile-small lg:desktop-small absolute right-[-30px] bg-AQUA-400 rounded-md h-full items-center top-0 flex px-2 text-WHITE-100">
              {chatHeaders.length}
            </span>
          )}
        </span>
      </h6>
      {chatHeaders.length > 0 ? (
        <div className="flex flex-col gap-1 mt-3">
          {chatHeaders
            .slice() // robimy kopię tablicy, żeby nie mutować oryginału
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((item, index) => (
              <ChatHeader
                trigger={trigger}
                setTrigger={setTrigger}
                setChatSidebarActive={setChatSidebarActive}
                openedChatId={openedChatId}
                chatHeader={item}
                key={index}
                newMessages={newMessages}
                setOpenedChatId={setOpenedChatId}
                user={user}
              />
            ))}
        </div>
      ) : newMessages ? (
        <div className="bg-WHITE-200 flex items-center justify-start pl-5 py-5 rounded-lg mt-3">
          <StarChristmasIcon width={25} height={25} fill="#0066FF" />
          <p className="text-BLACK-700 mobile-normal lg:desktop-normal ml-2">
            Jesteś na bieżąco 😃
          </p>
        </div>
      ) : (
        <div className="bg-WHITE-200 flex items-center justify-center py-5 rounded-lg mt-3">
          <HourGlassIcon width={25} height={25} />
          <p className="text-BLACK-700 mobile-normal lg:desktop-normal ml-2">
            Niedługo otrzymasz wiadomość
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
