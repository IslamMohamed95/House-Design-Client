import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import ReactToPrint from "react-to-print";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link, useNavigate } from "react-router-dom";
import {
  contracts,
  account,
  logout,
  deleteContract,
  all,
  setInputs,
  users,
  newUser,
  addContract,
  user as targetUser,
  userContracts,
  Variations,
  contractVariations,
  newVariation,
  edit,
  userContract,
  seenContract,
  newSalesman,
  visitors,
  deleteSalesman,
  editVisitorStatus,
  newAdmin,
  contractNotes,
  confirmPause,
  resetPause,
  download,
  cancelPause,
} from "../../../connection/service";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Radial separators
import RadialSeparators from "../RadialSeparators";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { t } from "i18next";

import "./Board.css";
import Administrator from "../Administrator/Administrator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Board({
  deleteCode,
  user,
  setUser,
  action,
  setAction,
  setExit,
  add,
  setAdd,
  formValues,
  setFormValues,
  newClientData,
  setNewClientData,
  clients,
  setClients,
  loaded,
  setLoaded,
  clientData,
  setClientData,
  targetUserContracts,
  setTargetUserContracts,
  setVariations,
  fileUploaded,
  setFileUploaded,
  file,
  setFile,
  setFileData,
  popUp,
  setPopUp,
  salesman,
  setSalesman,
  code,
  notification,
  setNotification,
}) {
  let printedTable = useRef();
  let salesPrintedTable = useRef();
  const navigate = useNavigate();
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let colors = ["darkred", "grey", "darkorange"];
  let allTables, arrow, allContracts, perecentage, data, Notes;
  const editView = useRef(null);
  const contractView = useRef(null);
  const newAdminView = useRef(null);
  const salesView = useRef(null);
  const [query, setQuery] = useState("");
  const [visitorQuery, setVisitorQuery] = useState("");
  const [salesTargets, setSalesTarget] = useState([]);
  const [target, setTarget] = useState({});
  const [clientNotes, setClientNotes] = useState({});
  const [stageAndStatus, setStageAndStatus] = useState({
    stage: "",
    status: "",
    location: "",
    sale_executive: "",
    total_cost: null,
  });
  const [newAdminValues, setNewAdminValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [webVisitors, setVisitors] = useState([]);
  const [clientVariations, setContractVariations] = useState([]);
  const [labels, setLabels] = useState([]);
  const [labelsData, setLabelsData] = useState([]);
  const [sales, setSales] = useState([]);
  const [conts, setContracts] = useState([]);

  const [enteredCode, setEnteredCode] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [client, setClient] = useState("");

  const [codeStatus, setCodeStatus] = useState(false);
  const [activeNotes, setActiveNotes] = useState(false);
  const [checkCode, setCheckCode] = useState(false);
  const [salesAction, setSalesAction] = useState(false);
  const [actionStage, setStageAction] = useState(false);
  const [actionLocation, setLocationAction] = useState(false);
  const [editAction, setEditAction] = useState(false);
  const [checkUserContracts, setCheckUserContracts] = useState(false);
  const [getUserAction, setGetUserAction] = useState(false);
  const [editContractPage, setEditContractPage] = useState(false);
  const [checkContractLoc, setCheckContractLocation] = useState(false);
  const [checkStages, setCheckStages] = useState(false);
  const [checkSalesmen, setCheckSalesmen] = useState(false);
  const [location, setLocation] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [contractPage, setContractPage] = useState(false);
  const [list, setList] = useState(false);
  const [activeAdmin, setActiveAdmin] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [activeMessages, setActiveMessages] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [table, setTable] = useState(false);
  const [filter, setFilter] = useState(false);
  const [stageFilter, setStageFilter] = useState(false);
  const [countryFilter, setCountryFilter] = useState(false);
  const [salesForm, setSalesForm] = useState(false);
  const [adminForm, setNewAdminForm] = useState(false);
  const [adminErr, setAdminErr] = useState(false);
  const [checkAdminErr, setCheckAdminErr] = useState(false);

  const handleNewAdmin = (e) => {
    e.preventDefault();
    if (document.getElementById("confirmID").value === "") {
      setCheckAdminErr(true);
      setAdminErr("Code required for authorization");
    } else if (document.getElementById("confirmID").value !== code) {
      setCheckAdminErr(true);
      setAdminErr("Wrong code");
    } else {
      setCheckAdminErr(false);
      newAdmin("master/register", newAdminValues, setNewAdminForm);
    }
  };
  const handleAdminValues = (e) => {
    const { name, value } = e.target;
    setNewAdminValues({ ...newAdminValues, [name]: value });
  };
  const handleChange = (e) => {
    if (newClient) {
      setInputs(e, newClientData, setNewClientData);
    }
  };
  const handleContract = (e) => {
    setInputs(e, formValues, setFormValues);
  };
  const handleStartDate = (e) => {
    const { name, value } = e.target;
    let start = new Date(value);
    let now = new Date();
    if (start.setHours(0, 0, 0, 0) >= now.setHours(0, 0, 0, 0)) {
      setFormValues({
        ...formValues,
        stage: "1",
        status: "under construction",
        [name]: value,
      });
      setStageAndStatus({
        ...stageAndStatus,
        stage: "1",
        status: "under construction",
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleShowTable = async (e, ind) => {
    setTable(!table);
    allTables.forEach((t, i) => {
      data.forEach((d, indField) => {
        allContracts.forEach((contra, inde) => {
          perecentage.forEach((perc, indexField) => {
            arrow.forEach((arr, index) => {
              if (
                i === ind &&
                index === ind &&
                inde === ind &&
                indexField === ind &&
                indField === ind &&
                !table
              ) {
                perc.classList.add("activeContDetail");
                contra.classList.add("activeTable");
                t.classList.add("showTable");
                arr.classList.add("changeArrow");
                d.classList.add("activeContDetail");
              } else if (
                i === ind &&
                index === ind &&
                inde === ind &&
                indexField === ind &&
                indField === ind &&
                table
              ) {
                perc.classList.remove("activeContDetail");
                contra.classList.remove("activeTable");
                t.classList.remove("showTable");
                arr.classList.remove("changeArrow");
                d.classList.remove("activeContDetail");
              } else if (
                i !== ind &&
                index !== ind &&
                inde !== ind &&
                indexField !== ind &&
                indField !== ind
              ) {
                perc.classList.remove("activeContDetail");
                contra.classList.remove("activeTable");
                t.classList.remove("showTable");
                arr.classList.remove("changeArrow");
                d.classList.remove("activeContDetail");
              }
            });
          });
        });
      });
    });
  };
  const handleDeleteContract = (e) => {
    setCodeStatus(true);
    const { innerHTML } = e.target;
    if (innerHTML === "Delete") {
      if (enteredCode === deleteCode) {
        if (localStorage.getItem("type") === "contracts") {
          deleteContract(
            `contract/delete/${localStorage.getItem("contractID")}`,
            setContracts,
            setConfirmDelete,
            setUser
          );
          localStorage.removeItem("contractID");
        } else {
          deleteSalesman(
            `sales/delete/${localStorage.getItem("salesID")}`,
            setSales,
            setConfirmDelete
          );
          localStorage.removeItem("salesID");
        }
        localStorage.removeItem("type");
        setAskDelete(false);
        setAction(true);
        setCheckCode(false);
        setCodeStatus(false);
        setEnteredCode("");
      } else {
        setCheckCode(true);
      }
    }
  };
  const handleEditChange = async (e) => {
    setInputs(e, formValues, setFormValues);
  };
  const getContract = async (id) => {
    await userContract(
      `contract/sendContract/${id}`,
      formValues,
      setFormValues
    );
  };
  const handleDownload = (file) => {
    download(`variation/download/${file}`);
  };
  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (fileUploaded) {
      const formData = new FormData();
      formData.append("file", file);
      newVariation(`variation/new/${id}`, formData);
    }
    edit(
      `contract/edit/${id}`,
      formValues,
      setContracts,
      setEditAction,
      setAction
    );
    setCheckUserContracts(true);
    setFileUploaded(false);

    if (localStorage.getItem("Noty") === undefined) {
      setNotification(notification + 1);
      localStorage.setItem("Noty", notification);
    } else {
      localStorage.setItem("Noty", Number(localStorage.getItem("Noty")) + 1);
    }
  };
  const handleSalesman = (e) => {
    e.preventDefault();
    newSalesman("sales/new", salesman, setAction);
    setSalesForm(false);
  };
  const editContract = (userCode) => {
    editView.current.scrollIntoView({ behavior: "smooth" });
    setEditContractPage(true);
    setContractPage(false);
    localStorage.setItem("code", userCode);
    setGetUserAction(true);
    setCheckUserContracts(true);
  };
  const handleStatus = (i) => {
    document.querySelectorAll(".visitorList").forEach((v, ind) => {
      if (ind === i) {
        v.classList.toggle("activeVisitorList");
      } else {
        v.classList.remove("activeVisitorList");
      }
    });
    document.querySelectorAll(".fa-angle-left").forEach((icon, index) => {
      if (index === i) {
        icon.classList.toggle("rotateStatus");
      } else {
        icon.classList.remove("rotateStatus");
      }
    });
  };
  const handleVisitorStatus = async (e, Id) => {
    Notes = e.target.innerHTML;
    editVisitorStatus(`visitor/edit/${Id}`, setVisitors, Notes);
  };
  const handleLogout = () => {
    logout(`master/logout`, setExit);
  };
  const handleConfirmPause = () => {
    confirmPause(
      `contract/pause/${localStorage.getItem("contractID")}`,
      setContracts
    );
  };
  const handleResetPause = (ID) => {
    resetPause(`contract/resetPause/${ID}`, setContracts);
  };
  const handleCancelPause = () => {
    cancelPause(
      `contract/cancelPause/${localStorage.getItem("contractID")}`,
      setContracts
    );
    setActiveNotes(false);
  };

  useEffect(() => {
    if (action === true) {
      function Data() {
        account("master/account", setUser);
        contracts("contract/contracts", setContracts);
        all("sales/all", setSales, setAction, setLabels, setLabelsData);
        visitors("visitor/visitors", setVisitors);
      }
      Data();
      setAction(false);
    }

    if (!loaded || action === true) {
      function allUsers() {
        users("user/users", setClients, setLoaded, setAction);
      }
      allUsers();
    }
  }, [action, loaded, setAction]);

  useEffect(() => {
    data = document.querySelectorAll(".state");
    perecentage = document.querySelectorAll(".percentage");
    allContracts = document.querySelectorAll(".cont");
    arrow = document.querySelectorAll(".arrow");
    allTables = document.querySelectorAll(".userData");
    if (confirmDelete) {
      setTimeout(() => {
        setConfirmDelete(false);
        setActiveMessages(false);
      }, 1200);
    }

    if (getUserAction) {
      function getUser() {
        targetUser(`user/user/${localStorage.getItem("code")}`, setClientData);
        setGetUserAction(false);
      }
      getUser();
    }
    if (checkUserContracts) {
      async function getUserContracts() {
        await userContracts(
          `contract/userContracts/${localStorage.getItem("code")}`,
          setTargetUserContracts
        );
        Variations("variation/variations", setVariations, setAction);
        setCheckUserContracts(false);
      }
      getUserContracts();
    }
  });
  useEffect(() => {
    account("master/account", setUser);
    contracts("contract/contracts", setContracts);
    all("sales/all", setSales, setAction, setLabels, setLabelsData);
    visitors("visitor/visitors", setVisitors);
    setAction(false);
  }, []);

  useEffect(() => {
    let x = [];
    labels.map((l, ind) => {
      labelsData.map((d, i) => {
        colors.map((c, index) => {
          if (ind === i && ind === index) {
            x.push({
              label: l,
              data: d,
              backgroundColor: c,
              barThickness: 25,
              barPercentage: 0,
            });
          }
        });
      });
    });
    setSalesTarget(x);
  }, [labels]);

  return (
    <React.Fragment>
      <Administrator
        activeAdmin={activeAdmin}
        setActiveAdmin={setActiveAdmin}
        add={add}
        setAdd={setAdd}
      />
      <section id="board" className="d-lg-none">
        <div>
          <div>
            <h5>Welcome, {user.name}</h5>
            <p>Track, manage, and forecast all contracts</p>
            <div>
              <div>
                <Link to="/board/contract">
                  <span>
                    <i className="fa-solid fa-plus"></i>
                    <p>Contract</p>
                  </span>
                </Link>

                <span onClick={() => setActiveAdmin(true)}>
                  <i className="fa-solid fa-plus"></i>
                  <p>Salesman</p>
                </span>
              </div>

              <a href="/login" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div>
                <h2>Projects</h2>
                <span>{user.total_contracts}</span>
              </div>
              <p>all</p>
            </div>

            <div className="col-6">
              <div>
                <h2>Completed</h2>
                <span>{user.completed_contracts}</span>
              </div>
              <p>done</p>
            </div>

            <div className="col-6">
              <div>
                <h2>Pending</h2>
                <span>{user.pending_contracts}</span>
              </div>
              <p>loading</p>
            </div>

            <div className="col-6">
              <div>
                <h2>Canceled</h2>
                <span>{user.canceled_contracts}</span>
              </div>
              <p>terminate</p>
            </div>
          </div>

          <div>
            <div label="Progressbar with separators">
              <CircularProgressbarWithChildren
                value={Math.round(
                  (user.completed_contracts / user.total_contracts) * 100
                )}
                text={
                  user.total_contracts > 0
                    ? `${Math.round(
                        (user.completed_contracts / user.total_contracts) * 100
                      )}%`
                    : "0%"
                }
                strokeWidth={10}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  textColor: "black",
                  pathColor: `${
                    Math.round(
                      (user.completed_contracts / user.total_contracts) * 100
                    ) <= 25
                      ? "rgb(248, 28, 28)"
                      : Math.round(
                          (user.completed_contracts / user.total_contracts) *
                            100
                        ) <= 75
                      ? "rgb(255, 226, 65)"
                      : "rgb(62, 255, 104)"
                  }`,
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

            <div>
              <h5>performance</h5>
              <div>
                <span>
                  Weak <i className="fa-solid fa-square"></i>
                </span>
                <span>
                  Normal <i className="fa-solid fa-square"></i>
                </span>
                <span>
                  Perfect <i className="fa-solid fa-square"></i>
                </span>
              </div>
            </div>
          </div>

          <div>
            <section>
              <div>
                <span>
                  <i className="fa-solid fa-arrow-down-short-wide"></i>
                  <p onClick={() => setFilter(!filter)}>Filter</p>
                  <div className={filter ? "filterLi showList" : "filterLi"}>
                    <ul>
                      <li
                        onClick={() => {
                          setCountryFilter(true);
                          setFilter(false);
                          setStageFilter(false);
                          setQuery("");
                        }}
                      >
                        Country
                      </li>
                      <hr />
                      <li
                        onClick={() => {
                          setStageFilter(true);
                          setCountryFilter(false);
                          setFilter(false);
                          setQuery("");
                        }}
                      >
                        Stages
                      </li>
                    </ul>
                  </div>
                </span>
                <select
                  className={countryFilter ? "showFilterLi" : ""}
                  onChange={(e) => {
                    if (e.target.value === "all") {
                      setQuery("");
                    } else {
                      setQuery(e.target.value);
                    }
                  }}
                >
                  <option value="all">All</option>
                  <option value="dubai">Dubai</option>
                  <option value="al ain">Al Ain</option>
                  <option value="abu dhabi">Abu Dhabi</option>
                </select>

                <select
                  className={stageFilter ? "stageFilter" : ""}
                  onChange={(e) => {
                    if (e.target.value === "all") {
                      setQuery("");
                    } else {
                      setQuery(e.target.value);
                    }
                  }}
                >
                  <option value="all">All</option>
                  <option value="1">stage 1</option>
                  <option value="2">stage 2</option>
                  <option value="3">stage 3</option>
                  <option value="4">stage 4</option>
                  <option value="0"> cancelled stage</option>
                </select>
              </div>
              <PhoneInput
                disableCountryCode={false}
                enableAreaCodes={false}
                disableDropdown={true}
                className="mobile"
                placeholder="+9715XX"
                name="mobile"
              />
            </section>

            {conts.length > 0
              ? conts
                  .filter((c) => {
                    if (query === "") {
                      return c;
                    } else if (
                      query === "dubai" ||
                      query === "al ain" ||
                      query === "abu dhabi"
                    ) {
                      return c.location
                        .toLowerCase()
                        .includes(query.toLowerCase());
                    } else if (
                      query === "1" ||
                      query === "2" ||
                      query === "3" ||
                      query === "4" ||
                      query === "0"
                    ) {
                      return c.history.slice(-1)[0].stage.toString() === query;
                    } else {
                      return c;
                    }
                  })
                  .map((c, ind) => {
                    return (
                      <div className="contractCont">
                        <div className="cont">
                          <div className="percentage">
                            <Link to="/board/view">
                              <i
                                className="fa-solid fa-eye"
                                onClick={() => {
                                  if (
                                    localStorage.getItem("code") === undefined
                                  ) {
                                    localStorage.setItem("code", c.user_code);
                                  } else {
                                    localStorage.setItem("code", c.user_code);
                                  }
                                }}
                              ></i>
                            </Link>
                            <h5>{c.owner}</h5>
                            <div>
                              <p>
                                <span>Location: </span> {c.location}
                              </p>
                              <p>
                                <span>status: </span>
                                {c.history.slice(-1)[0].status}
                              </p>
                              <p>
                                <span>stage: </span>
                                {c.history.slice(-1)[0].stage}
                              </p>
                            </div>
                          </div>
                          <div className="state" label="Stroke width">
                            <CircularProgressbar
                              value={
                                c.history.slice(-1)[0].stage === 1
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
                              strokeWidth={5}
                              styles={buildStyles({
                                strokeLinecap: "butt",
                                textColor: "black",
                                pathColor: `${
                                  c.history.slice(-1)[0].stage === 1
                                    ? "rgb(248, 28, 28)"
                                    : c.history.slice(-1)[0].stage === 2
                                    ? "rgb(255, 226, 65)"
                                    : "rgb(62, 255, 104)"
                                }`,
                              })}
                            />
                          </div>
                          <i
                            className="arrow fa-solid fa-angle-down"
                            onClick={(e) => {
                              handleShowTable(e, ind);
                            }}
                          ></i>
                        </div>
                        <div className="userData">
                          <table>
                            <thead>
                              <tr>
                                <th>Assign Date</th>
                                <th>Start</th>
                                <th>End</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{c.history.slice(-1)[0].assign_date}</td>
                                <td>{c.history.slice(-1)[0].start_date}</td>
                                <td>{c.history.slice(-1)[0].end_date}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })
              : ""}
          </div>
        </div>
      </section>

      <section id="desktop" className="d-none d-lg-flex">
        <section id="desktopNav">
          <Link>
            <h6>
              {t("Logo.name1")} <span>{t("Logo.name2")}</span>
            </h6>
          </Link>
        </section>

        <section id="desktopCont">
          <div className="listCont">
            <h5>Hello, {user.name}</h5>
            <p>Track, manage, and forecast all contracts</p>
            <hr />
            <ul>
              <Link
                to="/board"
                onClick={() => {
                  setClient("");
                  setContractPage(false);
                  setEditContractPage(false);
                  setEditAction(false);
                  setSalesForm(false);
                  setNewAdminForm(false);
                }}
              >
                <i className="fa-solid fa-house"></i>
                <li>Overview</li>
              </Link>
              <Link
                onClick={() => {
                  newAdminView.current.scrollIntoView({ behavior: "smooth" });
                  setContractPage(false);
                  setEditContractPage(false);
                  setEditAction(false);
                  setSalesForm(false);
                  setNewAdminForm(true);
                }}
              >
                <i className="fa-solid fa-plus"></i>
                <li>New Admin</li>
              </Link>
              <Link
                onClick={() => {
                  salesView.current.scrollIntoView({ behavior: "smooth" });
                  setSalesForm(true);
                  setNewAdminForm(false);
                }}
              >
                <i className="fa-solid fa-plus"></i>
                <li>Salesman</li>
              </Link>
              <Link
                onClick={() => {
                  contractView.current.scrollIntoView({ behavior: "smooth" });
                  setContractPage(true);
                  setEditContractPage(false);
                  setEditAction(false);
                  setSalesForm(false);
                  setNewAdminForm(false);
                }}
              >
                <i className="fa-solid fa-plus"></i>
                <li>Contract</li>
              </Link>

              <a href="/login">
                <i className="fa-solid fa-person-running"></i>
                <li>Logout</li>
              </a>
            </ul>
          </div>

          <div
            className={
              editContractPage || salesForm || adminForm
                ? "boardCont"
                : "boardCont boardCont-withScroll"
            }
          >
            <section
              className={
                contractPage
                  ? "boardView deActiveBoardLeft"
                  : editContractPage
                  ? "boardView deActiveBoardRight"
                  : "boardView"
              }
            >
              <div className="row">
                <div className="col-3 ">
                  <h4>Projects</h4>
                  <label>{user.total_contracts}</label>
                  <p>All</p>
                </div>

                <div className="col-3 ">
                  <h4>Under construction</h4>
                  <label>{user.pending_contracts}</label>
                  <p>In progress</p>
                </div>

                <div className="col-3">
                  <h4>Completed</h4>
                  <label>{user.completed_contracts}</label>
                  <p>Finished</p>
                </div>

                <div className="col-3 ">
                  <h4>Canceled</h4>
                  <label>{user.canceled_contracts}</label>
                  <p>Terminated</p>
                </div>
              </div>
              <div className="eval">
                <div className="chart">
                  {sales.length > 0 && labels !== [] ? (
                    <Bar
                      style={{
                        width: "100%",
                        height: "350px",
                        margin: "5px",
                      }}
                      data={{
                        labels: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                        datasets: salesTargets,
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    ></Bar>
                  ) : (
                    ""
                  )}
                </div>
                <div className="performance">
                  <div className="circleProgress">
                    <CircularProgressbarWithChildren
                      value={Math.round(
                        (user.completed_contracts / user.total_contracts) * 100
                      )}
                      text={
                        user.total_contracts > 0
                          ? `${Math.round(
                              (user.completed_contracts /
                                user.total_contracts) *
                                100
                            )}%`
                          : "0%"
                      }
                      strokeWidth={10}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textColor: "grey",
                        pathColor: `${
                          Math.round(
                            (user.completed_contracts / user.total_contracts) *
                              100
                          ) <= 25
                            ? "rgb(248, 28, 28)"
                            : Math.round(
                                (user.completed_contracts /
                                  user.total_contracts) *
                                  100
                              ) <= 50
                            ? "rgb(255, 226, 65)"
                            : "rgb(119, 253, 119)"
                        }`,
                      })}
                    >
                      <RadialSeparators
                        count={8}
                        style={{
                          background: "#fff",
                          width: "2px",
                          height: `${10}%`,
                          boxShadow: "0px 0px 0.7px black",
                        }}
                      />
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="data">
                    <h5>Performance</h5>
                    <ul>
                      <li>
                        <i className="fa-solid fa-square "></i> weak
                      </li>
                      <li>
                        <i className="fa-solid fa-square "></i> Normal
                      </li>
                      <li>
                        <i className="fa-solid fa-square "></i> Best
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="tableView">
                <div className="tableContainer">
                  <table>
                    <thead>
                      <tr>
                        <th>Owner</th>
                        <th>Assign-Date</th>
                        <th>Start-Date</th>
                        <th>Stage</th>
                        <th>Status</th>
                        <th>End-Date</th>
                        <th>Pause Days</th>
                        <th>Note</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conts.length > 0 ? (
                        conts.map((c, i) => {
                          return (
                            <tr key={i}>
                              <td>{c.owner}</td>
                              <td>{c.history.slice(-1)[0].assign_date}</td>
                              <td>{c.history.slice(-1)[0].start_date}</td>
                              <td>{c.history.slice(-1)[0].stage}</td>
                              <td>{c.history.slice(-1)[0].status}</td>
                              <td>{c.history.slice(-1)[0].end_date}</td>
                              <td>{c.history.slice(-1)[0].pause_days}</td>
                              {!c.checkNote ? (
                                <td className="noVariations"></td>
                              ) : (
                                <td
                                  className="newVariation"
                                  onClick={() =>
                                    seenContract(
                                      `contract/seen/${c._id}`,
                                      setAction
                                    )
                                  }
                                >
                                  <i
                                    className="fs-6 fa-solid fa-eye"
                                    onClick={async () => {
                                      await contractNotes(
                                        `contract/notes/${c._id}`,
                                        setClientNotes
                                      );
                                      setActiveNotes(true);
                                      localStorage.setItem("Noty", 0);
                                      localStorage.setItem("contractID", c._id);
                                    }}
                                  ></i>
                                  {!c.history.slice(-1)[0].seen ? (
                                    <span>
                                      {localStorage.getItem("Noty") ===
                                      undefined
                                        ? notification
                                        : localStorage.getItem("Noty")}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              )}

                              <td>
                                <div className="d-flex justify-content-evenly align-items-center">
                                  <i
                                    className="fa-solid fa-pen"
                                    onClick={() => editContract(c.user_code)}
                                  ></i>

                                  <i
                                    onClick={() => {
                                      setCheckDelete(true);
                                      setActiveMessages(true);
                                      setAskDelete(true);
                                      localStorage.setItem("type", "contracts");
                                      localStorage.setItem("contractID", c._id);
                                    }}
                                    className="fa-solid fa-trash text-danger"
                                  ></i>
                                </div>
                              </td>
                              {c.history.slice(-1)[0].confirmPause ? (
                                <td className="pauseBG" colSpan={7}>
                                  <button
                                    onClick={() => handleResetPause(c._id)}
                                  >
                                    Reset
                                  </button>
                                </td>
                              ) : (
                                ""
                              )}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
                            className="text-danger p-3 fw-bold fs-5 "
                          >
                            No Data to Show !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="visitor-sales">
                <div className="visitor-tableView">
                  <div>
                    <div>
                      <input
                        type="number"
                        onChange={(e) => setVisitorQuery(e.target.value)}
                        placeholder="Search for mobile"
                      />
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <ReactToPrint
                      trigger={() => {
                        return <button>Export</button>;
                      }}
                      content={() => {
                        return printedTable.current;
                      }}
                      pageStyle
                      documentTitle="House Design"
                    />
                  </div>

                  <div className="tableContainer" ref={printedTable}>
                    <table>
                      <thead>
                        <tr>
                          <th>Visitor</th>
                          <th>Mobile</th>
                          <th>Assign Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {webVisitors.length > 0 ? (
                          webVisitors
                            .filter((wv) => {
                              if (visitorQuery === "") {
                                return wv;
                              } else {
                                return wv.mobile.includes(visitorQuery);
                              }
                            })
                            .map((wv, i) => {
                              return (
                                <tr key={i}>
                                  <td>{wv.name}</td>
                                  <td>{wv.mobile}</td>
                                  <td>{wv.assign_date}</td>
                                  <td onClick={() => handleStatus(i)}>
                                    <div className="statusOption">
                                      <p>{wv.Notes}</p>
                                      <i className=" fa-solid fa-angle-left"></i>
                                    </div>
                                    <ul
                                      name="Notes"
                                      className="visitorList"
                                      onClick={(e) =>
                                        handleVisitorStatus(e, wv._id)
                                      }
                                    >
                                      <li id="1">Interested now</li>
                                      <li id="2">Interested later</li>
                                      <li id="3">Not interested</li>
                                      <li id="4">Need discount</li>
                                      <li id="5">
                                        Signed with another company
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-danger p-3 fw-bold fs-5 "
                            >
                              No Data to Show !
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="sales-tableView">
                  <div>
                    <ReactHTMLTableToExcel
                      buttonText="Export Excel"
                      table="sales"
                      sheet="Sales Sheet"
                      filename="Salesmen Report"
                      className="excel"
                    />
                  </div>
                  <div className="tableContainer" ref={salesPrintedTable}>
                    <table id="sales">
                      <thead>
                        <tr>
                          <th>Salesman</th>
                          <th className="deletePrintedSales">Annual Target</th>
                          <th className="d-none needed">Annual Achieving</th>
                          <th className="deletePrintedSales">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.length > 0 ? (
                          sales.map((s, i) => {
                            return (
                              <tr key={i}>
                                <td>{s.name}</td>
                                <td className="deletePrintedSales">
                                  {s.annual_target} AED
                                </td>
                                <td className="d-none needed">
                                  {s.annual_achieving} AED
                                </td>
                                <td className="deletePrintedSales">
                                  <i
                                    className="text-danger fa-solid fa-trash"
                                    onClick={() => {
                                      setCheckDelete(true);
                                      setActiveMessages(true);
                                      setAskDelete(true);
                                      localStorage.setItem("type", "sales");
                                      localStorage.setItem("salesID", s._id);
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={3} className="text-danger fs-5">
                              No data to show!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className={activeNotes ? "notes" : "notes deavtiveNotes"}>
                <div className="noteContainer">
                  <div>
                    {activeNotes
                      ? clientNotes.history.map((h, i) => {
                          if (h.note !== null) {
                            return (
                              <div className="noteContent" key={i}>
                                <div
                                  className={
                                    h.pauseStatus === true ? "pauseFlag" : ""
                                  }
                                >
                                  <h6>{h.editor}</h6>
                                  <p>{h.lastUpdate}</p>
                                </div>
                                <textarea readOnly>{h.note}</textarea>
                                <div
                                  className={
                                    h.pauseStatus === true
                                      ? "pauseApproval"
                                      : "d-none"
                                  }
                                >
                                  <button onClick={handleConfirmPause}>
                                    Approve
                                  </button>
                                  <button onClick={handleCancelPause}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            );
                          }
                        })
                      : ""}
                  </div>
                  <button onClick={() => setActiveNotes(false)}>close</button>
                </div>
              </div>
            </section>

            <section
              className={
                contractPage && !editContractPage
                  ? "newContract activeNewContract"
                  : editContractPage
                  ? "doubleNewContract"
                  : "newContract"
              }
              ref={contractView}
            >
              <div className="switch">
                <div>
                  <input
                    placeholder="Choose"
                    value={client}
                    onClick={() => setList(!list)}
                    className="locCont"
                    readOnly
                  />
                  <i
                    className={
                      list
                        ? "fa-solid fa-chevron-left rotateArrow"
                        : "fa-solid fa-chevron-left"
                    }
                    onClick={() => setList(!list)}
                  ></i>
                  <div>
                    <ul
                      className={list && clients.length > 0 ? "activeList" : ""}
                    >
                      {clients.length > 0 ? (
                        <li>
                          <i className="fa-solid fa-magnifying-glass"></i>
                          <input
                            type="search"
                            onChange={(e) => setQuery(e.target.value)}
                            name="search"
                            id="search"
                          />
                        </li>
                      ) : (
                        ""
                      )}
                      {clients
                        .filter((c) => {
                          if (query === "") {
                            return c;
                          } else {
                            return c.name
                              .toLowerCase()
                              .includes(query.toLowerCase());
                          }
                        })
                        .map((c, i) => {
                          return (
                            <li
                              key={i}
                              onClick={(e) => {
                                setClient(e.target.innerHTML);
                                setNewClient(false);
                                setList(false);
                                setTarget(c);
                                localStorage.setItem("code", c.code);
                              }}
                            >
                              {c.name}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>

                <p>Pleas create new client or contract</p>
              </div>

              <div className="clientInfo">
                <form>
                  <h5>{t("Contract.titles.personal")}</h5>
                  <div className="row infoCont">
                    <div className="info col-4">
                      <label>{t("Contract.labels.name")}</label>
                      {newClient ? (
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          className="inp"
                        />
                      ) : (
                        <input
                          type="text"
                          name="name"
                          value={client !== "" ? target.name : ""}
                          readOnly
                        />
                      )}
                    </div>
                    <div className="info col-4">
                      <label>{t("Contract.labels.email")}</label>
                      {newClient ? (
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          className="email inp"
                        />
                      ) : (
                        <input
                          type="text"
                          name="email"
                          value={client !== "" ? target.email : ""}
                          readOnly
                        />
                      )}
                    </div>
                    <div className="info col-4">
                      <label>
                        {newClient
                          ? t("Contract.labels.mobile")
                          : t("Contract.labels.code")}
                      </label>
                      {newClient ? (
                        <PhoneInput
                          className="phone"
                          name="mobile"
                          country={"ae"}
                          countryCodeEditable={false}
                          disableDropdown={true}
                          inputClass="inp"
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          value={newClientData.mobile}
                          onChange={(e) =>
                            setNewClientData({ ...newClientData, mobile: e })
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          name="code"
                          value={client !== "" ? target.code : ""}
                          readOnly
                        />
                      )}
                    </div>
                  </div>

                  <div className="row infoCont">
                    <div className="info col-4">
                      <label>{t("Contract.labels.password")}</label>
                      {newClient ? (
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          className="inp"
                        />
                      ) : (
                        <input
                          type="password"
                          name="password"
                          disabled
                          readOnly
                        />
                      )}
                    </div>
                    <div className="info col-4 ">
                      <label>{t("Contract.labels.location")}</label>
                      {newClient ? (
                        <div
                          className="clientLoc"
                          onClick={() => setLocation(!location)}
                        >
                          <input
                            placeholder="City"
                            name="location"
                            className="locCont inp"
                            value={clientLocation}
                            readOnly
                          />
                          <i
                            className={
                              location
                                ? "fa-solid fa-caret-left activeClientLoc"
                                : "fa-solid fa-caret-left"
                            }
                            onClick={() => setLocation(!location)}
                          ></i>
                          <div>
                            <ul
                              className={location ? "activeClientCities" : ""}
                            >
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.1")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.2")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.3")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.4")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.5")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.6")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.7")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.8")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.9")}
                              </li>
                              <li
                                onClick={(e) => {
                                  setClientLocation(e.target.innerHTML);
                                  setNewClientData({
                                    ...newClientData,
                                    location: e.target.innerHTML,
                                  });
                                }}
                              >
                                {t("Contract.cities.10")}
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <input
                          placeholder="City"
                          name="location"
                          value={client !== "" ? target.location : ""}
                          readOnly
                        />
                      )}
                    </div>
                    <div className="info col-4 buttons">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          if (e.target.innerHTML === "New") {
                            await setNewClient(true);
                            setClient("");
                            document
                              .querySelectorAll(".inp")
                              .forEach((ele) => (ele.value = ""));
                          } else {
                            for (let x = 0; x <= 5; x++) {
                              if (x < 5) {
                                if (
                                  document.querySelectorAll(".inp")[x].value ===
                                  ""
                                ) {
                                  document
                                    .querySelectorAll(".inp")
                                    [x].classList.add("inpOutLine");
                                  return;
                                } else {
                                  document
                                    .querySelectorAll(".inp")
                                    [x].classList.remove("inpOutLine");
                                  continue;
                                }
                              } else {
                                if (
                                  document
                                    .querySelector(".email")
                                    .value.match(validRegex)
                                ) {
                                  newUser(
                                    "user/register",
                                    newClientData,
                                    setNewClientData,
                                    setAction
                                  );
                                  setNewClient(false);
                                  document
                                    .querySelectorAll(".inp")
                                    .forEach((ele) => (ele.value = ""));
                                  setLoaded(false);
                                  setClientLocation("");
                                } else {
                                  document
                                    .querySelector(".email")
                                    .classList.add("inpOutLine");
                                  return;
                                }
                              }
                            }
                          }
                        }}
                      >
                        {newClient ? "Add" : "New"}
                      </button>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          setNewClient(false);
                          document.querySelectorAll(".inp").forEach((ele) => {
                            ele.value = "";
                          });
                          setLocation(false);
                          setClientLocation("");
                        }}
                        className={newClient ? "activeBtnCancel" : ""}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="contract">
                <form>
                  <h5>{t("Contract.titles.contract")}</h5>

                  <div className="row infoCont">
                    <div className="info col-4">
                      <label>{t("Contract.labels.assignDate")}</label>
                      {client !== "" ? (
                        <input
                          type="date"
                          className="infoData"
                          name="assign_date"
                          onChange={handleContract}
                        />
                      ) : (
                        <input
                          type="date"
                          value=""
                          name="assign_date"
                          readOnly
                        />
                      )}
                    </div>

                    <div className="info col-4">
                      <label>{t("Contract.labels.start")}</label>
                      {client !== "" ? (
                        <input
                          type="date"
                          className="infoData"
                          name="start_date"
                          onChange={handleStartDate}
                        />
                      ) : (
                        <input
                          type="date"
                          name="start_date"
                          value=""
                          readOnly
                        />
                      )}
                    </div>

                    <div className="info col-4">
                      <label>{t("Contract.labels.end")}</label>
                      {client !== "" ? (
                        <input
                          className="infoData"
                          type="date"
                          name="end_date"
                          onChange={handleContract}
                        />
                      ) : (
                        <input type="date" name="end_date" value="" readOnly />
                      )}
                    </div>
                  </div>

                  <div className="row infoCont">
                    <div className="info col-4 ">
                      <label>{t("Contract.labels.stage")}</label>
                      <div className="stages">
                        {client !== "" ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="infoData"
                              name="stage"
                              onClick={() => setCheckStages(!checkStages)}
                              value={stageAndStatus.stage}
                              readOnly
                            />
                            <i
                              onClick={() => setCheckStages(!checkStages)}
                              className={
                                checkStages
                                  ? "fa-solid fa-caret-left activeStagesArrow"
                                  : "fa-solid fa-caret-left"
                              }
                            ></i>
                            <div>
                              <ul className={checkStages ? "activeStages" : ""}>
                                <li
                                  onClick={(e) => {
                                    setCheckStages(!checkStages);
                                    setFormValues({
                                      ...formValues,
                                      stage: e.target.innerHTML,
                                      status: "canceled",
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      stage: e.target.innerHTML,
                                      status: "canceled",
                                    });
                                  }}
                                >
                                  0
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckStages(!checkStages);
                                    setFormValues({
                                      ...formValues,
                                      stage: e.target.innerHTML,
                                      status: "under construction",
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      stage: e.target.innerHTML,
                                      status: "under construction",
                                    });
                                  }}
                                >
                                  1
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckStages(!checkStages);
                                    setFormValues({
                                      ...formValues,
                                      stage: e.target.innerHTML,
                                      status: "under construction",
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      stage: e.target.innerHTML,
                                      status: "under construction",
                                    });
                                  }}
                                >
                                  2
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckStages(!checkStages);
                                    setFormValues({
                                      ...formValues,
                                      stage: e.target.innerHTML,
                                      status: "under construction",
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      stage: e.target.innerHTML,
                                      status: "under construction",
                                    });
                                  }}
                                >
                                  3
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckStages(!checkStages);
                                    setFormValues({
                                      ...formValues,
                                      stage: e.target.innerHTML,
                                      status: "finishing",
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      stage: e.target.innerHTML,
                                      status: "finishing",
                                    });
                                  }}
                                >
                                  4
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckStages(!checkStages);
                                    setFormValues({
                                      ...formValues,
                                      stage: e.target.innerHTML,
                                      status: "completed",
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      stage: e.target.innerHTML,
                                      status: "completed",
                                    });
                                  }}
                                >
                                  5
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        ) : (
                          <input type="text" name="stage" value="" readOnly />
                        )}
                      </div>
                    </div>

                    <div className="info col-4">
                      <label>{t("Contract.labels.status")}</label>
                      {client !== "" ? (
                        <input
                          value={stageAndStatus.status}
                          type="text"
                          className="infoData"
                          name="status"
                          readOnly
                        />
                      ) : (
                        <input type="text" name="status" value="" readOnly />
                      )}
                    </div>

                    <div className="info col-4 ">
                      <label>{t("Contract.labels.location")}</label>
                      <div className="contractLoc">
                        {client !== "" ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="infoData"
                              name="location"
                              value={stageAndStatus.location}
                              onClick={() =>
                                setCheckContractLocation(!checkContractLoc)
                              }
                              placeholder="City"
                              readOnly
                            />
                            <i
                              onClick={() =>
                                setCheckContractLocation(!checkContractLoc)
                              }
                              className={
                                checkContractLoc
                                  ? "fa-solid fa-caret-left activeContractLocArrow"
                                  : "fa-solid fa-caret-left"
                              }
                            ></i>
                            <div>
                              <ul
                                className={
                                  checkContractLoc ? "activeContractLoc" : ""
                                }
                              >
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.1")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.2")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.3")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.4")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.5")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.6")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.7")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.8")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.9")}
                                </li>
                                <li
                                  onClick={(e) => {
                                    setCheckContractLocation(!checkContractLoc);
                                    setFormValues({
                                      ...formValues,
                                      location: e.target.innerHTML,
                                    });
                                    setStageAndStatus({
                                      ...stageAndStatus,
                                      location: e.target.innerHTML,
                                    });
                                  }}
                                >
                                  {t("Contract.cities.10")}
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        ) : (
                          <input
                            type="text"
                            placeholder="City"
                            name="location"
                            readOnly
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row infoCont">
                    <div className="info col-4">
                      <label>{t("Contract.labels.cost")}</label>
                      {client !== "" ? (
                        <input
                          type="number"
                          className="infoData"
                          name="total_cost"
                          value={stageAndStatus.total_cost}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              total_cost: Number(e.target.value),
                            });
                            setStageAndStatus({
                              ...stageAndStatus,
                              total_cost: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        <input
                          type="number"
                          name="total_cost"
                          value=""
                          readOnly
                        />
                      )}
                    </div>

                    <div className="info col-4 ">
                      <label>{t("Contract.labels.owner")}</label>
                      <div className="salesmen">
                        {client !== "" ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="infoData"
                              name="sale_executive"
                              value={stageAndStatus.sale_executive}
                              onClick={() => setCheckSalesmen(!checkSalesmen)}
                              readOnly
                            />
                            <i
                              className={
                                checkSalesmen
                                  ? "fa-solid fa-caret-left activeSalesmenArrow"
                                  : "fa-solid fa-caret-left"
                              }
                              onClick={() => setCheckSalesmen(!checkSalesmen)}
                            ></i>
                            <div>
                              <ul
                                className={
                                  checkSalesmen && sales.length > 0
                                    ? "activeSalesmen"
                                    : ""
                                }
                              >
                                {sales.map((s, i) => {
                                  return (
                                    <li
                                      key={i}
                                      onClick={(e) => {
                                        setCheckSalesmen(!checkSalesmen);
                                        setFormValues({
                                          ...formValues,
                                          sale_executive: s.name,
                                        });
                                        setStageAndStatus({
                                          ...stageAndStatus,
                                          sale_executive: s.name,
                                        });
                                      }}
                                    >
                                      {s.name}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </React.Fragment>
                        ) : (
                          <input type="text" name="sale_executive" readOnly />
                        )}
                      </div>
                    </div>

                    <div
                      className={
                        client !== ""
                          ? "info col-4 buttons activeButtons"
                          : "info col-4 buttons"
                      }
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          for (
                            let i = 0;
                            i < document.querySelectorAll(".infoData").length;
                            i++
                          ) {
                            if (
                              document.querySelectorAll(".infoData")[i]
                                .value === ""
                            ) {
                              document
                                .querySelectorAll(".infoData")
                                [i].classList.add("inpOutLine");
                              return;
                            } else if (
                              document.querySelectorAll(".infoData")[i]
                                .value !== ""
                            ) {
                              document
                                .querySelectorAll(".infoData")
                                [i].classList.remove("inpOutLine");
                            }
                          }
                          addContract(
                            `contract/new/${localStorage.getItem("code")}`,
                            formValues,
                            setAction
                          );

                          setStageAndStatus({
                            stage: "",
                            status: "",
                            location: "",
                            sale_executive: "",
                            total_cost: null,
                          });
                          setClient("");
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          await setStageAndStatus({
                            stage: "",
                            status: "",
                            location: "",
                            sale_executive: "",
                            total_cost: null,
                          });
                          setClient("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>

            <section
              className={
                editContractPage && !contractPage
                  ? "editContract activeEditContract"
                  : contractPage
                  ? "doubleEditContract"
                  : "editContract"
              }
              ref={editView}
            >
              {clientData !== null ? (
                <div className="userInfo">
                  <div>
                    <h3>{clientData.name}</h3>
                    <div>
                      <label>Email: {clientData.email}</label>
                      <label>City: {clientData.location}</label>
                      <label>Code: {clientData.code}</label>
                    </div>
                  </div>
                  <div>
                    <p>Joining Date</p>
                    <label>{clientData.joining_date}</label>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="userContractsTable">
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th rowSpan={2}>Location</th>
                        <th rowSpan={2}>Cost</th>
                        <th rowSpan={2}>Assign_date</th>
                        <th rowSpan={2}>Start</th>
                        <th rowSpan={2}>End</th>
                        <th rowSpan={2}>Stage</th>
                        <th rowSpan={2}>Status</th>
                        <th rowSpan={2}>Variations</th>
                        <th rowSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {targetUserContracts.length > 0 ? (
                        targetUserContracts.map((t) => {
                          return (
                            <React.Fragment>
                              <tr>
                                <td rowSpan={2}>{t.location}</td>
                                <td rowSpan={2}>{t.total_cost}</td>
                                <td rowSpan={2}>
                                  {t.history.slice(-1)[0].assign_date}
                                </td>
                                <td rowSpan={2}>
                                  {t.history.slice(-1)[0].start_date}
                                </td>
                                <td rowSpan={2}>
                                  {t.history.slice(-1)[0].end_date}
                                </td>
                                <td rowSpan={2}>
                                  {t.history.slice(-1)[0].stage}
                                </td>
                                <td rowSpan={2}>
                                  {t.history.slice(-1)[0].status}
                                </td>
                              </tr>
                              <tr>
                                {t.variations ? (
                                  <td className="text-danger fw-bold download">
                                    <i
                                      onClick={async () => {
                                        await contractVariations(
                                          `variation/contractVariations/${t._id}`,
                                          setContractVariations,
                                          setAction
                                        );
                                        localStorage.setItem(
                                          "contractID",
                                          t._id
                                        );
                                        setPopUp(true);
                                      }}
                                      className="fa-solid fa-cloud-arrow-down"
                                    ></i>
                                  </td>
                                ) : (
                                  <td className="noVariations"></td>
                                )}

                                <td className="fw-bold edit">
                                  <p
                                    className="m-0"
                                    onClick={() => {
                                      setEditAction(true);
                                      getContract(t._id);
                                      localStorage.setItem("contractID", t._id);
                                    }}
                                  >
                                    Edit
                                  </p>
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-danger">
                            No Data To Show !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {popUp ? (
                <section className="popUp">
                  <div>
                    <div>
                      {clientVariations.length > 0
                        ? clientVariations.map((c) => {
                            return (
                              <div>
                                <p>{c.file}</p>
                                <button onClick={() => handleDownload(c.file)}>
                                  Download
                                </button>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                    <button onClick={() => setPopUp(false)}>Close</button>
                  </div>
                </section>
              ) : (
                ""
              )}
            </section>

            <section
              className={
                editAction
                  ? "editContractAction activeEditContractAction"
                  : "editContractAction "
              }
            >
              <h1>Pleas fill all required fields</h1>
              <form>
                <div className="row">
                  <div className="col-4">
                    <label>{t("Contract.labels.assignDate")}</label>
                    <input
                      type="date"
                      name="assign_date"
                      value={formValues.assign_date}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-4">
                    <label>{t("Contract.labels.start")}</label>
                    <input
                      type="date"
                      name="start_date"
                      value={formValues.start_date}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-4">
                    <label>{t("Contract.labels.end")}</label>
                    <input
                      type="date"
                      name="end_date"
                      value={formValues.end_date}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="stage col-4">
                    <label>{t("Contract.labels.stage")}</label>
                    <div
                      className="select"
                      onClick={() => setStageAction(!actionStage)}
                    >
                      <input
                        type="text"
                        name="stage"
                        value={formValues.stage}
                        onChange={handleEditChange}
                        readOnly
                      />
                      <i
                        className={
                          actionStage
                            ? "fa-solid fa-caret-left rotateArrow"
                            : "fa-solid fa-caret-left"
                        }
                      ></i>
                    </div>

                    <div>
                      <ul
                        className={
                          actionStage ? "activeEditActionStageSelect" : ""
                        }
                        onClick={(e) => {
                          setFormValues({
                            ...formValues,
                            stage: e.target.innerHTML,
                            status:
                              e.target.innerHTML === "0"
                                ? "canceled"
                                : e.target.innerHTML === "1"
                                ? "under construction"
                                : e.target.innerHTML === "2"
                                ? "under construction"
                                : e.target.innerHTML === "3"
                                ? "under construction"
                                : e.target.innerHTML === "4"
                                ? "finishing"
                                : "completed",
                          });
                          setStageAction(false);
                        }}
                      >
                        <li>0</li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                      </ul>
                    </div>
                  </div>

                  <div className="status col-4">
                    <label>{t("Contract.labels.status")}</label>

                    <input
                      type="text"
                      name="status"
                      value={formValues.status}
                      readOnly
                    />
                  </div>

                  <div className="location col-4">
                    <label>{t("Contract.labels.location")}</label>
                    <div
                      className="select"
                      onClick={() => setLocationAction(!actionLocation)}
                    >
                      <input
                        type="text"
                        name="location"
                        placeholder="City"
                        value={formValues.location}
                        readOnly
                      />
                      <i
                        className={
                          actionLocation
                            ? "fa-solid fa-caret-left rotateArrow"
                            : "fa-solid fa-caret-left"
                        }
                      ></i>
                    </div>

                    <div>
                      <ul
                        className={
                          actionLocation ? "activeEditActionLocationSelect" : ""
                        }
                        onClick={(e) => {
                          setFormValues({
                            ...formValues,
                            location: e.target.innerHTML,
                          });
                          setLocationAction(false);
                        }}
                      >
                        <li>Abu Dhabi</li>
                        <li>Dubai</li>
                        <li>Sharjah</li>
                        <li>Al Ain</li>
                        <li>Umm Al Quwain</li>
                        <li>Ras Al Khaimah</li>
                        <li>Fujairah</li>
                        <li>Liwa</li>
                        <li>Ajman</li>
                        <li>Dhafra</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <label>{t("Contract.labels.cost")}</label>
                    <input
                      type="number"
                      name="total_cost"
                      value={formValues.total_cost}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="salesmen col-4">
                    <label>{t("Contract.labels.owner")}</label>
                    <div
                      className="select"
                      onClick={() => setSalesAction(!salesAction)}
                    >
                      <input
                        type="text"
                        name="sale_executive"
                        value={formValues.sale_executive}
                        readOnly
                      />
                      <i
                        className={
                          salesAction
                            ? "fa-solid fa-caret-left rotateArrow"
                            : "fa-solid fa-caret-left"
                        }
                      ></i>
                    </div>

                    <div>
                      <ul
                        className={
                          salesAction ? "activeEditActionSalesmen" : ""
                        }
                        onClick={(e) => {
                          setFormValues({
                            ...formValues,
                            sale_executive: e.target.innerHTML,
                          });
                          setSalesAction(false);
                        }}
                      >
                        {sales.map((s) => {
                          return <li>{s.name}</li>;
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="file col-4">
                    <label>Variations</label>
                    <div>
                      <label
                        className={fileUploaded ? "activeFiles" : ""}
                        id="uploadLabel"
                        onClick={(e) => {
                          if (
                            document.getElementById("uploadLabel").innerHTML ===
                            "Cancel"
                          ) {
                            e.target.htmlFor = "";
                          } else {
                            e.target.htmlFor = "file";
                          }
                          setFileUploaded(false);
                        }}
                      >
                        {fileUploaded ? "Cancel" : "Upload"}
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setFileUploaded(true);
                        }}
                      />
                      <div className={fileUploaded ? "fileUploaded" : ""}>
                        <i className="fa-solid fa-file"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row note">
                  <div>
                    <label>Note</label>
                    <textarea name="note" onChange={handleEditChange} />
                  </div>
                </div>

                <div className="actionBtn">
                  <div className="buttons">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditAction(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) =>
                        handleSubmit(e, localStorage.getItem("contractID"))
                      }
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </section>

            <section
              className={salesForm ? "salesForm activeSalesForm" : "salesForm"}
              ref={salesView}
            >
              <form>
                <div>
                  <label>{t("Contract.sales.name")}</label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      setSalesman({ ...salesman, name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label>{t("Contract.sales.monthly_target")}</label>
                  <input
                    type="number"
                    name="monthly_target"
                    onChange={(e) => {
                      setSalesman({
                        ...salesman,
                        monthly_target: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSalesForm(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={handleSalesman}>Done</button>
                </div>
              </form>
            </section>

            <section
              className={adminForm ? "newAdmin activeNewAdminForm" : "newAdmin"}
              ref={newAdminView}
            >
              <form>
                <div>
                  <label>Name</label>
                  <input type="text" name="name" onChange={handleAdminValues} />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleAdminValues}
                  />
                </div>

                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleAdminValues}
                  />
                </div>

                <div>
                  <label>Code</label>
                  <input type="password" id="confirmID" />
                </div>
                {checkAdminErr ? <p>{adminErr}</p> : ""}
                <div>
                  <button onClick={handleNewAdmin}>Create</button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setNewAdminForm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>

        <section
          className={activeMessages ? "messages activeMessages" : "messages"}
        >
          {checkDelete ? (
            confirmDelete ? (
              <div
                className={
                  confirmDelete
                    ? "trashMessage activeTrashMessage"
                    : "trashMessage"
                }
              >
                <i className="fa-solid fa-check text-success"></i>
                <p>Deleted Successfully</p>
              </div>
            ) : askDelete ? (
              <div
                className={
                  askDelete ? "askDelete activeAskDelete" : "askDelete"
                }
              >
                <div>
                  <p className={codeStatus ? "hideMessage" : ""}>
                    Are you sure to delete the contract ?!
                  </p>
                  <input
                    id="deleteInp"
                    className={codeStatus ? "activeCode" : ""}
                    type="password"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                  />
                  {checkCode ? <p className="text-danger">wrong code!</p> : ""}
                </div>

                <div>
                  <button
                    className="bg-danger text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setEnteredCode("");
                      setCodeStatus(false);
                      setCheckCode(false);
                      setAskDelete(false);
                      setActiveMessages(false);
                      localStorage.removeItem("contractID");
                    }}
                  >
                    Cancel
                  </button>
                  <button className="bg-white" onClick={handleDeleteContract}>
                    {codeStatus ? "Delete" : "Yes"}
                  </button>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </section>
      </section>
    </React.Fragment>
  );
}

export default Board;
