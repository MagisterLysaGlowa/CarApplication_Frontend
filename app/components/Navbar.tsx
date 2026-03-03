"use client";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import Logo from "../../public/images/logo/logo.svg";
import { usePathname, useRouter } from "next/navigation";
import NavbarDropdown from "./NavbarDropdown";
import Image from "next/image";
import { hubConnection, startConnection } from "@/lib/signalrClient";
import ChevronIcon from "../../public/images/icons/chevron_icon.svg";
import HamburgerIcon from "../../public/images/icons/hamburger_icon.svg";
import KeyIcon from "../../public/images/icons/key_icon.svg";
import { useAuth } from "../providers/AuthProvider ";
import MessageIcon from "../../public/images/icons/message_chat.svg";

interface NavLink {
  label: string;
  route: string;
}

interface Props {
  user: any | null;
}

const Navbar = (props: Props) => {
  const [burgerMenuActive, setBurgerMenuActive] = useState<boolean>(false);
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any | null>(props.user);
  const [tokensCount, setTokensCount] = useState<number>(0);
  const [tokenDropdownActive, setTokenDropdownActive] =
    useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  const StarIcon: React.FC = () => {
    return <KeyIcon width={20} height={20} />;
  };

  // Ensure state updates when props change
  useEffect(() => {
    if (props.user) {
      setCurrentUser(props.user);
      const fetchTokens = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Token/${props.user.userId}`
        );
        const tokens: string = await res.text();
        setTokensCount(Number(tokens));
      };
      fetchTokens();
    }
  }, [props.user]);

  // Add client-side auth verification
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // If we don't have a user but should be logged in
        if (!currentUser && localStorage.getItem("isLoggedIn") === "true") {
          // Fetch user data client-side
          const response = await fetch("/api/auth/me");
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
          } else {
            // Clear login state if API returns error
            localStorage.removeItem("isLoggedIn");
          }
        }
      } catch (error) {
        console.error("Auth verification error:", error);
      }
    };

    verifyAuth();
  }, [pathname, currentUser]);

  useEffect(() => {
    setBurgerMenuActive(false);
    setDropdownActive(false);
  }, [pathname]);

  useEffect(() => {
    const checkNewMessages = async () => {
      if (currentUser) {
        const result: boolean = await fetchNewMessages(currentUser.userId);
        setNewMessage(result);
      }
    };

    if (currentUser) {
      checkNewMessages();

      const setupConnection = async () => {
        if (pathname != "/wiadomosci") {
          if (hubConnection.state === "Disconnected") {
            await startConnection();
          } else if (hubConnection.state !== "Connected") {
            await hubConnection.stop();
            await startConnection();
          }
        }
      };

      setupConnection();

      if (!hubConnection) return;

      hubConnection.on(
        "NewMessageNotification",
        async (chatId: string, messageId: string) => {
          await Notify(currentUser.userId);
          router.refresh();
        }
      );

      hubConnection.on(
        "NewMessageSoundNotification",
        async (chatId: string, messageId: string) => {
          if (audioRef.current) {
            if (audioRef.current.paused || audioRef.current.ended) {
              await audioRef.current.play();
            }
          }
          router.refresh();
        }
      );

      return () => {
        hubConnection.off("NewMessageNotification");
        hubConnection.off("NewMessageSoundNotification");
      };
    }
  }, [currentUser, pathname]);

  // Routes array
  const routes: NavLink[] = [
    { label: "Chce kupić", route: "/chce-kupic" },
    { label: "Chce sprzedać", route: "/chce-sprzedac" },
    { label: "O nas", route: "/o-nas" },
    { label: "Blog", route: "/blog" },
    { label: "Zlecenia", route: "/zlecenia" },
  ];

  const fetchNewMessages = async (userId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/anyNewMessage/${userId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return false;
    }
  };

  const Notify = async (userId: number) => {
    try {
      const result: boolean = await fetchNewMessages(userId);
      setNewMessage(result);
    } catch (error) {
      console.error("Notification error:", error);
    }
  };

  // Helper function to store login state
  const markLoggedIn = () => {
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <>
      <div className="h-[80px] lg:h-[100px] block lg:hidden pb-2"></div>
      <audio ref={audioRef} src="/sound/notify.mp3" />
      <nav className="flex items-center w-full px-3 2xl:px-12 h-[80px] lg:h-[100px] bg-WHITE-100 lg:relative fixed z-[100] top-0 shadow-md">
        <Link href={"/chce-kupic"} className="sm:block hidden">
          <Logo width={90} height={90} />
        </Link>
        <Link href={"/chce-kupic"} className="sm:hidden block">
          <Logo width={60} height={60} />
        </Link>
        <ul className="ml-12 gap-4 xl:gap-10 flex-grow hidden 2xl:flex">
          {routes.map((item, index) => (
            <li key={index}>
              <Link
                href={item.route}
                className="mobile-normal xl:desktop-normal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {props.user && (
          <div className="relative 2xl:hidden flex w-full justify-center">
            <div
              className="text-AQUA-400 font-bold flex gap-1 items-center mx-5 bg-WHITE-300 px-5 py-2 rounded-xl cursor-pointer"
              onClick={() => {
                setTokenDropdownActive((prevState) => !prevState);
              }}
            >
              <StarIcon />
              <span className="translate-y-[-2px]">{tokensCount}</span>
            </div>
            {tokenDropdownActive && (
              <div
                className="w-full h-full fixed inset-0 z-[80]"
                onClick={() => {
                  setTokenDropdownActive(false);
                }}
              ></div>
            )}
            <Link
              href={"/pakiety"}
              onClick={() => {
                setTokenDropdownActive(false);
              }}
              className={`absolute shadow-md bg-WHITE-100 left-1/2 translate-x-[-50%] z-[100] top-[0px] min-w-[200px] flex px-5 py-3 rounded-xl items-center justify-center gap-2 ${
                tokenDropdownActive
                  ? "translate-y-[80px] opacity-100"
                  : "translate-y-[0px] opacity-0 z-[-1] pointer-events-none"
              } transition-all duration-700`}
            >
              <span className="translate-y-[-2px] font-normal text-BLACK-600">
                Doładuj kluczyki
              </span>
              <StarIcon />
            </Link>
          </div>
        )}

        {props.user && props.user.userId && (
          <div className="bg-WHITE-300 px-4 py-4 rounded-full 2xl:hidden block mr-4">
            <Link
              className="flex gap-3 items-center hover:text-AQUA-400 group"
              href={"/wiadomosci"}
            >
              <div className="relative">
                <div
                  className={`absolute w-2 h-2 bg-red-500 rounded-full top-[-2px] right-[-10px] ${
                    newMessage ? "flex" : "hidden"
                  }`}
                ></div>
                <span
                  className={`mobile-normal lg:desktop-normal transition-all duration-300  ${
                    pathname == "/wiadomosci" && "text-AQUA-400"
                  }`}
                >
                  <MessageIcon
                    width={24}
                    height={24}
                    stroke="red"
                    strokeWidth="1.5"
                  />
                </span>
              </div>
            </Link>
          </div>
        )}

        <div className="flex-grow justify-end flex 2xl:hidden">
          <button
            className="flex flex-col gap-[9px] w-[40px] h-[30px]"
            onClick={() => setBurgerMenuActive((prevState) => !prevState)}
          >
            <div
              className={`bg-AQUA-400 w-full h-[6px] flex transition-transform duration-300 rounded-full ${
                burgerMenuActive ? "rotate-45 translate-y-[0.9rem]" : ""
              }`}
            ></div>
            <div
              className={`bg-AQUA-400 w-full h-[6px] flex transition-opacity duration-200 rounded-full ${
                burgerMenuActive ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`bg-AQUA-400 w-full h-[6px] flex transition-transform duration-300 rounded-full ${
                burgerMenuActive ? "-rotate-45 -translate-y-3" : ""
              }`}
            ></div>
          </button>
        </div>

        <ul
          className={`absolute top-[80px] z-50 bg-WHITE-200 w-full left-0 flex flex-col 2xl:hidden transition-all duration-300 pb-10 ${
            burgerMenuActive ? "translate-x-[0px]" : "translate-x-[-1800px]"
          }`}
        >
          {currentUser && (
            <div className="gap-3 relative min-w-[250px] flex px-5 mt-5 pb-5 border-b-1">
              {dropdownActive && (
                <NavbarDropdown
                  setdropdownActive={setDropdownActive}
                  dropdownActive={dropdownActive}
                  newMessage={newMessage}
                  onLogout={() => setCurrentUser(null)}
                />
              )}
              <div className="w-14 h-14 bg-WHITE-300 rounded-full">
                {currentUser.avatarUrl ? (
                  <Image
                    src={
                      currentUser.avatarUrl.includes("http")
                        ? `${currentUser.avatarUrl}`
                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${currentUser.avatarUrl}`
                    }
                    alt="avatar"
                    width={180}
                    height={180}
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-14 h-14 rounded-full">
                    <span className="text-3xl font-extrabold text-BLACK-300">
                      {currentUser.username &&
                        currentUser.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="relative cursor-pointer">
                <p
                  className="mobile-normal-bold lg:desktop-normal-bold cursor-pointer"
                  onClick={() => {
                    setDropdownActive((prevState) => !prevState);
                  }}
                >
                  {currentUser.username}
                </p>
                <Link
                  href={"/profil"}
                  className="text-BLACK-100 mobile-small lg:desktop-small"
                >
                  Mój profil
                </Link>
                <ChevronIcon
                  width={30}
                  height={30}
                  className={`${
                    dropdownActive && "rotate-180"
                  } black absolute right-[-50px] top-[-6px] cursor-pointer transition-all duration-500`}
                  fill="black"
                  onClick={() => {
                    setDropdownActive((prevState) => !prevState);
                  }}
                />
              </div>
            </div>
          )}

          {routes.map((item, index) => (
            <li key={index} className={`transition-all duration-500`}>
              <Link
                href={item.route}
                className="mobile-normal md:desktop-normal flex justify-center items-center h-14 border-b-2 text-AQUA-400"
                style={{ fontWeight: 700 }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {!currentUser && (
            <>
              <Link
                href={`/signIn?callback=${pathname}`}
                className="mobile-normal md:desktop-normal flex justify-center items-center h-14 border-b-2 text-AQUA-400"
                style={{ fontWeight: 700 }}
                onClick={markLoggedIn}
              >
                Zaloguj się
              </Link>
              <Link
                href={"/register"}
                className="mobile-normal md:desktop-normal flex justify-center items-center h-14 border-b-2 text-AQUA-400"
                style={{ fontWeight: 700 }}
              >
                Załóż konto
              </Link>
            </>
          )}
          {currentUser && currentUser.userId != null && (
            <div className={`flex flex-col transition-all duration-500`}>
              <Link
                href={"/zlecenie"}
                className="aqua-btn !px-3 xl:!px-6 my-3 mt-8 mx-5 max-w-[300px] self-center"
              >
                + Dodaj bezpłatnie zlecenie
              </Link>
            </div>
          )}
        </ul>

        {!currentUser && (
          <div className="gap-5 hidden 2xl:flex">
            <Link
              href={`/signIn?callback=${pathname}`}
              className="aqua-btn !px-3 xl:!px-4"
              onClick={markLoggedIn}
            >
              Zaloguj się
            </Link>
            <Link href={"/register"} className="aqua-border-btn !px-3 xl:!px-4">
              Załóż konto
            </Link>
          </div>
        )}

        {currentUser && currentUser.userId != null && (
          <>
            <div className="relative 2xl:block hidden">
              <div
                className="text-AQUA-400 font-bold flex gap-1 items-center mx-5 bg-WHITE-300 px-5 py-2 rounded-xl cursor-pointer "
                onClick={() => {
                  setTokenDropdownActive((prevState) => !prevState);
                }}
              >
                <StarIcon />
                <span className="translate-y-[-2px]">{tokensCount}</span>
              </div>
              {tokenDropdownActive && (
                <div
                  className="w-full h-full fixed inset-0"
                  onClick={() => {
                    setTokenDropdownActive(false);
                  }}
                ></div>
              )}
              <Link
                href={"/pakiety"}
                onClick={() => {
                  setTokenDropdownActive(false);
                }}
                className={`absolute shadow-md bg-WHITE-100 left-1/2 translate-x-[-50%] top-[0px] min-w-[200px] flex px-5 py-3 rounded-xl items-center justify-center gap-2 ${
                  tokenDropdownActive
                    ? "translate-y-[80px] opacity-100"
                    : "translate-y-[0px] opacity-0 z-[-1] pointer-events-none"
                } transition-all duration-700`}
              >
                <span className="translate-y-[-2px] font-normal text-BLACK-600">
                  Doładuj kluczyki
                </span>
                <StarIcon />
              </Link>
            </div>
            {props.user && props.user.userId && (
              <div className="bg-WHITE-300 px-4 py-4 rounded-full 2xl:block hidden mr-4">
                <Link
                  className="flex gap-3 items-center hover:text-AQUA-400 group"
                  href={"/wiadomosci"}
                >
                  <div className="relative">
                    <div
                      className={`absolute w-2 h-2 bg-red-500 rounded-full top-[-2px] right-[-10px] ${
                        newMessage ? "flex" : "hidden"
                      }`}
                    ></div>
                    <span
                      className={`mobile-normal lg:desktop-normal transition-all duration-300  ${
                        pathname == "/wiadomosci" && "text-AQUA-400"
                      }`}
                    >
                      <MessageIcon
                        width={24}
                        height={24}
                        stroke="red"
                        strokeWidth="1.5"
                      />
                    </span>
                  </div>
                </Link>
              </div>
            )}
            <div className="hidden gap-3 relative min-w-[180px] xl:min-w-[250px] 2xl:flex">
              <ChevronIcon
                width={20}
                height={20}
                className={`black absolute right-[-5px] top-[2px] cursor-pointer transition-all duration-500 ${
                  dropdownActive && "rotate-180"
                }`}
                fill="black"
                onClick={() => {
                  setDropdownActive((prevState) => !prevState);
                }}
              />
              {dropdownActive && (
                <NavbarDropdown
                  setdropdownActive={setDropdownActive}
                  dropdownActive={dropdownActive}
                  newMessage={newMessage}
                  onLogout={() => setCurrentUser(null)}
                />
              )}
              <div className="w-14 h-14 bg-WHITE-300 rounded-full">
                {currentUser.avatarUrl ? (
                  <Image
                    src={
                      currentUser.avatarUrl.includes("http")
                        ? `${currentUser.avatarUrl}`
                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${currentUser.avatarUrl}`
                    }
                    alt="avatar"
                    width={180}
                    height={180}
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-14 h-14 rounded-full">
                    <span className="text-3xl font-extrabold text-BLACK-300">
                      {currentUser.username &&
                        currentUser.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <p
                  className="mobile-normal-bold lg:desktop-normal-bold cursor-pointer"
                  onClick={() => {
                    setDropdownActive((prevState) => !prevState);
                  }}
                >
                  {currentUser.username}
                </p>
                <Link
                  href={"/profil"}
                  className="text-BLACK-100 mobile-small lg:desktop-small"
                >
                  Mój profil
                </Link>
              </div>
            </div>
            <Link
              href={"/zlecenie"}
              className="aqua-btn !px-3 xl:!px-6 ml-5 2xl:!flex !hidden mobile-small lg:desktop-small"
            >
              + Dodaj bezpłatnie zlecenie
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
