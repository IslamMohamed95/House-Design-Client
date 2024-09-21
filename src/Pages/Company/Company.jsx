import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "./Company.css";
import Footer from "../Footer/Footer";
import S_img1 from "../../assets/CompanyProfile/Steel 1.JPG";
import S_img4 from "../../assets/CompanyProfile/Steel 4.jpeg";
import S_img5 from "../../assets/CompanyProfile/Steel 5.jpeg";

import { useTranslation } from "react-i18next";
import { useRef } from "react";

function Company({ call, profile, setProfile, setCall }) {
  const { t } = useTranslation();
  const callRef = useRef(null);

  var progressBar;
  var valueContainer;
  var duration = 20;

  var Eval = [
    {
      Icon: <i className="fa-solid fa-heart"></i>,
      Rate: 95,
      Desc: t("Company.interaction.Desc.1"),
    },
    {
      Icon: <i className="fa-solid fa-face-smile"></i>,
      Rate: 90,
      Desc: t("Company.interaction.Desc.2"),
    },
    {
      Icon: <i className="fa-solid fa-building-shield"></i>,
      Rate: 100,
      Desc: t("Company.interaction.Desc.3"),
    },
  ];

  function startCount(v, ind) {
    var goal = v.dataset.goal;
    let start = 0;
    let progress = setInterval(() => {
      start++;
      v.textContent = `${start}%`;
      progressBar.forEach((b, i) => {
        if (ind === i) {
          b.style.background = `conic-gradient(rgb(255, 195, 29) ${
            start * 3.6
          }deg,
          rgba(226, 226, 226, 0.35) ${start * 3.6}deg`;
          if (start === parseInt(goal)) {
            clearInterval(progress);
          }
        }
      });
    }, duration);
  }

  useEffect(() => {
    if (profile) {
      window.scrollTo(0, 0);
      setProfile(false);
      setCall(false);
    } else if (call) {
      setProfile(false);
      callRef.current.scrollIntoView();
    }

    progressBar = document.querySelectorAll(".progress-cont");
    valueContainer = document.querySelectorAll(".counter");

    valueContainer.forEach((v, i) => startCount(v, i));
  });

  return (
    <motion.section
      className={t("NavBar.lang") === "Arabic" ? "Hello Dir" : "Hello"}
      id="Company"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <div className="splitter">
        <div className="shadow"></div>

        <p className="m-0">
          <Typewriter
            words={[
              t("Home.typeWriter.1"),
              t("Home.typeWriter.2"),
              t("Home.typeWriter.3"),
            ]}
            loop={true}
            cursor={false}
            typeSpeed={80}
            deleteSpeed={80}
            delaySpeed={2000}
          />
        </p>
      </div>

      <div className="ques">
        <h2> {t("Company.question.ques")}</h2>
        <div className="black">
          <div className="red"></div>
        </div>
        <div className="imageCont d-flex justify-content-center">
          <div>
            <img
              className={
                t("NavBar.lang") === "Arabic" ? "img1 imgArabPos1" : "img1"
              }
              src={S_img1}
              alt="pic"
            />
            <img
              className={
                t("NavBar.lang") === "Arabic" ? "img2 imgArabPos2" : "img2"
              }
              src={S_img4}
              alt="pic"
            />
            <img
              className={
                t("NavBar.lang") === "Arabic" ? "img3 imgArabPos3" : "img3"
              }
              src={S_img5}
              alt="pic"
            />
          </div>
        </div>

        <div>
          <p>{t("Company.question.ans")}</p>
        </div>
      </div>

      <div className="warranty">
        <div className="warra-ques">
          <h2>{t("Company.afterService.ques")}</h2>
          <div className="black">
            <div className="red"></div>
          </div>
          <p>
            {t("Company.afterService.ans1")}
            <span>
              {t("Company.afterService.ans2")}
              <br />
              {t("Company.afterService.ans3")}
              <br />
              {t("Company.afterService.ans4")}
            </span>
          </p>
        </div>
      </div>

      <div className="Desc">
        <h2>{t("Company.nav")}</h2>
        <div className="black">
          <div className="red"></div>
        </div>
        <div className="Eval display">
          <div>
            {Eval.map((e, ind) => {
              return (
                <div className="mobView" key={ind}>
                  <div className="progress-cont">
                    {e.Icon}
                    <p data-goal={e.Rate} className="counter">
                      0%
                    </p>
                  </div>
                  <p className="des d-md-none">{e.Desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="Loc display">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=36-40%20Al%20'Ataya%20St,%20Central%20District%20-%20Abu%20Dhabi&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="yes"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>

      <div
        className={t("NavBar.lang") === "Arabic" ? "Owners Dir" : "Owners"}
        ref={callRef}
      >
        <h2>{t("Company.contact")}</h2>
        <div className="black">
          <div className="red"></div>
        </div>
        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center ">
          <div className="CEO ">
            <div>
              <p>{t("Company.Contact.departments.dp1")}</p>
              <div className="salesDep d-flex flex-column">
                <a href="tel:0568320000">0568320000</a>
                <p>{t("Company.Contact.guide")}</p>
              </div>
            </div>
          </div>

          <div className="CEO ">
            <div>
              <p>{t("Company.Contact.departments.dp2")}</p>
              <div className="salesDep d-flex flex-column">
                <a href="tel:0503221792">0503221792</a>
                <a href="tel:0503221702">0503221702</a>
                <a href="tel:0502820927">0502820927</a>
                <a href="tel:0565533221">0565533221</a>
                <p>{t("Company.Contact.guide")}</p>
              </div>
            </div>
          </div>

          <div className="CEO ">
            <div>
              <p>{t("Company.Contact.departments.dp3")}</p>
              <div className="salesDep d-flex flex-column align-items-center">
                <a href="tel:0502183060 ">0502183060</a>
                <p>{t("Company.Contact.guide")}</p>
              </div>
            </div>
          </div>

          <div className="CEO ">
            <div>
              <p>{t("Company.Contact.departments.dp4")}</p>
              <div className="salesDep d-flex flex-column align-items-center">
                <a>037613960</a>
                <p>{t("Company.Contact.guide")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.section>
  );
}

export default Company;
