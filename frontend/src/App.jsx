import React from "react";

import { Route, Routes } from "react-router-dom";
import Papers from "./pages/Papers";
import Exams from "./pages/Exams";
import PaperDetails from "./pages/PaperDetails";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/papers/:id" element={<PaperDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
