import { userInstance } from "../Axios/axiosinstance";

//register of user//
export const UserSignup = async (values) => {
  try {
    const response = await userInstance.post("/register", { ...values });
    console.log(response.data, "---");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//login of user//
export const UserLogin = async (values) => {
  const { email, password } = values;

  try {
    const response = await userInstance.post("/login", { email, password });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//leave of user//
export const Leave = async (values) => {
  try {
    const response = await userInstance.post("/leave", { ...values });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//get employee information//
export const GetEmployeeData = () => {
  return userInstance.get("/employees");
};
//get attendancedata//
export const GetAttendanceData = (userId) => {
  return userInstance.get(`/attendance/${userId}`);
};



