import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import BreakTime from "../BreakTime/BreakTime";

const Home = () => {
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);

  // States for the first timer
  const [time1, setTime1] = useState(0);
  const [running1, setRunning1] = useState(false);
  const [recordId1, setRecordId1] = useState(null);
  const timer1 = useRef();

  // States for the second timer
  const [time2, setTime2] = useState(0);
  const [running2, setRunning2] = useState(false);
  const [recordId2, setRecordId2] = useState(null);
  const timer2 = useRef();

  // State for the coffee break message
  const [breakMessage, setBreakMessage] = useState("");

  useEffect(() => {
    if (running1) {
      timer1.current = setInterval(() => {
        setTime1((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer1.current);
    }
    return () => clearInterval(timer1.current);
  }, [running1]);

  useEffect(() => {
    if (running2) {
      timer2.current = setInterval(() => {
        setTime2((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer2.current);
    }
    return () => clearInterval(timer2.current);
  }, [running2]);

  const handleCheckIn1 = async () => {
    setRunning1(true);
    const startTime = new Date().toISOString();

    try {
      const response = await axios.post("http://localhost:3006/checkin", {
        userId,
        startTime,
      });

      setRecordId1(response.data._id);
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const handleCheckOut1 = async () => {
    setRunning1(false);
    console.log("[[[[");
    const endTime = new Date().toISOString();

    try {
      await axios.put(`http://localhost:3006/checkout/${userId}`, {
        endTime,
        userId,
      });
      setRecordId1(null);
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const handleCheckIn2 = async () => {
    setRunning2(true);
    const startTime = new Date().toISOString();

    try {
      const response = await axios.post("http://localhost:3006/checkin", {
        userId,
        startTime,
      });
      setRecordId2(response.data._id);
      setBreakMessage("Coffee Break");
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };
  const format = (time) => {
    let hours = Math.floor((time / 60 / 60) % 24);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <div className="container">
      <div className="timer-group">
        <h2>Timer 1</h2>
        <div className="stopwatch">
          <p className="timer">{format(time1)}</p>
        </div>
        <div className="actions">
          <button className="button" onClick={handleCheckIn1}>
            Check In
          </button>
          <button className="button" onClick={handleCheckOut1}>
            Check Out
          </button>
        </div>
      </div>
     <BreakTime />
      
    </div>
  );
};

export default Home;
