import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Body from "./pages/Body";
import Confirm from "./pages/Comfirm";
import SubclassesByBlock from "./pages/SubclassesByBlock";
import TimeSelection from "./pages/TimeSelection";
import Success from "./pages/Success"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Body />
            </>
          }
        />
        <Route
          path="/subclasses/:blockId"
          element={
            <>
              <Navbar />
              <SubclassesByBlock />
            </>
          }
        />
        <Route
          path="/confirm"
          element={
            <>
              <Navbar />
              <Confirm />
            </>
          }
        />
        <Route
          path="/time-selection"
          element={
            <>
              <Navbar />
              <TimeSelection />
             </>
          }
        />
        <Route
          path="/success"
          element={
            <>
              <Navbar />
              <Success />
              </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
