import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        
        const response = await axios.get("/api/leaves", {
          // headers: { Authorization: `Bearer ${token}` },
        });
        setLeaves(response.data);
      } catch (error) {
        toast.error("Error fetching leave requests");
      }
    };
    fetchLeaves();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/leaves/${status}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Leave request ${status.toLowerCase()}d successfully`);
      setLeaves(leaves.filter((leave) => leave._id !== id));
    } catch (error) {
      toast.error(`Error ${status.toLowerCase()}ing leave request`);
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.user.name}</td>
              <td>{leave.reason}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApproval(leave._id, "approve")}
                    >
                      Approve
                    </button>
                    <button onClick={() => handleApproval(leave._id, "reject")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
