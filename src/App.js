import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Pages/Home/Home";
import NavBar from "./Pages/NavBar/NavBar";

import Projects from "./Pages/Projects/Projects";
import Company from "./Pages/Company/Company";
import React, { useEffect, useState, Suspense } from "react";
import Project3D from "./Pages/Project3D/Project3D";
import Greeting from "./Pages/Greeting/Greeting";
import Login from "./Pages/Login/Login";
import axios from "axios";
import Board from "./Pages/Dashboard/Board/Board";
import Contract from "./Pages/Dashboard/Contract/Contract";
import DashNav from "./Pages/Dashboard/DashNav/DashNav";
import View from "./Pages/Dashboard/View/View";
import { useTranslation } from "react-i18next";
import Client from "./Pages/Client/Client";

function App() {
  const { i18n } = useTranslation();
  const deleteCode = "413462325";
  const [clientContracts, setClientContracts] = useState([]);
  const [notification, setNotification] = useState(0);
  const URL = "";
  const [formValues, setFormValues] = useState({
    location: "",
    stage: "",
    status: "",
    assign_date: "",
    start_date: "",
    end_date: "",
    total_cost: 0,
    sale_executive: "",
    note: "",
  });
  const [client, setClient] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
  });
  const [salesman, setSalesman] = useState({
    name: "",
    monthly_target: 0,
  });
  const [width, setWidth] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  var [file, setFile] = useState();
  const [fileData, setFileData] = useState();
  const [variations, setVariations] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState([]);
  const [code, setCode] = useState();
  const [user, setUser] = useState({});
  const [add, setAdd] = useState(false);
  const [exit, setExit] = useState(false);
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [call, setCall] = useState(false);
  const [profile, setProfile] = useState(false);
  const [change, setChange] = useState(false);
  const [filt, setFilter] = useState();
  const [contact, setContact] = useState(false);
  const [home, setHome] = useState(false);
  const [site, setSite] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [skip, setSkip] = useState(false);
  const [login, setLogin] = useState(false);
  const [countries, setCountries] = useState([]);
  const [activeLang, setActiveLang] = useState(false);
  let countryURL = "https://restcountries.com/v3.1/all";

  const fetchData = async () => {
    const response = await axios.get(countryURL);
    setCountries(response.data);
  };

  useEffect(() => {
    setCall(false);
    setProfile(false);
    setHome(false);
    setContact(false);
    setSite(false);
    setLoading(true);
    fetchData();
    if (
      window.location.href.includes("http://localhost:3001/login") ||
      window.location.href.includes("http://localhost:3001/board") ||
      window.location.href.includes("http://localhost:3001/dashboard")
    ) {
      setLogin(true);
      setSkip(true);
      i18n.changeLanguage("en");
    } else {
      setLogin(false);
      setSkip(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [i18n]);

  return (
    <Suspense fallback="Loading...">
      <section className="App">
        {loading ? (
          <div id="square1">
            <div>
              <span></span>
              <span></span>
            </div>

            <div>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <Router>
            {window.location.href.includes("http://localhost:3001/board") ? (
              <DashNav setExit={setExit} />
            ) : (
              <React.Fragment>
                <NavBar
                  activeLang={activeLang}
                  setActiveLang={setActiveLang}
                  setHome={setHome}
                  change={change}
                  setChange={setChange}
                  setLoading={setLoading}
                  setFilter={setFilter}
                  setProfile={setProfile}
                  setContact={setContact}
                  setCall={setCall}
                  site={site}
                  setSite={setSite}
                  login={login}
                  setSkip={setSkip}
                  setLogin={setLogin}
                />
                <Greeting
                  skip={skip}
                  countries={countries}
                  setLogin={setLogin}
                  setSkip={setSkip}
                />
              </React.Fragment>
            )}
            <AnimatePresence>
              <Routes>
                <React.Fragment>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home
                        home={home}
                        setHome={setHome}
                        setContact={setContact}
                        contact={contact}
                        setCall={setCall}
                        change={change}
                        setFilter={setFilter}
                        setSite={setSite}
                        setProfile={setProfile}
                        profile={profile}
                        setWidth={setWidth}
                        width={width}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/projects"
                    element={
                      <Projects
                        filt={filt}
                        setFilter={setFilter}
                        home={home}
                        setHome={setHome}
                        site={site}
                        setSite={setSite}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Company
                        profile={profile}
                        setProfile={setProfile}
                        call={call}
                        setCall={setCall}
                      />
                    }
                  />
                  :
                </React.Fragment>
                <Route
                  path="/login"
                  element={
                    <Login
                      setAction={setAction}
                      setLoading={setLoading}
                      setChange={setChange}
                      setLogin={setLogin}
                      isSubmit={isSubmit}
                      setSubmit={setSubmit}
                      setExit={setExit}
                      code={deleteCode}
                    />
                  }
                />
                <React.Fragment>
                  <Route
                    path="/board"
                    element={
                      <Board
                        notification={notification}
                        setNotification={setNotification}
                        popUp={popUp}
                        setPopUp={setPopUp}
                        deleteCode={deleteCode}
                        setCode={setCode}
                        user={user}
                        setUser={setUser}
                        setAction={setAction}
                        action={action}
                        setExit={setExit}
                        exit={exit}
                        add={add}
                        setAdd={setAdd}
                        newClientData={client}
                        setNewClientData={setClient}
                        clients={clients}
                        setClients={setClients}
                        loaded={loaded}
                        setLoaded={setLoaded}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        clientData={clientData}
                        setClientData={setClientData}
                        targetUserContracts={contracts}
                        setTargetUserContracts={setContracts}
                        variations={variations}
                        setVariations={setVariations}
                        fileUploaded={fileUploaded}
                        setFileUploaded={setFileUploaded}
                        file={file}
                        setFile={setFile}
                        fileData={fileData}
                        setFileData={setFileData}
                        salesman={salesman}
                        setSalesman={setSalesman}
                        code={deleteCode}
                      />
                    }
                  />
                  <Route
                    path="/board/contract"
                    element={
                      <Contract
                        action={action}
                        setAction={setAction}
                        code={code}
                        setCode={setCode}
                        add={add}
                        setAdd={setAdd}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        client={client}
                        setClient={setClient}
                        clients={clients}
                        setClients={setClients}
                        loaded={loaded}
                        setLoaded={setLoaded}
                        clientData={clientData}
                        setClientData={setClientData}
                      />
                    }
                  />
                  <Route
                    path="/board/view"
                    element={
                      <View
                        action={action}
                        setAction={setAction}
                        URL={URL}
                        contracts={contracts}
                        setContracts={setContracts}
                        variations={variations}
                        setVariations={setVariations}
                        fileUploaded={fileUploaded}
                        setFileUploaded={setFileUploaded}
                        file={file}
                        setFile={setFile}
                        fileData={fileData}
                        setFileData={setFileData}
                      />
                    }
                  />
                </React.Fragment>
                : window.location.href.includes(
                "http://localhost:3001/dashboard" ) ? (
                <Route
                  path="/dashboard"
                  element={
                    <Client
                      notification={notification}
                      setNotification={setNotification}
                      setClientContracts={setClientContracts}
                      clientContracts={clientContracts}
                      setExit={setExit}
                      action={action}
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                  }
                />
                ) : (
                <Route path="/designs" element={<Project3D />} />
                )}
              </Routes>
            </AnimatePresence>
          </Router>
        )}
      </section>
    </Suspense>
  );
}

export default App;
