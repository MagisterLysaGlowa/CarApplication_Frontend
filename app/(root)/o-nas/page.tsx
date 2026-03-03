import React from "react";
import HeroSection from "./components/HeroSection";
import CarSection from "./components/CarSection";
import WhatWeDoSection from "./components/WhatWeDoSection";
import MeetUsSection from "./components/MeetUsSection";
import MissionSection from "./components/MissionSection";

const AboutUsPage = () => {
  return (
    <main className="bg-[#F3F3F3]">
      <HeroSection />
      <CarSection />
      <WhatWeDoSection />
      <MeetUsSection />
      <MissionSection />
    </main>
  );
};

export default AboutUsPage;
