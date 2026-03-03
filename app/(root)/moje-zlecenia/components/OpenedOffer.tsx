import React from "react";
import XIcon from "../../../../public/images/icons/x_icon.svg";
import FormIcon from "../../../../public/images/icons/form_icon.svg";
import { daysUntilEnd } from "@/lib/utils";
import CarInfoBox from "../../zlecenia/components/CarInfoBox";
import Image from "next/image";
import Link from "next/link";

type Props = {
  openedOffer: FullOffer | null;
  setOpenedOffer: React.Dispatch<React.SetStateAction<FullOffer | null>>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenedOffer = (props: Props) => {
  const { openedOffer, setModalActive } = props;
  return (
    <div>
      <div className="bg-WHITE-100 rounded-[24px] p-5 sm:p-8">
        <div className="bg-WHITE-200 w-full h-full p-5 sm:p-10">
          {openedOffer != null && (
            <header className="flex md:flex-row flex-col border-b-2 border-BLACK-100 py-8 mb-5">
              <div className="flex items-center flex-grow sm:flex-row flex-col">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-14 md:h-14 bg-WHITE-300 rounded-full">
                  {openedOffer?.user.avatarUrl ? (
                    <Image
                      src={
                        openedOffer?.user.avatarUrl.includes("http")
                          ? `${openedOffer?.user.avatarUrl}`
                          : `${process.env.NEXT_PUBLIC_IMAGE_URL}${openedOffer?.user.avatarUrl}`
                      }
                      alt="avatar"
                      width={180}
                      height={180}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full rounded-full">
                      <span className="text-2xl font-extrabold text-BLACK-300">
                        {openedOffer?.user.username &&
                          openedOffer?.user.username[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-BLACK-700 mobile-small-bold sm:mobile-large-bold md:desktop-normal sm:mt-0 mt-3 sm:ml-3 text-center">
                  {openedOffer?.user.username}
                </p>
              </div>
              <div className="flex gap-3 md:flex-row flex-col md:mt-0 mt-5">
                {daysUntilEnd(openedOffer.endDate) > 0 ? (
                  <span className="bg-AQUA-100 text-AQUA-400 mobile-small sm:mobile-normal lg:desktop-normal flex justify-center items-center px-2 py-3 md:py-0 rounded-lg">
                    Koniec za {daysUntilEnd(openedOffer.endDate)} dni
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-500 mobile-small sm:mobile-normal lg:desktop-normal flex justify-center items-center px-2 py-3 md:py-0 rounded-lg">
                    Zakończono
                  </span>
                )}
                <button
                  className="mobile-small sm:mobile-normal aqua-btn !rounded-lg !py-3 md:!py-0"
                  onClick={() => {
                    setModalActive(true);
                  }}
                >
                  Odśwież zlecenie
                </button>
                <Link
                  className="mobile-small sm:mobile-normal aqua-border-btn !py-3 md:!py-0 !rounded-lg"
                  href={`/edytuj-zlecenie/${openedOffer.offerId}`}
                >
                  Edytuj
                </Link>
                <button
                  className="bg-BLACK-100 mobile-small sm:mobile-normal py-3 text-WHITE-100 flex justify-center items-center py-0 px-[0.6rem] rounded-lg"
                  onClick={() => {
                    props.setOpenedOffer(null);
                  }}
                >
                  <XIcon
                    width={23}
                    height={23}
                    fill="#FFFFFF"
                    className="md:block hidden"
                  />
                  <span className="md:hidden block">Zamknij</span>
                </button>
              </div>
            </header>
          )}
          {openedOffer ? (
            <CarInfoBox car={openedOffer} />
          ) : (
            <div className="text-center flex items-center flex-col">
              <div className="w-20 h-20 rounded-full bg-WHITE-400 flex justify-center items-center">
                <FormIcon width={35} height={35} fill="#0066FF" />
              </div>
              <h5 className="mobile-h5 lg:desktop-h5 mt-5">Wybierz zlecenie</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenedOffer;
