import { Helmet } from "react-helmet-async";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Homes | Travel-Sphere
                </title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;