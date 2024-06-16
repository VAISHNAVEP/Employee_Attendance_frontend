import React from "react";
import Register from "./Components/Registration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Leave from "./Components/Leave/Leave";
import LeaveRequests from "./Components/AdminHome/Leave/LeaveRequest";
import AdminDelete from './Components/AdminHome/Leave/AdminDelete/AdminDelete';
import AdminView from './Components/AdminHome/Leave/AdminDelete/AdminView';
import Attendance from "./Components/Attendance/Attendance";
import BreakTime from "./Components/BreakTime/BreakTime";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/leave" element={<Leave />}></Route>
        <Route path="/leaverequest" element={<LeaveRequests />}></Route>
        <Route path="/admindelete" element={<AdminDelete />}></Route>
        <Route path="/adminview" element={<AdminView />}></Route>
        <Route path="/attendance" element={<Attendance />}></Route>
        <Route path="/breaktime" element={<BreakTime />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
