import React from "react";

import H_img1 from "../../assets/Home Images/h1.png";
import H_img2 from "../../assets/Home Images/h2.png";
import H_img3 from "../../assets/Home Images/h3.png";
import H_img4 from "../../assets/Home Images/h4.png";

import img1 from "../../assets/Home Images/h1.jpeg";
import img2 from "../../assets/Home Images/h2.jpeg";
import img3 from "../../assets/Home Images/h3.jpeg";
import img4 from "../../assets/Home Images/h4.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";

import "./StartComp.css";
import "swiper/css";
import "swiper/css/bundle";
import { EffectCube, Pagination, Navigation, Autoplay } from "swiper/modules";

const StartComp = ({ width }) => {
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1500}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={false}
        navigation={false}
        modules={[EffectCube, Pagination, Navigation, Autoplay]}
      >
        {width >= 768 ? (
          <React.Fragment>
            <SwiperSlide>
              <img src={img1} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img4} alt="img" />
            </SwiperSlide>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SwiperSlide>
              <img src={H_img1} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={H_img2} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={H_img3} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={H_img4} alt="img" />
            </SwiperSlide>
          </React.Fragment>
        )}
      </Swiper>
    </>
  );
};

export default StartComp;
