import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "./Login.css";

const Login = () => {
  return (
    <div className="div">
      <div className="box">
        <div className="logo">
          <h1>Logo</h1>
        </div>

        <div className="header">
          <h1>Welcome Back!</h1>
          <p>Please enter your details</p>
        </div>

        <div className="inputs">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              fetch("http://localhost:5000/login", {
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
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="login_inputs"
                />
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="login_inputs"
                />
                {errors.password && touched.password && errors.password}

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

export default Login;
