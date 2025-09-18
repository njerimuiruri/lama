import LamaNavbar from "@/components/Navbar/navbar";
import Image from "next/image";
import HeroSection from "./Herosection/page";
import AboutPage from "./About/page";
import StatsPage from "./statspage/page";
import ImpactsPage from "./ImpactsPage/page";

export default function Home() {
  return (
    <>
      <LamaNavbar />
      <HeroSection />
      <AboutPage />
      <StatsPage />
      <ImpactsPage />
    </>
  );
}
