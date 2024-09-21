import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { logout } from "../../../connection/service";

import "./DashNav.css";

function DashNav({ exit, setExit }) {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  return (
    <section id="dashNav" className="d-lg-none">
      {exit ? (
        ""
      ) : (
        <React.Fragment>
          <div>
            <Link to="/board">
              <h6>
                {t("Logo.name1")} <span>{t("Logo.name2")}</span>
              </h6>
            </Link>

            <div onClick={() => setNav(!nav)}>
              <div className={nav ? "style" : ""}></div>
              <div className={nav ? " activeNav" : ""}></div>
              <div className={nav ? "style" : ""}></div>
            </div>
          </div>
          <div className={nav ? "activeUl" : ""}>
            <ul>
              <Link to="/board">
                <li>
                  <i className="fa-solid fa-house"></i> Home
                </li>
              </Link>

              <li
                onClick={() => {
                  logout(`master/logout`, setExit, navigate);
                }}
              >
                <i className="fa-solid fa-person-running"></i> Logout
              </li>
            </ul>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}

export default DashNav;
