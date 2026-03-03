"use client";
import React, { useState } from "react";
import XIcon from "../../../../public/images/icons/x_icon.svg";
import FormIcon from "../../../../public/images/icons/form_icon.svg";
import { daysUntilEnd } from "@/lib/utils";
import CarInfoBox from "../../zlecenia/components/CarInfoBox";
import Image from "next/image";
import HeartIconSvg from "../../../../public/images/icons/heart_icon.svg";
import WheelIconSvg from "../../../../public/images/offer/wheel_icon.svg";
import CostIconSvg from "../../../../public/images/offer/cost_icon.svg";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
type Props = {
  openedOffer: FullOffer | null;
  user: any;
  setRefetchData: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenedOffer: React.Dispatch<React.SetStateAction<FullOffer | null>>;
};

const OpenedOffer = (props: Props) => {
  const { openedOffer, user, setRefetchData, setOpenedOffer } = props;
  const [messageModalActive, setMessageModalActive] = useState<boolean>(false);
  const router = useRouter();

  const HeartIcon: React.FC = () => {
    return <HeartIconSvg fill="#E75A5D" width={18} height={18} />;
  };
  const WheelIcon: React.FC = () => {
    return <WheelIconSvg fill="black" width={22} height={22} />;
  };
  const CostIcon: React.FC = () => {
    return <CostIconSvg fill="#0066FF" width={22} height={22} />;
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
      setRefetchData(true);
      setOpenedOffer(null);
    }
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
            offerId: openedOffer?.offerId,
          }),
        }
      );

      if (response.status === 404) {
        toast.error("nie wystarczająca ilość kluczyków");
      }

      if (response.ok) {
        router.push("/wiadomosci");
      }

      if (!response.ok) throw new Error("Failed to start conversation");
      setMessageModalActive(false);
    } catch (error) {
      console.error("Error starting conversation:", error);
      setMessageModalActive(false);
    }
  };

  return (
    <div>
      {messageModalActive && (
        <div className="bg-BLACK-600 opacity-50 w-full z-50 h-[2000px] absolute top-0 left-0 flex"></div>
      )}
      {messageModalActive && (
        <div className="flex items-center flex-col justify-center px-10 bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] z-50 h-[450px] fixed translate-y-[-50%] top-1/2 left-1/2 translate-x-[-50%] rounded-[36px]">
          <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-600 text-center">
            Czy napewno chcesz.....?
          </h2>
          <p className="mobile-normal lg:desktop-normal text-center mt-8">
            To właśnie tutaj pojawią się oferty od potencjalnych sprzedawców w
            odpowiedzi na Twoje zlecenie. Pamiętaj, akceptacja spowoduje
            pobranie waluty z twojego konta.
          </p>
          <button
            className="text-white aqua-btn w-full !py-5 mt-16"
            onClick={() => {
              if (openedOffer) {
                startConversation(openedOffer?.user.userId);
              }
            }}
          >
            Tak, podejmij akcje
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
      <div className="bg-WHITE-100 rounded-[24px] py-5 sm:py-10 px-5 sm:p-8">
        <div className="bg-WHITE-200 w-full h-full pb-5 px-3 sm:p-10">
          {openedOffer != null && (
            <header className="flex md:flex-row flex-col border-b-2 border-BLACK-100 py-8 mb-5">
              <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-y-0 gap-y-3 ml-1 sm:ml-0">
                <div className="flex gap-2">
                  <WheelIcon />
                  <h5 className="sm:border-r-[.15em] border-WHITE-500 pr-3 mr-3 translate-y-[-2px] font-bold text-BLACK-600">
                    {openedOffer.mark} {openedOffer.model}
                  </h5>
                </div>
                <div className="flex gap-2">
                  <CostIcon />
                  <p className=" translate-y-[-2px] ">
                    Kupię za:{" "}
                    <span className="text-AQUA-400 font-bold">
                      {openedOffer.price} zł
                    </span>
                  </p>
                </div>
              </div>
            </header>
          )}
          {openedOffer ? (
            <CarInfoBox car={openedOffer} />
          ) : (
            <div className="text-center flex items-center flex-col pt-5">
              <div className="w-20 h-20 rounded-full bg-WHITE-400 flex justify-center items-center">
                <FormIcon width={35} height={35} fill="#0066FF" />
              </div>
              <h5 className="mobile-h5 lg:desktop-h5 mt-5">Wybierz zlecenie</h5>
            </div>
          )}
          {openedOffer && (
            <div className="mt-8 flex md:flex-row flex-col flex-wrap gap-y-5">
              <div className="flex gap-x-3 items-center">
                <div className="w-10 h-10 border-[0.12em] border-WHITE-300 rounded-full">
                  {openedOffer.user.avatarUrl ? (
                    <Image
                      src={
                        openedOffer.user.avatarUrl
                          ? openedOffer.user.avatarUrl.includes("http")
                            ? `${openedOffer.user.avatarUrl}`
                            : `${process.env.NEXT_PUBLIC_IMAGE_URL}${openedOffer.user.avatarUrl}`
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
                        {openedOffer.user.username[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-BLACK-600 mobile-normal lg:desktop-normal !font-extralight">
                  Kupujący {openedOffer?.user.username}
                </p>
              </div>

              <div className="flex gap-4 flex-grow justify-center sm:justify-end flex-wrap">
                <button
                  onClick={() => {
                    removeToFavourite(user.userId, openedOffer.offerId);
                  }}
                  className="flex justify-center items-center flex-grow sm:flex-grow-0 gap-2 text-[#E75A5D] border-[.12em] border-[#E75A5D] mobile-small sm:mobile-normal-bold lg:desktop-normal-bold rounded-lg px-3 py-2"
                >
                  <HeartIcon />
                  <span className="translate-y-[-2px]">Usuń z ulubionych</span>
                </button>

                <button
                  className="aqua-btn !px-3 !py-2 flex-grow sm:flex-grow-0 !rounded-lg mobile-small sm:mobile-normal-bold lg:desktop-normal-bold"
                  onClick={() => setMessageModalActive(true)}
                >
                  Napisz wiadomość za: 1 token
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenedOffer;
