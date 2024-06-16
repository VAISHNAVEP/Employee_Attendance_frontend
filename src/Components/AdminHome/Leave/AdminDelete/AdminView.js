import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminDelete.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3006/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees");
    }
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
