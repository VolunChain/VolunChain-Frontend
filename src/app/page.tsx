"use client";

import Footer from "@/components/Footer";
import StartSection from "@/components/landing-page-components/StartSection";
import OurMission from "@/components/landing-page-components/OurMission";
import HeroSection from "@/components/landing-page-components/HeroSection";
import SocialMediaSection from '@/components/landing-page-components/SocialSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <OurMission />
      <StartSection />
      <SocialMediaSection />
    </>
  );
}
