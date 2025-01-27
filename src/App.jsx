import React from "react";
import { Routes, Route } from "react-router-dom";

import EnterStudents from "./components/EnterStudents";
import RegTeacher from "./components/RegTeacher";
import TakeTTendance from "./components/TakeTTendance";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import GetStudents from "./components/GetStudents";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<RegTeacher />} />
        <Route
          path="/student"
          element={
            <PrivateRoute>
              <EnterStudents />
            </PrivateRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <TakeTTendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/get"
          element={
            <PrivateRoute>
              <GetStudents />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
