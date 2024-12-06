import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "./SignUp.css";
import { useLocation, useParams } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();

  const params = useParams();

  console.log("params ", params);

  console.log(location);
  return (
    <div className="div">
      <div className="box">
        <div className="logo">
          <h1>Logo</h1>
        </div>

        <div className="header">
          <h1>SignUp</h1>
          <p>Please enter your details</p>
        </div>

        <div className="inputs">
          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
              firstName: "",
              lastName: "",
              phoneNum: "",
              street: "",
              city: "",
              postalCode: "",
              country: "",
              dateOfBirth: "",
              profilePicture: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              if (!values.username) {
                errors.username = "Username is required";
              }
              if (!values.dateOfBirth) {
                errors.dateOfBirth = "Date of birth is required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              fetch("http://localhost:5000/users2", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.token) {
                    console.log("RADI VALJDA ", data);
                    localStorage.setItem("auth_token", data.token);
                    localStorage.setItem("userId", data.userId);
                    setSubmitting(false);
                  }
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="form">
                {/* Email */}
                <div>
                  <label>Email</label>
                  <input
                    className="login_inputs"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label>Password</label>
                  <input
                    className="login_inputs"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label>Username</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <div style={{ color: "red" }}>{errors.username}</div>
                  )}
                </div>

                {/* First Name */}
                <div>
                  <label>First Name</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label>Last Name</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label>Phone Number</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="phoneNum"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNum}
                  />
                </div>

                {/* Street */}
                <div>
                  <label>Street</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                  />
                </div>

                {/* City */}
                <div>
                  <label>City</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label>Postal Code</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="postalCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postalCode}
                  />
                </div>

                {/* Country */}
                <div>
                  <label>Country</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label>Date of Birth</label>
                  <input
                    className="login_inputs"
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateOfBirth}
                  />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <div style={{ color: "red" }}>{errors.dateOfBirth}</div>
                  )}
                </div>

                {/* Profile Picture */}
                <div>
                  <label>Profile Picture</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="profilePicture"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profilePicture}
                  />
                </div>

                {/* Submit Button */}

                <div className="btn">
                  <button type="submit" disabled={isSubmitting}>
                    Log In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
