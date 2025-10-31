import LamaNavbar from "@/components/Navbar/navbar";
import Image from "next/image";
import HeroSection from "./Herosection/page";
import StatsPage from "./statspage/page";
import ImpactsPage from "./ImpactsPage/page";
import AboutSection from "./Aboutsection/page";
import BlogsPage from "./blogssection/page";
import LamaFooter from "@/components/Footer/footer";
import ResearchQuestionsSection from "./researchquestions/page";

export default function Home() {
  return (
    <>
      <LamaNavbar />
      <HeroSection />
      <AboutSection />
      {/* <StatsPage /> */}
      <ResearchQuestionsSection />
      <ImpactsPage />
      <BlogsPage />
      <LamaFooter />
    </>
  );
}
