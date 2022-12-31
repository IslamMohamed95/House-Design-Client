import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Pages/Home/Home";
import NavBar from "./Pages/NavBar/NavBar";

import Projects from "./Pages/Projects/Projects";
import Company from "./Pages/Company/Company";
import { useEffect, useState, Suspense } from "react";
import Project3D from "./Pages/Project3D/Project3D";

function App() {
  const [loading, setLoading] = useState(false);
  const [call, setCall] = useState(false);
  const [profile, setProfile] = useState(false);
  const [change, setChange] = useState(false);
  const [filt, setFilter] = useState();
  const [contact, setContact] = useState(false);
  const [home, setHome] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

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
            <NavBar
              setHome={setHome}
              change={change}
              setChange={setChange}
              setLoading={setLoading}
              setFilter={setFilter}
              setProfile={setProfile}
              setContact={setContact}
            />
            <AnimatePresence>
              <Routes>
                <Route
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
                    />
                  }
                />
                <Route
                  path="/projects"
                  element={<Projects filt={filt} setFilter={setFilter} />}
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
                <Route path="/designs" element={<Project3D />} />
              </Routes>
            </AnimatePresence>
          </Router>
        )}
      </section>
    </Suspense>
  );
}

export default App;
