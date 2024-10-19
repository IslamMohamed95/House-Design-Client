import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";
import uniqid from "uniqid";
import AOS from "aos";
import "aos/dist/aos.css";

import "../Projects/Projects.css";

import E1 from "../../assets/Projects/Eissa Rashed/1.jpg";
import E2 from "../../assets/Projects/Eissa Rashed/2.jpg";

import Proj1 from "../../assets/Projects/Mohamed Eissa El-khiely/proj1.jpg";
import ME1 from "../../assets/Projects/Mohamed Eissa El-khiely/1.jpg";
import ME2 from "../../assets/Projects/Mohamed Eissa El-khiely/2.jpg";
import ME3 from "../../assets/Projects/Mohamed Eissa El-khiely/3.jpg";

import Proj2 from "../../assets/Projects/Eida El-Meherby/Proj2.jpg";
import ELM1 from "../../assets/Projects/Eida El-Meherby/1.jpg";
import ELM2 from "../../assets/Projects/Eida El-Meherby/2.jpg";
import ELM3 from "../../assets/Projects/Eida El-Meherby/3.jpg";
import ELM4 from "../../assets/Projects/Eida El-Meherby/4.jpg";

import Proj3 from "../../assets/Projects/Saeed Hamad/Proj3.jpg";
import SH1 from "../../assets/Projects/Saeed Hamad/1.jpg";
import SH2 from "../../assets/Projects/Saeed Hamad/2.jpg";
import SH3 from "../../assets/Projects/Saeed Hamad/3.jpg";
import SH4 from "../../assets/Projects/Saeed Hamad/4.jpg";
import SH5 from "../../assets/Projects/Saeed Hamad/5.jpg";
import SH6 from "../../assets/Projects/Saeed Hamad/6.jpg";
import SH7 from "../../assets/Projects/Saeed Hamad/7.jpg";

import Proj4 from "../../assets/Projects/Malek El-Amry/Proj4.jpg";
import MEL1 from "../../assets/Projects/Malek El-Amry/1.jpg";
import MEL2 from "../../assets/Projects/Malek El-Amry/2.jpg";
import MEL3 from "../../assets/Projects/Malek El-Amry/3.jpg";
import MEL4 from "../../assets/Projects/Malek El-Amry/4.jpg";
import MEL5 from "../../assets/Projects/Malek El-Amry/5.jpg";
import MEL6 from "../../assets/Projects/Malek El-Amry/6.jpg";
import MEL7 from "../../assets/Projects/Malek El-Amry/7.jpg";
import MEL8 from "../../assets/Projects/Malek El-Amry/8.jpg";

import Proj5 from "../../assets/Projects/Akel ElHady/Proj5.jpg";
import AEL1 from "../../assets/Projects/Akel ElHady/1.jpg";
import AEL2 from "../../assets/Projects/Akel ElHady/2.jpg";
import AEL3 from "../../assets/Projects/Akel ElHady/3.jpg";
import AEL4 from "../../assets/Projects/Akel ElHady/4.jpg";
import AEL5 from "../../assets/Projects/Akel ElHady/5.jpg";
import AEL6 from "../../assets/Projects/Akel ElHady/6.jpg";
import AEL7 from "../../assets/Projects/Akel ElHady/7.jpg";

import Proj6 from "../../assets/Projects/Hashem Company/Proj6.jpg";
import HC1 from "../../assets/Projects/Hashem Company/1.jpg";
import HC2 from "../../assets/Projects/Hashem Company/2.jpg";
import HC3 from "../../assets/Projects/Hashem Company/3.jpg";

import Proj7 from "../../assets/Projects/Ahmed El-Farsy/7.jpg";
import img7 from "../../assets/Projects/Ahmed El-Farsy/1.jpg";
import img2 from "../../assets/Projects/Ahmed El-Farsy/2.jpg";
import img3 from "../../assets/Projects/Ahmed El-Farsy/3.jpg";
import img4 from "../../assets/Projects/Ahmed El-Farsy/4.jpg";
import img5 from "../../assets/Projects/Ahmed El-Farsy/5.jpg";
import img6 from "../../assets/Projects/Ahmed El-Farsy/6.jpg";
import img1 from "../../assets/Projects/Ahmed El-Farsy/7.png";

