import React, { useEffect, useState } from "react";
import { users } from "../../../connection/service";
import id from "uniqid";
import {
  addContract,
  setInputs,
  user,
  newUser,
  all,
} from "../../../connection/service";
import { t } from "i18next";
import PhoneInput from "react-phone-number-input";
import "./Contract.css";

function Contract({
  setAction,
  action,
  code,
  setCode,
  formValues,
  setFormValues,
  client,
  setClient,
  clients,
  setClients,
  loaded,
  setLoaded,
  clientData,
  setClientData,
}) {
  var state = "";

  const [activeAdd, setActiveAdd] = useState(false);
  const [stateCond, setStateCond] = useState("");
  const [sales, setSales] = useState([]);

  const [add, setAdd] = useState(false);
  const [reg, setReg] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (reg) {
      setInputs(e, client, setClient);
    } else {
      if (name === "stage") {
        if (value === "0") {
          state = "canceled";
          setStateCond("canceled");
        } else if (value === "1") {
          state = "process 1";
          setStateCond("process 1");
        } else if (value === "2") {
          state = "process 2";
          setStateCond("process 2");
        } else if (value === "3") {
          state = "completed";
          setStateCond("completed");
        } else if (value === "4") {
          state = "finished";
          setStateCond("finished");
        }
        setFormValues({
          ...formValues,
          status: state,
          stage: value,
        });
      } else if (name !== "state") {
        setFormValues({ ...formValues, [name]: value });
      }
    }
  };
  const handleStartDate = async (e) => {
    const { name, value } = e.target;
    let start = new Date(e.target.value);
    let now = new Date();
    if (start.setHours(0, 0, 0, 0) >= now.setHours(0, 0, 0, 0)) {
      document.getElementById("stage").disabled = true;
      document.getElementById("stage").value = "1";
      state = "process 1";
      setStateCond("process 1");
      setFormValues({
        ...formValues,
        [name]: value,
        stage: document.getElementById("stage").value,
        status: state,
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
      document.getElementById("stage").disabled = false;
    }
  };
  const handleClient = (e) => {
    if (e.target.value === "new") {
      setAdd(true);
      setClient(null);
      setClientData(null);
    } else {
      setCode(e.target.value);
      setReg(false);
      setAdd(false);
      user(`user/user/${e.target.value}`, setClientData);
    }
  };
  const handleReg = (e) => {
    e.preventDefault();
    newUser("user/register", client, setReg, setAction);
  };
  const handleContract = (e) => {
    e.preventDefault();
    setActiveAdd(true);
    addContract(`contract/new/${code}`, formValues);
  };

  useEffect(() => {
    if (!loaded || action) {
      function getUsers() {
        users("user/users", setClients, setLoaded, setAction);
      }
      getUsers();
    }
  }, [action, loaded, setAction]);

  useEffect(() => {
    setAdd(true);
    all("/sales/all", setSales);
  }, []);

  useEffect(() => {
    if (activeAdd) {
      setTimeout(() => {
        setActiveAdd(false);
      }, 1200);
    }
  });

  return (
    <section id="contract">
      <div>
        <select id="client" onChange={handleClient}>
          <option id={id()} value="new">
            {t("Contract.select.client")}
          </option>
          {clients.map((c) => {
            return <option value={c.code}>{c.name}</option>;
          })}
        </select>

        <div id="formCont">
          <form>
            <div className="blockCont">
              <div>
                <i className="fa-solid fa-circle-user"></i>
                <h4>{t("Contract.titles.personal")}</h4>
                <i
                  className={
                    add ? "fa-solid fa-plus switchIcon" : "fa-solid fa-plus"
                  }
                  onClick={async () => {
                    setAdd(false);
                    await setReg(true);
                    document
                      .querySelectorAll(".inp")
                      .forEach((inp) => (inp.value = ""));
                  }}
                ></i>
              </div>

              <div>
                <div>
                  <label>{t("Contract.labels.name")}</label>
                  {reg ? (
                    <input
                      className="inp"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <input
                      id={id()}
                      type="text"
                      name="name"
                      value={clientData !== null ? clientData.name : ""}
                      onChange={handleChange}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label>
                    {reg
                      ? t("Contract.labels.email")
                      : t("Contract.labels.code")}
                  </label>
                  {reg ? (
                    <input
                      className="inp"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <input
                      id={id()}
                      type="number"
                      name="code"
                      value={clientData !== null ? clientData.code : ""}
                      onChange={handleChange}
                      readOnly
                    />
                  )}
                </div>
              </div>

              <div>
                <div>
                  <label>{t("Contract.labels.location")}</label>
                  {reg ? (
                    <select name="location" onChange={handleChange} required>
                      <option hidden>Country</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Al-Ain">Al-Ain</option>
                      <option value="Abu-Dhabi">Abu-Dhabi</option>
                    </select>
                  ) : (
                    <input
                      id={id()}
                      type="text"
                      name="location"
                      value={clientData !== null ? clientData.location : ""}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label>{t("Contract.labels.mobile")}</label>
                  {reg ? (
                    <PhoneInput
                      id={id()}
                      name="mobile"
                      onChange={(e) => setClient({ ...client, mobile: e })}
                      required
                    />
                  ) : (
                    <PhoneInput
                      id={id()}
                      name="mobile"
                      value={clientData !== null ? clientData.mobile : ""}
                      readOnly
                    />
                  )}
                </div>
              </div>

              <div className={reg ? "activeReg" : ""}>
                <div>
                  <label>{t("Contract.labels.password")}</label>
                  <input
                    className="inp"
                    type="text"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={reg ? "btnAdd activeAdd" : "btnAdd"}>
                <button onClick={handleReg}>add</button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setReg(false);
                    setAdd(true);
                  }}
                >
                  cancel
                </button>
              </div>
            </div>

            <div className="blockCont">
              <div>
                <i className="fa-solid fa-file-contract"></i>
                <h4>{t("Contract.titles.contract")}</h4>
              </div>

              <div>
                <div>
                  <label>{t("Contract.labels.assignDate")}</label>
                  <input
                    type="date"
                    name="assign_date"
                    id={id()}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>{t("Contract.labels.start")}</label>
                  <input
                    type="date"
                    name="start_date"
                    id={id()}
                    onChange={handleStartDate}
                  />
                </div>
              </div>

              <div>
                <div>
                  <label>{t("Contract.labels.end")}</label>
                  <input
                    type="date"
                    name="end_date"
                    id={id()}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>{t("Contract.labels.stage")}</label>
                  <select id="stage" onChange={handleChange} name="stage">
                    <option hidden></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label>{t("Contract.labels.status")}</label>
                  <input type="text" name="status" value={stateCond} readOnly />
                </div>

                <div>
                  <label>{t("Contract.labels.location")}</label>
                  <select id="location" name="location" onChange={handleChange}>
                    <option hidden>City</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Al Ain">Al Ain</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label>{t("Contract.labels.cost")}</label>
                  <input
                    type="number"
                    name="total_cost"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>{t("Contract.labels.owner")}</label>
                  <select name="sale_executive" onChange={handleChange}>
                    <option hidden></option>
                    {sales.length > 0
                      ? sales.map((s) => {
                          return <option value={s.name}>{s.name}</option>;
                        })
                      : ""}
                  </select>
                </div>
              </div>

              <div
                className={
                  clientData !== null
                    ? "btnContract activeContract"
                    : "btnContract"
                }
              >
                <button onClick={handleContract}>New</button>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setClientData(null);
                    setAdd(true);
                    document.getElementById("client").value = "new";
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className={activeAdd ? "addCont activeAdd" : "addCont"}>
        <div>
          <i className="fa-solid fa-check"></i>
          <p>Added Successfully</p>
        </div>
      </div>
    </section>
  );
}

export default Contract;
