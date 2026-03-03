import React, { useState, useRef, useEffect } from "react";
import WheelIcon from "../../../../public/images/icons/wheel_icon.svg";
import CostIcon from "../../../../public/images/offer/cost_icon.svg";
import ChevronIcon from "../../../../public/images/icons/chevron_icon.svg";
import HeartIcon from "../../../../public/images/icons/heart_icon.svg";
import CarInfoBox from "./CarInfoBox";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

type Props = {
  offer: FullOffer;
  user: any;
  userFavourite: boolean;
  setRefetchData: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfferAccord = (props: Props) => {
  const [messageModalActive, setMessageModalActive] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const accordRef = useRef<HTMLDivElement>(null);
  const { offer, user, userFavourite, setRefetchData } = props;
  const router = useRouter();

  useEffect(() => {
    if (messageModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmounting
    };
  }, [messageModalActive]);

  const addToFavourite = async (userId: number, offerId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/FavouriteUserOffer/add?userId=${userId}&offerId=${offerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      toast.success("Dodano do ulubionych");
    }
    setRefetchData(true);
  };

  const removeToFavourite = async (userId: number, offerId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/FavouriteUserOffer/remove?userId=${userId}&offerId=${offerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      toast.success("Usunięto z ulubionych");
    }
    setRefetchData(true);
  };

  const startConversation = async (sendToId: number) => {
    try {
      if (user.userId == sendToId) {
        setMessageModalActive(false);
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/chats`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user1Id: sendToId,
            user2Id: user.userId,
            offerId: offer.offerId,
          }),
        }
      );

      if (response.status === 404) {
        toast.error("nie wystarczająca ilość kluczyków");
      }

      if (!response.ok) throw new Error("Failed to start conversation");

      if (response.ok) {
        router.refresh();
        setTimeout(() => {
          router.push("/wiadomosci");
        }, 500);
      }
      setMessageModalActive(false);
    } catch (error) {
      console.error("Error starting conversation:", error);
      setMessageModalActive(false);
    }
  };

  // Handle clicks outside the accordion
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accordRef.current &&
        !accordRef.current.contains(event.target as Node) &&
        active
      ) {
        setActive(false);
      }
    };

    // Add event listener when the accordion is active
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  return (
    <div
      ref={accordRef}
      className={`${
        active ? "max-h-[1200px] sm:max-h-[800px]" : "max-h-[80px]"
      } bg-WHITE-100 rounded-[24px] w-full overflow-hidden transition-all duration-1000 sm:duration-700 ease-linear px-3 sm:px-8 pb-10`}
    >
      {messageModalActive && (
        <div className="bg-BLACK-600 opacity-50 w-full z-50 fixed inset-0"></div>
      )}
      {messageModalActive && (
        <div className="flex items-center flex-col justify-center px-10 bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] z-50 h-[550px] sm:h-[450px] fixed translate-y-[-50%] top-1/2 left-1/2 translate-x-[-50%] rounded-[36px]">
          <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-600 text-center">
            Czy na pewno chcesz wysłać swoją ofertę?
          </h2>
          <p className="mobile-normal lg:desktop-normal text-center mt-8">
            Za chwilę wyślesz wiadomość do kupującego w odpowiedzi na jego
            zlecenie. Akceptacja spowoduje pobranie <strong>1 kluczyka</strong>{" "}
            z Twojego konta.
          </p>
          <p className="mobile-normal lg:desktop-normal text-center mt-2">
            To działanie jest jednorazowe – nie będzie możliwości cofnięcia.
          </p>
          <button
            className="text-white aqua-btn w-full !py-5 mt-16"
            onClick={() => {
              startConversation(offer.user.userId);
            }}
          >
            Tak, wyślij ofertę
          </button>
          <button
            className="light-btn w-full !py-5 mt-6 !border-black !text-black"
            onClick={() => {
              setMessageModalActive(false);
            }}
          >
            Anuluj
          </button>
        </div>
      )}
      <header
        className="flex h-[80px] items-center cursor-pointer relative"
        onClick={(e) => {
          e.stopPropagation();
          setActive((prevState) => !prevState);
        }}
      >
        <div className="flex flex-wrap flex-grow gap-y-2">
          <WheelIcon
            width={22}
            height={22}
            className="w-[15px] h-[15px] sm:w-auto sm:h-auto"
          />
          <p className="mobile-small-bold lg:desktop-normal-bold text-BLACK-700 pl-1 sm:pl-5 pr-1 sm:pr-3 mr-2">
            {offer.mark} {offer.model}
          </p>
          <div className="flex flex-grow items-center">
            <CostIcon
              width={22}
              height={22}
              fill="#0066FF"
              className="w-[15px] h-[15px] sm:w-auto sm:h-auto"
            />
            <p className="text-[#2F2F2F] mobile-small lg:desktop-normal ml-2 sm:ml-3">
              Kupię za:
              <span className="text-[#0066FF] font-bold ml-1 sm:ml-2 mobile-small-bold lg:desktop-large-bold">
                {offer.price} zł
              </span>
            </p>
          </div>
        </div>
        <button className="text-[#2F2F2F] mobile-normal lg:desktop-normal flex items-center">
          {active ? (
            <span className="hidden sm:block">Zobacz mniej</span>
          ) : (
            <span className="hidden sm:block">Zobacz więcej</span>
          )}
          <ChevronIcon
            width={24}
            height={24}
            fill="#2F2F2F"
            className={`${
              active ? "rotate-[-180deg]" : "rotate-[0deg]"
            } transition-all duration-700`}
          />
        </button>
      </header>

      <div onClick={(e) => e.stopPropagation()}>
        <hr className="w-full h-[0.12em] bg-WHITE-500" />
        <CarInfoBox car={offer} />
        <div className="flex sm:items-center mt-5 flex-col sm:flex-row gap-y-5">
          <div className="flex-grow flex items-center">
            <div className="w-10 h-10 bg-WHITE-400 rounded-full">
              {offer.user.avatarUrl ? (
                <Image
                  src={
                    offer.user.avatarUrl
                      ? offer.user.avatarUrl.includes("http")
                        ? `${offer.user.avatarUrl}`
                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${offer.user.avatarUrl}`
                      : "/deafult-avatar.png"
                  }
                  alt="avatar"
                  width={180}
                  height={180}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full rounded-full">
                  <span className="text-2xl font-extrabold text-BLACK-300">
                    {offer.user.username[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <p className="mobile-small lg:desktop-small text-[#272727] ml-2">
              Kupujący {offer.user.username}
            </p>
          </div>
          <div
            className={`flex ${
              user != undefined && user.userId == offer.user.userId && "hidden"
            }`}
          >
            {user && (
              <button
                onClick={() => {
                  userFavourite
                    ? removeToFavourite(user.userId, offer.offerId)
                    : addToFavourite(user.userId, offer.offerId);
                }}
                className="light-btn mobile-small-bold lg:desktop-small-bold !px-2 !py-1 !rounded-lg"
              >
                <HeartIcon width={14} height={14} fill="#B8B8B8" />
                <span className="ml-1 text-[#747474]">
                  {userFavourite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                </span>
              </button>
            )}
            {user && (
              <button
                className="bg-AQUA-400 mobile-small-bold lg:desktop-small-bold !px-2 !py-1 !rounded-lg ml-3 !border-[5px] border-AQUA-400"
                onClick={() => {
                  // startConversation(offer.user.userId);
                  setMessageModalActive(true);
                }}
              >
                <span className="text-WHITE-100">
                  Napisz wiadomość: za 1 token
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferAccord;