import Proj8 from "../../assets/Projects/Abdallah Elzaaby/Proj8.jpg";
import AEZ1 from "../../assets/Projects/Abdallah Elzaaby/1.jpg";
import AEZ2 from "../../assets/Projects/Abdallah Elzaaby/2.jpg";
import AEZ3 from "../../assets/Projects/Abdallah Elzaaby/3.jpg";
import AEZ4 from "../../assets/Projects/Abdallah Elzaaby/4.jpg";
import AEZ5 from "../../assets/Projects/Abdallah Elzaaby/5.jpg";

import Proj9 from "../../assets/Projects/Sief El-Mansory/Proj9.jpg";
import SELM1 from "../../assets/Projects/Sief El-Mansory/1.jpg";
import SELM2 from "../../assets/Projects/Sief El-Mansory/2.jpg";

import Proj10 from "../../assets/Projects/Ahmed Bin Ghalita/Proj10.jpg";
import BNGha1 from "../../assets/Projects/Ahmed Bin Ghalita/1.jpg";
import BNGha2 from "../../assets/Projects/Ahmed Bin Ghalita/2.jpg";

import Proj11 from "../../assets/Projects/Mohamed Alhemeri/Proj11.jpg";
import MohElH1 from "../../assets/Projects/Mohamed Alhemeri/1.jpg";

import Proj12 from "../../assets/Projects/Osman Alflasi/Proj12.jpg";
import OsAlf1 from "../../assets/Projects/Osman Alflasi/1.jpg";

