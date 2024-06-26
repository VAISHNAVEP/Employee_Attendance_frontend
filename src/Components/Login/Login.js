import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../Service/UserApi";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  axios.defaults.withCredentials = true;

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please correct the errors in the form", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await UserLogin({ email, password }); // Use UserLogin function from userapi
      if (response.message === "Success") {
        toast.success("Login successful!", {
          position: "top-center",
        });
        // Save user data to local storage
        const userData = response.userId;
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/home");
      } else {
        console.log(response);
        toast.error("Invalid email or password", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try Again Later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className={`form-control rounded-0 ${
                errors.email ? "is-invalid" : ""
              }`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className={`form-control rounded-0 ${
                errors.password ? "is-invalid" : ""
              }`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <ToastContainer />
        <p>Don't have an account?</p>
        <Link
          to="/"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
