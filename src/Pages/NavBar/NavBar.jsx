import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../NavBar/NavBar.css";
import { t } from "i18next";

import Logo from "../../assets/Logo/Logo.png";

function NavBar({ setChange, setLoading, setContact, setHome, setProfile }) {
  const Redirectors = [
    {
      data: (
        <Link
          className="li"
          to="/profile"
          onClick={() => {
            setProfile(true);
          }}
        >
          {t("Home.services")}
        </Link>
      ),
    },
    {
      data: (
        <Link
          to="/"
          className="li"
          onClick={() => {
            setContact(true);
            setHome(false);
          }}
        >
          {t("Home.call")}
        </Link>
      ),
    },
    {
      data: (
        <Link
          to="/projects"
          onClick={() => {
            setContact(false);
            setProfile(false);
          }}
        >
          {t("Home.sites")}
        </Link>
      ),
    },
  ];

  const [activeLang, setActiveLang] = useState(false);
  const [activeNav, setActiveNav] = useState(false);

  const { i18n } = useTranslation();

  const handleLang = async (lang) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    if (t("NavBar.lang") === "Arabic") {
      await setChange(true);
    } else {
      await setChange("false");
    }
    i18n.changeLanguage(lang);
  };

  return (
    <motion.nav
      id="Nav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <div className="navData">
        <div className="navIcon">
          <i
            onClick={() => setActiveNav(!activeNav)}
            className={
              activeNav
                ? "d-md-none fa-solid fa-xmark"
                : "d-md-none fa-solid fa-bars"
            }
          ></i>
        </div>

        <ul className="listTab d-none d-md-flex">
          {Redirectors.map((r, i) => {
            return <li key={i}>{r.data}</li>;
          })}
          <div className="area">
            <i className="fa-solid fa-globe"></i>
            <div className="lang-Cont">
              <div className="lang">
                <span onClick={() => setActiveLang(!activeLang)}>
                  {t("NavBar.city")}
                </span>
                <i
                  className="fa-solid fa-caret-down text-danger"
                  onClick={() => setActiveLang(!activeLang)}
                ></i>
              </div>
              <p> {t("NavBar.lang")}</p>
            </div>
          </div>
        </ul>
      </div>
      <div className="logoData">
        <Link
          to="/"
          onClick={() => {
            setHome(true);
            setContact(false);
          }}
          className="d-flex align-items-center"
        >
          <img src={Logo} id="CoLogo" alt="logo" />
          <p>
            {t("Logo.name1")}
            <span> {t("Logo.name2")}</span>
            <br />
            <span>{t("Logo.field")}</span>
          </p>
        </Link>
      </div>

      <ul
        className={
          activeLang ? "langList activeLang d-none d-md-flex" : "langList"
        }
      >
        <li
          onClick={() => {
            handleLang("ar");
            setActiveLang(false);
          }}
        >
          Arabic
        </li>
        <hr />
        <li
          onClick={() => {
            handleLang("en");
            setActiveLang(false);
          }}
        >
          English
        </li>
      </ul>

      <div
        className={
          activeNav ? "mobContainer activeMobContainer" : "mobContainer"
        }
      >
        <ul
          className={
            activeNav ? "mobNav d-md-none activeList" : "mobNav d-md-none"
          }
        >
          <Link to="/projects">
            <li onClick={() => setActiveNav(false)}>{t("Home.sites")}</li>
          </Link>
          <Link to="/profile">
            <li onClick={() => setActiveNav(false)}>{t("Home.services")}</li>
          </Link>
          <Link to="/">
            <li
              onClick={() => {
                setActiveNav(false);
                setContact(true);
              }}
            >
              {t("Home.call")}
            </li>
          </Link>

          <li className="langL">
            <i className="fa-solid fa-globe"></i>
            <div className="long-Cont">
              <div className="lang">
                <span onClick={() => setActiveLang(!activeLang)}>
                  {t("NavBar.city")}
                </span>
                <i
                  className="fa-solid fa-caret-down text-danger"
                  onClick={() => setActiveLang(!activeLang)}
                ></i>
              </div>
              <p> {t("NavBar.lang")}</p>
            </div>
          </li>

          <ul
            className={
              activeLang
                ? "langMobList activeMobList d-flex d-md-none"
                : "langMobList"
            }
          >
            <li
              onClick={() => {
                setActiveLang(false);
                handleLang("ar");
                setActiveNav(false);
              }}
            >
              Arabic
            </li>
            <hr />
            <li
              onClick={() => {
                setActiveLang(false);
                handleLang("en");
                setActiveNav(false);
              }}
            >
              English
            </li>
          </ul>
        </ul>
      </div>
    </motion.nav>
  );
}

export default NavBar;