import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Projects({ filt, setFilter, setSite, site }) {
  const { t } = useTranslation();
  const [projNumber, setProjNumber] = useState({ id: null, img_id: null });
  var [imgEle, setImgEle] = useState([]);

  var Filters = [t("Home.country.2"), t("Home.country.1"), t("Home.country.3")];
  var projName = [
    {
      id: 0,
      img_id: 1,
      interaction: false,
      Pic: Proj1,
      Loc: t("Projects.projectDesc.1.Loc"),
      Area: t("Projects.projectDesc.1.Area"),
      Desc: t("Projects.projectDesc.1.Desc"),
    },

    {
      id: 1,
      img_id: 1,
      interaction: false,
      Pic: Proj2,
      Loc: t("Projects.projectDesc.2.Loc"),
      Area: t("Projects.projectDesc.2.Area"),
      Desc: t("Projects.projectDesc.2.Desc"),
    },
    {
      id: 0,
      img_id: 2,
      interaction: false,
      Pic: Proj3,
      Loc: t("Projects.projectDesc.3.Loc"),
      Area: t("Projects.projectDesc.3.Area"),
      Desc: t("Projects.projectDesc.3.Desc"),
    },
    {
      id: 0,
      img_id: 3,
      interaction: false,
      Pic: Proj4,
      Loc: t("Projects.projectDesc.4.Loc"),
      Area: t("Projects.projectDesc.4.Area"),
      Desc: t("Projects.projectDesc.4.Desc"),
    },
    {
      id: 1,
      img_id: 2,
      interaction: false,
      Pic: Proj5,
      Loc: t("Projects.projectDesc.5.Loc"),
      Area: t("Projects.projectDesc.5.Area"),
      Desc: t("Projects.projectDesc.5.Desc"),
    },
    {
      id: 1,
      img_id: 3,
      interaction: false,
      Pic: Proj6,
      Loc: t("Projects.projectDesc.6.Loc"),
      Area: t("Projects.projectDesc.6.Area"),
    },
    {
      id: 0,
      img_id: 4,
      interaction: false,
      Pic: Proj7,
      Loc: t("Projects.projectDesc.7.Loc"),
      Area: t("Projects.projectDesc.7.Area"),
      Desc: t("Projects.projectDesc.7.Desc"),
    },
    {
      id: 1,
      img_id: 4,
      interaction: false,
      Pic: Proj8,
      Loc: t("Projects.projectDesc.8.Loc"),
      Area: t("Projects.projectDesc.8.Area"),
      Desc: t("Projects.projectDesc.8.Desc"),
    },
    {
      id: 1,
      img_id: 5,
      interaction: false,
      Pic: Proj9,
      Loc: t("Projects.projectDesc.9.Loc"),
      Area: t("Projects.projectDesc.9.Area"),
      Desc: t("Projects.projectDesc.9.Desc"),
    },
    {
      id: 1,
      img_id: 6,
      interaction: false,
      Pic: E1,
      Loc: t("Projects.projectDesc.10.Loc"),
      Area: t("Projects.projectDesc.10.Area"),
      Desc: t("Projects.projectDesc.10.Desc"),
    },

    {
      id: 2,
      img_id: 1,
      interaction: false,
      Pic: Proj10,
      Loc: t("Projects.projectDesc.11.Loc"),
      Area: t("Projects.projectDesc.11.Area"),
      Desc: t("Projects.projectDesc.11.Desc"),
    },

    {
      id: 2,
      img_id: 2,
      interaction: false,
      Pic: Proj11,
      Loc: t("Projects.projectDesc.12.Loc"),
      Area: t("Projects.projectDesc.12.Area"),
      Desc: t("Projects.projectDesc.12.Desc"),
    },
    {
      id: 2,
      img_id: 3,
      interaction: false,
      Pic: Proj12,
      Loc: t("Projects.projectDesc.13.Loc"),
      Area: t("Projects.projectDesc.13.Area"),
      Desc: t("Projects.projectDesc.13.Desc"),
    },
  ];
  var projPics = [
    { images: { ME1, ME2, ME3 }, F_id: 0, img_id: 1 },
    { images: { ELM1, ELM2, ELM3, ELM4 }, F_id: 1, img_id: 1 },
    { images: { SH1, SH2, SH3, SH4, SH5, SH6, SH7 }, F_id: 0, img_id: 2 },
    {
      images: { MEL1, MEL2, MEL3, MEL4, MEL5, MEL6, MEL7 },
      MEL8,
      F_id: 0,
      img_id: 3,
    },
    {
      images: { AEL1, AEL2, AEL3, AEL4, AEL5, AEL6, AEL7 },
      F_id: 1,
      img_id: 2,
    },
    { images: { HC1, HC2, HC3 }, F_id: 1, img_id: 3 },
    {
      images: { img1, img2, img3, img4, img5, img6, img7 },
      F_id: 0,
      img_id: 4,
    },
    { images: { AEZ1, AEZ2, AEZ3, AEZ4, AEZ5 }, F_id: 1, img_id: 4 },
    { images: { SELM1, SELM2 }, F_id: 1, img_id: 5 },
    { images: { E1, E2 }, F_id: 1, img_id: 6 },
    { images: { BNGha1, BNGha2 }, F_id: 2, img_id: 1 },
    { images: { MohElH1 }, F_id: 2, img_id: 2 },
    { images: { OsAlf1 }, F_id: 2, img_id: 3 },
  ];

  const [projectDis, setProjectDis] = useState(false);

  const handleEstimate = (e, Id, ImgId, interaction) => {
    if (Id === projNumber.id && ImgId === projNumber.img_id) {
      if (e.target.className === "d-none d-md-flex fa-regular fa-heart") {
        e.target.className = "d-none d-md-flex fa-solid fa-heart";
      } else {
        e.target.className = "d-none d-md-flex fa-regular fa-heart";
      }
    }
  };

  const checkFilter = async (e) => {
    const { innerHTML } = e.target;
    if (innerHTML === "Al Ain" || innerHTML === "مدينة العين") {
      setFilter(0);
    } else if (innerHTML === "Abu Dhabi" || innerHTML === "أبو ظبي") {
      setFilter(1);
    } else if (innerHTML === "Dubai" || innerHTML === "دبي") {
      setFilter(2);
    } else {
      setFilter();
    }
  };

  const viewProject = async (ID, imgID) => {
    await setProjNumber({ id: ID, img_id: imgID });
    let projcollec = [];
    projPics.map(async (proj) => {
      if (proj.F_id === ID && proj.img_id === imgID) {
        for (const i in proj.images) {
          projcollec.push(proj.images[i]);
        }
        await setImgEle(projcollec);
      }
    });
    setProjectDis(true);
  };

  useEffect(() => {
    if (site) {
      window.scrollTo(0, 0);
    }
  });

  return (
    <motion.section
      className={t("NavBar.lang") === "Arabic" ? "Projects Dir" : "Projects"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <h1>{t("Projects.headLine")}</h1>
      <div className="black">
        <div className="red"></div>
      </div>
      <p>{t("Projects.content")}</p>
      <div className="filter" onClick={(e) => checkFilter(e)}>
        {Filters.map((f, i) => {
          return (
            <button
              key={i}
              className={i === filt ? "activeFilter" : undefined}
              onClick={() => setFilter(i)}
            >
              {f}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        <motion.div className="row ProjCont" layout={true} key={uniqid()}>
          {projName
            .filter((proj) => {
              if (filt === undefined) {
                return projName;
              } else {
                return proj.id === filt;
              }
            })
            .map((proj, i) => {
              return (
                <motion.div className=" col-12 projHolder mb-4 me-4" key={i}>
                  <img src={proj.Pic} alt="1" />
                  <div>
                    <i
                      className="fa-solid fa-image"
                      onClick={() => viewProject(proj.id, proj.img_id)}
                    ></i>
                    <p onClick={() => viewProject(proj.id, proj.img_id)}>
                      {t("Projects.details")}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </AnimatePresence>

      <div className={projectDis ? "ProjData activeProj" : "ProjData"}>
        <div>
          <i
            className="d-none d-md-flex fa-solid fa-xmark"
            onClick={() => setProjectDis(false)}
          ></i>

          <Carousel variant="dark" indicators={false} fade>
            {imgEle.length > 0
              ? imgEle.map((img, ind) => {
                  return (
                    <Carousel.Item className="pics" key={ind}>
                      <img src={img} alt="pic" />
                    </Carousel.Item>
                  );
                })
              : ""}
          </Carousel>

          {projName.map((proj, ind) => {
            if (
              projNumber.id === proj.id &&
              projNumber.img_id === proj.img_id
            ) {
              return (
                <div className="imgData" key={ind}>
                  <div>
                    <ul>
                      {t("NavBar.lang") === "Arabic" ? (
                        <React.Fragment>
                          <li>الموقع: {proj.Loc}</li>
                          <li>المساحة : {proj.Area} &#13217; </li>
                          {proj.Desc ? <li>الوصف: {proj.Desc}</li> : ""}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <li>Site: {proj.Loc}</li>
                          <li>Area : {proj.Area} &#13217; </li>
                          {proj.Desc ? <li>Description: {proj.Desc}</li> : ""}
                        </React.Fragment>
                      )}
                    </ul>

                    <i
                      className="d-flex d-md-none fa-regular fa-heart"
                      onClick={handleEstimate(ind)}
                    ></i>
                  </div>

                  <button
                    className="d-md-none"
                    onClick={() => setProjectDis(false)}
                  >
                    {t("Projects.back.1")}
                  </button>
                  <i
                    className="d-none d-md-flex fa-regular fa-heart"
                    onClick={(e) =>
                      handleEstimate(e, proj.id, proj.img_id, proj.interaction)
                    }
                  ></i>
                </div>
              );
            }
          })}
        </div>
      </div>

      <Footer />
    </motion.section>
  );
}

export default Projects;
