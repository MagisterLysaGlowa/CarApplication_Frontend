"use client";
import Link from "next/link";
import LogoLight from "../../public/images/logo/logo_light.svg";

//?WEBSITE ICONS
import TtIcon from "../../public/images/footer/tt_icon.svg";
import IgIcon from "../../public/images/footer/ig_icon.svg";
import FbIcon from "../../public/images/footer/fb_icon.svg";
import YtIcon from "../../public/images/footer/yt_icon.svg";

interface FooterLink {
  label: string;
  route: string;
}

const routes: FooterLink[] = [
  { label: "Zlecenie", route: "/zlecenie" },
  { label: "Blog", route: "/blog" },
  { label: "Kontakt", route: "/chce-kupic#contact" },
  { label: "Polityka prywatności", route: "/polityka" },
  { label: "Regulamin serwisu", route: "/regulamin" },
];

const Footer = () => {
  return (
    <footer className="sm:h-[430px] md:h-[400px] bg-[#16151F] w-full flex flex-col px-5 sm:px-20 pb-10">
      <div className="flex-grow flex flex-col">
        <div className="self-center lg:self-start">
          <LogoLight width={140} height={140} />
        </div>
        <div className="flex mt-8 flex-col md:flex-row">
          <div className="md:flex-grow">
            <p
              className="mobile-h6 lg:desktop-h6 text-[#FAF9F6] max-w-[550px] text-center md:text-start"
              style={{ fontWeight: 400 }}
            >
              Daj znam znać o jakim samochodzie marzysz, a nasi eksperci znajda
              właściciela, który posiada YourVehicle
            </p>
          </div>

          <div className="flex gap-10 md:gap-5 md:self-start self-center md:mt-0 mt-5">
            <Link href={"/chce-kupic"}>
              <TtIcon width={35} height={35} />
            </Link>
            <Link href={"/chce-kupic"}>
              <IgIcon width={35} height={35} />
            </Link>
            <Link href={"/chce-kupic"}>
              <YtIcon width={35} height={35} />
            </Link>
            <Link href={"/chce-kupic"}>
              <FbIcon width={35} height={35} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex text-[#FAF9F6] flex-col items-center xl:flex-row">
        <ul className="flex xl:flex-grow items-center footer-list-box">
          {routes.map((item, index) => (
            <li
              key={index}
              style={{
                borderRight:
                  index == routes.length - 1 ? "none" : ".12em solid #454545",
              }}
              className="flex justify-center items-center text-center"
            >
              <Link
                href={item.route}
                className={`mobile-small-supersmall sm:mobile-small  sm:bg-transparent sm:mobile-normal lg:desktop-normal mt-3 sm:mt-0 ${
                  index == 0
                    ? "sm:pr-[1.75rem] pr-[.5rem]"
                    : "sm:px-[1.75rem] px-[.8rem]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mobile-normal lg:desktop-normal mt-5 xl:mt-0 text-center sm:text-start">
          © 2024 YourVehicle Wszelkie prawa zastrzeżone
        </p>
      </div>
    </footer>
  );
};

export default Footer;
