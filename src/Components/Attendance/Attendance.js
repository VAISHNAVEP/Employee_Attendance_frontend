import React, { useEffect, useState } from "react";
import { GetAttendanceData } from "../../Service/UserApi"; // Adjust the import path if necessary

const Attendance = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const user = localStorage.getItem("user");
      const userId = JSON.parse(user);
      if (userId) {
        fetchEmployees(userId);
      }
      try {
        const response = await GetAttendanceData(userId);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              {employee.startTime} - {employee._id}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default Attendance;
