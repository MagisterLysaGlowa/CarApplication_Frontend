import Image from "next/image";
import WelcomeHero from "../../public/images/welcome_hero.webp";
import LogoLight from "../../public/images/logo/logo_light.svg";

const Hero = () => {
  return (
    <div className="w-full min-h-[350px] sm:h-[450px] lg:h-full relative">
      <Image
        src={WelcomeHero}
        alt="welcome hero image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 rounded-[45px]"
      />
      <LogoLight
        width={230}
        height={140}
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px] h-[60px] lg:w-[240px] lg:h-[140px]"
      />
    </div>
  );
};

export default Hero;
