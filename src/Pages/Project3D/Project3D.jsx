import React, { useEffect } from "react";
import "./Project3D.css";
import { useTranslation } from "react-i18next";
import img1 from "../../assets/3D/img1.jpeg";
import img2 from "../../assets/3D/img2.jpeg";
import img3 from "../../assets/3D/img3.jpeg";
import img4 from "../../assets/3D/img4.jpeg";
import img5 from "../../assets/3D/img5.jpeg";
import img6 from "../../assets/3D/img6.jpeg";
import img7 from "../../assets/3D/img7.jpeg";
import img8 from "../../assets/3D/img8.jpeg";
import img9 from "../../assets/3D/img9.jpeg";
import img10 from "../../assets/3D/img10.jpeg";
import img11 from "../../assets/3D/img11.jpeg";
import img12 from "../../assets/3D/img12.jpeg";
import img13 from "../../assets/3D/img13.jpeg";
import img14 from "../../assets/3D/img14.jpeg";
import img15 from "../../assets/3D/img15.jpeg";
import img16 from "../../assets/3D/img16.jpeg";
import img17 from "../../assets/3D/img17.jpeg";
import img18 from "../../assets/3D/img18.jpeg";
import img19 from "../../assets/3D/img19.jpeg";
import img20 from "../../assets/3D/img20.jpeg";
import Footer from "../Footer/Footer";
function Project3D() {
  const { t } = useTranslation();
  let images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <section id="Designs">
      <h1>{t("Designs.headLine")}</h1>
      <div className="black">
        <div className="red"></div>
      </div>
      <h4>{t("Designs.subHeadLine")}</h4>
      <div className="row">
        {images.map((img) => {
          return (
            <img
              src={img}
              alt="img"
              data-aos="zoom-out-up"
              data-aos-duration="750"
              className="col-12 col-md-6 img-fluid"
            />
          );
        })}
      </div>
      <Footer />
    </section>
  );
}
export default Project3D;
