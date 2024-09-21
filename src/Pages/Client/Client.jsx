import React, { useEffect, useState } from "react";
import "./Client.css";

import {
  addComment,
  customerContracts,
  pause,
  userContract,
  userProfile,
} from "../../connection/service";
import "react-circular-progressbar/dist/styles.css";
import { userLogoOut } from "../../connection/service";
import { useNavigate } from "react-router-dom";

function Client({
  clientContracts,
  setClientContracts,
  setExit,
  action,
  formValues,
  setFormValues,
  notification,
  setNotification,
}) {
  let notes, MainConts;

  const [customer, setCustomer] = useState(null);

  var [title, setTitle] = useState("");
  var [URL, setURL] = useState("");

  useEffect(() => {
    if (localStorage.getItem("code") !== undefined) {
      customerContracts(
        `contract/userContracts/${localStorage.getItem("code")}`,
        setClientContracts
      );
    }
  }, []);

  const handlePause = (e, i) => {
    e.preventDefault();
    setURL("user/pause");
    setTitle("Reason");
    notes.forEach((n, ind) => {
      if (e.target.innerHTML === "Pause") {
        if (ind === i) {
          n.classList.add("activePause");
        } else {
          n.classList.remove("activePause");
        }
      }
    });
    MainConts.forEach((m, index) => {
      if (e.target.innerHTML === "Pause") {
        if (index === i) {
          m.classList.add("deActiveMainCont");
        } else {
          m.classList.remove("deActiveMainCont");
        }
      }
    });
  };
  const handleComment = (e, i, id) => {
    e.preventDefault();
    setURL("user/comment");
    setTitle("Leave Comment");
    userContract(`contract/sendContract/${id}`, formValues, setFormValues);
    notes.forEach((n, ind) => {
      if (e.target.innerHTML === "Comment") {
        if (ind === i) {
          n.classList.add("activePause");
        } else {
          n.classList.remove("activePause");
        }
      } else {
        n.classList.remove("activePause");
      }
    });
    MainConts.forEach((m, index) => {
      if (e.target.innerHTML === "Comment") {
        if (index === i) {
          m.classList.add("deActiveMainCont");
        } else {
          m.classList.remove("deActiveMainCont");
        }
      } else {
        m.classList.remove("deActiveMainCont");
      }
    });
  };
  const handleCancel = (e, i) => {
    e.preventDefault();
    notes.forEach((n, ind) => {
      if (ind === i) {
        if (
          e.target.innerHTML === "Comment" ||
          e.target.innerHTML === "Pause"
        ) {
          n.classList.add("activePause");
        } else {
          n.classList.remove("activePause");
        }
      }
    });
    MainConts.forEach((m, index) => {
      if (index === i) {
        if (
          e.target.innerHTML === "Comment" ||
          e.target.innerHTML === "Pause"
        ) {
          m.classList.add("deActiveMainCont");
        } else {
          m.classList.remove("deActiveMainCont");
        }
      }
    });
  };
  const handleSubmit = (e, id, i) => {
    e.preventDefault();
    if ((title = "Leave Comment")) {
      addComment(`${URL}/${id}`, formValues);
    } else {
      pause(`${URL}/${id}`, formValues);
    }
    notes.forEach((n, ind) => {
      if (ind === i) {
        if (
          e.target.innerHTML === "Comment" ||
          e.target.innerHTML === "Pause"
        ) {
          n.classList.add("activePause");
        } else {
          n.classList.remove("activePause");
        }
      }
    });
    MainConts.forEach((m, index) => {
      if (index === i) {
        if (
          e.target.innerHTML === "Comment" ||
          e.target.innerHTML === "Pause"
        ) {
          m.classList.add("deActiveMainCont");
        } else {
          m.classList.remove("deActiveMainCont");
        }
      }
    });
    document.getElementById("note").value = "";

    if (localStorage.getItem("Noty") === undefined) {
      setNotification(notification + 1);
      localStorage.setItem("Noty", notification);
    } else {
      localStorage.setItem("Noty", Number(localStorage.getItem("Noty")) + 1);
    }
  };
  const handleLogout = () => {
    userLogoOut("user/logout");
  };

  useEffect(() => {
    notes = document.querySelectorAll(".Pause");
    MainConts = document.querySelectorAll(".MainCont");
  });

  useEffect(() => {
    userProfile("user/profile", setCustomer);
  }, [action]);
  return (
    <section className="dashboard">
      <div className="clientContainer">
        {customer ? (
          <div className="userInfo">
            <div>
              <h2>Hello, {customer.name}</h2>
              <p>Control all your projects</p>
            </div>
            <div className="joinDate">
              <p>Join Date</p>
              <p>{customer.joining_date}</p>
            </div>

            <a href="/login" onClick={handleLogout}>
              Logout
            </a>
          </div>
        ) : (
          ""
        )}

        {clientContracts.length > 0
          ? clientContracts.map((c, i) => {
              return (
                <div className="site" key={i}>
                  <h4>{c.location}</h4>
                  <h6>Administrator: {c.sale_executive}</h6>
                  <form>
                    <div className="MainCont">
                      <div>
                        <div className="dataCont">
                          <label>Start Date</label>
                          <input
                            type="text"
                            name="start_date"
                            value={c.history.slice(-1)[0].start_date}
                            readOnly
                          />
                        </div>
                        <div className="dataCont">
                          <label>End Date</label>
                          <input
                            type="text"
                            name="end_date"
                            value={c.history.slice(-1)[0].end_date}
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <div className="dataCont">
                          <label>Stage</label>
                          <input
                            type="number"
                            value={c.history.slice(-1)[0].stage}
                            readOnly
                          />
                        </div>
                        <div className="dataCont">
                          <label>Status</label>
                          <input
                            type="text"
                            value={c.history.slice(-1)[0].status}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="stageDetails">
                        <h2>Stage</h2>
                        <p>Included</p>
                        <div className="row">
                          {c.history.slice(-1)[0].stage === 1 ? (
                            <React.Fragment>
                              <p className="col-6">&#x25CF; تجهيز الأرض </p>
                              <p className="col-6">
                                &#x25CF; البدء بأعمال القواعد
                              </p>
                              <p className="col-6">
                                &#x25CF; تركيب القواطع الحديدية الرئيسية
                              </p>
                              <p className="col-6">
                                &#x25CF; أعمال صب الخرسانة
                              </p>
                            </React.Fragment>
                          ) : c.history.slice(-1)[0].stage === 2 ? (
                            <React.Fragment>
                              <p className="col-6">
                                &#x25CF; مرحلة تركيب الحديد البارد
                              </p>
                              <p className="col-6">
                                &#x25CF; مرحلة تركيب الجدران الخارجية
                              </p>
                              <p className="col-6">
                                &#x25CF; مرحلة تركيب الجدران الداخلية مع العوازل
                              </p>
                            </React.Fragment>
                          ) : c.history.slice(-1)[0].stage === 3 ? (
                            <React.Fragment>
                              <p className="col-6">
                                &#x25CF; البدء بإغلاق كافة الجدران
                              </p>
                              <p className="col-6">
                                &#x25CF; البدء بأعمال تركيب الأرضيات
                              </p>
                              <p className="col-6">
                                &#x25CF; البدء بأعمال الصبغ
                              </p>
                              <p className="col-6">
                                &#x25CF; تركيب الأبواب و النوافذ
                              </p>
                            </React.Fragment>
                          ) : c.history.slice(-1)[0].stage === 4 ? (
                            <React.Fragment>
                              <p className="col-6">
                                &#x25CF; تركيب الأبواب و النوافذ
                              </p>
                              <p className="col-6">
                                &#x25CF; أعمال الديكورات الداخلية
                              </p>
                              <p className="col-6">&#x25CF; تركيب الانارة</p>
                              <p className="col-6">
                                &#x25CF; استكمال أعمال تشطيب المبنى
                              </p>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="progress">
                        <div
                          className={
                            c.history.slice(-1)[0].stage === 5
                              ? "progress-bar progress-bar-striped "
                              : "progress-bar progress-bar-striped progress-bar-animated"
                          }
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width:
                              c.history.slice(-1)[0].stage === 1
                                ? "20%"
                                : c.history.slice(-1)[0].stage === 2
                                ? " 40%"
                                : c.history.slice(-1)[0].stage === 3
                                ? "60%"
                                : c.history.slice(-1)[0].stage === 4
                                ? "80%"
                                : "100%",
                          }}
                        ></div>
                      </div>
                      <div className="pauseAction">
                        <button onClick={(e) => handleComment(e, i, c._id)}>
                          Comment
                        </button>
                        <button onClick={(e) => handlePause(e, i, c._id)}>
                          Pause
                        </button>
                      </div>
                    </div>

                    <div className="Pause">
                      <label>{title === undefined ? "Wrong" : title}</label>
                      <textarea
                        id="note"
                        name="note"
                        cols="30"
                        rows="10"
                        onChange={async (e) => {
                          setFormValues({
                            ...formValues,
                            note: e.target.value,
                          });
                        }}
                      ></textarea>
                      <div>
                        <button onClick={(e) => handleSubmit(e, c._id, i)}>
                          Submit
                        </button>
                        <button onClick={(e) => handleCancel(e, i)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              );
            })
          : ""}
      </div>
    </section>
  );
}

export default Client;
