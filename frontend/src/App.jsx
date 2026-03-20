import React from "react";

import { Route, Routes } from "react-router-dom";
import Papers from "./pages/Papers";
import Exams from "./pages/Exams";
import PaperDetails from "./pages/PaperDetails";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SavedPapers from "./pages/SavedPapers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exams/:exam" element={<Papers />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/papers/:id" element={<PaperDetails />} />
        <Route path="/saved" element={
          <ProtectedRoute>
            <SavedPapers />
          </ProtectedRoute>
          } /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;
