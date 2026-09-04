import Community from "@/components/Home/Community";
import Explorer from "@/components/Home/Explorer";
import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import Pillars from "@/components/Home/Pillars";
import Pulse from "@/components/Home/Pulse";
import SearchBar from "@/components/Home/SearchBar";
import Ticker from "@/components/Home/Ticker";
import Tourist from "@/components/Home/Tourist";
import Spotlight from "@/components/Home/Spotlight";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <SearchBar />
      <Pillars />
      <Explorer />
      <Community />
      {/* <Pulse /> */}
      <Tourist />
      <Spotlight />
    </>
  );
}
