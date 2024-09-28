import { Hero, Popular, HowWork, Footer, About } from "../components";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Scenery ";
  }, []);
  return (
    <div className="bg-background flex flex-col  justify-between gap-4">
      <Hero />
      <Popular title={"Top Rated Movies"} />
      <HowWork />
      <Popular title={"Top Rated TV Shows"} tv={true} />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
