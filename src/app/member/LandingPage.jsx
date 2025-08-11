import React from "react";
import MemberProfile from "./MemberProfile";
import HeroSection from "./HeroSection";
import StepsToStart from "./StepsToStart";

function LandingPage() {
  return (
    <div className="p-6 mt-4">
      <HeroSection />
      <StepsToStart />
      <MemberProfile />
    </div>
  );
}

export default LandingPage;
