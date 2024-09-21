import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { setInputs, newAdministrator } from "../../../connection/service";
import "./Administrator.css";

function Administrator({ activeAdmin, setActiveAdmin, add, setAdd }) {
  const [formValues, setFormValues] = useState({
    name: "",
    target: "",
  });

  const handleChange = (e) => {
    setInputs(e, formValues, setFormValues, setAdd);
  };

  const handleNew = (e) => {
    e.preventDefault();
    newAdministrator("sales/new", formValues, setActiveAdmin, setAdd);
  };

  useEffect(() => {
    if (add) {
      setTimeout(() => {
        setAdd(false);
      }, 1200);
    }
  });

  return (
    <section id="adminCont">
      <section id="admin" className={activeAdmin ? "activeAdmin" : ""}>
        <form>
          <div>
            <label>{t("Administrator.labels.name")}</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>{t("Administrator.labels.target")}</label>
            <input
              type="number"
              name="target"
              value={formValues.target}
              onChange={handleChange}
            />
          </div>

          <div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveAdmin(false);
                }}
              >
                {t("Administrator.btns.cancel")}
              </button>
              <button onClick={handleNew}>{t("Administrator.btns.add")}</button>
            </div>
          </div>
        </form>
      </section>
      <div className={add ? "addCont activeAdd" : "addCont"}>
        <div className="add">
          <i className="fa-solid fa-check"></i>
          <p>Added Successfully</p>
        </div>
      </div>
    </section>
  );
}

export default Administrator;
