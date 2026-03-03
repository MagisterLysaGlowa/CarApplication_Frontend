import React from "react";
import WheelIcon from "../../../../public/images/icons/wheel_icon.svg";
import Link from "next/link";
import WarningIcon from "../../../../public/images/icons/warning_icon.svg";
import TrashIcon from "../../../../public/images/icons/trash_icon.svg";
import HeartIcon from "../../../../public/images/icons/heart_icon.svg";

type Props = {
  offerHeader: OfferHeader;
};

const ChatOfferHeader = (props: Props) => {
  const { offerHeader } = props;
  return (
    <header className="flex bg-WHITE-200 py-4 rounded-[16px] md:mx-5">
      <div className="flex flex-grow flex-col xl:flex-row">
        <div className="flex">
          <div className="ml-5 mr-3">
            <WheelIcon width={22} height={22} fill="#000000" />
          </div>
          <p className="mobile-normal-bold lg:desktop-normal-bold text-BLACK-700 xl:border-r-[0.15em] xl:border-WHITE-500 pr-3">
            {offerHeader.mark} {offerHeader.model}
          </p>
        </div>
        <p className="ml-2 xl:ml-0 px-3 mobile-normal lg:desktop-normal text-BLACK-600 xl:border-r-[0.15em] xl:border-WHITE-500">
          Kupujący {offerHeader.ownerName}
        </p>
        {offerHeader.isOwner && (
          <Link
            href={`/moje-zlecenia?offerId=${offerHeader.offerId}`}
            className="ml-2 xl:ml-0 pl-3 mobile-normal lg:desktop-normal text-AQUA-400"
          >
            Zobacz swoje zlecenie
          </Link>
        )}
      </div>
      {/* <div className="flex gap-2 mr-5">
        <HeartIcon width={18} height={18} fill="#B8B8B8" />
        <TrashIcon width={18} height={18} fill="#B8B8B8" />
        <WarningIcon width={18} height={18} fill="#B8B8B8" />
      </div> */}
    </header>
  );
};

export default ChatOfferHeader;
