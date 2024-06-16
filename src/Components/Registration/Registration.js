import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { UserSignup } from "../../Service/UserApi";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z]+$/.test(name)) {
      errors.name = "Name must only contain characters";
    } else if (/\s/.test(name.trim())) {
      errors.name = "Name must not contain white space";
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
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
      const response = await UserSignup({ name, email, password }); 
      console.log(response);
      toast.success("Registration successful!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className={`form-control rounded-0 ${errors.name ? 'is-invalid' : ''}`}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className={`form-control rounded-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <ToastContainer />
        <p>Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
