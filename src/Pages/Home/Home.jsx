import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import OverView from "./OverView";
import StorySectionHome from "./TourAndTravel/StorySectionHome";
import ExtraTwoSection from "./ExtraTwoSection";
import ExtraOneSection from "./ExtraOneSection";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Homes | Travel-Sphere</title>
      </Helmet>
      <Banner></Banner>
      <OverView></OverView>
      {/* <TourAndTravel></TourAndTravel> */}
      <StorySectionHome></StorySectionHome>
      <ExtraOneSection></ExtraOneSection>
      <ExtraTwoSection></ExtraTwoSection>
    </div>
  );
};

export default Home;
