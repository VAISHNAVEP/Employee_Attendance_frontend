import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Leave } from "../../Service/UserApi";
import "./Leave.css";

const LeaveForm = () => {
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cookies] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const _id = localStorage.getItem("user");
      const response = await Leave({ reason, startDate, endDate, _id });
      toast.success("Leave request submitted successfully");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Error submitting leave request");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="leave-form">
      <div className="form-group">
        <label>Reason:</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Leave Request</button>
    </form>
  );
};

export default LeaveForm;
