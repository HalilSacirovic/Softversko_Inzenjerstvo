import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

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
              first_name: "",
              last_name: "",
              phone_number: "",
              address: "",
              city: "",
              postal_code: "",
              country: "",
              date_of_birth: "",
              profile_picture_url: "",
              bio: "",
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
              if (!values.first_name) {
                errors.first_name = "First name is required";
              }
              if (!values.last_name) {
                errors.last_name = "Last name is required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              fetch("http://localhost:5000/signup", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.token) {
                    console.log("Korisnik registrovan", data);
                    localStorage.setItem("auth_token", data.token);
                    localStorage.setItem("userId", data.userId);
                    setSubmitting(false);
                  }
                  navigate("/"); // Redirekcija nakon uspešne registracije
                })
                .catch((error) => {
                  console.error("Greška pri slanju podataka:", error);
                  setSubmitting(false);
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
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                  {errors.first_name && touched.first_name && (
                    <div style={{ color: "red" }}>{errors.first_name}</div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label>Last Name</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                  {errors.last_name && touched.last_name && (
                    <div style={{ color: "red" }}>{errors.last_name}</div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label>Phone Number</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="phone_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                  />
                </div>

                {/* Address */}
                <div>
                  <label>Address</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
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
                    name="postal_code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postal_code}
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
                    name="date_of_birth"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date_of_birth}
                  />
                </div>

                {/* Profile Picture */}
                <div>
                  <label>Profile Picture</label>
                  <input
                    className="login_inputs"
                    type="text"
                    name="profile_picture_url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.profile_picture_url}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label>Bio</label>
                  <textarea
                    className="login_inputs"
                    name="bio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
                  />
                </div>

                {/* Submit Button */}
                <div className="btn">
                  <button type="submit" disabled={isSubmitting}>
                    Register
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
