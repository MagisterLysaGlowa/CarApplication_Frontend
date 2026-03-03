"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import UploadIcon from "../../../../public/images/icons/upload_icon.svg";
import EditIcon from "../../../../public/images/icons/edit_icon.svg";
import ImageUploadModal from "./ImageUploadModal";
import { useRouter } from "next/navigation";
import { getAuth } from "@/app/actions/getAuth";

type Props = {
  user: any;
};

export const dynamic = "force-dynamic";

const ProfileHeader = (props: Props) => {
  const router = useRouter();
  const { user: initialUser } = props;
  const [user, setUser] = useState<any>(initialUser); // Use client-side state
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <>
      <ImageUploadModal
        user={user}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
      <article className="bg-[#FAFAFA] px-10 py-8 flex rounded-[24px] mt-10 sm:flex-row flex-col gap-y-5">
        <div
          className="w-[180px] h-[180px] sm:w-[120px] sm:h-[120px] bg-gray-400 rounded-full self-center flex items-center justify-center group cursor-pointer overflow-hidden"
          onClick={() => setModalActive(true)}
        >
          <UploadIcon
            width={40}
            height={40}
            className="stroke-WHITE-100 group-hover:opacity-100 opacity-0 transition-all duration-500 absolute"
          />
          <Image
            src={
              user?.data?.avatarUrl
                ? user?.data?.avatarUrl.includes("http")
                  ? `${user?.data?.avatarUrl}`
                  : `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.data?.avatarUrl}`
                : "/deafult-avatar.png"
            }
            alt="avatar"
            width={180}
            height={180}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col justify-center gap-y-1 h-full px-6 items-center sm:items-start">
            <p className="mobile-large-bold lg:desktop-large-bold">
              {user?.data?.username || "Guest"}
            </p>
            <p className="mobile-normal lg:desktop-normal text-BLACK-100">
              Mój profil
            </p>
          </div>
        </div>
        {/* <button className="text-[#878787] bg-[#EAEAEA] mobile-normal-bold lg:desktop-normal-bold self-center sm:self-center flex gap-x-2 px-10 py-4 rounded-lg">
          <EditIcon width={22} height={22} />
          Edytuj
        </button> */}
      </article>
    </>
  );
};

export default ProfileHeader;
