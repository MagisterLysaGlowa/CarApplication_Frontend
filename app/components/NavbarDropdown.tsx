"use client";
import Link from "next/link";
import React from "react";
import ProfileIcon from "../../public/images/navbar/profile_icon.svg";
import MessageIcon from "../../public/images/navbar/message_icon.svg";
import CarIcon from "../../public/images/navbar/car_icon.svg";
import DolarIcon from "../../public/images/navbar/dollar_icon.svg";
import HeartIcon from "../../public/images/navbar/heart_icon.svg";
import LogoutIcon from "../../public/images/navbar/logout_icon.svg";
import SettingsIcon from "../../public/images/navbar/setting_icon.svg";
import CartIcon from "../../public/images/icons/cart.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logoutUser } from "../actions/logoutUser";

interface Props {
  newMessage: boolean;
  onLogout: () => void; // Add callback prop for handling logout
  setdropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownActive: boolean;
}

const NavbarDropdown = ({
  newMessage,
  onLogout,
  setdropdownActive,
  dropdownActive,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();

    // Clear localStorage
    localStorage.removeItem("isLoggedIn");

    // Call the callback to update parent component state
    onLogout();

    // Navigate to login page
    router.push("/signIn");
  };

  return (
    <>
      <div
        className="fixed inset-0 top-0 left-0 w-full h-full opacity-30  z-[40]"
        onClick={() => {
          setdropdownActive(false);
        }}
      ></div>
      <div className=" absolute animate-appearance-in  left-0 top-[65px] w-full  flex flex-col gap-3 sm:gap-y-5 py-5 sm:py-10 px-2 sm:px-3 z-[50] min-w-[220px]">
        <div className="w-full  bg-WHITE-100 border-[.12em] border-[#D3D3D3] rounded-[12px] flex flex-col gap-3 sm:gap-y-3 py-3 sm:py-10 px-6 z-[50] min-w-[220px]">
          {/* All existing links */}
          <Link
            className="flex gap-3 items-center hover:text-AQUA-400 group"
            href={"/profil"}
          >
            <ProfileIcon
              width={24}
              height={24}
              stroke="black"
              strokeWidth="1.5"
              className={`group-hover:stroke-AQUA-400   transition-all duration-300 ${
                pathname == "/profil" && "stroke-AQUA-400"
              }`}
            />
            <span
              className={`mobile-normal lg:desktop-normal transition-all duration-300 ${
                pathname == "/profil" && "text-AQUA-400"
              }`}
            >
              Profil
            </span>
          </Link>

          <Link
            className="flex gap-3 items-center hover:text-AQUA-400 group"
            href={"/moje-zlecenia"}
          >
            <CarIcon
              width={24}
              height={24}
              stroke="black"
              strokeWidth="1.5"
              className={`group-hover:stroke-AQUA-400   transition-all duration-300 ${
                pathname == "/moje-zlecenia" && "stroke-AQUA-400"
              }`}
            />
            <span
              className={`mobile-normal lg:desktop-normal transition-all duration-300 ${
                pathname == "/moje-zlecenia" && "text-AQUA-400"
              }`}
            >
              Moje zlecenia
            </span>
          </Link>

          <Link
            className="flex gap-3 items-center hover:text-AQUA-400 group"
            href={"/pakiety"}
          >
            <DolarIcon
              width={24}
              height={24}
              stroke="black"
              strokeWidth="1.5"
              className={`group-hover:stroke-AQUA-400   transition-all duration-300 ${
                pathname == "/pakiety" && "stroke-AQUA-400"
              }`}
            />
            <span
              className={`mobile-normal lg:desktop-normal transition-all duration-300 ${
                pathname == "/pakiety" && "text-AQUA-400"
              }`}
            >
              Kup tokeny
            </span>
          </Link>

          <Link
            className="flex gap-3 items-center hover:text-AQUA-400 group"
            href={"/zapisane-zlecenia"}
          >
            <HeartIcon
              width={24}
              height={24}
              stroke="black"
              strokeWidth="1.5"
              className={`group-hover:stroke-AQUA-400   transition-all duration-300 ${
                pathname == "/zapisane-zlecenia" && "stroke-AQUA-400"
              }`}
            />
            <span
              className={`mobile-normal lg:desktop-normal transition-all duration-300 ${
                pathname == "/zapisane-zlecenia" && "text-AQUA-400"
              }`}
            >
              Zapisane oferty
            </span>
          </Link>

          <Link
            className="flex gap-3 items-center hover:text-AQUA-400 group"
            href={"/koszyk"}
          >
            <CartIcon
              width={24}
              height={24}
              stroke="black"
              fill="black"
              strokeWidth="0"
              className={`group-hover:stroke-AQUA-400 group-hover:fill-AQUA-400  transition-all duration-300 ${
                pathname == "/koszyk" && "fill-AQUA-400"
              }`}
            />
            <span
              className={`mobile-normal lg:desktop-normal  transition-all duration-300 ${
                pathname == "/koszyk" && "text-AQUA-400"
              }`}
            >
              Koszyk
            </span>
          </Link>

          <hr className="w-full h-[0.12em] bg-WHITE-300 my-1 sm:my-3" />

          <button
            className="flex gap-3 items-center hover:text-AQUA-400 group"
            onClick={handleLogout}
          >
            <LogoutIcon
              width={24}
              height={24}
              stroke="black"
              strokeWidth="1.5"
              className={`group-hover:stroke-AQUA-400   transition-all duration-300 ${
                pathname == "/logout" && "stroke-AQUA-400"
              }`}
            />
            <span
              className={`mobile-normal lg:desktop-normal transition-all duration-300 ${
                pathname == "/logout" && "text-AQUA-400"
              }`}
            >
              Wyloguj się
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarDropdown;
