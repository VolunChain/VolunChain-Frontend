"use client";

import StatsSection from "@/features/landing-page/components/StatsSection";
import OurMission from "@/features/landing-page/components/OurMission";
import HeroSection from "@/features/landing-page/components/HeroSection";
import SocialMediaSection from "@/features/landing-page/components/SocialSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <OurMission />
      <StatsSection />
      <SocialMediaSection />
    </div>
  );
}
