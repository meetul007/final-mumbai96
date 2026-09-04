import "./style.css";
import Story from "./components/Story";
import Zones from "./components/Zones";
import Food from "./components/Food";
import Spirit from "./components/Spirit";
import ExploreCta from "./components/ExploreCta";
import Extraordinary from "./components/Extraordinary";
import HeroKnowMumbai from "./components/HeroKnowMumbai";
import FactsTicker from "./components/FactsTicker";

export const metadata = {
  title: "Know Mumbai — Mumbai96",
  description: "Discover Mumbai through our comprehensive guide — stories, zones, food, spirit, and more about India's most iconic city.",
};

const KnowMumbai = () => {
  return (
    <>
      <HeroKnowMumbai />
      <FactsTicker />
      <Story />
      <Zones />
      <Food />
      <Extraordinary />
      <Spirit />
      <ExploreCta />
    </>
  );
};

export default KnowMumbai;
