import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import OverView from "./OverView";
import TourAndTravel from "./TourAndTravel/TourAndTravel";

const Home = () => {
  return (
    <div className="flex flex-col pb-4">
      <Helmet>
        <title>Homes | Travel-Sphere</title>
      </Helmet>
      <Banner></Banner>
      <OverView></OverView>
      <TourAndTravel></TourAndTravel>
    </div>
  );
};

export default Home;
