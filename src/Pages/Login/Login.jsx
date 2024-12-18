import { t } from "i18next";
import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { login, passwordReset, setInputs } from "../../connection/service";
import "./Login.css";
import logo from "../../assets/Logo/HD Logo.png";
import { useNavigate } from "react-router-dom";

function Login({
  // setLoading,
  // setChange,
  isSubmit,
  setSubmit,
  setAction,
  setExit,
  code,
}) {
  const [eye, setEye] = useState(false);
  const [error, setErr] = useState(null);
  const [resetForm, setResetForm] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [activeCode, setActiveCode] = useState(false);
  const [reset, setReset] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(false);

  const [URL, setURL] = useState("user/login");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [resetInfo, setResetInfo] = useState({
    email: "",
    password: "",
  });
  // const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(e, formValues, setFormValues);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  // const handleLang = async (lang) => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1200);
  //   if (t("NavBar.lang") === "Arabic") {
  //     await setChange(true);
  //   } else {
  //     await setChange("false");
  //   }
  //   i18n.changeLanguage(lang);
  // };
  const handleReset = (e) => {
    e.preventDefault();
    if (
      document.getElementById("mainPassword").value ===
      document.getElementById("checkPassword").value
    ) {
      setConfirmPassword(false);
      setActiveCode(true);
      document.getElementById("code").focus();
    } else {
      setConfirmPassword(true);
    }
  };
  const handleResetCode = async (e) => {
    const { value } = e.target;
    if (value === code) {
      if (URL === "user/login") {
        setURL("user/reset");
      } else {
        setURL("master/reset");
      }
      await passwordReset(URL, resetInfo, setReset, setConfirmMessage);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (isSubmit) {
      async function submit() {
        await login(
          URL,
          formValues,
          setErr,
          setSubmit,
          setAction,
          navigate,
          setExit
        );
      }
      submit();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (confirmMessage) {
      setTimeout(() => {
        setConfirmMessage(false);
        setResetForm(false);
        setReset(null);
        setActiveCode(false);
        document.getElementById("email").value = "";
        document.getElementById("mainPassword").value = "";
        document.getElementById("checkPassword").value = "";
        document.getElementById("code").value = "";
      }, 2200);

      return () => clearTimeout();
    }
  });

  return (
    <section id="login" className={t("NavBar.lang") === "Arabic" ? " Dir" : ""}>
      <div>
        <h2 className="d-flex d-md-none d-lg-flex">{t("Login.title")}</h2>
        {t("NavBar.lang") === "Arabic" ? (
          <h2 className="lastHeader d-flex d-md-none d-lg-flex">
            {t("Login.title")}
          </h2>
        ) : (
          ""
        )}
        <h2 className="d-md-flex d-none d-lg-none">{t("Login.title")}</h2>
        <p>{t("Login.para")}</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>{t("Login.username")}</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("Login.password")}</label>
            <div className="w-100">
              <input
                type={eye ? "text" : "password"}
                name="password"
                placeholder="******"
                onChange={handleChange}
                required
              />
              {t("NavBar.lang") === "English" ? (
                <i
                  onClick={() => setEye(!eye)}
                  className={
                    eye
                      ? "fa-solid fa-eye EngEye"
                      : "fa-solid fa-eye-slash EngEye"
                  }
                ></i>
              ) : (
                <i
                  onClick={() => setEye(!eye)}
                  className={eye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                ></i>
              )}
            </div>
          </div>
          <div className="errorAndReset">
            <p
              className={
                !error || error === null
                  ? "err d-none"
                  : URL === "user/login"
                  ? "err d-block editError"
                  : "err d-block "
              }
            >
              {t("Login.err")}
            </p>

            <span onClick={() => setResetForm(true)}>Reset Password!</span>
          </div>

          <button>{t("Login.btn")}</button>
          {URL === "user/login" ? (
            <span onClick={() => setURL("master/login")}>
              {t("Login.type1")}
            </span>
          ) : (
            <span onClick={() => setURL("user/login")}>{t("Login.type2")}</span>
          )}
        </form>
      </div>
      <div className={resetForm ? "reset activeResetForm" : "reset"}>
        <div className={reset ? "worryMessage trueReset" : "worryMessage"}>
          <h3 className={reset ? "hidecontent" : ""}>Forgot your password !</h3>
          <p className={reset ? "hidecontent" : ""}>Reset your password here</p>
          <div>
            <input
              className={reset ? "hidecontent" : ""}
              type="password"
              id="code"
              onChange={handleResetCode}
            />
            <span
              className={
                activeCode ? (reset ? "hidecontent" : "activeNote") : ""
              }
              id="code"
            >
              Pleas enter the code to proceed
            </span>
          </div>
          <div
            className={
              confirmMessage
                ? "confirmMessage hideConfirmMessage"
                : "confirmMessage"
            }
          >
            <i className="fa-solid fa-check"></i>
            <p> Password Reset successfully</p>
          </div>
        </div>
        <div className={reset ? "resetForm falseReset" : "resetForm"}>
          <form>
            <div>
              <label>Email</label>
              <input
                type="email"
                onChange={(e) =>
                  setResetInfo({ ...resetInfo, email: e.target.value })
                }
              />
            </div>
            <div>
              <label>New Password</label>
              <div>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  id="mainPassword"
                  onChange={(e) =>
                    setResetInfo({ ...resetInfo, password: e.target.value })
                  }
                  required
                />

                {passwordVisibility ? (
                  <i
                    className="fa-solid fa-eye"
                    onClick={() => setPasswordVisibility(false)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash"
                    onClick={() => setPasswordVisibility(true)}
                  ></i>
                )}
              </div>
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type={passwordVisibility ? "text" : "password"}
                id="checkPassword"
              />
            </div>
            {confirmPassword ? (
              <p className="text-warning">Password doesn't match !</p>
            ) : reset ? (
              ""
            ) : reset === null ? (
              ""
            ) : (
              <p className="text-warning">The email is not exist!</p>
            )}

            <div>
              <button onClick={handleReset}>Reset</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setResetForm(false);
                  setActiveCode(false);
                  document.getElementById("mainPassword").value = "";
                  document.getElementById("checkPassword").value = "";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <nav className="shadow d-none d-lg-block">
        <div></div>
        <div></div>
      </nav>
      <div className="company d-none d-lg-block">
        <div>
          <img src={logo} alt="logo" />
          <p>
            {t("Logo.name1")}
            <span> {t("Logo.name2")}</span>
            <br />
            <span>{t("Logo.field")}</span>
          </p>
        </div>
      </div>
      <footer>all rights &copy; reserved by House Design</footer>
    </section>
  );
}

export default Login;
