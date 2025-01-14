import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img src="https://i.ibb.co.com/QFk0BLW/output-3.png" />
      </div>
      <div>
        <img src="https://i.ibb.co.com/xMmr7Hk/output-2.png" />
      </div>
      <div>
        <img src="https://i.ibb.co.com/MD1Q6W4/output.png" />
      </div>
    </Carousel>
  );
};

export default Banner;
