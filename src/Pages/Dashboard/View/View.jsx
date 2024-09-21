import React, { useEffect, useState } from "react";
import { t } from "i18next";
import {
  userContracts,
  deleteContract,
  edit,
  Variations,
  newVariation,
  download,
} from "../../../connection/service";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import RadialSeparators from "../RadialSeparators";
import "./view.css";

function View({
  action,
  setAction,
  contracts,
  setContracts,
  variations,
  setVariations,
  fileUploaded,
  setFileUploaded,
  file,
  setFile,
}) {
  let state;
  const [filter, setFilter] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [stageQuery, setStageQuery] = useState("");
  const [activeFile, setActiveFile] = useState(false);
  const [checkDelete, setDelete] = useState(false);
  const [checkEdit, setEdit] = useState(false);
  const [formValues, setFormValues] = useState({
    assign_date: "",
    start_date: "",
    end_date: "",
    stage: "",
    status: "",
    location: "",
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteContract(`contract/delete/${id}`, setContracts, setDelete);
  };
  const handleEdit = (e, ind) => {
    e.preventDefault();
    document.querySelectorAll(".view").forEach((v, i) => {
      if (i === ind) {
        v.classList.add("activeEdit");
      } else {
        v.classList.remove("activeEdit");
      }
    });
    document.querySelectorAll(".mainCont").forEach((m, i) => {
      if (i === ind) {
        m.classList.add("activeCont");
      } else {
        m.classList.remove("activeCont");
      }
    });
    document.querySelectorAll(".editForm").forEach((e, i) => {
      if (i === ind) {
        e.classList.add("activeEditForm");
      } else {
        e.classList.remove("activeEditForm");
      }
    });
  };
  const handleBack = (e, ind) => {
    e.preventDefault();
    document.querySelectorAll(".view").forEach((v, i) => {
      if (i === ind) {
        v.classList.remove("activeEdit");
      }
    });
    document.querySelectorAll(".mainCont").forEach((m, i) => {
      if (i === ind) {
        m.classList.remove("activeCont");
      }
    });
    document.querySelectorAll(".editForm").forEach((e, i) => {
      if (i === ind) {
        e.classList.remove("activeEditForm");
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "stage") {
      if (value === "0") {
        state = "canceled";
      } else if (value === "1") {
        state = "process 1";
      } else if (value === "2") {
        state = "process 2";
      } else if (value === "3") {
        state = "completed";
      } else if (value === "paused") {
        state = "paused";
      } else {
        state = "finished";
      }
      setFormValues({ ...formValues, [name]: value, status: state });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleSubmit = (e, id, ind) => {
    e.preventDefault();
    if (fileUploaded) {
      const formData = new FormData();
      formData.append("file", file);
      newVariation(`variation/new/${id}`, formData);
      edit(`contract/edit/${id}`, formValues, setContracts, setEdit, setAction);
    } else {
      edit(`contract/edit/${id}`, formValues, setContracts, setEdit);
    }
    document.querySelectorAll(".view").forEach((v, i) => {
      if (i === ind) {
        v.classList.remove("activeEdit");
      }
    });
    document.querySelectorAll(".mainCont").forEach((m, i) => {
      if (i === ind) {
        m.classList.remove("activeCont");
      }
    });
    document.querySelectorAll(".editForm").forEach((e, i) => {
      if (i === ind) {
        e.classList.remove("activeEditForm");
      }
    });
  };

  const handleDownload = async (id) => {
    await download(`variation/download/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    userContracts(
      `contract/userContracts/${localStorage.getItem("code")}`,
      setContracts
    );
    Variations("variation/variations", setVariations, setAction);
  }, []);

  useEffect(() => {
    if (checkDelete) {
      setTimeout(() => {
        setDelete(false);
      }, 1500);
    }
    if (checkEdit) {
      setTimeout(() => {
        setEdit(false);
      }, 1500);
    }
    if (!activeFile) {
      setFileUploaded(false);
      setFile("");
    }
    if (action) {
      Variations("variation/variations", setVariations, setAction);
    }
  });

  return (
    <React.Fragment>
      <section id="view" className="d-lg-none">
        <div>
          <div>
            <h4>Islam</h4>
            <p>Dubai</p>
          </div>

          <div>
            <button
              className={filter ? "hideFilterButton" : ""}
              onClick={(e) => {
                e.preventDefault();
                setFilter(true);
              }}
            >
              <i className="fa-solid fa-arrow-down-wide-short"></i>
              Filter
            </button>

            <div>
              <select
                className={filter ? "showFilter" : ""}
                onChange={(e) => {
                  if (e.target.value === "all") {
                    setCityQuery("");
                  } else {
                    setCityQuery(e.target.value);
                  }
                }}
              >
                <option hidden>City</option>
                <option value="all">All</option>
                <option value="Dubai">Dubai</option>
                <option value="Al-Ain">Al Ain</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
              </select>

              <select
                className={filter ? "showFilter" : ""}
                onChange={(e) => {
                  if (e.target.value === "all") {
                    setStageQuery("");
                  } else {
                    setStageQuery(e.target.value);
                  }
                }}
              >
                <option hidden>Stage</option>
                <option value="all">All</option>
                <option value="0">Cancelled</option>
                <option value="1">Stage 1</option>
                <option value="2">Stage 2</option>
                <option value="3">Stage 3</option>
                <option value="4">Finished</option>
              </select>
            </div>
          </div>

          {contracts.length > 0 || variations.length > 0
            ? contracts
                .filter((c) => {
                  if (cityQuery === "" && stageQuery === "") {
                    return c;
                  } else if (cityQuery !== "" && stageQuery === "") {
                    return c.location
                      .toLowerCase()
                      .includes(cityQuery.toLowerCase());
                  } else if (cityQuery === "" && stageQuery !== "") {
                    return c.history.slice(-1)[0].stage === Number(stageQuery);
                  } else if (cityQuery !== "" && stageQuery !== "") {
                    if (
                      c.location.toLowerCase().includes(cityQuery.toLowerCase())
                    ) {
                      return (
                        c.history.slice(-1)[0].stage === Number(stageQuery)
                      );
                    } else if (
                      c.history.slice(-1)[0].stage === Number(stageQuery)
                    ) {
                      return c.location
                        .toLowerCase()
                        .includes(cityQuery.toLowerCase());
                    }
                  } else {
                    return c;
                  }
                })
                .map((c, ind) => {
                  let date = new Date(c.updatedAt);
                  date =
                    date.getDate() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getFullYear();

                  return (
                    <div className="cont">
                      <div
                        className={
                          c.history.slice(-1)[0].note !== ""
                            ? "mainCont mainContHeight"
                            : "mainCont"
                        }
                      >
                        <div className="view">
                          <p className="update">{date}</p>
                          <p className="loc">{c.location}</p>
                          <div>
                            <div>
                              <div>
                                <label>{t("Contract.labels.assignDate")}</label>
                                <input
                                  type="text"
                                  value={c.history.slice(-1)[0].assign_date}
                                  readOnly
                                />
                              </div>

                              <div>
                                <label>{t("Contract.labels.start")}</label>
                                <input
                                  type="text"
                                  value={c.history.slice(-1)[0].start_date}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div>
                              <label>{t("Contract.labels.end")}</label>
                              <input
                                type="text"
                                value={c.history.slice(-1)[0].end_date}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="perform">
                            <div className="per">
                              <div>
                                <div>
                                  <label>{t("Contract.labels.stage")}</label>
                                  <input
                                    type="text"
                                    value={c.history.slice(-1)[0].stage}
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <label>{t("Contract.labels.status")}</label>
                                  <input
                                    type="text"
                                    value={c.history.slice(-1)[0].status}
                                    readOnly
                                  />
                                </div>
                              </div>

                              <div className="performance">
                                <div label="Progressbar with separators">
                                  <CircularProgressbarWithChildren
                                    value={
                                      c.history.slice(-1)[0].stage === 0
                                        ? 0
                                        : c.history.slice(-1)[0].stage === 1
                                        ? 25
                                        : c.history.slice(-1)[0].stage === 2
                                        ? 50
                                        : c.history.slice(-1)[0].stage === 3
                                        ? 90
                                        : c.history.slice(-1)[0].stage === 4
                                        ? 100
                                        : 0
                                    }
                                    text={
                                      c.history.slice(-1)[0].stage === 0
                                        ? `${0}%`
                                        : c.history.slice(-1)[0].stage === 1
                                        ? `${25}%`
                                        : c.history.slice(-1)[0].stage === 2
                                        ? `${50}%`
                                        : c.history.slice(-1)[0].stage === 3
                                        ? `${90}%`
                                        : c.history.slice(-1)[0].stage === 4
                                        ? `${100}%`
                                        : `${0}%`
                                    }
                                    strokeWidth={10}
                                    styles={buildStyles({
                                      strokeLinecap: "butt",
                                      textColor: "black",
                                      pathColor: "rgb(143, 143, 143)",
                                    })}
                                  >
                                    <RadialSeparators
                                      count={15}
                                      style={{
                                        background: "#fff",
                                        width: "3px",
                                        height: `${10}%`,
                                      }}
                                    />
                                  </CircularProgressbarWithChildren>
                                </div>
                              </div>
                            </div>
                            <div className="cost">
                              <div>
                                <label>{t("Contract.labels.cost")}</label>
                                <input
                                  type="number"
                                  name="total_cost"
                                  value={c.total_cost}
                                  readOnly
                                />
                              </div>

                              <div>
                                <label>{t("Contract.labels.stageCost")}</label>
                                <input
                                  type="number"
                                  name="total_cost"
                                  value={
                                    c.history.slice(-1)[0].stage === 1
                                      ? c.total_cost * 0.4
                                      : c.history.slice(-1)[0].stage === 2
                                      ? c.total_cost * 0.35
                                      : c.history.slice(-1)[0].stage === 3
                                      ? c.total_cost * 0.2
                                      : c.history.slice(-1)[0].stage === 4
                                      ? c.total_cost * 0.05
                                      : 0
                                  }
                                  readOnly
                                />
                              </div>
                            </div>
                            {variations.length > 0 ? (
                              <div className="variations">
                                <div>
                                  <label>
                                    {t("Contract.labels.variation")}
                                  </label>
                                  <div>
                                    {variations.map((v) => {
                                      if (v.contract_id === c._id) {
                                        return (
                                          <div
                                            onClick={() =>
                                              handleDownload(v._id)
                                            }
                                          >
                                            <i className="fa-solid fa-file"></i>
                                            <p>
                                              {t("Contract.labels.download")}
                                            </p>
                                          </div>
                                        );
                                      }
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {c.history.slice(-1)[0].note !== "" ? (
                              <div className="note">
                                <label>Note</label>
                                <textarea
                                  name="note"
                                  value={c.history.slice(-1)[0].note}
                                ></textarea>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="edit">
                              <button
                                onClick={(e) => {
                                  handleEdit(e, ind);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  handleDelete(e, c._id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="editForm ">
                          <div>
                            <label>{t("Contract.labels.assignDate")}</label>
                            <input
                              type="date"
                              name="assign_date"
                              value={formValues.assign_date}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label>{t("Contract.labels.start")}</label>
                            <input
                              type="date"
                              name="start_date"
                              value={formValues.start_date}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label>{t("Contract.labels.end")}</label>
                            <input
                              type="date"
                              name="end_date"
                              value={formValues.end_date}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label>{t("Contract.labels.stage")}</label>
                            <select
                              name="stage"
                              value={formValues.stage}
                              onChange={handleChange}
                            >
                              <option hidden></option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="paused">Pending</option>
                            </select>
                          </div>
                          <div>
                            <label>{t("Contract.labels.status")}</label>
                            <input
                              id="status"
                              type="text"
                              value={formValues.status}
                              onChange={handleChange}
                              readOnly
                            />
                          </div>
                          <div>
                            <label>{t("Contract.labels.location")}</label>
                            <select
                              name="location"
                              onChange={handleChange}
                              value={formValues.location}
                            >
                              <option hidden>City</option>
                              <option value="Dubai">Dubai</option>
                              <option value="Al-Ain">Al-Ain</option>
                              <option value="Abu Dhabi">Abu Dhabi</option>
                            </select>
                          </div>
                          <div className="variation">
                            <label>{t("Contract.labels.variation")}</label>
                            <div>
                              <button
                                className={activeFile ? "cancelFile" : ""}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveFile(!activeFile);
                                }}
                              >
                                {activeFile
                                  ? t("Contract.btns.cancelvariation")
                                  : t("Contract.btns.addVariation")}
                              </button>
                              <div>
                                <label
                                  className={activeFile ? "activeFile" : ""}
                                  htmlFor="file"
                                >
                                  {fileUploaded ? file.name : "choose file"}
                                </label>
                                <input
                                  type="file"
                                  name="file"
                                  id="file"
                                  onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setFileUploaded(true);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="note">
                            <label>Note</label>
                            <textarea
                              name="note"
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                handleBack(e, ind);
                              }}
                            >
                              Back
                            </button>
                            <button
                              onClick={(e) => handleSubmit(e, c._id, ind)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            : ""}
        </div>
      </section>

      <div
        className={
          checkDelete
            ? "Dmessage d-lg-none activeDmessage"
            : "Dmessage  d-lg-none"
        }
      >
        <div className="box">
          <i className="fa-solid fa-check"></i>
          <p>Deleted Successfully</p>
        </div>
      </div>

      <div
        className={
          checkEdit ? "Emessage activeEmessage d-lg-none" : "Emessage d-lg-none"
        }
      >
        <div>
          <i className="fa-solid fa-check"></i>
          <p>Edit Successfully</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default View;
