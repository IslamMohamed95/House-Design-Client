import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Footer from "../Footer/Footer";
import "./Home.css";

import profile from "../../assets/Home Images/img2.jpg";
import Designs from "../../assets/Home Images/Designs.jpg";

import { useTranslation } from "react-i18next";
import StartComp from "../Swiper/StartComp";
function Home({
  setFilter,
  setProfile,
  setCall,
  contact,
  home,
  setContact,
  setHome,
  setSite,
  setWidth,
  width,
}) {
  const { t } = useTranslation();
  const contactRef = useRef(null);

  useEffect(() => {
    if (home) {
      window.scrollTo(0, 0);
    }
    if (contact) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setHome(false);
  });

  useEffect(() => {
    setWidth(window.innerWidth);
    setContact(false);
    setProfile(false);
    setHome(false);
    setCall(false);
    setSite(false);
  });

  return (
    <motion.section
      id="Home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <div id="Images">
        <StartComp width={width} />
        <motion.a
          href="#second"
          className="iconDown"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          exit={{ x: 0, transition: { delay: 3, duration: 0.5 } }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 0.7 } }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
          >
            scroll
          </motion.p>
          <div>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        </motion.a>
      </div>

      <div
        id="second"
        className={t("NavBar.lang") === "Arabic" ? "Content Dir" : "Content"}
      >
        {t("NavBar.lang") === "English" ? (
          <div>
            <h2>{t("Company.intro.title")}</h2>
            <div className="black">
              <div className="red"></div>
            </div>
            <h4>{t("Home.smallTitle")}</h4>
            <p>
              House Design Company for prefabricated construction is a company
              based in the city of Al Ain and includes a group of professional
              engineers and designers whose practical experience exceeded nine
              years in the supply and installation of prefabricated construction
              and high quality housing units. The scope of the company's work is
              limited to the city of Dubai, Sharjah, Ajman, Abu Dhabi and Its
              affiliated areas are Al Ain and Al Dhafra
            </p>
            <div className="profile">
              <div>
                <Link
                  to="/profile"
                  onClick={() => {
                    setProfile(true);
                  }}
                >
                  <p>
                    Profile <i className="fa-solid fa-angles-right"></i>
                  </p>
                </Link>
              </div>
              <img src={profile} alt="profile" />
            </div>
          </div>
        ) : (
          <div>
            <h2>{t("Company.intro.title")}</h2>
            <div className="black">
              <div className="red"></div>
            </div>
            <p className="arabPara">
              شركة هاوس ديزاين للبناء الجاهز هي شركة مقرها مدينة العيـــــــن و
              تضم نخبة من المهندسين و المصممين المحترفين منذ عام 2006 في
              توريـــــــد و تركيب البنــــاء الجاهز و الوحدات السكنية ذات
              الجودة العالية .يقتصر نطاق عمـــل الشركة في مدينة دبي والشارقة
              وعجمان و أبوظبي و المناطق التابعة لها منطقة العين و الظفرة
            </p>
            <div className="profile">
              <div className={t("NavBar.lang") === "Arabic" ? "Arabic" : ""}>
                <Link to="/profile" onClick={() => setProfile(true)}>
                  <p>
                    {t("Home.profile")}
                    {t("NavBar.lang") === "Arabic" ? (
                      <i className="fa-solid fa-angles-left"></i>
                    ) : (
                      <i className="fa-solid fa-angles-right"></i>
                    )}
                  </p>
                </Link>
              </div>
              <img src={profile} alt="profile" />
            </div>
          </div>
        )}
        <div className="end"></div>
      </div>

      <div className="Job">
        <h2>{t("Home.job")}</h2>
        <div className="black">
          <div className="red"></div>
        </div>
        <div className="categContainer">
          <div className="categ" id="extension">
            <div className="shadow"></div>
            <img src={Designs} alt="Container" />
            <Link to="/designs">
              <p>{t("Home.container")}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="module">
        <h1>{t("Home.modular")}</h1>
        <div className="black">
          <div className="red"></div>
        </div>
        <div className="blockContainer">
          <div className="imageBackground">
            <div className="shadow"></div>
          </div>

          <div
            className={
              t("NavBar.lang") === "Arabic" ? "block blockArab" : "block"
            }
          >
            <div>
              <i className="fa-solid fa-clock-rotate-left"></i>
              <h6>{t("Home.schedule")}</h6>
            </div>

            <p>{t("Home.sechedulePara")}</p>
          </div>
          <div
            className={
              t("NavBar.lang") === "Arabic" ? "block blockArab" : "block"
            }
          >
            <div>
              <i className="fa-solid fa-shield-virus"></i>
              <h6>{t("Home.assurance")}</h6>
            </div>

            <p>{t("Home.costPara")}</p>
          </div>
          <div
            className={
              t("NavBar.lang") === "Arabic" ? "block blockArab" : "block"
            }
          >
            <div>
              <i className="fa-solid fa-screwdriver-wrench"></i>
              <h6>{t("Home.cost")}</h6>
            </div>

            <p>{t("Home.assurancePara")}</p>
          </div>
        </div>
      </div>

      <div className="building">
        <h4>{t("Home.projects")}</h4>
        <div className="black">
          <div className="red"></div>
        </div>
        <div>
          <div>
            <Link to="/projects" onClick={() => setFilter(1)}>
              <i className="fa-solid fa-place-of-worship"></i>
              <h6>{t("Home.country.1")}</h6>
              <p>
                {t("Home.details")} <i className="fa-solid fa-caret-right"></i>
              </p>
            </Link>
          </div>

          <div>
            <Link to="/projects" onClick={() => setFilter(0)}>
              <i className="fa-solid fa-place-of-worship"></i>
              <h6>{t("Home.country.2")}</h6>

              <p>
                {t("Home.details")} <i className="fa-solid fa-caret-right"></i>
              </p>
            </Link>
          </div>

          <div>
            <Link to="/projects" onClick={() => setFilter(2)}>
              <i className="fa-solid fa-place-of-worship"></i>
              <h6>{t("Home.country.3")}</h6>
              <p>
                {t("Home.details")} <i className="fa-solid fa-caret-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={contactRef}
        className={t("NavBar.lang") === "Arabic" ? "Contact Dir" : "Contact"}
      >
        <h4>{t("Contact.headLine")}</h4>
        <div className="black">
          <div className="red"></div>
        </div>
        <form action="mailto:info@housed.ae" method="post" encType="text/plain">
          <div>
            <div className="nameCont">
              <label>{t("Contact.1")}</label>
              <input type="text" required />
            </div>

            <div className="mailCont">
              <label>{t("Contact.2")}</label>
              <input type="mail" required />
            </div>

            <div className="messageCont">
              <label>{t("Contact.3")}</label>
              <textarea required></textarea>
            </div>
          </div>
          <button>{t("Contact.4")}</button>
          <Link to="/profile">
            <button
              className="call"
              onClick={() => {
                setCall(true);
                setContact(false);
              }}
            >
              <i className="fa-solid fa-phone"></i>
            </button>
          </Link>
        </form>
      </div>

      <div className="loc">
        <iframe
          title="Map"
          width="100%"
          height="300px"
          src="https://maps.google.com/maps?q=36-40%20Al%20'Ataya%20St,%20Central%20District%20-%20Abu%20Dhabi&t=&z=15&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>

      <div
        className={
          t("NavBar.lang") === "Arabic" ? "CoData Dir row" : "CoData row"
        }
      >
        <div className="col-6 col-md-3">
          <h5>{t("Home.links.1.1")}</h5>
          <ul className="mt-2">
            <Link to="/designs">
              <li>&#8250; {t("Home.links.1.3")}</li>
            </Link>
          </ul>
        </div>

        <div className="col-6 col-md-3">
          <h5 className="mb-2">
            {t("Home.links.4.1")}
            {t("NavBar.lang") === "Arabic" ? (
              ""
            ) : (
              <span className="d-none d-md-block">&nbsp;House Design</span>
            )}
          </h5>
          <div>
            &nbsp;&nbsp;&nbsp;
            <Link
              to="/"
              onClick={() =>
                contactRef.current.scrollIntoView({ behavior: "smooth" })
              }
              className="contac"
            >
              <i className="fa-solid fa-envelope me-2"></i>
              <span className="text-dark"> {t("Home.links.4.2")}</span>
            </Link>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <h5>{t("Home.links.3.1")}</h5>
          <p className="mt-2 loca">
            <span>{t("Home.links.3.2.1")}</span>
            <br />
            <span>{t("Home.links.3.2.2")}</span>
            <br />
            <span>{t("Home.links.3.2.3")}</span>
          </p>
        </div>

        <div className="col-6 col-md-3">
          <h5 className="mb-2"> {t("Home.links.5.1")}</h5>

          <div className="icons">
            <a href="https://www.facebook.com/housed.ae">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/house.design.ae/">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </motion.section>
  );
}

export default Home;
