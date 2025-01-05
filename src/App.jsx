import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Body from "./pages/Body";
import Confirm from "./pages/Comfirm";
import SubclassesByBlock from "./pages/SubclassesByBlock";

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
      </Routes>
    </Router>
  );
};

export default App;
