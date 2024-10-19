import React, { useState } from "react";
import { newVisitor, setInputs } from "../../connection/service";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "./Greeting.css";

import { t } from "i18next";
function Greeting({ skip, setSkip, setLogin, countries }) {
  const [visitor, setVisitor] = useState(false);
  const [mob, setMob] = useState("");

  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setInputs(e, formValues, setFormValues);
  };

  const handleSubmit = async (e) => {
    if (mob !== undefined) {
      setSkip(true);
      e.preventDefault();
      newVisitor("visitor/new", formValues);
    }
  };

  return (
    <section id="question" className={skip ? "d-none" : ""}>
      <div className={visitor ? "btnCont activeForm formActive" : "btnCont"}>
        <div className={visitor ? "hideQues" : ""}>
          <p
            className={
              t("NavBar.lang") === "Arabic"
                ? "description text-right"
                : "description text-left"
            }
          >
            {t("Question.title")}
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <span onClick={() => setSkip(true)} className="lateBtn">
              {t("Question.skip")}
            </span>
            <button onClick={() => setVisitor(true)}>{t("Question.q1")}</button>
          </div>
        </div>

        <form className={visitor ? "hideForm" : ""} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            required
          />
          <div className="mobile">
            <PhoneInput
              name="mobile"
              country={"ae"}
              countryCodeEditable={false}
              disableDropdown={true}
              inputProps={{
                name: "phone",
                required: true,
              }}
              value={mob}
              onChange={async (e) => {
                if (e.startsWith("0")) {
                  await setMob(undefined);
                } else {
                  setMob(e);
                  setFormValues({ ...formValues, mobile: mob });
                }
              }}
              required
            />
          </div>
          {mob === undefined ? <span>{t("Question.error")}</span> : ""}

          <div className="actionsBtns">
            <span className="btn" onClick={() => setVisitor(false)}>
              {t("Question.back")}
            </span>
            <button className="btn btn-success">{t("Question.submit")}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Greeting;
